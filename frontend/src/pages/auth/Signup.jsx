import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import api from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


  const signUpSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  });


  const Signup = () => {
    const navigate = useNavigate();

    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm({
      resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data) => {
      try {
        const res = await api.post("/auth/signup", data);
        console.log("Sign-up successful:", res.data);
        toast.success("Sign-up successful");
        navigate("/signin");
      } catch (error) {
        toast.error("Sign-up failed: " + error.response.data.message);
        console.error("Sign-up error:", error);
      }
    };

    return (
      <div>
        <div className="flex flex-col md:flex-row h-screen font-sans">
          {/* Left Section */}
          <div className="relative flex-1 bg-[#003f62] text-white flex items-center justify-center p-8   overflow-hidden">
            {/* Abstract Shapes */}
            <div className="absolute top-10 left-10 w-16 h-16 bg-blue-300 opacity-50 rotate-45"></div>
            <div className="absolute bottom-120 right-17 w-25 h-20 rotate-18 bg-blue-300 opacity-50"></div>
            <div className="absolute -bottom-35 -left-35 w-100 h-100 bg-blue-300 opacity-50 rounded-full"></div>

            <div className="text-center z-10 text-gray-50">
              <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
              <p className="text-lg mb-6">
                To keep connected with us please login with your personal info
              </p>
              <button onClick={() => navigate("/signin")} className="border-2 border-white text-white cursor-pointer px-6 py-2 rounded-full hover:bg-white hover:text-blue-900 transition">
                SIGN IN
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 bg-white flex items-center justify-center p-8">
            <div className="w-full max-w-sm">
              <h2 className="text-4xl font-bold text-center text-yellow-400 mb-6">
                Create Account
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <div className="flex items-center bg-gray-100 p-3 rounded">
                    <svg
                      className="w-5 h-5 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Name"
                      {...register("name")}
                      className="bg-transparent w-full outline-none"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center bg-gray-100 p-3 rounded">
                    <svg
                      className="w-5 h-5 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v4a2 2 0 002 2h2m8 0v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6m8 0H8"
                      />
                    </svg>
                    <input
                      type="email"
                      placeholder="Email"
                      {...register("email")}
                      className="bg-transparent w-full outline-none"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center bg-gray-100 p-3 rounded">
                    <svg
                      className="w-5 h-5 text-gray-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 2c-2.209 0-4 1.791-4 4v1h8v-1c0-2.209-1.791-4-4-4z"
                      />
                    </svg>
                    <input
                      type="password"
                      placeholder="Password"
                      {...register("password")}
                      className="bg-transparent w-full outline-none"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full bg-yellow-400 text-white py-3 rounded-full mt-6 hover:bg-yellow-300"
                >
                  {isSubmitting ? "Signing Up..." : "SIGN UP"}
                </button>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      
    );
  };

export default Signup;
