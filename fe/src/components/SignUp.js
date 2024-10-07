import React from 'react';
import { UilEnvelopeAlt, UilLock, UilUser, UilPhone } from '@iconscout/react-unicons';
import Login_Image from '../assets/login_Image.png';

const SignUp = () => {
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
                <div className="w-1/2 p-6 ">
                    <h2 className="text-3xl font-bold text-[#01A268] text-center">TroocBookstore</h2>
                    <h2 className="text-3xl font-bold text-[#01A268] mb-6 text-center">Login</h2>
                    <form className="space-y-4">
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
                                />
                            </div>

                        </div>
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
                                />
                            </div>

                        </div>
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
                                />
                            </div>

                        </div>
                        <div className='flex justify-center items-center'>
                            <button
                                type="submit"
                                className="w-2/5 flex justify-center py-2 px-4 border border-transparent rounded-[20px] shadow-sm text-sm font-medium text-white bg-[#01A268] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-[#01A268]">
                            Already have account?{' '}
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