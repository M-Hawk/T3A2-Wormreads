const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const UserModel = require("../models/userModel")

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  if(!username || !email || !password) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  //Check if user email exists
  const userEmailExists= await UserModel.findOne({email})

  if(userEmailExists) {
    res.status(409)
    throw new Error("Email already exists.")
  }
  //Check if username exists
  const usernameExists= await UserModel.findOne({username})

  if(usernameExists) {
    res.status(409)
    throw new Error("Username already exists.")
  }
  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Create User
  const user = await UserModel.create({
    username,
    email,
    password: hashedPassword
  })
  
  if(user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } 
  else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// @desc    Register new admin user
// @route   POST /api/users/registeradmin
// @access  Admin private
const registerAdmin = asyncHandler(async (req, res) => {
  // res.json/(await UserModel.findOne({}))
  const { username, email, password } = req.body

  if(!username || !email || !password) {
    res.status(400)
    throw new Error("Please add all fields")
  }

  //Check if user email exists
  const userEmailExists= await UserModel.findOne({email})

  if(userEmailExists) {
    res.status(409)
    throw new Error("Email already exists.")
  }
  //Check if username exists
  const usernameExists= await UserModel.findOne({username})

  if(usernameExists) {
    res.status(409)
    throw new Error("Username already exists.")
  }
  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Create User
  const user = await UserModel.create({
    username,
    email,
    password: hashedPassword,
    isAdmin: true
  })
  
  if(user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } 
  else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

// @desc    User Login
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const {username, password} = req.body

  // Check for username
  const user = await UserModel.findOne({ username })

  if(user && (await bcrypt.compare(password, user.password))) {
    res.status(202).json({
      // TOKEN MUST BE IN THE SAME OBJECT AS THE OTHER PROPERTIES
      _id: user._id,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  }
  else {
    res.status(400)
      throw new Error("Invalid credentials")
  }
})

// @desc    Get own user data
// @route   GET /api/users/profile/me
// @access  Private
const getProfile = asyncHandler(async(req, res) => {
  // const { _id, email, username,  } = await UserModel.findById(req.user.id)
  const {_id, email, username, booksOnLoan} = await UserModel.findById(req.user.id).populate("booksOnLoan")
  // res.send(await UserModel.findById(req.user.id)).populate("booksOnLoan")
  
  res.status(200).json({
    id: _id,
    username,
    email,
    booksOnLoan,
  })
})

// @desc    Get all users in the database
// @route   GET /api/users/
// @access  Admin Private
const getUsers = asyncHandler(async(req, res) => {
  const users = await UserModel.find()
  
  res.status(200).json(users)
})
// @desc    Get a single user's profile by their ID
// @route   GET /api/users/:id
// @access  Private
const getOneUser = asyncHandler(async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).populate("booksOnLoan")
    if (user) {
      // console.log(user)
      res.status(200).json(user)
    }
    // else {
    //   res.status(404).send({ error: 'Book copy not found with that ID'})
    // }
  }
  catch (err) {
    res.status(404).send({ error: "User not found with that ID" })
  }
  })


// @desc    Update own user profile
// @route   PUT /api/users/profile/
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // if(!bookDetails) {
  //   res.status(400)
  //   throw new Error('No book could be found with that id.')
  // } 
  const updatedUserProfile = await UserModel.findByIdAndUpdate(req.user.id, req.body, {
    new:true,
  })
  res.status(201).json(updatedUserProfile)

})

// @desc    Delete own profile
// @route   DELETE /api/users/profile/me
// @access  Private
const deleteProfile = asyncHandler(async(req, res) => {
  const deleteprofile = await UserModel.findById(req.body._id)
  await deleteprofile.remove()
  res.status(200).json({ message: `Your profile has been deleted from the database`})
})

// @desc    Delete a user's data
// @route   DELETE /api/users/:id
// @access  Admin Private
const deleteUser = asyncHandler(async(req, res) => {
  if (req.params.id.length !== 24){
    res.status(404)
    throw new Error(`${req.params.id} is not a valid user id.`)
  }
  const user = await UserModel.findById(req.params.id)
  if (!user) {
    res.status(404)
    throw new Error(`No user could be found with id${req.params.id}.`)
  }
  await user.remove()
  res.status(200).json({ message: `Deleted user: ${req.params.id}, from the database`})
})

// Get Auth Me
// @desc   Gets a users information if there is a token in the database, auth middleware prevents incorrect token
// @route   DELETE /api/users/auth
// @access  Admin Private
const getAuthMe = asyncHandler(async(req, res) => {
  res.json(req.user)
})


// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
    })
}

module.exports = { 
  registerUser,
  registerAdmin,
  loginUser,
  getProfile,
  getOneUser,
  getUsers,
  updateUserProfile,
  getAuthMe,
  deleteProfile,
  deleteUser,
}


