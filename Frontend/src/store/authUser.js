import axios from 'axios';
import toast from 'react-hot-toast';
import {create} from 'zustand';

export const useAuthStore= create((set)=> ({
    user: null,
    isAuthenticated:false,
    isCheckingAuth:true,
    isLoading:false,
    error:null,
    message: null,

    signup: async (credentials)=> {
        set({isLoading:true, error:null})
        try {
          const response = await axios.post("/api/v1/auth/signup", credentials);
          set({user:response.data.user,isAuthenticated:true, isLoading:false});
          toast.success("Signup successful");
        } catch (error) {
          toast.error(error.response.data.message || "An error occurred") 
          set({isLoading:false, user:null})
        }
    },
    verifyEmail: async (code)=> {
      set({isLoading: true, error:null});
      try {
        const response = await axios.post("/api/v1/auth/verify-email", {code});
        set({user:response.data.user, isAuthenticated:true, isLoading:false});
        return response.data;
      } catch (error) {
        toast.error(error.response.data.message || "An error occurred") 
        set({isLoading:false })
      }
    },
    login: async (credentials)=> {
      set({isLoading:true, error:null})
      try {
        const response= await axios.post("/api/v1/auth/login", credentials);
        set({user:response.data.user, isAuthenticated:true, error: null, isLoading:false});
        toast.success("Logged in successfully");
      } catch (error) {
        toast.error(error.response.data.message || "An error occurred")
        set({isLoading:false, user:null})
      }
    },
    logout: async ()=> {
      set({isLoading:true, error: null});
      try {
        await axios.post("/api/v1/auth/logout");
        set({user:null, isAuthenticated: false, error:null, isLoading: false});
        toast.success("Logged Out Successfully");
      } catch (error) {
        toast.error(error.response.data.message || "An error occurred") 
        set({isLoading:false})
      }
    },
    authCheck: async ()=> {
        set({isCheckingAuth: true, error:null});
        try {
          const response= await axios.get("/api/v1/auth/authCheck");
          set({user: response.data.user, isAuthenticated:true, isCheckingAuth:false})  
        } catch (error) {
            set({isCheckingAuth: false, user: null, error:null}); 
            toast.error(error.response.data.message || "An error occurred"); 
        }
    },
    forgotPassword: async (email)=> {
      set({isLoading: true, error: null, message: null});
      try {
        const response= await axios.post('/api/v1/auth/forgot-password', {email});
        set({message: response.data.message, isLoading: false});
      } catch (error) {
        set({isLoading: false});
        toast.error(error.response.data.message || "An error occurred");
      }
    },
    resetPassword: async(token,password) => {
      set({isLoading: true, error:null, message:null})
      try {
        const response= await axios.post(`/api/v1/auth/reset-password/${token}`, {password});
        set({message: response.data.message, isLoading: false});
      } catch (error) {
        set({isLoading: false});
        toast.error(error.response.data.message || "An error occurred");
      }
    }
}))