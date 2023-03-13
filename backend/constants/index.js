exports.ACCOUNT_TYPES = {
  LOCAL: 'local',
  GOOGLE: 'gg',
  FACEBOOK: 'fb',
};

exports.ROLE_TYPES = {
  ADMIN: "admin",
  INSTRUCTOR: "instructor",
  USER: "user",
}


exports.MAX = {
  SIZE_JSON_REQUEST: '25mb',
  EMAIL_LEN: 100,
  PASSWORD_LEN: 40,
  NAME_LEN: 50,
  USER_NAME: 110,
  LEN_WORD_PACK: 500,
  FAVORITES_LEN: 200,
  VERIFY_CODE: 6,
  USER_COIN: 999_999_999,
  VERIFY_TIME: 10 * 60 * 1000, // 10 minutes
};

exports.MIN = {
  PASSWORD_LEN: 6,
  CONFUSING_LIST: 20,
};

exports.DEFAULT = {
  USER_COIN: 100,
};

exports.NUM_OF_TOPICS = 30;

exports.NUM_OF_SPECIALTY = 30;
