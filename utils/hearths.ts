import { getSftp } from './sftp';

const ftp = getSftp();

export const getHearts = async() => {
    const ftpPromised = await ftp;
    return ftpPromised;
}