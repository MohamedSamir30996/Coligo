const mongoose = require("mongoose");
const announcementSchema = new mongoose.Schema(
    {
        announcementTitle: {
            type: String,
            required: [true, "announcement Must Have Title"],
            minLength: 3,
            maxLength: 60,
        },
        announcementBody: {
            type: String,
            minLength: 3,
            maxLength: 120,
        },
    },
    {
        timestamps: true,
        collection: "announcements",
    }
);

const Announcement = mongoose.model("announcements", announcementSchema);
module.exports = Announcement;
