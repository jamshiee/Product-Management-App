import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import useStore from "../../store/useStore";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios";


const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const Signin = () => {
  const { setUser, setToken } = useStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/signin", data);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      setUser(JSON.stringify(res.data.user));
      setToken(res.data.token);

      alert("Sign-in successful");
      console.log("Sign-in successful:", res.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row h-screen font-sans">
        {/* Left Section */}
        <div className="flex-1 bg-white flex items-center justify-center p-8">
          <div className="w-full max-w-sm">
            <h2 className="text-4xl font-bold text-center text-yellow-400 mb-6">
              Sign In to <br /> Your Account
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  className="bg-transparent w-full outline-none"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

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
                  className="bg-transparent w-full outline-none"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-yellow-400 text-white py-3 rounded-full mt-6 hover:bg-yellow-300 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "SIGN IN"}
              </button>
            </form>
          </div>
        </div>

        <div className="relative flex-1 bg-[#003f62] text-white flex items-center justify-center p-8 overflow-hidden">
          <div className="absolute top-10 left-10 w-16 h-16 bg-blue-300 opacity-50 rotate-45"></div>
          <div className="absolute bottom-120 right-17 w-25 h-20 rotate-18 bg-blue-300 opacity-50"></div>
          <div className="absolute -bottom-35 -left-35 w-100 h-100 bg-blue-300 opacity-50 rounded-full"></div>

          <div className="text-center z-10 text-gray-50">
            <h1 className="text-4xl font-bold mb-4">Hello Friend!</h1>
            <p className="text-lg mb-6">
              Enter your personal details and start your journey with us
            </p>
            <button className="border-2 border-white text-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-900 transition">
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
