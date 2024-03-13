import { Request, Response } from 'express'
import { UserAuth, UserAuthDocument } from '../models/UserAuth'

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await UserAuth.create(req.body)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' })
  }
}

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserAuth.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const user = await UserAuth.findById(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
}

// Update user by ID
export const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const updatedUser = await UserAuth.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' })
  }
}

// Delete user by ID
export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const deletedUser = await UserAuth.findByIdAndDelete(id)
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' })
  }
}
