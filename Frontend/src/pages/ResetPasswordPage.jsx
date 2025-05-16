import { useState } from "react"
import { useAuthStore } from "../store/authUser";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");

    const {resetPassword}= useAuthStore();
    const {token}= useParams()
    const navigate= useNavigate();

    const handleSubmit= async (e)=> {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error("Password do not match");
            return;
        }
        try {
            await resetPassword(token, password);
            toast.success("Password reset successfully, redirecting to login page...");
            setTimeout(()=> {
               navigate("/login");
            }, 2000);
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Error resetting password");
        }
    };

  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <img src="/netflix-logo.png" alt="logo" className='w-52' />
      </header>

      <div className='flex justify-center items-center mt-20 mx-3'>
        <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
        <h1 className='text-center text-white text-2xl font-bold mb-4'>Reset-Password</h1>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className='text-sm font-medium text-gray-300 block'>
              New Password
            </label>
            <input type="password" className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' placeholder='*******' id='NewPassword' 
             value={password} onChange={(e)=> setPassword(e.target.value)} required/>
          </div>

          <div>
            <label htmlFor="password" className='text-sm font-medium text-gray-300 block'>
              Confirm Password
            </label>
            <input type="password" className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' placeholder='*******' id='ConfirmPassword' 
             value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} required/>
          </div>

          <button className='w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 '>
            Login
          </button>
        </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage
