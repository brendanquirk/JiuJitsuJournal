import express from 'express'
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/UserController'

const router = express.Router()

// Create a new user
router.post('/', createUser)

// Get all users
router.get('/', getAllUsers)

// Get user by ID
router.get('/:id', getUserById)

// Update user by ID
router.put('/:id', updateUserById)

// Delete user by ID
router.delete('/:id', deleteUserById)

export default router
