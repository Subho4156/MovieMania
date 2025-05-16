import React from 'react'
import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';
import { useAuthStore } from '../../store/authUser';

const HomePage = () => {
  const {user}= useAuthStore();
  return (
    <>
      {user && user.isVerified? <HomeScreen/> : <AuthScreen/>}
    </>
  )
}

export default HomePage
