const Subject = require("../models/subjectModel");
const Question = require("../models/questionModel");


exports.createSubject = async (req, res, next) => {
    try {
        const {subjectTitle} = req.body;
        const subject = await Subject.create({subjectTitle});
        res.status(201).json({
            message: "created",
            data: {
                subject,
            },
        });
    } catch (err) {
        res.status(400).json({
            message: "failed",
            err,
        });
    }
};

exports.getSubjects = async (req, res, next) => {
    try {
        const subjects = await Subject.find()
        res.status(200).json({
            message: "success",
            data: {
                data: subjects,
            },
        });
    } catch (err) {
        res.status(404).json({
            message: "Not Found",
            err,
        });
    }
};

exports.getSubject = async (req, res, next) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) next(err);

        res.status(200).json({
            message: "success",
            data: {
                subject,
            },
        });
    } catch (err) {
        res.status(404).json({
            message: "Not Found",
            err,
        });
    }
};
exports.updateSubject = async (req, res, next) => {
    try {
        const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json({
            message: "success",
            data: {
                subject,
            },
        });
    } catch (err) {
        res.status(404).json({
            message: "Not Found",
            err,
        });
    }
};

exports.deleteSubject = async (req, res, next) => {
    try {
        const subject = await Subject.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "success",
            data: {
                subject,
            },
        });
    } catch (err) {
        res.status(404).json({
            message: "Not Found",
            err,
        });
    }
};

exports.getSubjectQuestions = async (req, res, next) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) {
            return res.status(404).json({
                message: "Subject not found",
            });
        }
        const questions = await Question.find({ subjectId: subject._id });
        res.status(200).json({
            message: "success",
            data: {
                questions,
            },
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            err,
        });
    }
};