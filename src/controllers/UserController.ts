import { Request, Response } from 'express'
import { UserAuth, UserAuthDocument } from '../models/UserAuth'
import bcrypt from 'bcrypt'

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    const existingUser = await UserAuth.findOne({ username })

    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await UserAuth.create({
      username: username,
      password: hashedPassword,
    })

    res.status(201).json(newUser)
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ message: 'Failed to create user' })
  }
}

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserAuth.find()
    // res.status(200).json(users)
    res.send(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

// Get user by ID

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params
  const { password } = req.body
  console.log(req.body)

  try {
    const user = await UserAuth.findById(id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Compare the provided password with the hashed password stored in the database
    console.log(password, user.password)
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    // If password matches, send the user data
    res.send(user)
  } catch (error) {
    console.error('Error fetching user:', error)
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
