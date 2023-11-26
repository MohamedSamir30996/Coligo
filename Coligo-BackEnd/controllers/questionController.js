const Question = require("../models/questionModel");
const Subject = require("../models/subjectModel");

exports.createQuestion = async (req, res, next) => {
    try {
        const { subjectId, question, answers, rightAnswer } = req.body;
        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.status(404).json({
                message: "Subject not found",
            });
        }
        const newQuestion = await Question.create({
            subjectId,
            question,
            answers,
            rightAnswer,
        });
        res.status(201).json({
            message: "Question created",
            data: {
                question: newQuestion,
            },
        });
    } catch (err) {
        res.status(400).json({
            message: "Failed to create question",
            err,
        });
    }
};

exports.getQuestions = async (req, res, next) => {
    try {
        const questions = await Question.find();
        res.status(200).json({
            message: "Success",
            data: {
                questions,
            },
        });
    } catch (err) {
        res.status(404).json({
            message: "Not Found",
            err,
        });
    }
};

exports.getQuestion = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({
                message: "Question not found",
            });
        }

        res.status(200).json({
            message: "Success",
            data: {
                question,
            },
        });
    } catch (err) {
        res.status(404).json({
            message: "Not Found",
            err,
        });
    }
};

exports.updateQuestion = async (req, res, next) => {
    try {
        const question = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );
        res.status(200).json({
            message: "Success",
            data: {
                question,
            },
        });
    } catch (err) {
        res.status(404).json({
            message: "Not Found",
            err,
        });
    }
};

exports.deleteQuestion = async (req, res, next) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Success",
            data: {
                question,
            },
        });
    } catch (err) {
        res.status(404).json({
            message: "Not Found",
            err,
        });
    }
};
