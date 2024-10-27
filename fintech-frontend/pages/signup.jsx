import React, { useState } from 'react';
import axios from 'axios';
import { FaFacebookF, FaLinkedin, FaGoogle, FaRegEnvelope, FaUser } from 'react-icons/fa';
import { MdLockOutline } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password meets minimum length requirement
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.", {
        position: "top-right",
      });
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.", {
        position: "top-right",
      });
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/register`, {
        name,
        email,
        password,
      });

      toast.success("Registration successful!", {
        position: "top-right",
      });
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error("Registration failed. Please try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100"  
    style={{
      backgroundImage: "url('/fin.png')", 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
       }}>   
      <main className="flex flex-col items-center justify-center w-full flex-1 px-6 md:px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl">
          {/* Signup Form */}
          <div className="md:w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-green-500">Simbrella</span>ng
            </div>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-green-500 mb-2">Sign up</h2>
              <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
              <div className="flex justify-center my-2">
                <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaFacebookF className="text-sm" />
                </a>
                <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaLinkedin className="text-sm" />
                </a>
                <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaGoogle className="text-sm" />
                </a>
              </div>
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div className="bg-gray-100 w-full md:w-64 p-2 flex items-center mb-3">
                  <FaUser className="text-gray-400 m-2" />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    className="bg-gray-100 outline-none text-sm flex-1"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="bg-gray-100 w-full md:w-64 p-2 flex items-center mb-3">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="bg-gray-100 outline-none text-sm flex-1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="bg-gray-100 w-full md:w-64 p-2 flex items-center mb-3">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    className="bg-gray-100 outline-none text-sm flex-1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="bg-gray-100 w-full md:w-64 p-2 flex items-center mb-3">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    className="bg-gray-100 outline-none text-sm flex-1"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 font-semibold hover:bg-green-500 hover:text-white"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
          {/* Sidebar */}
          <div className="md:w-2/5 bg-green-500 text-white rounded-bl-2xl md:rounded-tr-2xl md:rounded-br-2xl py-12 px-12 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold mb-2">Hello, Customer!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">Fill up personal information and start your journey with us.</p>
            <a href="/login" className="border-2 border-white rounded-full px-12 py-2 font-semibold hover:bg-white hover:text-green-500">Sign In</a>
          </div>
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Signup;
