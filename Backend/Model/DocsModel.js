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
    course: [{
        courseName: {
            type: String,
            required: true,
        },
        semesters: [{
            semesterName: {
                type: String,
                required: true,
            },
            subjects: [{
                subjectName: {
                    type: String,
                    required: true,
                },
                subjectDocs: [{
                    docName: {
                        type: String,
                        required: true,
                    },
                    docLink: {
                        type: String,
                        required: true,
                    },
                }],
            }],
        }],
    }],
})

module.exports = mongoose.model('Docs', docsSchema);