import Grid from "@material-ui/core/Grid";
import communicateIcon from "assets/icons/communicate.png";
import dictionaryIcon from "assets/icons/dictionary.png";
import editIcon from "assets/icons/edit.png";
import favoriteIcon from "assets/icons/favorite.png";
import flashcardIcon from "assets/icons/flashcard.png";
import friendsIcon from "assets/icons/friends.png";
import gameIcon from "assets/icons/game.png";
import grammarIcon from "assets/icons/grammar.png";
import ipaIcon from "assets/icons/ipa.png";
import toeicIcon from "assets/icons/toeic.png";
import verbIcon from "assets/icons/verb.png";
import medalIcon from "assets/icons/medal.png";
import NavigationAdminBox from "components/NavigationAdminBox";
import { ROUTES } from "constants/index";
import useScrollTop from "hooks/useScrollTop";
import useTitle from "hooks/useTitle";
import React from "react";
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles(() => ({
  sidebar: {
    minHeight: "100vh",
    position: "fixed",
    left: 0,
    top: "72px",
    zIndex: 999,
    backgroundColor: 'var(--bg-color-accent)'
  }
}))

const FEATURE_LIST = [
  {
    title: "Word",
    subTitle: "Manage all vocabulary in the system",
    imgUrl: flashcardIcon,
    to: ROUTES.WORD_ADMIN,
  },
  {
    title: "Listening",
    subTitle: "Manage all listening tracks in the system",
    imgUrl: communicateIcon,
    to: ROUTES.LISTENING_ADMIN,
  },
  {
    title: "Quiz",
    subTitle: "Manage quizzes in the listening section",
    imgUrl: toeicIcon,
    to: ROUTES.QUIZ_ADMIN,
  },
  {
    title: "Grammar",
    imgUrl: grammarIcon,
    subTitle: "Manage all grammar in the system",
    to: ROUTES.GRAMMAR_ADMIN,
  },
  {
    title: "Users",
    imgUrl: friendsIcon,
    subTitle: "Manage all user accounts in the system",
    to: ROUTES.USER_ADMIN,
  },
  //---EXTRAS-----
  {
    title: "Announcement",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.ANNOUNCEMENTS_ADMIN,
  },
  {
    title: "Blog",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.BLOG_ADMIN,
  },
    {
    title: "Books",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.BOOKS,
  },
  {
    title: "Comments",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.COMMENTS,
  },
    {
    title: "Events",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.EVENTS,
  },
  {
    title: "FAQ",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.FAQ,
  },
  {
    title: "Forum",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.FORUM,
  },
  {
    title: "Jobs",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.JOBS,
  },
  {
    title: "Notes",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.NOTES,
  },
    {
    title: "Podcast",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.PODCAST,
  },
  {
    title: "Stories",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.STORIES,
  },
    {
    title: "Word Of the Day",
    imgUrl: friendsIcon,
    subTitle: "",
    to: ROUTES.WORDOFTHEDAY,
  },
];

function Sidebar() {
  useTitle("Admin");
  const classes = useStyle();

  return (
    <div className="container">
      <div className={classes.sidebar}>
      {FEATURE_LIST.map((box, index) => (
        <NavigationAdminBox
          key={index}
          imgUrl={box.imgUrl}
          title={box.title}
          to={box.to}
        />
      ))}
      </div>
    </div>
  );
}

export default Sidebar;
