const mongoose = require('mongoose');

const repoSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  keyword:String,
  name: String,
  full_name: String,
  html_url: String,
  description: String,
  stargazers_count: Number,
});

module.exports = mongoose.model('Repo', repoSchema);
