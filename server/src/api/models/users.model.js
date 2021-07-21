import * as mongoose from 'mongoose'

export const UserModelName = 'User'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
},{ timestamps: true })

export const Users = mongoose.model(UserModelName, UserSchema)
