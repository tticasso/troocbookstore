import React, { useState } from 'react';
import { UilEnvelopeAlt, UilLock } from '@iconscout/react-unicons';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import Login_Image from '../assets/login_Image.png';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9999/api/user/login', {
                email,
                password
            });

            // Nếu đăng nhập thành công, lưu token, email và password vào localStorage
            const { token, userId, role } = response.data; // Lấy userId từ phản hồi
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId); // Lưu userId vào localStorage
            if (role === 'user') {
                navigate('/');
            } else {
                navigate('/admin');
            }

        } catch (error) {
            // Nếu đăng nhập không thành công, hiển thị thông báo lỗi
            if (error.response && error.response.data.message === 'Invalid credentials') {
                setErrorMessage('Sai email hoặc mật khẩu');
            } else {
                setErrorMessage('Email hoặc mật khẩu chưa chính xác. Vui lòng thử lại.');
            }
        }
    };

    const responseGoogle = async (googleResponse) => {
        try {
            const googleToken = googleResponse.credential;
            const response = await axios.post('http://localhost:9999/api/user/google-login', { googleToken });
            // Xử lý phản hồi từ backend, lưu token và chuyển hướng người dùng
            const { token, userId, role } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            if (role === 'user') {
                navigate('/');
            } else {
                navigate('/admin');
            }
        } catch (error) {
            console.error('Google login failed:', error);
            // Xử lý lỗi đăng nhập bằng Google
        }
    };

    return (
        <GoogleOAuthProvider clientId='744170020684-sb48bop877ccsgklqpp7tneihbb686o8.apps.googleusercontent.com'>
            <div className="flex h-screen bg-gray-100">
                <div className="m-auto bg-white rounded-lg shadow-md flex">
                    <div className="w-1/2 p-6">
                        <img
                            src={Login_Image}
                            alt="Login"
                            className="w-full h-auto object-cover rounded-lg"
                        />
                    </div>
                    <div className="w-1/2 p-6 mt-[100px]">
                        <h2 className="text-3xl font-bold text-[#01A268] text-center">TroocBookstore</h2>
                        <h2 className="text-3xl font-bold text-[#01A268] mb-6 text-center">Login</h2>
                        <form className="space-y-4" onSubmit={handleLogin}>
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
                                    />
                                </div>
                            </div>
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
                                    />
                                </div>
                            </div>

                            {/* Hiển thị thông báo lỗi nếu có */}
                            {errorMessage && (
                                <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                            )}

                            <div className="flex items-center justify-between">
                                <a href="#" className="text-sm text-green-600 hover:text-green-500">
                                    Forgot Password?
                                </a>
                            </div>
                            <div className='flex justify-center items-center'>
                                <button
                                    type="submit"
                                    className="w-2/5 flex justify-center py-2 px-4 border border-transparent rounded-[20px] shadow-sm text-sm font-medium text-white bg-[#01A268] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                        <div className="mt-6 text-center">
                            <p className="text-sm text-[#01A268]">
                                Don't have an account?{' '}
                                <a href="/signup" className="font-medium text-green-700 hover:text-green-500">
                                    Sign up
                                </a>
                            </p>
                        </div>
                        <div className='flex justify-center items-center text-center'>
                            <GoogleLogin
                                onSuccess={responseGoogle}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </div>

                    </div>

                </div>

            </div>
        </GoogleOAuthProvider>

    );
};

export default Login;
