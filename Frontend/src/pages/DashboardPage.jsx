import { LogOut, Menu, Search } from 'lucide-react';
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser';
const DashboardPage = () => {
    const {user, logout}= useAuthStore();
    
  return (
    <div className='bg-black text-white min-h-screen hero-bg'>
      <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-2'>
        <div className='flex items-center gap-10 z-50'>
            <Link to="/">
            <img src="/netflix-logo.png" alt="Netflix Logo" className='w-32 sm:w-40'/>
            </Link>
        </div>

        <div className='flex gap-2 items-center z-50'>
            <Link to={"/dashboard"}>
             <img src={user.image} alt="Avatar" className='h-8 rounded cursor-pointer'/>
            </Link>
            <LogOut className='size-6 cursor-pointer' onClick={logout}/>

        </div>
      </header>
      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white rounded-2xl shadow-lg">
        <h1 className='text-2xl font-bold mb-4'>Account Details</h1>
        <div className="space-y-3">
            <div>
                <img src={user.image} alt="Avatar" className="mt-2 w-20 h-20 rounded-2xl object-cover border"/>
            </div>
            <div>
                <strong>Username:</strong> {user.username}
            </div>
            <div>
                <strong>Email:</strong> {user.email}
            </div>
            <div>
                <strong>Verified:</strong> {user.isVerified ? "Yes" : "No"}
            </div>
            <div>
                <strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleString()}
            </div>
            <div>
                <strong>Account Created:</strong> {new Date(user.createdAt).toLocaleString()}
            </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
