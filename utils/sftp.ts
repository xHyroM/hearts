import client from 'ssh2-sftp-client';
import Database from 'better-sqlite3';
import hyttpo from 'hyttpo';
import fs from 'fs';

export const getSftp = async() => {
    // @ts-expect-error
    if (global.sftp) return global.sftp;

    const sftp = (new client());
     await sftp.connect({
        host: process.env.SFTP_HOST,
        port: process.env.SFTP_PORT as unknown as number,
        username: process.env.SFTP_USERNAME,
        password: process.env.SFTP_PASSWORD
    });

    const rawContent = await sftp.get('/plugins/LifeStealSMP/database.db');
    const content = await newDb(rawContent);

    setInterval(async() => {
        const rawContent = await sftp.get('/plugins/LifeStealSMP/database.db');
        const data = await newDb(rawContent);

        // @ts-expect-error
        global.sftp = data;
    }, 3600000)

    // @ts-expect-error
    global.sftp = content;
    return content;
}

export const newDb = async(rawContent: any) => {
    //await fs.writeFileSync('./database.db', rawContent);

    const db = new Database(rawContent);
    const content = db.prepare(`SELECT * FROM 'heartdata' ORDER BY hearts DESC`).all();

    content.forEach(async(user) => {
        user.PARSED_HEARTS = user.HEARTS / 2;

        const data = await (await hyttpo.request({
            method: 'GET',
            url: `https://sessionserver.mojang.com/session/minecraft/profile/${user.UUID}`
        })).data;
        
        user.USERNAME = data.name;
    })

    return content;
}