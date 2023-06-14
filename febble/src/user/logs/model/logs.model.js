// External Dependancies
const mongoose = require("mongoose");

const logsSchema = new mongoose.Schema({
  logs: { type:Object },
},{timestamps:true});

module.exports = mongoose.model("logs", logsSchema);