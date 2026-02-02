const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 18 },
    experience: { type: Number, required: true, min: 0 },
    employed: { type: Boolean, default: true },
    department: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Instructor', InstructorSchema);
