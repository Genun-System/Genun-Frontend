import Modal from "react-modal";
import { Formik, Form } from "formik";
import Input from "@/app/components/Input";
import ErrorMessage from "@/app/components/ErrorMessage";
import * as yup from "yup";
import TextArea from "@/app/components/TextArea";
import DateInput from "@/app/components/DateInput";
import Select from "@/app/components/Select";
import ImagePicker from "@/app/components/ImagePicker";
import { Typography, IconButton, Option, Spinner } from "../../../components/MaterialTailwind";
import Button from "@/app/components/Button";
import { useContext, useEffect, useState } from "react";
import { createProduct, getCategories } from "@/app/actions/product";
import { toast } from "react-toastify";
import { userContext } from "@/app/context/User";
import { useWriteContract, useAccount } from "wagmi";
import abi from "@/app/utils/tokenAbi";
import QRCode from 'qrcode'
import Image from "next/image";
import { useRouter } from "next/navigation";

const CreateProductForm = ({ open, setOpen }) => {
    const [submitting, setSubmitting] = useState(false);
    const [fetchingCategories, setfetchingCategories] = useState(false);
    const [categories, setCategories] = useState([])
    const { user } = useContext(userContext);
    const { writeContract, isPending, reset } = useWriteContract()
    const { address, } = useAccount();
    const [qr, setQr] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            setfetchingCategories(true)
            try {
                const response = await getCategories();
                const result = await response.json();
                if (response.ok) {
                    console.log("cats:", result?.categories)
                    //router.replace("/dashboard/manufacturer")
                    setfetchingCategories(false)
                    setCategories(result?.categories)
                }

                else {

                    setfetchingCategories(false)
                    if (result?.message) {
                        toast.error(result?.message)
                    }

                }
            }

            catch (err) {
                console.log("error:", err)
                setfetchingCategories(false)
                if (err?.response?.data?.message) {
                    toast.error(err?.response.data?.message)
                }
                else {
                    toast.error("Oops, something went wrong")
                }
            }
        }

        fetchCategories()
    }, [])

    const initialValues = {
        name: "",
        description: "",
        barcode: "",
        quantity: 1,
        expiryDate: "",
        imageUrl: null,
        category: "",
        nadfacId: ""

    }

    const validationSchema = yup.object({
        name: yup.string().required("This field is required"),
        description: yup.string().required("This field is required"),
        quantity: yup.number().required("This field is required"),
        expiryDate: yup.string().required("This field is required"),
        imageUrl: yup.mixed().required("This field is required"),
        barcode: yup.string().required("This field is required"),
        category: yup.string().required("This field is required"),
        nafdacId: yup.string().required("This field is required"),
    })

    const handleCreateProduct = async (values) => {

        const updatedValues = {
            ...values, expiryDate: new Date(values.expiryDate).toISOString(),
            manufacturer: user?._id
        }

        const formData = new FormData();

        setSubmitting(true);

        for (let value in updatedValues) {
            formData.append(value, updatedValues[value])
        }

        try {
            const response = await createProduct(formData);
            const result = await response.json();
            if (response.ok) {

                writeContract(
                    {
                        abi,
                        address: user?.contractAddress,
                        functionName: 'mint',
                        args: [
                            address,
                            result?.product?.productId,
                            values?.quantity
                        ],
                    },
                    {
                        onSuccess: async (data) => {
                            toast("Your product have been created and minted as token  successfully!")
                            const url = await QRCode.toDataURL(`https://p-oos-frontend.vercel.app/product-verification/${result?.product?.productId}`)
                            setQr(url)
                            setSubmitting(false)
                            //setOpen(false)
                        },

                        onError: (err) => {
                            console.log("Error", err)
                            //setOpen(false)
                            toast.error("Oops! product token minting failed")
                        }
                    }
                )

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
            else {
                toast.error("Oops, something went wrong")
            }
        }
    }

    function downloadURI(uri, name) {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }




    return (
        <Modal isOpen={open}
            className="bg-[rgba(0,0,0,0.5)] w-full h-full flex items-center justify-center outline-none"

        >
            <div className="bg-white w-[90%] md:w-[80%] h-[80%] rounded-[5px] px-7 overflow-y-auto"
                style={{ boxShadow: "0px 1px 3px 0px #00000014" }}
            >
                {
                    qr ? <div className="w-full h-full">
                        <div className="w-full flex justify-end">
                            <IconButton variant="text" onClick={() => { setQr(""); setOpen(false) }}>
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
                        <div className="w-full h-full flex flex-1 flex-col justify-center items-center">
                            <Image
                                src={qr}
                                width={250}
                                height={250}
                            />
                            <Typography className="mb-3 mt-6 font-crimsonText text-[24px] leading-[31px] md:text-[32px] font-semibold md:leading-[41px] text-[#474935] text-center">
                                Congratulations! <br /> You have successfully minted your <span className="text-primary">product as token.</span>
                            </Typography>
                            <Typography className="mt-6 mb-6 font-oxygen font-normal  text-center text-[16px] leading-[19px] md:text-[20px]  md:leading-[25px] text-[#474935]">
                                Please click on the download button below to <br /> download the QR code to paste on your product packages
                            </Typography>
                            <Button variant="filled" onClick={() => downloadURI(qr, `token_qr_${new Date().getMilliseconds()}.png`)}>
                                Download
                            </Button>
                        </div>
                    </div> :
                        <div className=" ">
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
                                product
                            </Typography>
                            {/* Form section */}
                            <div className="mt-[23px] pb-[66px]">
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleCreateProduct}
                                >
                                    {
                                        ({ values, errors, touched, handleBlur, handleChange, setFieldValue }) => (
                                            <Form className="flex bg-white flex-col tabletland:flex-row  space-y-[27px] tabletland:space-y-0 tabletland:space-x-[27px]">
                                                <div className="bg-background w-full tabletland:w-1/2 rounded-[5px] px-[27px] pt-[39px] pb-[30px]">
                                                    <div className="flex flex-col space-y-2 w-full mb-[35px]">
                                                        <Input
                                                            label="Product Name"
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
                                                            placeholder="Product Name"
                                                            type="text"
                                                        />
                                                        <ErrorMessage error={errors.name} touched={touched.name} />
                                                    </div>
                                                    <div className="flex flex-col space-y-2 w-full mb-[35px]">
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
                                                    <div className="flex flex-col space-y-2 w-full  mb-[35px]">
                                                        <Input
                                                            label="NAFDAC number"
                                                            Icon={
                                                                () => (
                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M4.3095 16.9454V6.21289H2.5485L0 8.0684V9.77389L2.46 8.00389H2.55V16.9454H4.311H4.3095ZM9.129 9.31039V9.21589C9.129 8.28889 9.789 7.46239 10.923 7.46239C11.937 7.46239 12.684 8.12239 12.684 9.12139C12.684 10.0574 12.054 10.7729 11.4735 11.4104L7.485 15.8294V16.9454H14.655V15.4604H9.9645V15.3569L12.615 12.3779C13.59 11.2919 14.4705 10.3799 14.4705 8.97289C14.469 7.27339 13.0845 5.99989 10.962 5.99989C8.6025 5.99989 7.422 7.59589 7.422 9.2249V9.31039H9.129ZM18.9675 12.1349H20.1465C21.381 12.1349 22.2075 12.8564 22.215 13.9034C22.23 14.9639 21.39 15.7274 20.0835 15.7184C18.9285 15.7109 18.0945 15.0899 18.015 14.2889H16.3725C16.4355 15.8684 17.7795 17.1659 20.0685 17.1659C22.2855 17.1659 24.0315 15.9074 23.9985 13.9499C23.9685 12.2354 22.6155 11.4734 21.672 11.3789V11.2844C22.4745 11.1494 23.6925 10.2944 23.661 8.76739C23.622 7.18789 22.2615 5.98489 20.1225 5.99989C17.8725 6.00739 16.647 7.31989 16.6005 8.84689H18.2745C18.3225 8.09989 19.0215 7.43089 20.0835 7.43089C21.138 7.43089 21.8925 8.0834 21.8925 9.0359C21.9 9.9959 21.1365 10.6949 20.0925 10.6949H18.9675V12.1349Z" fill="#474935" fill-opacity="0.5" />
                                                                    </svg>
                                                                )
                                                            }
                                                            error={errors.nafdacId}
                                                            touched={touched.nafdacId}
                                                            value={values.nafdacId}
                                                            onChange={handleChange}
                                                            name="nafdacId"
                                                            onBlur={handleBlur}
                                                            className="w-full bg-white"
                                                            placeholder="NAFDAC number"
                                                            type="text"
                                                        />
                                                        <ErrorMessage error={errors.nafdacId} touched={touched.nafdacId} />
                                                    </div>
                                                    <div className="flex flex-col space-y-2 w-full  mb-[35px]">
                                                        <Input
                                                            label="Quantity"
                                                            Icon={
                                                                () => (
                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 11.25C12.1989 11.25 12.3897 11.329 12.5303 11.4697C12.671 11.6103 12.75 11.8011 12.75 12V14.25H15C15.1989 14.25 15.3897 14.329 15.5303 14.4697C15.671 14.6103 15.75 14.8011 15.75 15C15.75 15.1989 15.671 15.3897 15.5303 15.5303C15.3897 15.671 15.1989 15.75 15 15.75H12.75V18C12.75 18.1989 12.671 18.3897 12.5303 18.5303C12.3897 18.671 12.1989 18.75 12 18.75C11.8011 18.75 11.6103 18.671 11.4697 18.5303C11.329 18.3897 11.25 18.1989 11.25 18V15.75H9C8.80109 15.75 8.61032 15.671 8.46967 15.5303C8.32902 15.3897 8.25 15.1989 8.25 15C8.25 14.8011 8.32902 14.6103 8.46967 14.4697C8.61032 14.329 8.80109 14.25 9 14.25H11.25V12C11.25 11.8011 11.329 11.6103 11.4697 11.4697C11.6103 11.329 11.8011 11.25 12 11.25Z" fill="#474935" fill-opacity="0.5" />
                                                                        <path d="M12 1.5C12.9946 1.5 13.9484 1.89509 14.6517 2.59835C15.3549 3.30161 15.75 4.25544 15.75 5.25V6H8.25V5.25C8.25 4.25544 8.64509 3.30161 9.34835 2.59835C10.0516 1.89509 11.0054 1.5 12 1.5ZM17.25 6V5.25C17.25 3.85761 16.6969 2.52226 15.7123 1.53769C14.7277 0.553123 13.3924 0 12 0C10.6076 0 9.27226 0.553123 8.28769 1.53769C7.30312 2.52226 6.75 3.85761 6.75 5.25V6H1.5V21C1.5 21.7956 1.81607 22.5587 2.37868 23.1213C2.94129 23.6839 3.70435 24 4.5 24H19.5C20.2956 24 21.0587 23.6839 21.6213 23.1213C22.1839 22.5587 22.5 21.7956 22.5 21V6H17.25ZM3 7.5H21V21C21 21.3978 20.842 21.7794 20.5607 22.0607C20.2794 22.342 19.8978 22.5 19.5 22.5H4.5C4.10218 22.5 3.72064 22.342 3.43934 22.0607C3.15804 21.7794 3 21.3978 3 21V7.5Z" fill="#474935" fill-opacity="0.5" />
                                                                    </svg>
                                                                )
                                                            }
                                                            error={errors.quantity}
                                                            touched={touched.quantity}
                                                            value={values.quantity}
                                                            onChange={handleChange}
                                                            name="quantity"
                                                            onBlur={handleBlur}
                                                            className="w-full bg-white"
                                                            placeholder="Quantity"
                                                            type="number"
                                                            min="1"
                                                        />
                                                        <ErrorMessage error={errors.quantity} touched={touched.quantity} />
                                                    </div>
                                                    <div className="flex flex-col space-y-2 w-full ">
                                                        <DateInput
                                                            label="Expiry Date"
                                                            error={errors.expiryDate}
                                                            touched={touched.expiryDate}
                                                            value={values.expiryDate}
                                                            onChange={handleChange}
                                                            name="expiryDate"
                                                            onBlur={handleBlur}
                                                            className="w-full bg-white"
                                                            placeholder="Expiry Date"
                                                            setFieldValue={setFieldValue}

                                                        />
                                                        <ErrorMessage error={errors.expiryDate} touched={touched.expiryDate} />
                                                    </div>
                                                </div>
                                                <div className="bg-background tabletland:w-1/2 rounded-[5px] px-[27px] pt-[39px] pb-[30px]">
                                                    <div className="flex flex-col space-y-2 w-full mb-[35px]">
                                                        <Input
                                                            label="Barcode"
                                                            Icon={
                                                                () => (
                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2 6H3V18H2V6ZM4 6H6V18H4V6ZM8 6H9V18H8V6ZM10 6H13V18H10V6ZM14 6H15V18H14V6ZM17 6H18V18H17V6ZM19 6H20V18H19V6ZM21 6H22V18H21V6Z" fill="#474935" fill-opacity="0.5" />
                                                                    </svg>

                                                                )
                                                            }
                                                            error={errors.barcode}
                                                            touched={touched.barcode}
                                                            value={values.barcode}
                                                            onChange={handleChange}
                                                            name="barcode"
                                                            onBlur={handleBlur}
                                                            className="w-full bg-white"
                                                            placeholder="barCode"
                                                            type="text"
                                                        />
                                                        <ErrorMessage error={errors.barcode} touched={touched.barcode} />
                                                    </div>
                                                    <div className="flex flex-col space-y-2 w-full mb-[35px]">
                                                        <Select
                                                            label="Category"
                                                            Icon={
                                                                () => (
                                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M4 20C3.45 20 2.97933 19.8043 2.588 19.413C2.19667 19.0217 2.00067 18.5507 2 18V6C2 5.45 2.196 4.97933 2.588 4.588C2.98 4.19667 3.45067 4.00067 4 4H9.175C9.44167 4 9.696 4.05 9.938 4.15C10.18 4.25 10.3923 4.39167 10.575 4.575L12 6H21C21.2833 6 21.521 6.096 21.713 6.288C21.905 6.48 22.0007 6.71733 22 7C22 7.28333 21.904 7.521 21.712 7.713C21.52 7.905 21.2827 8.00067 21 8H11.175L9.175 6H4V18L5.975 11.425C6.10833 10.9917 6.35433 10.646 6.713 10.388C7.07167 10.13 7.46733 10.0007 7.9 10H20.8C21.4833 10 22.021 10.271 22.413 10.813C22.805 11.355 22.909 11.9423 22.725 12.575L20.925 18.575C20.7917 19.0083 20.546 19.3543 20.188 19.613C19.83 19.8717 19.434 20.0007 19 20H4ZM6.1 18H19L20.8 12H7.9L6.1 18Z" fill="#474935" fill-opacity="0.5" />
                                                                    </svg>

                                                                )
                                                            }
                                                            error={errors.category}
                                                            touched={touched.category}
                                                            value={values.category}
                                                            onChange={(value) => setFieldValue("category", value)}
                                                            name="category"
                                                            onBlur={handleBlur}
                                                            className="w-full bg-white"
                                                            placeholder="Category"
                                                        >
                                                            <Option defaultChecked disabled>Category</Option>

                                                            {
                                                                categories?.length > 0 && !fetchingCategories ? categories?.map(category => (
                                                                    <Option key={category?._id}
                                                                        value={category._id}
                                                                    >
                                                                        {category?.name}
                                                                    </Option>
                                                                )) : <Option disabled>----</Option>
                                                            }
                                                            {
                                                                fetchingCategories ?
                                                                    <div className="flex justify-center">
                                                                        <Spinner color="#235789" className="h-6 w-6" />
                                                                    </div> : <Option disabled></Option>
                                                            }
                                                            <Button className="w-full" onClick={()=>router.push("/dashboard/manufacturer/categories")}>
                                                                Add new Category
                                                            </Button>

                                                        </Select>
                                                        <ErrorMessage error={errors.category} touched={touched.category} />
                                                    </div>
                                                    <div className="flex flex-col space-y-2 w-full mb-[35px]">
                                                        <ImagePicker
                                                            //error={errors.image}
                                                            //touched={touched.image}
                                                            name="imageUrl"
                                                            className="w-full bg-white"
                                                            placeholder="Product Image"
                                                            setFieldValue={setFieldValue}
                                                        />
                                                        <ErrorMessage error={errors.imageUrl} touched={touched.imageUrl} />
                                                    </div>
                                                    <div className="w-full flex pt-[35px] md:pt-0">
                                                        <Button variant="filled" type="submit" className="w-full"
                                                            loading={submitting}
                                                        >
                                                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M20.5 7.423V18.385C20.5 18.845 20.346 19.229 20.038 19.537C19.7293 19.8457 19.345 20 18.885 20H6.115C5.655 20 5.271 19.846 4.963 19.538C4.65433 19.2293 4.5 18.845 4.5 18.385V5.615C4.5 5.155 4.65433 4.771 4.963 4.463C5.271 4.15433 5.655 4 6.115 4H17.077L20.5 7.423ZM19.5 7.85L16.65 5H6.115C5.93567 5 5.78833 5.05767 5.673 5.173C5.55767 5.28833 5.5 5.43567 5.5 5.615V18.385C5.5 18.5643 5.55767 18.7117 5.673 18.827C5.78833 18.9423 5.93567 19 6.115 19H18.885C19.0643 19 19.2117 18.9423 19.327 18.827C19.4423 18.7117 19.5 18.5643 19.5 18.385V7.85ZM12.5 16.538C13.0513 16.538 13.5223 16.3427 13.913 15.952C14.3043 15.5607 14.5 15.0893 14.5 14.538C14.5 13.9867 14.3043 13.5157 13.913 13.125C13.5223 12.7337 13.0513 12.538 12.5 12.538C11.9487 12.538 11.4777 12.7337 11.087 13.125C10.6957 13.5163 10.5 13.9873 10.5 14.538C10.5 15.0887 10.6957 15.56 11.087 15.952C11.4777 16.3427 11.9487 16.538 12.5 16.538ZM7.27 9.77H14.692V6.77H7.27V9.77ZM5.5 7.85V19V5V7.85Z" fill="#FAFBFD" />
                                                            </svg>
                                                            Save
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Form>
                                        )
                                    }
                                </Formik>
                            </div>
                        </div>
                }
            </div>

        </Modal>
    )
}

export default CreateProductForm