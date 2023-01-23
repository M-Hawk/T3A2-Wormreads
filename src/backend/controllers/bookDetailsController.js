// @desc    Get book details
// @route   GET /api/bookdetails
// @access  Private
const getBookDetails = (req, res) => {
  res.status(200).json({ message: "Get Book Details" })
}

// @desc    Set book details
// @route   POST /api/bookdetails
// @access  Private
const setBookDetails = (req, res) => {
  if(!req.body.title) {
    res.status(400).json({ message: "Please add the title key" })
  }
  res.status(200).json({ message: "Set a books details" })
}

// @desc    Update book details
// @route   PUT /api/bookdetails/:id
// @access  Private
const updateBookDetails = (req, res) => {
  res.status(201).json({ message: `Update book details ${req.params.id}` })
}

// @desc    Delete book details
// @route   DELETE /api/bookdetails/:id
// @access  Private
const deleteBookDetails = (req, res) => {
  res.status(200).json({ message: `Delete a books details ${req.params.id}` })
}

// exported controller functions
module.exports = {
  getBookDetails,
  setBookDetails,
  updateBookDetails,
  deleteBookDetails,
}