"use client"
import { Form, Formik } from "formik";

import * as yup from "yup";
import React, { useState, useEffect, Suspense } from "react"
import Input from "../components/Input";
import ErrorMessage from "../components/ErrorMessage";
import PasswordInput from "../components/PasswordInput";
import { useRouter, useSearchParams } from "next/navigation";
import { useAccount } from 'wagmi';
import Image from "next/image";
import { login } from "../actions/auth";
import { toast } from "react-toastify";
import Link from "next/link";

const LoginContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isConnected, address } = useAccount();
    const [submitting, setSubmitting] = useState(false);
    const [isWalletConnected, setIsWalletConnected] = useState(false);

    useEffect(() => {
        const walletParam = searchParams.get('wallet');
        if (walletParam === 'connected' && isConnected) {
            setIsWalletConnected(true);
        }
    }, [searchParams, isConnected]);

    const handleLogin = async (values) => {
        setSubmitting(true);
        try {
            const response = await login(values);
            const result = await response.json();
            if (response.ok) {
                if (typeof window !== "undefined") {
                    localStorage.setItem("_poostoken_",result?.token)
                    localStorage.setItem("_isFirstLogin_",result?.isFirstLogin)
                }
                    toast("You have been logged in sucessfully!")
                router.replace("/dashboard/manufacturer")
                setSubmitting(false)
            }

            else {
                setSubmitting(false)
                if (result?.message) {
                    toast.error(result?.message)
                }
            }
        }

        catch (err) {
            console.log("error:", err)
            setSubmitting(false)
            if (err?.response?.data?.message) {
                toast.error(err?.response.data?.message)
            }
            console.log(err)
        }
    }

    const signinFormValidationSchema = yup.object({
        email: yup.string().email("Invalid email format").required("This field is required"),
        password: yup.string().required("Password is required")
    })

    const formInitialValues = {
        email: "",
        password: "",
    }

    return (
        <section className="min-h-screen flex items-center justify-center py-12 px-4">
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-6">
                        <Image src="/genun.png" alt="Genun" width={96} height={96} className="h-20 md:h-24 w-auto hover:scale-105 transition-transform duration-300" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Sign in to your Genun account
                    </p>
                    
                    {isWalletConnected && (
                        <div className="mt-6 flex justify-center">
                            <div className="flex items-center gap-3 px-6 py-3 bg-green-500/20 border border-green-500/30 rounded-xl backdrop-blur-sm">
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-green-400 font-medium">
                                    Wallet Connected: {address?.slice(0, 8)}...{address?.slice(-6)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Form Container */}
                <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
                    <Formik
                        onSubmit={handleLogin}
                        validationSchema={signinFormValidationSchema}
                        initialValues={formInitialValues}
                    >
                        {({ handleSubmit, handleBlur, handleChange, errors, values, touched }) => (
                            <Form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label className="text-white font-medium text-sm">Email Address</label>
                                    <Input
                                        Icon={() => (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        )}
                                        error={errors.email}
                                        touched={touched.email}
                                        value={values.email}
                                        onChange={handleChange}
                                        name="email"
                                        onBlur={handleBlur}
                                        className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 rounded-lg"
                                        placeholder="Enter your email"
                                        type="email"
                                    />
                                    <ErrorMessage error={errors.email} touched={touched.email} />
                                </div>

                                {/* Password Field */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-white font-medium text-sm">Password</label>
                                        <Link href="/forgot-password" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <PasswordInput
                                        Icon={() => (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        )}
                                        error={errors.password}
                                        touched={touched.password}
                                        value={values.password}
                                        onChange={handleChange}
                                        name="password"
                                        onBlur={handleBlur}
                                        className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 rounded-lg"
                                        placeholder="Enter your password"
                                    />
                                    <ErrorMessage error={errors.password} touched={touched.password} />
                                </div>

                                {/* Remember Me */}
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                                        Remember me for 30 days
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:scale-100 flex items-center justify-center gap-3 shadow-lg hover:shadow-blue-500/25"
                                    >
                                        {submitting ? (
                                            <>
                                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Signing In...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                                </svg>
                                                Sign In
                                            </>
                                        )}
                                    </button>
                                </div>



                                {/* Sign Up Link */}
                                <div className="text-center pt-4 border-t border-gray-700">
                                    <p className="text-gray-400">
                                        Don&apos;t have an account?{" "}
                                        <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                            Create one here
                                        </Link>
                                    </p>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </div>
        </section>
    )
}

const Login = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-white">Loading...</div>
        </div>}>
            <LoginContent />
        </Suspense>
    );
};

export default Login;