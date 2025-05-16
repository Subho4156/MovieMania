import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import NotFoundPage from "./pages/NotFoundPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/forgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ActorDetailsPage from "./pages/ActorDetailsPage";
import WatchlistPage from "./pages/WatchlistPage";

function App() {
  const {user, isCheckingAuth, authCheck}= useAuthStore();
  console.log("auth user is here:", user);
  useEffect(()=> {
    authCheck();
  },[authCheck]);

  if(isCheckingAuth){
    return(
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10"/>
        </div>
      </div>
    )
  }
  
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={!user? <LoginPage/> : <Navigate to={"/"}/>} />
      <Route path='/signup' element={!user? <SignUpPage/> : <Navigate to={"/"}/>}/>
      <Route path='/verify-email' element={user && !user.isVerified ? <EmailVerificationPage /> : <Navigate to='/' />}/>
      <Route path='/forgot-password' element={!user? <ForgotPasswordPage /> : <Navigate to={"/"}/>} />
      <Route path='/watch/:contentType/:id' element={user?.isVerified ? <WatchPage/> : <Navigate to={"/login"}/>}/>
      <Route path='/actor/:id' element={user?.isVerified ? <ActorDetailsPage/> : <Navigate to={"/login"}/>}/>
      <Route path='/search' element={user?.isVerified ? <SearchPage/> : <Navigate to={"/login"}/>}/>
      <Route path='/dashboard' element={user?.isVerified ? <DashboardPage/> : <Navigate to={"/login"}/>}/>
      <Route path='/history' element={user?.isVerified ? <SearchHistoryPage/> : <Navigate to={"/login"}/>}/>
      <Route path='/watchlist' element={user?.isVerified ? <WatchlistPage/> : <Navigate to={"/login"}/>}/>
      <Route path='/*' element={<NotFoundPage/>}/>
      <Route path='/reset-password/:token' element={!user? <ResetPasswordPage/> : <Navigate to={"/"}/>}/>
    </Routes>
    <Footer />

    <Toaster/>
    </>
  )
}

export default App
