const express = require("express");
const router = express.Router();
const SubjectController = require("./../controllers/subjectController");

router
    .route("/")
    .get(SubjectController.getSubjects)
    .post(SubjectController.createSubject);

router
    .route("/:id")
    .get(SubjectController.getSubject)
    .delete(SubjectController.deleteSubject)
    .patch(SubjectController.updateSubject);

router
    .route("/:id/questions")
    .get(SubjectController.getSubjectQuestions)
module.exports = router;