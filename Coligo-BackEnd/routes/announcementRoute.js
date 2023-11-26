const express = require("express");
const router = express.Router();
const AnnouncementController = require("./../controllers/announcementController");

router
    .route("/")
    .get(AnnouncementController.getAnnouncements)
    .post(AnnouncementController.createAnnouncement);

router
    .route("/:id")
    .get(AnnouncementController.getAnnouncement)
    .delete(AnnouncementController.deleteAnnouncement)
    .patch(AnnouncementController.updateAnnouncement);

module.exports = router;