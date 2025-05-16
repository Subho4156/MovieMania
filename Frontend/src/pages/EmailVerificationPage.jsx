import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authUser';
import toast from 'react-hot-toast';

const EmailVerificationPage = () => {

  const [code, setCode]= useState(["", "", "", "", "", ""]);
  const inputRefs= useRef([]);
  const navigate= useNavigate();

  const { isLoading, verifyEmail}= useAuthStore();

  const handleChange= (index, value)=> {
    const newCode= [...code];

    if (value.length > 1) {
       const pastedCode = value.slice(0, 6).split("");
		for (let i = 0; i < 6; i++) {
			newCode[i] = pastedCode[i] || "";
		}
		setCode(newCode); 
        const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
		const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
		inputRefs.current[focusIndex].focus();

    } else {
        newCode[index] = value;
		setCode(newCode);
		if (value && index < 5) {
			inputRefs.current[index + 1].focus();
		}
        
    }
  }

  const handleKeyDown= (index, e)=> {
    if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
	}
  };

  const handleSubmit= async(e)=> {
    e.preventDefault();
    const verificationCode= code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
      toast.success("Email Verified Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
	if (code.every((digit) => digit !== "")) {
		handleSubmit(new Event("submit"));
	}
	}, [code]);


  return (
    <div>
      <div className="min-h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 sm:p-4">
        <img src="/netflix-logo.png" alt="logo" className='w-36 sm:w-52' />
      </header>

      <div className='flex justify-center items-center mt-10 sm:mt-20 px-4'>
        <div className='w-full max-w-md p-6 sm:p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
        <h1 className='text-center text-white text-xl sm:text-2xl font-bold mb-4'>Verify Your Email</h1>
        <p className='text-center text-gray-300 text-sm sm:text-base mb-6'>Enter the 6-digit code sent to your email address</p>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div className='flex justify-between space-x-2 sm:space-x-3'>
            {code.map((digit, index)=>(
                <input key={index} ref={(el)=> (inputRefs.current[index]= el)}
                 type='text' maxLength='6' value={digit} 
                 onChange={(e)=> handleChange(index, e.target.value)} onKeyDown={(e) => handleKeyDown(index, e)}
                 className='w-10 h-12 sm:w-12 text-center text-xl sm:text-2xl font-bold bg-gray-700 text-white border-2 border-gray-500 rounded-lg focus:border-red-500 focus:outline-none'
                />
            ))}
          </div>

          <button className='w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-red-500 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-50' type='submit'
           disabled={isLoading || code.some((digit) => !digit)}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default EmailVerificationPage
