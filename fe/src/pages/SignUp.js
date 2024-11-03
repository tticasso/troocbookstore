import React, { useState } from 'react';
import { UilEnvelopeAlt, UilLock, UilUser, UilPhone } from '@iconscout/react-unicons';
import Login_Image from '../assets/login_Image.png';
import axios from 'axios';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const validateInput = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/;
        const phoneRegex = /^0\d{9}$/;

        if (!emailRegex.test(email)) {
            setMessage('Email không hợp lệ.');
            return false;
        }

        if (!passwordRegex.test(password)) {
            setMessage('Mật khẩu phải chứa ít nhất 6 ký tự, bao gồm ít nhất một chữ cái và một số, không có khoảng trắng và tối đa 15 ký tự.');
            return false;
        }

        const formattedFullname = fullname.trim().replace(/\s+/g, ' ');
        if (formattedFullname.length > 15) {
            setMessage('Họ và tên tối đa 15 ký tự.');
            return false;
        }
        setFullname(formattedFullname);

        if (!phoneRegex.test(phone)) {
            setMessage('Số điện thoại phải bắt đầu bằng số 0 và gồm đúng 10 chữ số.');
            return false;
        }

        setMessage('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateInput()) return;

        const userData = {
            email,
            password,
            full_name: fullname,
            phone_number: phone
        };

        try {
            const response = await axios.post('http://localhost:9999/api/user/signup', userData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                window.alert('Sign up successful!');
                window.location.href = '/login';
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Sign up failed. Please try again.';
            setMessage(errorMessage);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="m-auto bg-white rounded-lg shadow-md flex">
                <div className="w-1/2 p-6">
                    <img
                        src={Login_Image}
                        alt="Book Cover"
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>
                <div className="w-1/2 p-6">
                    <h2 className="text-3xl font-bold text-[#01A268] text-center">TroocBookstore</h2>
                    <h2 className="text-3xl font-bold text-[#01A268] mb-6 text-center">Sign Up</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[#01A268]">Email</label>
                            <div className="mt-1 relative rounded-[20px] border-2 border-[#01A268]">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UilEnvelopeAlt className="h-5 w-5 text-[#01A268]" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    className="focus:ring-0 focus:border-[#01A268] focus:outline-none outline-none block w-full pl-10 sm:text-sm border-[#01A268] rounded-[20px] p-2"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        
                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-[#01A268]">Password</label>
                            <div className="mt-1 relative rounded-[20px] border-2 border-[#01A268]">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UilLock className="h-5 w-5 text-[#01A268]" />
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    className="focus:ring-0 focus:border-[#01A268] focus:outline-none outline-none block w-full pl-10 sm:text-sm border-[#01A268] rounded-[20px] p-2"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Full Name Field */}
                        <div>
                            <label htmlFor="fullname" className="block text-sm font-medium text-[#01A268]">Full name</label>
                            <div className="mt-1 relative rounded-[20px] border-2 border-[#01A268]">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UilUser className="h-5 w-5 text-[#01A268]" />
                                </div>
                                <input
                                    type="text"
                                    id="fullname"
                                    className="focus:ring-0 focus:border-[#01A268] focus:outline-none outline-none block w-full pl-10 sm:text-sm border-[#01A268] rounded-[20px] p-2"
                                    placeholder="Enter your full name"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone Field */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-[#01A268]">Phone</label>
                            <div className="mt-1 relative rounded-[20px] border-2 border-[#01A268]">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UilPhone className="h-5 w-5 text-[#01A268]" />
                                </div>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="focus:ring-0 focus:border-[#01A268] focus:outline-none outline-none block w-full pl-10 sm:text-sm border-[#01A268] rounded-[20px] p-2"
                                    placeholder="Enter your phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-center items-center">
                            <button
                                type="submit"
                                className="w-2/5 flex justify-center py-2 px-4 border border-transparent rounded-[20px] shadow-sm text-sm font-medium text-white bg-[#01A268] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                    {message && <div className="mt-4 text-center text-red-500">{message}</div>}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-[#01A268]">
                            Already have an account?{' '}
                            <a href="/login" className="font-medium text-green-700 hover:text-green-500">
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
