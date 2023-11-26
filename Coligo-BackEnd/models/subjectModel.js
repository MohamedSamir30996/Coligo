const mongoose = require("mongoose");
const subjectSchema = new mongoose.Schema(
    {
        subjectTitle: {
            type: String,
            required: [true, "Subject Must Have Title"],
            minLength: 3,
            maxLength: 40,
        },
    },
    {
        timestamps: true,
        collection: "subjects",
    }
);

const Subject = mongoose.model("subjects", subjectSchema);
module.exports = Subject;
