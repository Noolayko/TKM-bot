const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK1BpOVBTcmRxOXM3dXp0WXRyL1QvNENwOG1OOFk3ZmpnR3p5U3I4OG9HTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib2hhdjBnaFcyRklFVy8zcDlkdTVraTYyK3pLdTRDRjdkeDY2OUlCMThFZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHTDFibHl3Zzd0MWFzTlVmanRxalcva0MvREl2ZjlUWVJvcXpJODV0WGs0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3eTd0VmIyRkpRcnRkUXBwSnNBbHBpdE1zdnE5ZFQyUndGV1o0QkkxdUdzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9EcHBiYURJVG0zWmZVRUdpWE4yYWZaMVBzVUZUVVhiY01sbks0Tk5kV0k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjN3ellsUitwYVoxVnlwdXY4azdXd1R2Ui90M1l0NDNHYUcydDA5b09pVk09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUZxSlJaVkNjV2R4NUE3U0dYVHJSSlROUHpoRi9hVVlaMUZVWnVaVnRIcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNm9xV0RqN3F5SXJYUG1TbmtDVjdmNk9wTjVXY1BMVjU2ayswczhFVFFFUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikh0M0dJL2RSYnozZmlkOHlZeEhMS3hxYjZ0N1Q1LzNtUFVHQXlCMVdKQmluVVlkMDI4cmI4WE1HaHBQSFlmeXVhaUI1dUlTblY2NmlKa3hpRk16cURRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU5LCJhZHZTZWNyZXRLZXkiOiJ4T0hYRU9zajQwOHZyVTg2cmtVdEoxdCtEUEpYMEY4K2ZPVG1tOHM3UUpJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJyMmRYMHREV1RMdV9WLXpWcGVpV21nIiwicGhvbmVJZCI6ImIyOGQwYWY0LTM5NGEtNDY1Ni1hZWI3LTIxODQ4YmI0ZWJmZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzMmJYM3hCM2pOMTFoTDRVUkhmMWd6OFAzMmM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSEg2bHBqcWlIdWk2QWlld0tGdlp2NFV2U0VFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkZIQTdWVExUIiwibWUiOnsiaWQiOiIyNTY3NDIzNjY5Njk6MThAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQOKCs+KCteKCtcOYyYTigqbigq4gMiDigrHDmOKxpCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUFBveU9rSEVNYmwxYlFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiL09jNGd2SGcwNGNJc1VtTFRxNGs3N1pRRFRZSjlBZ3hQN2ZVSW1XQmxBTT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiYmthckF1R3cvcGhIdndBSlB4UEhoUTYxUHU3aVRZb3czQStibURKZ3lYaENlTjEzYWxTNFhPWGVuWE9EWGJZeFpwNEVoQTlrd3dVWEhnOHBCYUhmQnc9PSIsImRldmljZVNpZ25hdHVyZSI6IjJZWURaWG80b0hOYXFmTjVualJRSFZ4UUYvMWtnN1B4Y1Z2WVNidFVTOThURzgycXdjNWRkNWt4TUF6NmhHdFFLdDBCZnFvUU5FZnp1cnVFeDZhS0RRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU2NzQyMzY2OTY5OjE4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZ6bk9JTHg0Tk9IQ0xGSmkwNnVKTysyVUEwMkNmUUlNVCszMUNKbGdaUUQifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjEwNzAyOTF9',
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
