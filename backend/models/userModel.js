const mongoose = require('mongoose');
const { ROLE_TYPES } = require('../constants');

const roleTypeEnum = (function () {
  let list = [];
  for (let k in ROLE_TYPES) {
    list.push(ROLE_TYPES[k]);
  }
  return list;
})();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://res.cloudinary.com/phongvn2611/image/upload/v1634179173/english/avatar/avatar-default_tx5lsb.png'
  },
  coin: {
    type: Number,
    required: true,
    default: 0,
  },
  roleType: {
    type: String,
    enum: roleTypeEnum,
    default: ROLE_TYPES.USER,
  },
  isLocked: {
    type: Number,
    default: 0
  },
  favoriteList: [String]
}, {
  timestamps: true
})

module.exports = mongoose.model('users', userSchema);
