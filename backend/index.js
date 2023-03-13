require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path')

const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
  useTempFiles: true
}));
const BASE_URL = '/api'
app.use(`${BASE_URL}/user`, require('./routes/userRouter'));
app.use(`${BASE_URL}/grammar`, require('./routes/grammarRouter'));
app.use(`${BASE_URL}/listening`, require('./routes/listeningRouter'));
app.use(`${BASE_URL}/question`, require('./routes/questionRouter'));
app.use(`${BASE_URL}/quiz`, require('./routes/quizRouter'));
app.use(`${BASE_URL}/word`, require('./routes/wordRouter'));
app.use(`${BASE_URL}/common`, require('./routes/commonRouter'));
app.use(`${BASE_URL}/ipa`, require('./routes/ipaRouter'));
app.use(`${BASE_URL}/games`, require('./routes/gameRouter'));
app.use(`${BASE_URL}/highscore`, require('./routes/highScoreRouter'));
app.use(`${BASE_URL}/statistics`, require('./routes/statisticsRouter'));
app.use(`${BASE_URL}/test`, require('./routes/testRouter'));
app.use(`${BASE_URL}/fileTest`, require('./routes/fileTestRouter'));
app.use(`${BASE_URL}/questionTest`, require('./routes/questionTestRouter'));
app.use(`${BASE_URL}/answerTest`, require('./routes/answerTestRouter'));
app.use(`${BASE_URL}/submitTest`, require('./routes/submitTestRouter'));
app.use(`${BASE_URL}/score`, require('./routes/scoreRouter'));
//EXTRA routes
app.use(`${BASE_URL}/announcement`, require('./routes/Extras/announcementRouter'));
app.use(`${BASE_URL}/blog`, require('./routes/Extras/blogRouter'));
app.use(`${BASE_URL}/books`, require('./routes/Extras/booksRouter'));
app.use(`${BASE_URL}/comments`, require('./routes/Extras/commentRouter'));
app.use(`${BASE_URL}/events`, require('./routes/Extras/eventRouter'));
app.use(`${BASE_URL}/faq`, require('./routes/Extras/faqRouter'));
app.use(`${BASE_URL}/forum`, require('./routes/Extras/forumsRouter'));
app.use(`${BASE_URL}/job`, require('./routes/Extras/jobRouter'));
app.use(`${BASE_URL}/podcast`, require('./routes/Extras/podcastRouter'));
app.use(`${BASE_URL}/stories`, require('./routes/Extras/storiesRouter'));




const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) throw err;
  console.log("Connected to mongodb");
})


if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static("public"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
