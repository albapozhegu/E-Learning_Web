export const COLOR_VAR_KEYS = [
  { key: '--primary-color', label: 'Primary' },
  { key: '--secondary-color', label: 'Secondary' },
  { key: '--accent-color', label: 'Accent' },
  { key: '--bg-color-main', label: 'Background primary' },
  { key: '--bg-color-sec', label: 'Background secondary' },
  { key: '--bg-color-accent', label: 'Background accent' },
  { key: '--hover-color', label: 'Hover color' },
  { key: '--title-color', label: 'Title' },
  { key: '--text-color', label: 'Text' },
  { key: '--phonetic-color', label: 'Phonetic' },
];

export const COINS = {
  CORRECT_GAME_PER_QUES: 10,
};

export const DEFAULTS = {
  VOICE_URI: 'Google US English',
  VOICE_SPEED: 1,
  VOICE_VOLUME: 1,
  IMAGE_SRC:
    'https://res.cloudinary.com/dynonary/image/upload/v1625136714/dynonary/default-image.png',
};

export const MAX = {
  EMAIL_LEN: 100,
  PASSWORD_LEN: 40,
  NAME_LEN: 50,
  USERNAME_LEN: 110,
  SEARCH_LEN: 50,
  WORD_LEN: 50,
  PHONETIC_LEN: 50,
  MEAN_WORD_LEN: 100,
  EXAMPLE_WORD_LEN: 250,
  SYNONYMS_WORD_LEN: 100,
  NOTE_WORD_LEN: 100,
  IMG_SIZE: 2, // 2 MB
  SENTENCE_LEN: 200,
  SENTENCE_MEAN_LEN: 300,
  SENTENCE_NOTE_LEN: 100,
  USER_COIN: 99999,
  VERIFY_CODE: 6,
};

export const MIN = {
  PASSWORD_LEN: 6,
};

export const ROUTES = {
  WELCOME: '/',
  HOME: '/home',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  ACTIVATION_EMAIL: '/user/activate/:activation_token',
  RESET_PASSWORD: '/user/reset/:access_token',
  PROFILE: '/user/profile',
  LOGOUT: '/logout',
  LISTENING: '/listening/details/:id',
  IPA_LIST: '/ipa',
  IPA_DETAIL: '/ipa/details/:id',
  WORD_TOPIC: '/word',
  GAME: '/game',
  VOCABULARY: '/word/:topic',
  GRAMMAR: '/grammar/details/:id',
  LISTENING_BY_TOPIC: '/listening/topic/:topic',
  LISTENING_TOPICS: '/listening/topic',
  GRAMMAR_LEVELS: '/grammar/level',
  GRAMMAR_BY_LEVEL: '/grammar/level/:level',
  TEST: '/test',
  START_TEST: '/test/:id',

  GAMES_HOME: '/games',
  GAMES_CORRECT_WORD: '/games/correct-word',
  GAMES_CORRECT_WORD_ADV: '/games/correct-word-advance',
  GAMES_MILLIONAIRE: '/games/who-is-a-millionaire',
  GAMES_JIGSAW: '/games/jigsaw-puzzle',
  GAMES_FAST_GAME: '/games/fast-game',
  GAMES_WORD_MATCHING: '/games/word-match',
  GAMES_GRAMMARLY: '/games/grammarly',
  GAMES_VIP: '/games/vip',
  LEADERBOARD: '/leaderboard',
  DICTIONARY: '/dictionary',

  ADMIN: '/admin',
  GRAMMAR_ADMIN: '/admin/grammar',
  LISTENING_ADMIN: '/admin/listening',
  LISTENING_DETAIL: '/admin/listening/details/:id',
  QUIZ_ADMIN: '/admin/quiz',
  WORD_ADMIN: '/admin/word',
  USER_ADMIN: '/admin/user',
  ADD_WORD: '/admin/word/add',
  EDIT_WORD: '/admin/word/edit/:id',
  USER_DETAIL: '/admin/user/detail/:user_id',
  ADD_LISTEN: '/admin/listening/add',
  GRAMMAR_ADMIN: '/admin/grammar',
  GRAMMAR_DETAIL: '/admin/grammar/details/:id',
  CREATE_GRAMMAR: '/admin/grammar/add',
  EDIT_LISTEN: '/admin/listening/edit/:id',
  EDIT_GRAMMAR: '/admin/grammar/edit/:id',
  ADD_USER: '/admin/user/add',
  EDIT_USER: '/admin/user/edit/:user_id',
  CREATE_QUESTION: '/admin/quiz/add/:id/:quiz_id',
  QUIZ_DETAIL: '/admin/quiz/details/:id',
  EDIT_QUESTION: '/admin/quiz/edit/:listen_id/:id',
  //-------------------------------EXTRAS=---------
  ANNOUNCEMENTS_ADMIN: '/admin/announcements',
  BLOG_ADMIN: '/admin/blogs',
  BOOKS: '/admin/books',
  COMMENTS:'/admin/comments',
  EVENTS:'/admin/events',
  FAQ:'/admin/faqs',
  FORUM:'/admin/forums',
  JOBS:'/admin/jobs',
  NOTES:'/admin/notes',
  PODCAST:'/admin/podcasts',
  STORIES:'/admin/stories',
  WORDOFTHEDAY:'/admin/wordoftheday',
}

export const UX = {
  DELAY_TIME: 1500,
  DELAY_ANSWER: 3000,
};

export const REGEX = {
  NAME: /^[^\d~`!@#$%^&*\(\)\\\|\.,\?\/\-\+\=\_]+$/gi,
};

export const THEME_KEYS = {
  ROOT_KEY: 'data-theme',
  LS_KEY: 'theme',
  PALETTE_KEY: 'palettes',
  LIGHT: 'light',
  DARK: 'dark',
  CUSTOM: 'custom',
};


export const VOICE_KEYS = {
  LS_KEY: 'voice',
};

export const WORD_TYPES = [
  {
    value: 'n',
    label: 'Noun - Danh từ',
  },
  {
    value: 'adj',
    label: 'Adjective - Tính từ',
  },
  {
    value: 'adv',
    label: 'Adverb - Trạng từ',
  },
  {
    value: 'v',
    label: 'Verb - Động từ',
  },
  {
    value: 'pro',
    label: 'Pronoun - Đại từ',
  },
  {
    value: 'con',
    label: 'Conjunction - Liên từ',
  },
  {
    value: 'pre',
    label: 'Preposition - Giới từ',
  },
  {
    value: 'det',
    label: 'Determiners - Hạn định từ',
  },
];

export const WORD_LEVELS = [
  {
    value: '0',
    label: 'Chưa xác định',
  },
  {
    value: 'A1',
    label: 'A1',
  },
  {
    value: 'A2',
    label: 'A2',
  },
  {
    value: 'B1',
    label: 'B1',
  },
  {
    value: 'B2',
    label: 'B2',
  },
  {
    value: 'C1',
    label: 'C1',
  },
  {
    value: 'C2',
    label: 'C2',
  },
];

export const WORD_SPECIALTY = [
  { value: '0', label: 'Subjects' },
  { value: '1', label: 'Biotechnology' },
  { value: '6', label: 'Information Technology' },
  { value: '14', label: 'Food Technology' },
  { value: '20', label: 'Entertainment' },
  { value: '3', label: 'Economics' },
  { value: '2', label: 'Accounting' },
  { value: '8', label: 'Chemical Engineering' },
  { value: '19', label: 'Fine Arts Industry' },
  { value: '12', label: 'Marketing' },
  { value: '18', label: 'Hotel Management' },
  { value: '7', label: 'Business Adminstration' },
  { value: '5', label: 'Human Resource Management' },
  { value: '13', label: 'Design UI/UX' },
  { value: '4', label: 'International Trade' },
  { value: '10', label: 'E-Commerce' },
  { value: '9', label: 'Business English' },
  { value: '11', label: 'Finance & Banking' },
  { value: '16', label: 'Culturology' },
  { value: '17', label: 'Construction Industry' },
  { value: '15', label: 'Sociology' },
];

export const SORT_TYPE = [
  { value: 'Newest', label: 'Newest' },
  { value: 'Oldest', label: 'Oldest' },
];

export const ROLE_TYPE = [
  { value: 'admin', label: 'Admin'},
  { value: 'instructor', label: 'Instructor'},
  { value: 'user', label: 'User' },
]

export const QUIZ_TYPE = [
  { value: 'Grammar', label: 'Grammar' },
  { value: 'Listen', label: 'Listen' },
];

