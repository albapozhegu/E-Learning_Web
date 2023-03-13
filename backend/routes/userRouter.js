const router = require("express").Router();
const userController = require("../controllers/userController");
const { authentication } = require("../middlewares/authenticationMiddleware");
const { uploadImage } = require("../middlewares/uploadImageMiddleware");
const { checkAdmin } = require("../middlewares/authorizationMiddleware");

router.post("/register", userController.register);
router.post("/activation", userController.activateEmail);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/refresh-token", userController.getAccessToken);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);
router.get("/get-user-info", authentication, userController.getUserInfo);
router.patch("/update-profile", authentication, userController.updateProfile);
router.post(
  "/update-avatar",
  authentication,
  uploadImage,
  userController.updateAvatar
);
router.post("/update-password", authentication, userController.updatePassword);
router.get(
  "/get-all-users",
  authentication,
  checkAdmin,
  userController.getAllUsers

);
router.get(
  "/get-user-details/:user_id",
  authentication,
  userController.getUserDetails
);
router.patch(
  "/lock-user/:user_id",
  authentication,
  checkAdmin,
  userController.lockUser
);
router.patch(
  "/unlock-user/:user_id",
  authentication,
  checkAdmin,
  userController.unlockUser
);
router.patch(
  "/delete-user/:user_id",
  authentication,
  checkAdmin,
  userController.deleteUser
);
router.post("/add-user", authentication, checkAdmin, userController.addUser);
router.post(
  "/edit-user/:user_id",
  authentication,
  checkAdmin,
  userController.editUser
);
router.put(
  '/update-coin',
  authentication,
  userController.putUpdateUserCoin,
);
router.get(
  "/get-top-coin",
  authentication,
 
  userController.getTopCoin
);
module.exports = router;
