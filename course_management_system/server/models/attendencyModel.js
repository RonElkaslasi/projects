const mongoose = require("mongoose");

const attendencySchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  classes: [
    {
      date: {
        type: Date,
      },
      present: {
        type: Boolean,
        default: true,
      },
      reason: {
        type: String,
        default: "",
      },
    },
  ],
});

// attendencySchema.statics.findAttendByCourseAndUser = async (user,course){
//     const attend = await Attendency.findOne({student:user, course:course});
//     if(!attend)
// }
const Attendency = mongoose.model("Attendency", attendencySchema);
module.exports = Attendency;
