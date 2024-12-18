import { User } from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { STATUS_CODES, MESSAGES } from '../constants/response.constants.js'

export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query

    const users = await User.find({ isActive: true })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    const totalUsers = await User.countDocuments()

    if (!users.length) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        ok: false,
        msg: MESSAGES.USERS_NOT_FOUND
      })
    }

    res.status(STATUS_CODES.OK).json({
      ok: true,
      msg: MESSAGES.USERS_FETCHED,
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: Number(page)
    })
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: MESSAGES.ERROR_FETCHING_USERS,
      error: error.message
    })
  }
}

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params

    const user = await User.findById(id)

    if (!user) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        ok: false,
        msg: MESSAGES.USER_NOT_FOUND
      })
    }

    res.status(STATUS_CODES.OK).json({
      ok: true,
      msg: MESSAGES.USER_FETCHED,
      user
    })
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: MESSAGES.ERROR_FETCHING_USER,
      error: error.message
    })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, password, age } = req.body

    const updateData = {}
    if (name) updateData.name = name
    if (email) updateData.email = email
    if (password) {
      const salt = bcryptjs.genSaltSync()
      updateData.password = bcryptjs.hashSync(password, salt)
    }
    if (age) updateData.age = age

    const user = await User.findByIdAndUpdate(id, updateData, { new: true })

    if (!user) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        ok: false,
        msg: MESSAGES.USER_NOT_FOUND
      })
    }

    res.status(STATUS_CODES.OK).json({
      ok: true,
      msg: MESSAGES.USER_UPDATED,
      user
    })
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: MESSAGES.ERROR_UPDATING_USER,
      error: error.message
    })
  }
}

export const deactivateUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)

    if (!user) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        ok: false,
        msg: MESSAGES.USER_NOT_FOUND
      })
    }

    if (!user.isActive) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        ok: false,
        msg: MESSAGES.USER_ALREADY_INACTIVE
      })
    }

    const updatedUser = await User.findByIdAndUpdate(id, { isActive: false }, { new: true })

    res.status(STATUS_CODES.OK).json({
      ok: true,
      msg: MESSAGES.USER_DEACTIVATED,
      user: updatedUser
    })
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: MESSAGES.ERROR_DEACTIVATING_USER,
      error: error.message
    })
  }
}

export const activateUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)

    if (!user) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        ok: false,
        msg: MESSAGES.USER_NOT_FOUND
      })
    }

    if (user.isActive) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        ok: false,
        msg: MESSAGES.USER_ALREADY_ACTIVE
      })
    }

    const updatedUser = await User.findByIdAndUpdate(id, { isActive: true }, { new: true })

    res.status(STATUS_CODES.OK).json({
      ok: true,
      msg: MESSAGES.USER_ACTIVATED,
      user: updatedUser
    })
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: MESSAGES.ERROR_ACTIVATING_USER,
      error: error.message
    })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndDelete(id)

    if (!user) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        ok: false,
        msg: MESSAGES.USER_NOT_FOUND
      })
    }

    res.status(STATUS_CODES.OK).json({
      ok: true,
      msg: MESSAGES.USER_DELETED,
      user
    })
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: MESSAGES.ERROR_DELETING_USER,
      error: error.message
    })
  }
}
