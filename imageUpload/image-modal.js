const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({

  image: {
    type: String
  }
});

module.exports = mongoose.model('Image',imageSchema);
