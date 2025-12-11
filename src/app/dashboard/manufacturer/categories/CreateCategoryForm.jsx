import Modal from "react-modal";
import { Formik, Form } from "formik";
import Input from "@/app/components/Input";
import ErrorMessage from "@/app/components/ErrorMessage";
import * as yup from "yup";
import TextArea from "@/app/components/TextArea";
import { Typography, IconButton } from "../../../components/MaterialTailwind";
import Button from "@/app/components/Button";
import { createCategory } from "@/app/actions/product";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateCategoryForm = ({ open, setOpen }) => {
    const [submitting, setSubmitting] = useState(false);
    const initialValues = {
        name: "",
        description: "",
    }

    const validationSchema = yup.object({
        name: yup.string().required("This field is required"),
        description: yup.string().required("This field is required"),
    })

    const handleCreateCategory = async (values) => {

        setSubmitting(true);
        try {
            const response = await createCategory(values);
            const result = await response.json();
            if (response.ok) {

                toast("Category created successfully!")
                setSubmitting(false)
                setOpen(false)
            }

            else {

                setSubmitting(false)
                if (result?.message) {
                    toast.error(result?.message)
                }
                else {
                    toast.error("Oops, something went wrong")
                }

            }
        }

        catch (err) {
            console.log("error:", err)
            setSubmitting(false)
            if (err?.response?.data?.message) {
                toast.error(err?.response.data?.message)
            }
            else {
                toast.error("Oops, something went wrong")
            }
        }
    }

    return (
        <Modal isOpen={open}
            className="bg-[rgba(0,0,0,0.5)] w-full h-full flex items-center justify-center outline-none"

        >
            <div className="bg-white w-[90%] md:w-[80%] tabletland:w-[800px] lg:w-[900px] h-[80%] rounded-[5px] px-7 overflow-y-auto"
                style={{ boxShadow: "0px 1px 3px 0px #00000014" }}
            >
                <div className="flex flex-col tabletland:items-center">
                    <div className="w-full flex justify-end">
                        <IconButton variant="text" onClick={() => setOpen(false)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_228_65)">
                                    <rect width="24" height="24" rx="6" fill="#FEFEFE" />
                                    <path d="M6 18L18 6M6 6L18 18" stroke="#474935" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_228_65">
                                        <rect width="24" height="24" rx="6" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </IconButton>
                    </div>
                    <Typography className="font-crimsonText text-center text-[21px] leading-[32px] md:text-[32px] font-bold md:leading-[41px] text-[#474935]">
                        Create a
                        <span variant="" className="font-crimsonText text-[21px] leading-[32px] md:text-[32px] font-semibold md:leading-[41px] text-primary">
                            {" "}new {" "}
                        </span>
                        category
                    </Typography>
                    {/* Form section */}
                    <div className="mt-[23px] pb-[66px]">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleCreateCategory}
                        >
                            {
                                ({ values, errors, touched, handleBlur, handleChange, setFieldValue }) => (
                                    <Form className="flex bg-white flex-col space-y-[38px] w-full tabletland:w-[590px]">
                                        <div className="bg-background w-full rounded-[5px] px-[27px] pt-[39px] pb-[30px]">
                                            <div className="flex flex-col space-y-2 w-full mb-[35px]">
                                                <Input
                                                    label="Category Name"
                                                    Icon={
                                                        () => (
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M10.8747 18.6173V20.0873C10.8747 20.2523 10.6947 20.3498 10.5522 20.2673L8.45223 18.9998C8.38117 18.9551 8.32259 18.8931 8.28194 18.8197C8.24128 18.7463 8.21988 18.6637 8.21973 18.5798V17.1098C8.21973 16.9448 8.39973 16.8473 8.54223 16.9298L10.6422 18.1973C10.7847 18.2873 10.8747 18.4448 10.8747 18.6173Z" fill="#474935" fill-opacity="0.5" />
                                                                <path d="M12.6675 0.966796H12.6698L20.8605 5.9483C21.2782 6.20555 21.5325 6.6653 21.5325 7.1498V16.4798C21.5325 17.1818 21.171 17.8583 20.547 18.2318L12.6398 23.0363C12.4147 23.1749 12.1556 23.2483 11.8912 23.2483C11.6269 23.2483 11.3678 23.1749 11.1427 23.0363L3.23325 18.2303C2.93298 18.0473 2.68482 17.7902 2.51262 17.4837C2.34043 17.1771 2.24999 16.8314 2.25 16.4798V7.1498C2.25 6.6728 2.499 6.20405 2.931 5.9498L11.1292 0.962296C11.3618 0.822702 11.6281 0.749335 11.8994 0.750128C12.1706 0.750922 12.4365 0.825844 12.6683 0.966796M11.8958 2.2523L4.56225 6.71255L7.19475 8.3213L14.5372 3.85805L11.8958 2.2523ZM17.007 5.35955L9.65325 9.82355L11.9032 11.1975L19.332 6.77405L17.007 5.35955ZM3.75 16.4798C3.75 16.674 3.85275 16.8518 4.0125 16.9485L11.1473 21.2835V12.4943L8.82 11.073V12.414C8.82 12.594 8.625 12.699 8.475 12.6165L6.465 11.394C6.43285 11.3726 6.40646 11.3437 6.38815 11.3097C6.36984 11.2757 6.36017 11.2377 6.36 11.199V9.57005L3.75 7.97555V16.4798ZM19.77 16.9485L19.776 16.9455C19.8552 16.8964 19.9204 16.8276 19.9653 16.7459C20.0103 16.6642 20.0334 16.5723 20.0325 16.479V8.10155L12.6473 12.5003V21.2768L19.77 16.9485Z" fill="#474935" fill-opacity="0.5" />
                                                            </svg>
                                                        )
                                                    }
                                                    error={errors.name}
                                                    touched={touched.name}
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    name="name"
                                                    onBlur={handleBlur}
                                                    className="w-full bg-white"
                                                    placeholder="Category Name"
                                                    type="text"
                                                />
                                                <ErrorMessage error={errors.name} touched={touched.name} />
                                            </div>
                                            <div className="flex flex-col space-y-2 w-full">
                                                <TextArea
                                                    label="Description"
                                                    Icon={
                                                        () => (
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M3 18.75C3 18.5511 3.07902 18.3603 3.21967 18.2197C3.36032 18.079 3.55109 18 3.75 18H14.25C14.4489 18 14.6397 18.079 14.7803 18.2197C14.921 18.3603 15 18.5511 15 18.75C15 18.9489 14.921 19.1397 14.7803 19.2803C14.6397 19.421 14.4489 19.5 14.25 19.5H3.75C3.55109 19.5 3.36032 19.421 3.21967 19.2803C3.07902 19.1397 3 18.9489 3 18.75ZM3 14.25C3 14.0511 3.07902 13.8603 3.21967 13.7197C3.36032 13.579 3.55109 13.5 3.75 13.5H20.25C20.4489 13.5 20.6397 13.579 20.7803 13.7197C20.921 13.8603 21 14.0511 21 14.25C21 14.4489 20.921 14.6397 20.7803 14.7803C20.6397 14.921 20.4489 15 20.25 15H3.75C3.55109 15 3.36032 14.921 3.21967 14.7803C3.07902 14.6397 3 14.4489 3 14.25ZM3 9.75C3 9.55109 3.07902 9.36032 3.21967 9.21967C3.36032 9.07902 3.55109 9 3.75 9H20.25C20.4489 9 20.6397 9.07902 20.7803 9.21967C20.921 9.36032 21 9.55109 21 9.75C21 9.94891 20.921 10.1397 20.7803 10.2803C20.6397 10.421 20.4489 10.5 20.25 10.5H3.75C3.55109 10.5 3.36032 10.421 3.21967 10.2803C3.07902 10.1397 3 9.94891 3 9.75ZM9 5.25C9 5.05109 9.07902 4.86032 9.21967 4.71967C9.36032 4.57902 9.55109 4.5 9.75 4.5H20.25C20.4489 4.5 20.6397 4.57902 20.7803 4.71967C20.921 4.86032 21 5.05109 21 5.25C21 5.44891 20.921 5.63968 20.7803 5.78033C20.6397 5.92098 20.4489 6 20.25 6H9.75C9.55109 6 9.36032 5.92098 9.21967 5.78033C9.07902 5.63968 9 5.44891 9 5.25Z" fill="#474935" fill-opacity="0.5" />
                                                            </svg>
                                                        )
                                                    }
                                                    error={errors.description}
                                                    touched={touched.description}
                                                    value={values.description}
                                                    onChange={handleChange}
                                                    name="description"
                                                    onBlur={handleBlur}
                                                    className="w-full bg-white"
                                                    placeholder="Description"
                                                    type="text"

                                                />
                                                <ErrorMessage error={errors.description} touched={touched.description} />
                                            </div>
                                        </div>
                                        <div className="w-full flex ">
                                            <Button variant="filled" type="submit" className="w-full"
                                                loading={submitting}
                                            >
                                                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20.5 7.423V18.385C20.5 18.845 20.346 19.229 20.038 19.537C19.7293 19.8457 19.345 20 18.885 20H6.115C5.655 20 5.271 19.846 4.963 19.538C4.65433 19.2293 4.5 18.845 4.5 18.385V5.615C4.5 5.155 4.65433 4.771 4.963 4.463C5.271 4.15433 5.655 4 6.115 4H17.077L20.5 7.423ZM19.5 7.85L16.65 5H6.115C5.93567 5 5.78833 5.05767 5.673 5.173C5.55767 5.28833 5.5 5.43567 5.5 5.615V18.385C5.5 18.5643 5.55767 18.7117 5.673 18.827C5.78833 18.9423 5.93567 19 6.115 19H18.885C19.0643 19 19.2117 18.9423 19.327 18.827C19.4423 18.7117 19.5 18.5643 19.5 18.385V7.85ZM12.5 16.538C13.0513 16.538 13.5223 16.3427 13.913 15.952C14.3043 15.5607 14.5 15.0893 14.5 14.538C14.5 13.9867 14.3043 13.5157 13.913 13.125C13.5223 12.7337 13.0513 12.538 12.5 12.538C11.9487 12.538 11.4777 12.7337 11.087 13.125C10.6957 13.5163 10.5 13.9873 10.5 14.538C10.5 15.0887 10.6957 15.56 11.087 15.952C11.4777 16.3427 11.9487 16.538 12.5 16.538ZM7.27 9.77H14.692V6.77H7.27V9.77ZM5.5 7.85V19V5V7.85Z" fill="#FAFBFD" />
                                                </svg>
                                                Save
                                            </Button>
                                        </div>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                </div>
            </div>

        </Modal>
    )
}

export default CreateCategoryForm