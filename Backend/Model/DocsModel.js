const mongoose = require('mongoose');

const docsSchema = new mongoose.Schema({
    collegeName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    registeredBy: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    course: [{
        courseName: {
            type: String,
            required: true,
        },
        courseDesc: {
            type: String,
            required: true,
        },
        courseCreator: {
            type: String,
            required: true,
        },
        subjects: [{
            subjectName: {
                type: String,
                required: true,
            },
            subjectDesc: {
                type: String,
                required: true,
            },
            subjectCreator: {
                type: String,
                required: true,
            },
            subjectDocs: [{
                docId: {
                    type: String,
                    required: true,
                },
                docName: {
                    type: String,
                    required: true,
                },
                docSize: {
                    type: String,
                    required: true,
                },
                docLink: {
                    type: String,
                    required: true,
                },
                docCreated: {
                    type: Date,
                    default: Date.now,
                },
                docUploader: {
                    type: String,
                    required: true,
                },
            }],
        }],
    }],
})

module.exports = mongoose.model('Docs', docsSchema);