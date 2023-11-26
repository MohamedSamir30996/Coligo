const express = require("express");
const router = express.Router();
const QuestionController = require("./../controllers/questionController");

router
    .route("/")
    .get(QuestionController.getQuestions)
    .post(QuestionController.createQuestion);

router
    .route("/:id")
    .get(QuestionController.getQuestion)
    .delete(QuestionController.deleteQuestion)
    .patch(QuestionController.updateQuestion);

module.exports = router;