import client from 'ssh2-sftp-client';
import Database from 'better-sqlite3';
import { users } from './constants';

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
    }, 1800000)

    // @ts-expect-error
    global.sftp = content;
    return content;
}

export const newDb = async(rawContent: any) => {
    const db = new Database(rawContent);
    const content = (db.prepare(`SELECT * FROM 'heartdata' ORDER BY hearts DESC`).all()).filter(o => Object.keys(users).includes(o.UUID));

    content.forEach(async(user) => {
        user.PARSED_HEARTS = user.HEARTS / 2;

        // @ts-expect-error
        user.USERNAME = users[user.UUID as string];
    })

    return content;
}
