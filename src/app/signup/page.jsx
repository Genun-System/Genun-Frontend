"use client"
import { Form, Formik } from "formik";

import * as yup from "yup";
import React, { useState, useEffect, Suspense } from "react"
import Input from "../components/Input";
import ErrorMessage from "../components/ErrorMessage";
import Select from "../components/Select";
import { Option } from "../components/MaterialTailwind";
import PasswordInput from "../components/PasswordInput";
import { useRouter, useSearchParams } from "next/navigation";
import { useAccount } from 'wagmi';
import Image from "next/image";
import { toast } from "react-toastify";
import { register, requestVerificationLink } from "../actions/auth";
import Link from "next/link";

const SignupContent = () => {
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

    const handleSignup = async (values) => {
        setSubmitting(true);

        try {
            const response = await register(values);
            if (response.ok) {
                requestVerificationLink({email:values.email})
                toast("Registration successful!")
                router.replace("/signup/success")
                setSubmitting(false)
                
            }

            else {
                const result = await response.json();
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

    const signupFormValidationSchema = yup.object({
        name: yup.string().required("This field is required"),
        email: yup.string().email("Invalid email format").required("This field is required"),
        password: yup.string().required("Password is required").min(3, "Password length must be minimum of six (6)"),
        confirmPassword: yup.string().required("Please confirm password")
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
        idNumber: yup.string().required("This field is required"),
        industry: yup.string().required("This field is required"),
        address: yup.string().required("This field is required"),
    })

    const formInitialValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        idNumber: "",
        industry: "",
        address: ""
    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center py-12 px-4">
            <div className="max-w-4xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-6">
                        <Image src="/genun.png" alt="Genun" width={96} height={96} className="h-20 md:h-24 w-auto hover:scale-105 transition-transform duration-300" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Create Your Account
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Join Genun and start your journey with blockchain authentication
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
                        onSubmit={handleSignup}
                        validationSchema={signupFormValidationSchema}
                        initialValues={formInitialValues}
                    >
                        {({ handleSubmit, handleBlur, handleChange, errors, values, touched, setFieldValue }) => (
                            <Form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Information */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-white font-medium text-sm">Full Name</label>
                                        <Input
                                            Icon={() => (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            )}
                                            error={errors.name}
                                            touched={touched.name}
                                            value={values.name}
                                            onChange={handleChange}
                                            name="name"
                                            onBlur={handleBlur}
                                            className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 rounded-lg"
                                            placeholder="Enter your full name"
                                        />
                                        <ErrorMessage error={errors.name} touched={touched.name} />
                                    </div>

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
                                </div>

                                {/* Password Fields */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-white font-medium text-sm">Password</label>
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
                                            placeholder="Create a password"
                                        />
                                        <ErrorMessage error={errors.password} touched={touched.password} />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-white font-medium text-sm">Confirm Password</label>
                                        <PasswordInput
                                            Icon={() => (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            )}
                                            error={errors.confirmPassword}
                                            touched={touched.confirmPassword}
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            name="confirmPassword"
                                            onBlur={handleBlur}
                                            className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 rounded-lg"
                                            placeholder="Confirm your password"
                                        />
                                        <ErrorMessage error={errors.confirmPassword} touched={touched.confirmPassword} />
                                    </div>
                                </div>

                                {/* Business Information */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-white font-medium text-sm">ID Number</label>
                                        <Input
                                            Icon={() => (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                                </svg>
                                            )}
                                            error={errors.idNumber}
                                            touched={touched.idNumber}
                                            value={values.idNumber}
                                            onChange={handleChange}
                                            name="idNumber"
                                            onBlur={handleBlur}
                                            className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 rounded-lg"
                                            placeholder="Enter your ID number"
                                        />
                                        <ErrorMessage error={errors.idNumber} touched={touched.idNumber} />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-white font-medium text-sm">Industry</label>
                                        <Select
                                            Icon={() => (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0H3m0 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            )}
                                            error={errors.industry}
                                            touched={touched.industry}
                                            value={values.industry}
                                            onChange={(value) => setFieldValue("industry", value)}
                                            name="industry"
                                            className="w-full bg-gray-700/50 border-gray-600 text-white rounded-lg"
                                        >
                                            <Option value="">Select your industry</Option>
                                            <Option value="f&b">Food and Beverages</Option>
                                            <Option value="drug">Pharmaceuticals</Option>
                                            <Option value="fashion">Fashion & Apparel</Option>
                                            <Option value="electronics">Electronics</Option>
                                            <Option value="automotive">Automotive</Option>
                                            <Option value="other">Other</Option>
                                        </Select>
                                        <ErrorMessage error={errors.industry} touched={touched.industry} />
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="space-y-2">
                                    <label className="text-white font-medium text-sm">Business Address</label>
                                    <Input
                                        Icon={() => (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        )}
                                        error={errors.address}
                                        touched={touched.address}
                                        value={values.address}
                                        onChange={handleChange}
                                        name="address"
                                        onBlur={handleBlur}
                                        className="w-full bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 rounded-lg"
                                        placeholder="Enter your business address"
                                    />
                                    <ErrorMessage error={errors.address} touched={touched.address} />
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
                                                Creating Account...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                                </svg>
                                                Create Account
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Login Link */}
                                <div className="text-center pt-4 border-t border-gray-700">
                                    <p className="text-gray-400">
                                        Already have an account?{" "}
                                        <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                            Sign in here
                                        </Link>
                                    </p>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    )
}

const Signup = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-white">Loading...</div>
        </div>}>
            <SignupContent />
        </Suspense>
    );
};

export default Signup;