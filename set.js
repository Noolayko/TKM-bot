const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicVB4N3pYejZYdHhLQW5veUdrcENyalBHWVBzWjc1YUt4N0tBWXZDdldVVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVjM0V2krYVh4QlZ6bjNKZEtjeWorWUJTUW9NQUorbGNIcGRRMGlFYlNIcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRTjFUY1MxdTgvMVE5endiMFB2TWtleVhsdTgzeEVIUHZBdVhIbHh1bVhJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpbEgxZzJCNjdNeDFOdTNFR0NYVTZjS0pNNTNqZWlITGc1WFFYdzl1ekhFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNGR2ZOMmVLNEdNS3JDSXVoaTNubVZBTHV6MUdPL3p5eGVOWEhmUlFCbVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkloTWhPTUY4dVJzVUYwTEM5dmlzL21XblNZdXlpUExSelRyZjBOQXlzbEE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0E2Wmg5eTlSM3JnQ2RkajNTZ0FRczBNYlJ1bGR3d01FOGhSSlNMVDkwQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQWY0czFrYnNQZVJxSFdMQkxSdkZ4ajltSERDaDlhVXJwUHd5SG1WQlRVST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJSQktvajEwN1hPbE5ZeEhPMks1MzltQ0xzUDFhTC9rWmlkUkhYcG5zQzEzUUtENVBaeDJSeE1hU2JHZ1JwTkl2bTB3MHBVM3ZBNUs3VUs0YlVZWmhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMzLCJhZHZTZWNyZXRLZXkiOiJlNkRpalZaVW1aMm1IK0hNVXUvTit2UlZhcDFrQTYwK1NEZ3F4UnNkYjJjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJYTTNTLUNHclJtS2kzN0NjamVRc3BRIiwicGhvbmVJZCI6IjNhZjkwZDhjLTcyYTAtNDNlYS1iMTVjLTdhMmJhZjQ2MzM1NCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxZUsyNGxhemdPMXM4SFRyN1dwTkdFU2M4YU09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVlZ0QmVlb2U4c05kNm13VmJ2dnM2RWlUdlhBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlpHS1ROWDRFIiwibWUiOnsiaWQiOiIyNTY3NDIzNjY5Njk6MTdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQOKCs+KCteKCtcOYyYTigqbigq4gMiDigrHDmOKxpCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUExveU9rSEVKSEgxTFFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiL09jNGd2SGcwNGNJc1VtTFRxNGs3N1pRRFRZSjlBZ3hQN2ZVSW1XQmxBTT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiK2JCNTNIMTJxeEF2S21FN2gyLzlnUTk1V1RDU2IvYzhSUGYzSGJPNFVOb3Uwak5LVGlEdURCMGFaWXpGaEUxeSs1Tnp5RklLWnQ0TU9jNXI0SHF5QXc9PSIsImRldmljZVNpZ25hdHVyZSI6IjRYVHVwMUg3Qm5MZWxlTjArVW93dUNjd29BRUd1MWRuQ29qVERJbWJGZHkxRy8xRS8zeWR6R2pCWWYxOXlzNm1GaWREUFJmRzBkVXNjeU10RzZXR2h3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU2NzQyMzY2OTY5OjE3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZ6bk9JTHg0Tk9IQ0xGSmkwNnVKTysyVUEwMkNmUUlNVCszMUNKbGdaUUQifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjEwNTAwMTQsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRU9WIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "ACCOUNT",
    NUMERO_OWNER : process.env.OWNER_NUM || "256742366969",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'yes',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
