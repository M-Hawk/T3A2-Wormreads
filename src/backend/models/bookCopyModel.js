const mongoose = require("mongoose")
const bookCopySchema = mongoose.Schema({
  bookDetails:{ 
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: "BookDetails"
  },
  isAvailable:{
    type: Boolean,
    default: true, 
  },
  }, {
  timestamp: true
})

module.exports = mongoose.model("BookCopy", bookCopySchema)