"use client"
import { Form, Formik } from "formik";
import Button from "../components/Button";
import { Typography } from "../components/MaterialTailwind"
import * as yup from "yup";
import React, { useState } from "react"
import Input from "@/app/components/Input";
import ErrorMessage from "@/app/components/ErrorMessage";
import Select from "@/app/components/Select";
import { Option } from "../components/MaterialTailwind";
import PasswordInput from "../components/PasswordInput";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { register, requestVerificationLink } from "../actions/auth";

const Signup = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

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
        <section className="py-24">
            <div className="mb-[61px]">
                <Typography className="font-crimsonText text-center text-[21px] leading-[32px] md:text-[32px] font-semibold md:leading-[41px] text-[#474935]">
                    We need a bit more
                    <span variant="" className="font-crimsonText text-[21px] leading-[32px] md:text-[32px] font-semibold md:leading-[41px] text-primary">
                        {" "}information
                    </span>
                </Typography>
            </div>
            <div className="px-[30px] md:px-0">
                <Formik
                    onSubmit={handleSignup}
                    validationSchema={signupFormValidationSchema}
                    initialValues={formInitialValues}
                >
                    {({ handleSubmit, handleBlur, handleChange, errors, values, touched, setFieldValue }) => (
                        <Form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-center w-full  tabletland:w-[750px]"
                        >
                            <div className="flex flex-col  tabletland:flex-row tabletland:items-center w-full space-y-[25px] tabletland:space-y-0 mb-[25px] tabletland:mb-[50px] tabletland:space-x-[100px]">
                                <div className="flex flex-col space-y-2 tabletland:w-[calc(100%/2-50px)]">
                                    <Input
                                        label="Name"
                                        Icon={
                                            () => (
                                                <svg width="22" height="24" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12.6034 12.9486H13.1528C13.0445 13.5841 13.1301 14.0729 13.3286 14.4423C13.585 14.9193 13.9789 15.1016 14.1334 15.1521L14.2889 14.6769L14.1317 15.1516C15.7125 15.675 17.3759 16.4252 18.633 17.2832C19.2618 17.7125 19.7707 18.1564 20.1179 18.5968C20.4659 19.0382 20.6261 19.4428 20.6261 19.8065V20.5551C20.6261 21.0478 20.4005 21.4618 19.9284 21.8302C19.4413 22.2102 18.7128 22.5208 17.7858 22.7605C15.9361 23.2388 13.4638 23.3938 11.0295 23.3938C8.59906 23.3938 6.11138 23.2388 4.24537 22.7602C3.31015 22.5204 2.57313 22.2094 2.07969 21.8286C1.60096 21.4591 1.37378 21.0452 1.37378 20.5551V19.8065C1.37378 19.4604 1.53059 19.0665 1.87651 18.6288C2.22082 18.1932 2.72432 17.7507 3.34306 17.3198C4.57968 16.4586 6.20391 15.6934 7.71212 15.148L7.71421 15.1473C7.89838 15.0798 8.32262 14.8566 8.61537 14.3895C8.92752 13.8915 9.04276 13.1917 8.6979 12.2871L8.66081 12.1898L8.58795 12.1154C7.15333 10.6503 6.06209 8.25927 6.06209 5.92246C6.06209 4.14145 6.64776 2.83249 7.53155 1.96883C8.41915 1.10144 9.64749 0.643997 11.0009 0.643997C12.3533 0.643997 13.585 1.10169 14.476 1.96972C15.3631 2.83384 15.9516 4.14276 15.9516 5.92246C15.9516 8.24741 14.8551 10.6295 13.4271 12.1003L12.6034 12.9486Z" stroke={`${errors.name && touched.name ? "#FF647C" : "#474935"}`} stroke-opacity="0.5" />
                                                </svg>
                                            )
                                        }
                                        error={errors.name}
                                        touched={touched.name}
                                        value={values.name}
                                        onChange={handleChange}
                                        name="name"
                                        onBlur={handleBlur}
                                        className="w-full"
                                        placeholder="Name"
                                        autocomplete="street-address"
                                    />
                                    <ErrorMessage error={errors.name} touched={touched.name} />
                                </div>
                                <div className="flex flex-col space-y-2 tabletland:w-[calc(100%/2-50px)]">
                                    <Input
                                        label="Email"
                                        Icon={
                                            () => (
                                                <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20 0.5H2C1.60218 0.5 1.22064 0.658035 0.93934 0.93934C0.658035 1.22064 0.5 1.60218 0.5 2V14C0.5 14.3978 0.658035 14.7794 0.93934 15.0607C1.22064 15.342 1.60218 15.5 2 15.5H20C20.3978 15.5 20.7794 15.342 21.0607 15.0607C21.342 14.7794 21.5 14.3978 21.5 14V2C21.5 1.60218 21.342 1.22064 21.0607 0.93934C20.7794 0.658035 20.3978 0.5 20 0.5ZM18.35 2L11 7.085L3.65 2H18.35ZM2 14V2.6825L10.5725 8.615C10.698 8.7021 10.8472 8.74877 11 8.74877C11.1528 8.74877 11.302 8.7021 11.4275 8.615L20 2.6825V14H2Z" fill={`${errors.email && touched.email ? "#FF647C" : "#474935"}`} fill-opacity="0.5" />
                                                </svg>

                                            )
                                        }
                                        error={errors.email}
                                        touched={touched.email}
                                        value={values.email}
                                        onChange={handleChange}
                                        name="email"
                                        onBlur={handleBlur}
                                        className="w-full"
                                        placeholder="Email"
                                        type="email"
                                        autocomplete="email"
                                    />
                                    <ErrorMessage error={errors.email} touched={touched.email} />
                                </div>
                            </div>
                            <div className="flex flex-col  tabletland:flex-row tabletland:items-center w-full space-y-[25px] tabletland:space-y-0 mb-[25px] tabletland:mb-[50px] tabletland:space-x-[100px]">
                                <div className="flex flex-col space-y-2 tabletland:w-[calc(100%/2-50px)]">
                                    <PasswordInput
                                        label="Password"
                                        Icon={
                                            () => (
                                                <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14 9.5H12.5V5C12.5 3.80653 12.0259 2.66193 11.182 1.81802C10.3381 0.974106 9.19347 0.5 8 0.5C6.80653 0.5 5.66193 0.974106 4.81802 1.81802C3.97411 2.66193 3.5 3.80653 3.5 5V9.5H2C1.60218 9.5 1.22064 9.65804 0.93934 9.93934C0.658035 10.2206 0.5 10.6022 0.5 11V20C0.5 20.3978 0.658035 20.7794 0.93934 21.0607C1.22064 21.342 1.60218 21.5 2 21.5H14C14.3978 21.5 14.7794 21.342 15.0607 21.0607C15.342 20.7794 15.5 20.3978 15.5 20V11C15.5 10.6022 15.342 10.2206 15.0607 9.93934C14.7794 9.65804 14.3978 9.5 14 9.5ZM5 5C5 4.20435 5.31607 3.44129 5.87868 2.87868C6.44129 2.31607 7.20435 2 8 2C8.79565 2 9.55871 2.31607 10.1213 2.87868C10.6839 3.44129 11 4.20435 11 5V9.5H5V5ZM14 20H2V11H14V20Z" fill={`${errors.password && touched.password ? "#FF647C" : "#474935"}`} />
                                                </svg>

                                            )
                                        }
                                        error={errors.password}
                                        touched={touched.password}
                                        value={values.password}
                                        onChange={handleChange}
                                        name="password"
                                        onBlur={handleBlur}
                                        className="w-full"
                                        placeholder="Password"
                                        autocomplete="new-password"
                                    />
                                    <ErrorMessage error={errors.password} touched={touched.password} />
                                </div>
                                <div className="flex flex-col space-y-2 tabletland:w-[calc(100%/2-50px)]">
                                    <PasswordInput
                                        label="Confirm Password"
                                        Icon={
                                            () => (
                                                <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14 9.5H12.5V5C12.5 3.80653 12.0259 2.66193 11.182 1.81802C10.3381 0.974106 9.19347 0.5 8 0.5C6.80653 0.5 5.66193 0.974106 4.81802 1.81802C3.97411 2.66193 3.5 3.80653 3.5 5V9.5H2C1.60218 9.5 1.22064 9.65804 0.93934 9.93934C0.658035 10.2206 0.5 10.6022 0.5 11V20C0.5 20.3978 0.658035 20.7794 0.93934 21.0607C1.22064 21.342 1.60218 21.5 2 21.5H14C14.3978 21.5 14.7794 21.342 15.0607 21.0607C15.342 20.7794 15.5 20.3978 15.5 20V11C15.5 10.6022 15.342 10.2206 15.0607 9.93934C14.7794 9.65804 14.3978 9.5 14 9.5ZM5 5C5 4.20435 5.31607 3.44129 5.87868 2.87868C6.44129 2.31607 7.20435 2 8 2C8.79565 2 9.55871 2.31607 10.1213 2.87868C10.6839 3.44129 11 4.20435 11 5V9.5H5V5ZM14 20H2V11H14V20Z" fill={`${errors.confirmPassword && touched.confirmPassword ? "#FF647C" : "#474935"}`} />
                                                </svg>
                                            )
                                        }
                                        error={errors.confirmPassword}
                                        touched={touched.confirmPassword}
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        name="confirmPassword"
                                        onBlur={handleBlur}
                                        className="w-full"
                                        placeholder="Confirm password"
                                    //type="password"
                                    />
                                    <ErrorMessage error={errors.confirmPassword} touched={touched.confirmPassword} />
                                </div>
                            </div>
                            <div className="flex flex-col  tabletland:flex-row tabletland:items-center w-full space-y-[25px] tabletland:space-y-0 mb-[25px] tabletland:mb-[50px] tabletland:space-x-[100px]">
                                <div className="flex flex-col space-y-2 tabletland:w-[calc(100%/2-50px)]">
                                    <Input
                                        label="ID Number"
                                        Icon={
                                            () => (
                                                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11.154 7.462H15.231V6.462H11.154V7.462ZM11.154 4.692H15.231V3.692H11.154V4.692ZM2.769 10.308H9.385V10.142C9.385 9.55867 9.09167 9.10733 8.505 8.788C7.91833 8.46867 7.109 8.30867 6.077 8.308C5.04367 8.308 4.234 8.468 3.648 8.788C3.062 9.108 2.769 9.55933 2.769 10.142V10.308ZM6.077 6.692C6.499 6.692 6.85433 6.54767 7.143 6.259C7.43233 5.96967 7.577 5.614 7.577 5.192C7.577 4.77067 7.43233 4.41533 7.143 4.126C6.85433 3.83667 6.499 3.692 6.077 3.692C5.655 3.692 5.29967 3.83667 5.011 4.126C4.72167 4.41533 4.577 4.77067 4.577 5.192C4.577 5.614 4.72167 5.96967 5.011 6.259C5.29967 6.54767 5.655 6.692 6.077 6.692ZM1.615 14C1.155 14 0.771 13.846 0.463 13.538C0.154333 13.2293 0 12.845 0 12.385V1.615C0 1.155 0.154333 0.771 0.463 0.463C0.771 0.154333 1.155 0 1.615 0H16.385C16.845 0 17.229 0.154333 17.537 0.463C17.8457 0.771 18 1.155 18 1.615V12.385C18 12.845 17.846 13.229 17.538 13.537C17.2293 13.8457 16.845 14 16.385 14H1.615ZM1.615 13H16.385C16.5383 13 16.6793 12.936 16.808 12.808C16.936 12.6793 17 12.5383 17 12.385V1.615C17 1.46167 16.936 1.32067 16.808 1.192C16.6793 1.064 16.5383 1 16.385 1H1.615C1.46167 1 1.32067 1.064 1.192 1.192C1.064 1.32067 1 1.46167 1 1.615V12.385C1 12.5383 1.064 12.6793 1.192 12.808C1.32067 12.936 1.46167 13 1.615 13Z" fill={`${errors.idNumber && touched.idNumber ? "#FF647C" : "#474935"}`} fill-opacity="0.5" />
                                                </svg>


                                            )
                                        }
                                        error={errors.idNumber}
                                        touched={touched.idNumber}
                                        value={values.idNumber}
                                        onChange={handleChange}
                                        name="idNumber"
                                        onBlur={handleBlur}
                                        className="w-full"
                                        placeholder="ID Number"
                                    />
                                    <ErrorMessage error={errors.idNumber} touched={touched.idNumber} />
                                </div>
                                <div className="flex flex-col space-y-2 tabletland:w-[calc(100%/2-50px)]">
                                    <Select
                                        label="Industry"
                                        Icon={
                                            () => (
                                                <svg width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 0V2.26L12 3.59V2H22V17H17V19H24V0H10ZM7.5 3L0 8V19H15V8L7.5 3ZM14 4V4.93L15.61 6H16V4H14ZM18 4V6H20V4H18ZM7.5 5.5L13 9V17H10V11H5V17H2V9L7.5 5.5ZM18 8V10H20V8H18ZM18 12V14H20V12H18Z" fill={`${errors.idNumber && touched.idNumber ? "#FF647C" : "#C0C0C0"}`} />
                                                </svg>
                                            )
                                        }
                                        error={errors.industry}
                                        touched={touched.industry}
                                        value={values.industry}
                                        onChange={(value) => setFieldValue("industry", value)}
                                        name="industry"
                                        onBlur={handleBlur}
                                        className="w-full"
                                    >
                                        <Option defaultChecked disabled>Industry</Option>
                                        <Option value="f&b">Food and Beverages</Option>
                                        <Option value="drug">Drugs</Option>
                                    </Select>
                                    <ErrorMessage error={errors.industry} touched={touched.industry} />
                                </div>
                            </div>
                            <div className="flex flex-col    w-full  mb-[25px] tabletland:mb-[50px] tabletland:space-x-[100px]">
                                <div className="flex flex-col space-y-2 tabletland:w-full">
                                    <Input
                                        label="Address"
                                        Icon={
                                            () => (
                                                <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.79906 14.35C5.87788 14.4092 5.96761 14.4524 6.06312 14.4769C6.15862 14.5014 6.25802 14.5069 6.35564 14.4929C6.45325 14.479 6.54716 14.446 6.63198 14.3957C6.71681 14.3454 6.7909 14.2789 6.85 14.2C7.30409 13.5945 7.89291 13.1031 8.56983 12.7647C9.24675 12.4262 9.99318 12.25 10.75 12.25C11.5068 12.25 12.2532 12.4262 12.9302 12.7647C13.6071 13.1031 14.1959 13.5945 14.65 14.2C14.7091 14.2788 14.7831 14.3452 14.8679 14.3954C14.9526 14.4455 15.0464 14.4785 15.1439 14.4925C15.2414 14.5064 15.3407 14.501 15.4361 14.4765C15.5315 14.4521 15.6212 14.4091 15.7 14.35C15.7788 14.2909 15.8452 14.2169 15.8954 14.1321C15.9455 14.0474 15.9785 13.9536 15.9925 13.8561C16.0064 13.7586 16.001 13.6593 15.9765 13.5639C15.9521 13.4685 15.9091 13.3788 15.85 13.3C15.1859 12.4096 14.3003 11.7086 13.2812 11.2666C13.8397 10.7567 14.231 10.0899 14.4037 9.35369C14.5764 8.61747 14.5225 7.84624 14.2491 7.14121C13.9756 6.43617 13.4954 5.83028 12.8715 5.40304C12.2476 4.9758 11.509 4.74718 10.7528 4.74718C9.99661 4.74718 9.25808 4.9758 8.63413 5.40304C8.01019 5.83028 7.52999 6.43617 7.25655 7.14121C6.98311 7.84624 6.92922 8.61747 7.10194 9.35369C7.27466 10.0899 7.66592 10.7567 8.22437 11.2666C7.20328 11.7077 6.31566 12.4088 5.65 13.3C5.53055 13.459 5.47915 13.659 5.50711 13.8559C5.53506 14.0528 5.64008 14.2305 5.79906 14.35ZM8.5 8.5C8.5 8.05499 8.63196 7.61998 8.87919 7.24997C9.12643 6.87996 9.47783 6.59157 9.88896 6.42127C10.3001 6.25097 10.7525 6.20642 11.189 6.29323C11.6254 6.38005 12.0263 6.59434 12.341 6.90901C12.6557 7.22368 12.87 7.62459 12.9568 8.06105C13.0436 8.4975 12.999 8.9499 12.8287 9.36104C12.6584 9.77217 12.37 10.1236 12 10.3708C11.63 10.618 11.195 10.75 10.75 10.75C10.1533 10.75 9.58097 10.5129 9.15901 10.091C8.73705 9.66903 8.5 9.09674 8.5 8.5ZM17.5 0.25H4C3.60218 0.25 3.22064 0.408035 2.93934 0.68934C2.65804 0.970644 2.5 1.35218 2.5 1.75V4H1C0.801088 4 0.610322 4.07902 0.46967 4.21967C0.329018 4.36032 0.25 4.55109 0.25 4.75C0.25 4.94891 0.329018 5.13968 0.46967 5.28033C0.610322 5.42098 0.801088 5.5 1 5.5H2.5V9.25H1C0.801088 9.25 0.610322 9.32902 0.46967 9.46967C0.329018 9.61032 0.25 9.80109 0.25 10C0.25 10.1989 0.329018 10.3897 0.46967 10.5303C0.610322 10.671 0.801088 10.75 1 10.75H2.5V14.5H1C0.801088 14.5 0.610322 14.579 0.46967 14.7197C0.329018 14.8603 0.25 15.0511 0.25 15.25C0.25 15.4489 0.329018 15.6397 0.46967 15.7803C0.610322 15.921 0.801088 16 1 16H2.5V18.25C2.5 18.6478 2.65804 19.0294 2.93934 19.3107C3.22064 19.592 3.60218 19.75 4 19.75H17.5C17.8978 19.75 18.2794 19.592 18.5607 19.3107C18.842 19.0294 19 18.6478 19 18.25V1.75C19 1.35218 18.842 0.970644 18.5607 0.68934C18.2794 0.408035 17.8978 0.25 17.5 0.25ZM17.5 18.25H4V1.75H17.5V18.25Z" fill={`${errors.address && touched.address ? "#FF647C" : "#474935"}`} fill-opacity="0.5" />
                                                </svg>
                                            )
                                        }
                                        error={errors.address}
                                        touched={touched.address}
                                        value={values.address}
                                        onChange={handleChange}
                                        name="address"
                                        onBlur={handleBlur}
                                        className="w-full"
                                        placeholder="Address"
                                        autocomplete="street-address"
                                    />
                                    <ErrorMessage error={errors.address} touched={touched.address} />
                                </div>

                            </div>

                            <Button className="w-full tabletland:w-[325px]" variant="filled"
                                type="submit" loading={submitting}
                            >
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.5 3.423V14.385C16.5 14.845 16.346 15.229 16.038 15.537C15.7293 15.8457 15.345 16 14.885 16H2.115C1.655 16 1.271 15.846 0.963 15.538C0.654333 15.2293 0.5 14.845 0.5 14.385V1.615C0.5 1.155 0.654333 0.771 0.963 0.463C1.271 0.154333 1.655 0 2.115 0H13.077L16.5 3.423ZM15.5 3.85L12.65 1H2.115C1.93567 1 1.78833 1.05767 1.673 1.173C1.55767 1.28833 1.5 1.43567 1.5 1.615V14.385C1.5 14.5643 1.55767 14.7117 1.673 14.827C1.78833 14.9423 1.93567 15 2.115 15H14.885C15.0643 15 15.2117 14.9423 15.327 14.827C15.4423 14.7117 15.5 14.5643 15.5 14.385V3.85ZM8.5 12.538C9.05133 12.538 9.52233 12.3427 9.913 11.952C10.3043 11.5607 10.5 11.0893 10.5 10.538C10.5 9.98667 10.3043 9.51567 9.913 9.125C9.52233 8.73367 9.05133 8.538 8.5 8.538C7.94867 8.538 7.47767 8.73367 7.087 9.125C6.69567 9.51633 6.5 9.98733 6.5 10.538C6.5 11.0887 6.69567 11.56 7.087 11.952C7.47767 12.3427 7.94867 12.538 8.5 12.538ZM3.27 5.77H10.692V2.77H3.27V5.77ZM1.5 3.85V15V1V3.85Z" fill="#FAFBFD" />
                                </svg>
                                Save
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    )
}

export default Signup;
