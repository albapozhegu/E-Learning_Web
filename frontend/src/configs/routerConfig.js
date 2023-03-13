import React,{lazy} from "react";
import { ROUTES } from "../constants";
import { Route } from "react-router";
import ActivationEmailPage from "../pages/ActivationEmail";
import ResetPasswordPage from "../pages/ResetPassword";
import LogoutPage from "../pages/Logout";
import WelcomePage from "../pages/Welcome";
import NotFoundPage from "../pages/NotFound";

const HomePage = React.lazy(() => import("../pages/Home"));
const RegisterPage = React.lazy(() => import("../pages/Register"));
const LoginPage = React.lazy(() => import("../pages/Login"));
const ForgotPasswordPage = React.lazy(() => import("../pages/ForgotPassword"));
const ProfilePage = React.lazy(() => import("../pages/Profile"));
const AdminPage = React.lazy(() => import("../pages/Admin"));
const GrammarAdminPage = React.lazy(() => import("../pages/GrammarAdmin"));
const ListeningAdminPage = React.lazy(() => import("../pages/ListeningAdmin"));
const QuizAdminPage = React.lazy(() => import("../pages/QuizAdmin"));
const WordAdminPage = React.lazy(() => import("../pages/WordAdmin"));
const UserAdminPage = React.lazy(() => import("../pages/UserAdmin"));
const ListeningPage = React.lazy(() => import("../pages/Listening"));
const ListeningDetailPage = React.lazy(() =>
  import("../pages/ListeningDetail")
);
const CreateWordPage = React.lazy(() => import("../pages/AddWord"));
const EditWordPage = React.lazy(() => import("../pages/EditWord"));
const IPAPage = React.lazy(() => import("../pages/IPA"));
const IPADetailPage = React.lazy(() => import("../components/IPA/DetailIPA"));
const UserDetailPage = React.lazy(() => import("../pages/UserDetail"));
const WordTopicPage = React.lazy(() => import("../pages/WordTopic"));
const VocabularyPage = React.lazy(() => import("../pages/Vocabulary"));
const CreateListeningPage = React.lazy(() =>
  import("../pages/CreateListening")
);
const GrammarPage = React.lazy(() => import("../pages/Grammar"));
const ListeningByTopicPage = React.lazy(() =>
  import("../pages/ListeningByTopic")
);
const ListeningTopicsPage = React.lazy(() =>
  import("../pages/ListeningTopics")
);
const GrammarByLevelPage = React.lazy(() => import("../pages/GrammarByLevel"));
const GrammarLevelsPage = React.lazy(() => import("../pages/GrammarLevels"));
const TestListPage = React.lazy(() => import("../pages/TestList"));
const StartTestPage = React.lazy(() => import("../pages/StartTest"));
const EditListeningPage = React.lazy(() => import("../pages/EditListening"));
const CreateGrammarPage = React.lazy(() => import("../pages/CreateGrammar"));
const EditGrammarPage = React.lazy(() => import("../pages/EditGrammar"));
const GrammarDetailPage = React.lazy(() => import("../pages/GrammarDetail"));
const AddUserPage = React.lazy(() => import("../pages/AddUser"));
const EditUserPage = React.lazy(() => import("../pages/EditUser"));
const CreateQuestionPage = React.lazy(() => import("../pages/CreateQuestion"));
const QuizDetailPage = React.lazy(() => import("../pages/QuizDetail"));
const CorrectWordPage = React.lazy(() => import('pages/PlayGames/CorrectWord'));
const WordMatchGamePage = React.lazy(() => import('pages/PlayGames/WordMatch'));
const FastGamePage = React.lazy(() => import('pages/PlayGames/FastGame'));
const PlayGamesPage = React.lazy(() => import('pages/PlayGames'));
const LeaderBoardPage = React.lazy(() => import('pages/LeaderBoard'));
const EditQuestionPage = React.lazy(() => import("../pages/EditQuestion"));

//-----------------EXTRAS--------
const AnnouncementAdmin = lazy(()=>import('../pages/Extras/Announcements'));
const BlogAdmin =lazy(()=>import('../pages/Extras/Blog'));
const Books =lazy(()=>import('../pages/Extras/Books'));
const Comments = lazy(()=> import('../pages/Extras/Comments'))
const Events = lazy(()=> import('../pages/Extras/Events'))
const FAQ = lazy(()=> import('../pages/Extras/FAQ'));
const Forums = lazy(()=> import('../pages/Extras/Forums'))
const Jobs = lazy(()=> import('../pages/Extras/Jobs'))
const Notes = lazy(()=> import('../pages/Extras/Notes'));
const Podcast = lazy(()=> import('../pages/Extras/Podcasts'))
const Stories = lazy(()=> import('../pages/Extras/Stories'))
const WOTD = lazy(()=> import('../pages/Extras/WordOfTheDay'));

const routes = [
  {
    path: ROUTES.WELCOME,
    exact: true,
    isProtect: false,
    component: () => <WelcomePage />,
    role: [],
  },
  {
    path: ROUTES.HOME,
    exact: true,
    isProtect: false,
    component: () => <HomePage />,
    role: [],
  },
  {
    path: ROUTES.LOGIN,
    exact: true,
    isProtect: false,
    component: () => <LoginPage />,
    role: [],
  },
  {
    path: ROUTES.REGISTER,
    exact: true,
    isProtect: false,
    component: () => <RegisterPage />,
    role: [],
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    exact: true,
    isProtect: false,
    component: () => <ForgotPasswordPage />,
    role: [],
  },
  {
    path: ROUTES.ACTIVATION_EMAIL,
    exact: true,
    isProtect: false,
    component: () => <ActivationEmailPage />,
    role: [],
  },
  {
    path: ROUTES.RESET_PASSWORD,
    exact: true,
    isProtect: false,
    component: () => <ResetPasswordPage />,
    role: [],
  },
  {
    path: ROUTES.PROFILE,
    exact: true,
    isProtect: true,
    component: () => <ProfilePage />,
    role: ["user", "instructor", "admin"],
  },
  {
    path: ROUTES.LOGOUT,
    exact: true,
    isProtect: false,
    component: () => <LogoutPage />,
    role: ["user", "instructor", "admin"],
  },
  {
    path: ROUTES.LISTENING,
    exact: true,
    isProtect: true,
    component: () => <ListeningPage />,
    role: ["user", "instructor", "admin"],
  },
  {
    path: ROUTES.IPA_LIST,
    exact: true,
    isProtect: true,
    component: () => <IPAPage />,
    role: ["user", "instructor", "admin"],
  },
  {
    path: ROUTES.IPA_DETAIL,
    exact: true,
    isProtect: true,
    component: () => <IPADetailPage />,
    role: ["user", "instructor", "admin"],
  },
  {
    path: ROUTES.WORD_TOPIC,
    exact: true,
    isProtect: true,
    component: () => <WordTopicPage />,
    role: ["user", "instructor", "admin"],
  },
  {
    path: ROUTES.VOCABULARY,
    exact: true,
    isProtect: true,
    component: () => <VocabularyPage />,
    role: ["user", "instructor", "admin"],
  },
  {
    path: ROUTES.GRAMMAR,
    exact: true,
    isProtect: true,
    component: () => <GrammarPage />,
    role: ["user", "instructor", "admin"],
  },
  {
    path: ROUTES.LISTENING_BY_TOPIC,
    exact: true,
    isProtect: true,
    component: () => <ListeningByTopicPage />,
    role: ["user", "instructor", "admin"],
  },
  {
    path: ROUTES.LISTENING_TOPICS,
    exact: true,
    isProtect: true,
    component: () => <ListeningTopicsPage />,
    role: ["user", "instructor", "admin"],
  },
  {
    path: ROUTES.GRAMMAR_BY_LEVEL,
    exact: true,
    isProtect: true,
    component: () => <GrammarByLevelPage />,
    role: ["user", "instructor", "admin"],
  },
  {
    path: ROUTES.GRAMMAR_LEVELS,
    exact: true,
    isProtect: true,
    component: () => <GrammarLevelsPage />,
    role: ["user", "instructor", "admin"],
  },
  {
    path: ROUTES.GAMES_HOME,
    exact: true,
    isProtect: true,
    component: () => <PlayGamesPage />,
    role: ["user", "instructor", "admin"]
  },
  {
    path: ROUTES.GAMES_CORRECT_WORD,
    exact: true,
    isProtect: true,
    component: () => <CorrectWordPage />,
    role: ["user", "instructor", "admin"]
  },
  {
    path: ROUTES.GAMES_WORD_MATCHING,
    exact: true,
    isProtect: true,
    component: () => <WordMatchGamePage />,
    role: ["user", "instructor", "admin"]
  },
  {
    path: ROUTES.GAMES_FAST_GAME,
    exact: true,
    isProtect: true,
    component: () => <FastGamePage />,
    role: ["user", "instructor", "admin"]
  },
  {
    path: ROUTES.LEADERBOARD,
    exact: true,
    isProtect: true,
    component: () => <LeaderBoardPage />,
    role: ["user", "instructor", "admin"]
  },
  {
    path: ROUTES.TEST,
    exact: true,
    isProtect: true,
    component: () => <TestListPage />,
    role: ["user", "instructor", "admin"]
  },
  {
    path: ROUTES.START_TEST,
    exact: true,
    isProtect: true,
    component: () => <StartTestPage />,
    role: ["user", "instructor", "admin"]
  },
];

const routesAdmin = [
  //EXTRAS
  {
    path: ROUTES.ANNOUNCEMENTS_ADMIN,
    exact: true,
    isProtect: true,
    component: () => <AnnouncementAdmin />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.BLOG_ADMIN,
    exact: true,
    isProtect: true,
    component: () => <BlogAdmin />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.BOOKS,
    exact: true,
    isProtect: true,
    component: () => <Books />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.COMMENTS,
    exact: true,
    isProtect: true,
    component: () => <Comments />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.EVENTS,
    exact: true,
    isProtect: true,
    component: () => <Events />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.FAQ,
    exact: true,
    isProtect: true,
    component: () => <FAQ />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.FORUM,
    exact: true,
    isProtect: true,
    component: () => <Forums />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.JOBS,
    exact: true,
    isProtect: true,
    component: () => <Jobs />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.NOTES,
    exact: true,
    isProtect: true,
    component: () => <Notes />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.PODCAST,
    exact: true,
    isProtect: true,
    component: () => <Podcast />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.STORIES,
    exact: true,
    isProtect: true,
    component: () => <Stories />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.WORDOFTHEDAY,
    exact: true,
    isProtect: true,
    component: () => <WOTD />,
    role: ["instructor", "admin"],
  },
  //--------------------------------------------------------------
  {
    path: ROUTES.ADMIN,
    exact: true,
    isProtect: true,
    component: () => <AdminPage />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.GRAMMAR_ADMIN,
    exact: true,
    isProtect: true,
    component: () => <GrammarAdminPage />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.LISTENING_ADMIN,
    exact: true,
    isProtect: true,
    component: () => <ListeningAdminPage />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.LISTENING_DETAIL,
    exact: true,
    isProtect: true,
    component: () => <ListeningDetailPage />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.QUIZ_ADMIN,
    exact: true,
    isProtect: true,
    component: () => <QuizAdminPage />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.WORD_ADMIN,
    exact: true,
    isProtect: true,
    component: () => <WordAdminPage />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.ADD_WORD,
    exact: true,
    isProtect: true,
    component: () => <CreateWordPage />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.EDIT_WORD,
    exact: true,
    isProtect: true,
    component: () => <EditWordPage />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.USER_ADMIN,
    exact: true,
    isProtect: true,
    component: () => <UserAdminPage />,
    role: ["admin"],
  },
  {
    path: ROUTES.USER_DETAIL,
    exact: true,
    isProtect: true,
    component: () => <UserDetailPage />,
    role: ["admin"],
  },
  {
    path: ROUTES.ADD_LISTEN,
    exact: true,
    isProtect: true,
    component: () => <CreateListeningPage />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.CREATE_GRAMMAR,
    exact: true,
    isProtect: true,
    component: () => <CreateGrammarPage />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.EDIT_LISTEN,
    exact: true,
    isProtect: true,
    component: () => <EditListeningPage />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.EDIT_GRAMMAR,
    exact: true,
    isProtect: true,
    component: () => <EditGrammarPage />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.GRAMMAR_DETAIL,
    exact: true,
    isProtect: true,
    component: () => <GrammarDetailPage />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.ADD_USER,
    exact: true,
    isProtect: true,
    component: () => <AddUserPage />,
    role: ["admin"],
  },
  {
    path: ROUTES.EDIT_USER,
    exact: true,
    isProtect: true,
    component: () => <EditUserPage />,
    role: ["admin"],
  },
  {
    path: ROUTES.CREATE_QUESTION,
    exact: true,
    isProtect: true,
    component: () => <CreateQuestionPage />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.QUIZ_DETAIL,
    exact: true,
    isProtect: true,
    component: () => <QuizDetailPage />,
    role: ["instructor", "admin"],
  },
  {
    path: ROUTES.EDIT_QUESTION,
    exact: true,
    isProtect: true,
    component: () => <EditQuestionPage />,
    role: ["instructor", "admin"],
  },
]


const renderRoutes = (routes, isAuth = false, roleType = "") => {
  return routes.map((route, index) => {
    const { path, exact, component, isProtect, role } = route;
    const loginComponent = () => <LoginPage />;
    const notfoundComponent = () => <NotFoundPage />;
    const componentRender = !isProtect
      ? component
      : isAuth
      ? role.includes(roleType)
        ? component
        : notfoundComponent
      : loginComponent;

    return (
      <Route
        path={path}
        exact={exact}
        key={index}
        component={componentRender}
      />
    );
  });
};

export default {
  routes,
  routesAdmin,
  renderRoutes,
};
