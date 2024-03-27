import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Register from "./components/Users/Register/Register";
import Login from "./components/Users/Login/Login";
import Navbar from "./components/Navigation/Navbar";
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/categoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import { PrivateProtectRoute } from "./components/Navigation/ProtectedRoutes/PrivateProtectRoute";
import { AdminRoute } from "./components/Navigation/ProtectedRoutes/AdminRoute";
import CreatePost from "./components/Posts/CreatePost";
import PostsList from "./components/Posts/PostsList";
import PostDetails from "./components/Posts/PostDetails";
import UpdatePost from "./components/Posts/UpdatePost";
import UpdateComment from "./components/Comments/UpdateComment";
import Profile from "./components/Users/Profile/Profile";
import UploadProfilePhoto from "./components/Users/Profile/UploadProfilePhoto";
import UpdateProfileForm from "./components/Users/Profile/UpdateProfileForm";
import SendEmail from "./components/Users/Emailing/SendEmail";
import AccountVerified from "./components/Users/AccountVerification/AccountVerified";
import UsersList from "./components/Users/UsersList/UsersList";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/posts" element={<PostsList />} />
        <Route exact path="/posts/:id" element={<PostDetails />} />
        <Route
          exact
          path="/update-category/:id"
          element={<AdminRoute exact component={UpdateCategory} />}
        />

        <Route
          exact
          path="/category-list"
          element={<AdminRoute component={CategoryList} />}
        />
        <Route
          exact
          path="/add-category"
          element={<AdminRoute component={AddNewCategory} />}
        />
        <Route
          exact
          path="/users"
          element={<AdminRoute component={UsersList} />}
        />
        {/* {Posts} */}
        <Route
          exact
          path="/create-post"
          element={<PrivateProtectRoute component={CreatePost} />}
        />
        <Route
          exact
          path="/update-post/:id"
          element={<PrivateProtectRoute component={UpdatePost} />}
        />
        <Route
          exact
          path="/update-comment/:id"
          element={<PrivateProtectRoute component={UpdateComment} />}
        />
        <Route
          exact
          path="/profile/:id"
          element={<PrivateProtectRoute component={Profile} />}
        />
        <Route
          exact
          path="/upload-profile-photo/"
          element={<PrivateProtectRoute component={UploadProfilePhoto} />}
        />
        <Route
          exact
          path="/update-profile/:id"
          element={<PrivateProtectRoute component={UpdateProfileForm} />}
        />
        <Route
          exact
          path="/send-email"
          element={<PrivateProtectRoute component={SendEmail} />}
        />
        <Route
          exact
          path="/verify-account/:token"
          element={<PrivateProtectRoute component={AccountVerified} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
