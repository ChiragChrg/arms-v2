const { google } = require('googleapis');
const path = require('path');

const GetDriveService = () => {
    const KEYFILE = path.join(__dirname, "credentials.json");
    const SCOPE = ['https://www.googleapis.com/auth/drive'];

    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILE,
        scopes: SCOPE,
    })

    const driveService = google.drive({ version: "v3", auth });
    return driveService;
}

module.exports = GetDriveService;