const User = require('../Model/UserModel');
const Docs = require('../Model/DocsModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { Readable } = require('stream');
const { google } = require('googleapis');
const path = require('path');

exports.RegisterUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const checkEmail = await User.findOne({ email });
        if (checkEmail) return res.status(400).json({ message: 'Email already exists' });

        const checkUsername = await User.findOne({ username });
        if (checkUsername) return res.status(400).json({ message: 'Username already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const hashedEmail = await md5(email);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            avatarImg: `https://gravatar.com/avatar/${hashedEmail}?d=mp`,
        });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully!' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.LoginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const CheckUser = await User.findOne({ email });
        if (!CheckUser) return res.status(400).json({ message: 'User does not exist!' });

        const CheckPassword = await bcrypt.compare(password, CheckUser.password);
        if (!CheckPassword) return res.status(400).json({ message: 'Email or password is incorrect!' });

        const token = jwt.sign({
            uid: CheckUser._id,
            email: CheckUser.email,
            username: CheckUser.username,
        }, process.env.JWT_SECRET);

        const user = {
            uid: CheckUser._id,
            username: CheckUser.username,
            email: CheckUser.email,
            avatar: CheckUser.avatarImg,
            token,
        }

        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.GetInstitutions = async (req, res) => {
    try {
        const DocsDB = await Docs.find({})
        res.status(200).json({ DocsDB })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Failed to get Institutions" })
    }
}

exports.CreateInstitute = async (req, res) => {
    const { collegeName, description, userName } = req.body;
    try {
        const newDocs = new Docs({
            collegeName: collegeName,
            description: description,
            registeredBy: userName,
        });
        await newDocs.save();
        res.status(201).json({ newDocs, message: "Institute Registered Successfully!" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.CreateCourse = async (req, res) => {
    const { collegeId, courseName, courseDesc, courseCreator } = req.body;

    const DocsDB = await Docs.findOne({ "_id": collegeId });
    if (!DocsDB) return res.status(400).json({ message: 'Institute does not exist!' });

    try {
        const CourseDB = DocsDB.course;
        CourseDB.push({
            courseName: courseName,
            courseDesc: courseDesc,
            courseCreator: courseCreator
        })

        const savedCourse = await DocsDB.save();
        res.status(201).json({ savedCourse, message: "Course Created Successfully!" });

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.CreateSubject = async (req, res) => {
    const { collegeId, courseId, subjectName, subjectDesc, subjectCreator } = req.body;

    const [DocsDB] = await Docs.find({ "_id": collegeId })
    if (!DocsDB) return res.status(400).json({ message: 'Institute does not exist!' });

    try {
        DocsDB.course.forEach((obj) => {
            if (obj._id == courseId) {
                obj.subjects.push({
                    subjectName: subjectName,
                    subjectDesc: subjectDesc,
                    subjectCreator: subjectCreator,
                })
            }
        })

        const savedSubject = await DocsDB.save();
        res.status(201).json({ savedSubject, message: "Subject Created Successfully!" });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.UploadToDrive = async (req, res) => {
    const { collegeId, courseId, subjectId, uploadedBy } = req.body;
    const fileList = req.files;

    const DocsDB = await Docs.findOne({ "_id": collegeId }, { course: 1 })
    if (!DocsDB) return res.status(400).json({ message: 'Invalid Entry, Check entered details.' });

    let indexCount = 1;
    fileList.forEach((obj, index) => {
        const { originalname, mimetype, buffer, size } = obj;
        const stream = Readable.from(buffer);

        let fileMeta = {
            name: originalname,
            parents: [process.env.GOOGLE_DRIVE_PARENT_ID]
        }

        let media = {
            mimeType: mimetype,
            body: stream
        }

        async function UploadFiles() {
            // GOOGLE DRIVE API SERVICE
            const KEYFILE = path.join(__dirname, "../credentials.json");
            const SCOPE = ['https://www.googleapis.com/auth/drive'];
            let auth = new google.auth.GoogleAuth({
                keyFile: KEYFILE,
                scopes: SCOPE,
            })
            const driveService = google.drive({ version: "v3", auth });
            try {
                let result = await driveService.files.create({
                    resource: fileMeta,
                    media: media,
                    fields: 'id, name, size, webContentLink'
                });
                // console.log("MAIN", result.data)

                DocsDB.course.forEach((obj) => {
                    if (obj._id == courseId) {
                        obj.subjects.forEach((sub) => {
                            if (sub._id == subjectId) {
                                sub.subjectDocs.push({
                                    docId: result.data.id,
                                    docName: result.data.name,
                                    docSize: result.data.size,
                                    docLink: result.data.webContentLink,
                                    docUploader: uploadedBy,
                                })
                            }
                        })
                    }
                })

                if (indexCount === fileList.length) {
                    const savedDocs = await DocsDB.save();
                    res.status(201).json({ savedDocs, message: "Files Uploaded Successfully!" });
                } else {
                    indexCount = indexCount + 1;
                }
            } catch (err) {
                console.log(err)
                res.status(500);
            }
        }
        UploadFiles()
    })

    // res.status(201).json({ message: "Files Uploaded Successfully!" });
}

exports.DownloadFromDrive = async (req, res) => {
    const { fileId } = req.body;

    // GOOGLE DRIVE API SERVICE
    const KEYFILE = path.join(__dirname, "../credentials.json");
    const SCOPE = ['https://www.googleapis.com/auth/drive'];
    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILE,
        scopes: SCOPE,
    })
    const driveService = google.drive({ version: "v3", auth });

    try {
        let result = await driveService.files.get({
            fileId: fileId,
            fields: "id, name, originalFilename, size, webContentLink"
        })

        console.log(result)

        res.status(200).send(result.data)
    } catch (err) {
        console.log(err)
        res.status(500)
    }
}