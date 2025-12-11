"use client"
import { Form, Formik } from "formik";
import Button from "../components/Button";
import { Typography } from "../components/MaterialTailwind"
import * as yup from "yup";
import React, { useState } from "react"
import Input from "@/app/components/Input";
import ErrorMessage from "@/app/components/ErrorMessage";
import PasswordInput from "../components/PasswordInput";
import { useRouter } from "next/navigation";
import { login } from "../actions/auth";
import { toast } from "react-toastify";

const Login = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

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
        <section className="py-24">
            <div className="mb-[61px]">
                <Typography className="font-crimsonText text-center text-[21px] leading-[32px] md:text-[32px] font-semibold md:leading-[41px] text-[#474935]">
                    Login
                    <span variant="" className="font-crimsonText text-[21px] leading-[32px] md:text-[32px] font-semibold md:leading-[41px] text-primary">
                        {" "}In
                    </span>
                </Typography>
            </div>
            <div className="px-[30px] md:px-0">
                <Formik
                    onSubmit={handleLogin}
                    validationSchema={signinFormValidationSchema}
                    initialValues={formInitialValues}
                >
                    {({ handleSubmit, handleBlur, handleChange, errors, values, touched, setFieldValue }) => (
                        <Form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-center w-full  md:w-[325px] space-y-[35px]"
                        >
                            <div className="flex flex-col space-y-2 w-full ">
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
                            <div className="flex flex-col space-y-2 w-full">
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
                            <Button className="w-full md:w-[325px]" variant="filled"
                                type="submit" loading={submitting}
                            >
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.5 3.423V14.385C16.5 14.845 16.346 15.229 16.038 15.537C15.7293 15.8457 15.345 16 14.885 16H2.115C1.655 16 1.271 15.846 0.963 15.538C0.654333 15.2293 0.5 14.845 0.5 14.385V1.615C0.5 1.155 0.654333 0.771 0.963 0.463C1.271 0.154333 1.655 0 2.115 0H13.077L16.5 3.423ZM15.5 3.85L12.65 1H2.115C1.93567 1 1.78833 1.05767 1.673 1.173C1.55767 1.28833 1.5 1.43567 1.5 1.615V14.385C1.5 14.5643 1.55767 14.7117 1.673 14.827C1.78833 14.9423 1.93567 15 2.115 15H14.885C15.0643 15 15.2117 14.9423 15.327 14.827C15.4423 14.7117 15.5 14.5643 15.5 14.385V3.85ZM8.5 12.538C9.05133 12.538 9.52233 12.3427 9.913 11.952C10.3043 11.5607 10.5 11.0893 10.5 10.538C10.5 9.98667 10.3043 9.51567 9.913 9.125C9.52233 8.73367 9.05133 8.538 8.5 8.538C7.94867 8.538 7.47767 8.73367 7.087 9.125C6.69567 9.51633 6.5 9.98733 6.5 10.538C6.5 11.0887 6.69567 11.56 7.087 11.952C7.47767 12.3427 7.94867 12.538 8.5 12.538ZM3.27 5.77H10.692V2.77H3.27V5.77ZM1.5 3.85V15V1V3.85Z" fill="#FAFBFD" />
                                </svg>
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    )
}

export default Login;
