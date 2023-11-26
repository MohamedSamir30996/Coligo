const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "subjects",
            required: [true, "Subject ID is required"],
        },
        question: {
            type: String,
            required: [true, "Question is required"],
            minLength: 5,
        },
        answers: {
            type: [String],
            required: [true, "Answers are required"],
            validate: {
                validator: (value) => value.length >= 2,
                message: "There must be at least two answers",
            },
        },
        rightAnswer: {
            type: String,
            required: [true, "Right Answer is required"],
        },
    },
    {
        timestamps: true,
        collection: "questions",
    }
);

const Question = mongoose.model("questions", questionSchema);
module.exports = Question;
