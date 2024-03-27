import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./Admin/AdminNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";
import AccountVerificationAlertWarning from "./Alerts/AccountVerificationAlertWarning";
import AccountVerificationSuccessAlert from "./Alerts/AccountVerificationSuccessAlert";
const Navbar = () => {
  //ge user from store
  const state = useSelector((state) => state.users);
  const { userAuth } = state;
  const isAdmin = userAuth?.isAdmin;
  const account = useSelector((state) => state.accountVerification);
  const { loading, appErr, serverErr, token } = account;
  return (
    <>
      {!userAuth ? (
        <PublicNavbar />
      ) : userAuth && isAdmin ? (
        <AdminNavbar isLogin={userAuth} />
      ) : (
        <PrivateNavbar isLogin={userAuth} />
      )}
      {/**Display Aleart */}
      {userAuth && !userAuth?.isVerified && <AccountVerificationAlertWarning />}
      {/* {Display SuccessMessage} */}
      {loading && <h2 className="text-center">Loading...</h2>}
      {token && <AccountVerificationSuccessAlert />}
      {appErr || serverErr ? (
        <h2 className="text-center text-red-500">
          {appErr}
          {serverErr}
        </h2>
      ) : null}
    </>
  );
};

export default Navbar;
