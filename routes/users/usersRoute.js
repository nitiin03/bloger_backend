const express = require("express");
const {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
  deleteUserCtrl,
  fetchUserDetailsCtrl,
  userProfileCtrl,
  updateUserCtrl,
  updateUserPasswordCtrl,
  followingUserCtrl,
  unFollowingUserCtrl,
  blockUserCtrl,
  unBlockUserCtrl,
  generateVerificationTokenCtrl,
  accountVerificationCtrl,
  forgetPasswordToken,
  passwordResetCtrl,
  profilePhotoUploadCtrl,
} = require("../../controllers/users/usersCtrl");
const authMiddleware = require("../../middleware/auth/authMiddleware");
const {
  photoUpload,
  profilePhotoResize,
} = require("../../middleware/uploads/photoUpload");

const userRoutes = express.Router();

userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.put(
  "/profilephoto-upload",
  authMiddleware,
  photoUpload.single("image"),
  profilePhotoResize,
  profilePhotoUploadCtrl
);
userRoutes.get("/", authMiddleware, fetchUsersCtrl);
// Password reset
userRoutes.post("/forget-password-token", forgetPasswordToken);
userRoutes.put("/reset-password", passwordResetCtrl);
userRoutes.put("/password", authMiddleware, updateUserPasswordCtrl);
userRoutes.put("/follow", authMiddleware, followingUserCtrl);
userRoutes.post(
  "/generate-verify-email-token",
  authMiddleware,
  generateVerificationTokenCtrl
);

userRoutes.put("/verify-account", authMiddleware, accountVerificationCtrl);
userRoutes.put("/unfollow", authMiddleware, unFollowingUserCtrl);
userRoutes.put("/block-user/:id", authMiddleware, blockUserCtrl);
userRoutes.put("/unblock-user/:id", authMiddleware, unBlockUserCtrl);
userRoutes.get("/profile/:id", authMiddleware, userProfileCtrl);
userRoutes.put("/", authMiddleware, updateUserCtrl);
userRoutes.delete("/:id", deleteUserCtrl);
userRoutes.get("/:id", fetchUserDetailsCtrl);

module.exports = userRoutes;
