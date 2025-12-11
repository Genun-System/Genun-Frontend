"use client";
import { useParams } from "next/navigation";
import { IconButton, Spinner, Typography } from "../../components/MaterialTailwind"
import { useEffect, useState } from "react";
import Emoji from "../../assets/images/emoji.png";
import Image from "next/image";
import Button from "@/app/components/Button";
//import TempImage from "@/app/assets/images/test_image.jpeg";
import BarCode from "@/app/assets/images/barCode.svg";
import { ClipboardIcon, PhotoIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { verifyProduct } from "@/app/actions/product";
import { toast } from "react-toastify";
import { format } from "date-fns";
import formatWalletAddres from "@/app/utils/formatWalletAddress";
import { LimitDisplayableTexts } from "@/app/utils/LimitDisplayableTexts";
import SadEmoji from "../../assets/images/sad_emoji.jpeg";

const ProductDetails = () => {
    const params = useParams()
    const [viewDetails, setViewDetails] = useState(false);
    const [verifying, setVerifying] = useState(true);
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(false)

    const copyToClipBoard = (content, text) => {
        navigator.clipboard.writeText(text).then(res => {
            alert(`${content} copied successfully!`)
        })
    }

    useEffect(() => {
        const checkProduct = async () => {
            setVerifying(true)
            try {
                const response = await verifyProduct(params.productId);
                const result = await response.json();
                if (response.ok) {
                    //console.log("products:", result?.product)
                    //router.replace("/dashboard/manufacturer")
                    setVerifying(false)
                    setProduct(result?.product)
                }

                else {
                    setVerifying(false)
                    if (result?.message) {
                        toast.error(result?.message)
                        setError(true)
                    }

                }
            }

            catch (err) {
                console.log("error:", err)
                setVerifying(false)
                if (err?.response?.data?.message) {
                    toast.error(err?.response.data?.message)
                    setError(true)
                }
                else {
                    toast.error("Oops, something went wrong")
                    setError(true)
                }
            }
        }

        checkProduct();
    }, [params.productId])

    return (
        <>
            {
                verifying ? <div className="flex flex-col flex-1 items-center justify-center">
                    <Spinner className="h-10 w-10" />
                    <Typography className="mt-6 font-oxygen font-normal  text-center text-[16px] leading-[19px] md:text-[20px]  md:leading-[25px] text-[#474935]">
                        Please wait, we are verifying your item
                    </Typography>
                </div> :
                    <>
                        {
                            product ?
                                !viewDetails ?
                                    <div className="flex items-center justify-center w-full h-screen flex-col flex-1 px-10 tabletland:px-[91px]">
                                        <Image
                                            src={Emoji}
                                            width={120}
                                            height={120}
                                            className="mb-[42px]"
                                            alt=""
                                        />
                                        <Typography className="mb-[35px] font-crimsonText text-[24px] leading-[31px] md:text-[32px] font-semibold md:leading-[41px] text-[#474935] text-center">
                                            Your product is the <span className="text-primary">real deal</span>
                                        </Typography>
                                        <Button variant="filled" onClick={() => setViewDetails(true)}>
                                            View Details
                                        </Button>
                                    </div> :
                                    <div className="flex items-center justify-center space-y-[70px] md:space-y-0 md:space-x-[70px] tabletland:space-x-[150px] lg:space-x-[224px] w-full h-screen flex-col md:flex-row flex-1 px-10 tabletland:px-[91px] mt-[102px] md:mt-0">

                                        <div className=" bg-white relative  flex flex-col ">
                                            <div className="relative w-[80%] tabletland:w-[409px] h-[350px] self-end">
                                                <Image
                                                    src={product?.imageUrl}
                                                    //width={409}
                                                    //height={425}
                                                    className=" "
                                                    fill={true}
                                                />
                                            </div>
                                            <div>
                                                <svg width="341" height="22" viewBox="0 0 341 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <ellipse cx="170.5" cy="11" rx="170.5" ry="11" fill="url(#paint0_linear_348_163)" />
                                                    <defs>
                                                        <linearGradient id="paint0_linear_348_163" x1="0" y1="11" x2="341" y2="11" gradientUnits="userSpaceOnUse">
                                                            <stop stop-color="#FAFBFD" />
                                                            <stop offset="0.5" stop-color="#BDBDBD" />
                                                            <stop offset="1" stop-color="#FAFBFD" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                            </div>

                                        </div>
                                        <div className="bg-primary rounded-[10px] w-full md:w-[441px]">
                                            <div className="w-full flex flex-col items-center px-3 pt-9 pb-4">
                                                <div className="flex flex-col items-center ">
                                                    <Typography className="font-crimsonText font-bold text-[36px] text-center leading-[46px] text-background">
                                                        {product?.name}
                                                    </Typography>
                                                    <Typography className="font-oxygen text-[18px] leading-[22px] text-center">
                                                        By The {product?.manufacturer?.name} Company
                                                    </Typography>
                                                </div>
                                                <div className="flex flex-col  items-start">
                                                    <div className="flex space-x-[10px] items-center mt-[45px]">
                                                        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4 25.5C4 25.2348 4.10536 24.9804 4.29289 24.7929C4.48043 24.6054 4.73478 24.5 5 24.5H19C19.2652 24.5 19.5196 24.6054 19.7071 24.7929C19.8946 24.9804 20 25.2348 20 25.5C20 25.7652 19.8946 26.0196 19.7071 26.2071C19.5196 26.3946 19.2652 26.5 19 26.5H5C4.73478 26.5 4.48043 26.3946 4.29289 26.2071C4.10536 26.0196 4 25.7652 4 25.5ZM4 19.5C4 19.2348 4.10536 18.9804 4.29289 18.7929C4.48043 18.6054 4.73478 18.5 5 18.5H27C27.2652 18.5 27.5196 18.6054 27.7071 18.7929C27.8946 18.9804 28 19.2348 28 19.5C28 19.7652 27.8946 20.0196 27.7071 20.2071C27.5196 20.3946 27.2652 20.5 27 20.5H5C4.73478 20.5 4.48043 20.3946 4.29289 20.2071C4.10536 20.0196 4 19.7652 4 19.5ZM4 13.5C4 13.2348 4.10536 12.9804 4.29289 12.7929C4.48043 12.6054 4.73478 12.5 5 12.5H27C27.2652 12.5 27.5196 12.6054 27.7071 12.7929C27.8946 12.9804 28 13.2348 28 13.5C28 13.7652 27.8946 14.0196 27.7071 14.2071C27.5196 14.3946 27.2652 14.5 27 14.5H5C4.73478 14.5 4.48043 14.3946 4.29289 14.2071C4.10536 14.0196 4 13.7652 4 13.5ZM12 7.5C12 7.23478 12.1054 6.98043 12.2929 6.79289C12.4804 6.60536 12.7348 6.5 13 6.5H27C27.2652 6.5 27.5196 6.60536 27.7071 6.79289C27.8946 6.98043 28 7.23478 28 7.5C28 7.76522 27.8946 8.01957 27.7071 8.20711C27.5196 8.39464 27.2652 8.5 27 8.5H13C12.7348 8.5 12.4804 8.39464 12.2929 8.20711C12.1054 8.01957 12 7.76522 12 7.5Z" fill="#FAFBFD" />
                                                        </svg>
                                                        <div>
                                                            <Typography className="font-crimsonText font-bold text-[20px] text-start leading-[26px] text-background">
                                                                Description
                                                            </Typography>
                                                            <Typography className="font-oxygen text-[16px] leading-[18px] text-start break-all">
                                                                {LimitDisplayableTexts(product?.description, 20)}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-[10px] items-center mt-[45px]">
                                                        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clip-path="url(#clip0_348_151)">
                                                                <path d="M12.89 25.876V15.208H11.624C10.7173 15.6913 9.84099 16.2297 9 16.82V18.21C9.75 17.696 10.938 16.97 11.516 16.656H11.54V25.876H12.89ZM15.266 23.266C15.36 24.546 16.454 26.078 18.672 26.078C21.188 26.078 22.672 23.946 22.672 20.336C22.672 16.468 21.11 15 18.766 15C16.914 15 15.172 16.344 15.172 18.618C15.172 20.938 16.82 22.158 18.524 22.158C20.016 22.158 20.984 21.406 21.29 20.578H21.344C21.336 23.21 20.422 24.906 18.734 24.906C17.406 24.906 16.718 24.006 16.634 23.266H15.266ZM21.172 18.632C21.172 20.024 20.054 20.992 18.804 20.992C17.602 20.992 16.516 20.226 16.516 18.592C16.516 16.946 17.68 16.172 18.852 16.172C20.118 16.172 21.172 16.968 21.172 18.632Z" fill="#FAFBFD" />
                                                                <path d="M7 0.5C7.26522 0.5 7.51957 0.605357 7.70711 0.792893C7.89464 0.98043 8 1.23478 8 1.5V2.5H24V1.5C24 1.23478 24.1054 0.98043 24.2929 0.792893C24.4804 0.605357 24.7348 0.5 25 0.5C25.2652 0.5 25.5196 0.605357 25.7071 0.792893C25.8946 0.98043 26 1.23478 26 1.5V2.5H28C29.0609 2.5 30.0783 2.92143 30.8284 3.67157C31.5786 4.42172 32 5.43913 32 6.5V28.5C32 29.5609 31.5786 30.5783 30.8284 31.3284C30.0783 32.0786 29.0609 32.5 28 32.5H4C2.93913 32.5 1.92172 32.0786 1.17157 31.3284C0.421427 30.5783 0 29.5609 0 28.5V6.5C0 5.43913 0.421427 4.42172 1.17157 3.67157C1.92172 2.92143 2.93913 2.5 4 2.5H6V1.5C6 1.23478 6.10536 0.98043 6.29289 0.792893C6.48043 0.605357 6.73478 0.5 7 0.5ZM4 4.5C3.46957 4.5 2.96086 4.71071 2.58579 5.08579C2.21071 5.46086 2 5.96957 2 6.5V28.5C2 29.0304 2.21071 29.5391 2.58579 29.9142C2.96086 30.2893 3.46957 30.5 4 30.5H28C28.5304 30.5 29.0391 30.2893 29.4142 29.9142C29.7893 29.5391 30 29.0304 30 28.5V6.5C30 5.96957 29.7893 5.46086 29.4142 5.08579C29.0391 4.71071 28.5304 4.5 28 4.5H4Z" fill="#FAFBFD" />
                                                                <path d="M5 8.5C5 8.23478 5.10536 7.98043 5.29289 7.79289C5.48043 7.60536 5.73478 7.5 6 7.5H26C26.2652 7.5 26.5196 7.60536 26.7071 7.79289C26.8946 7.98043 27 8.23478 27 8.5V10.5C27 10.7652 26.8946 11.0196 26.7071 11.2071C26.5196 11.3946 26.2652 11.5 26 11.5H6C5.73478 11.5 5.48043 11.3946 5.29289 11.2071C5.10536 11.0196 5 10.7652 5 10.5V8.5Z" fill="#FAFBFD" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_348_151">
                                                                    <rect width="32" height="32" fill="white" transform="translate(0 0.5)" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                        <div>
                                                            <Typography className="font-crimsonText font-bold text-[20px] text-start leading-[26px] text-background">
                                                                Expiry Date
                                                            </Typography>
                                                            <Typography className="font-oxygen text-[16px] leading-[18px]  text-start">
                                                                Expiring {format(product?.createdAt, "P")}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-[10px] items-center mt-[45px]">
                                                        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5.746 23.0939V8.78394H3.398L0 11.2579V13.5319L3.28 11.1719H3.4V23.0939H5.748H5.746ZM12.172 12.9139V12.7879C12.172 11.5519 13.052 10.4499 14.564 10.4499C15.916 10.4499 16.912 11.3299 16.912 12.6619C16.912 13.9099 16.072 14.8639 15.298 15.7139L9.98 21.6059V23.0939H19.54V21.1139H13.286V20.9759L16.82 17.0039C18.12 15.5559 19.294 14.3399 19.294 12.4639C19.292 10.1979 17.446 8.49994 14.616 8.49994C11.47 8.49994 9.896 10.6279 9.896 12.7999V12.9139H12.172ZM25.29 16.6799H26.862C28.508 16.6799 29.61 17.6419 29.62 19.0379C29.64 20.4519 28.52 21.4699 26.778 21.4579C25.238 21.4479 24.126 20.6199 24.02 19.5519H21.83C21.914 21.6579 23.706 23.3879 26.758 23.3879C29.714 23.3879 32.042 21.7099 31.998 19.0999C31.958 16.8139 30.154 15.7979 28.896 15.6719V15.5459C29.966 15.3659 31.59 14.2259 31.548 12.1899C31.496 10.0839 29.682 8.47994 26.83 8.49994C23.83 8.50994 22.196 10.2599 22.134 12.2959H24.366C24.43 11.2999 25.362 10.4079 26.778 10.4079C28.184 10.4079 29.19 11.2779 29.19 12.5479C29.2 13.8279 28.182 14.7599 26.79 14.7599H25.29V16.6799Z" fill="#FAFBFD" />
                                                        </svg>
                                                        <div>
                                                            <Typography className="font-crimsonText font-bold text-[20px] text-start leading-[26px] text-background">
                                                                NAFDAC Approved
                                                            </Typography>
                                                            <Typography className="font-oxygen text-[16px] leading-[18px]  text-start">
                                                                {product?.nafdacId}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-[10px] items-center mt-[45px]">
                                                        <PhotoIcon width={32} height={32} color="#FAFBFD" />
                                                        <div>
                                                            <Typography className="font-crimsonText font-bold text-[20px] text-start leading-[26px] text-background">
                                                                Product/ Token Id
                                                            </Typography>
                                                            <div className="flex flex-row items-center">
                                                                <Typography className="font-oxygen text-[16px] leading-[18px]  text-start break-all">
                                                                    {product?.productId}
                                                                </Typography>
                                                                <IconButton variant="text"
                                                                    onClick={() => { copyToClipBoard("Product ID", product?.productId) }}
                                                                >
                                                                    <ClipboardIcon width={24} height={24} color="#FAFBFD" />
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-[10px] items-center mt-[45px]">
                                                        <MapPinIcon width={32} height={32} color="#FAFBFD" />
                                                        <div>
                                                            <Typography className="font-crimsonText font-bold text-[20px] text-start leading-[26px] text-background">
                                                                Token address
                                                            </Typography>
                                                            <div className="flex flex-row items-center">
                                                                <Typography className="font-oxygen text-[16px] leading-[18px]  text-start break-all">
                                                                    {formatWalletAddres(product?.manufacturer?.contractAddress)}
                                                                </Typography>
                                                                <IconButton variant="text"
                                                                    onClick={() => { copyToClipBoard("Token address", product?.manufacturer?.contractAddress) }}
                                                                >
                                                                    <ClipboardIcon width={24} height={24} color="#FAFBFD" />
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full px-[27px]  pt-[45px] pb-[79px] relative border-t-[2px] border-dashed border-[#C7C7C7] ">
                                                <div className="bg-white w-8 h-8 absolute top-[-16px] left-[-20px] rounded-br-[10px] rounded-tr-[10px]" />
                                                <div className="bg-white w-8 h-8 absolute top-[-16px] right-[-20px] rounded-bl-[10px] rounded-tl-[10px]" />
                                                <Image
                                                    src={BarCode}
                                                    className="w-full h-[75px]"
                                                />
                                                <Typography className="text-center text-background font-crimsonText leading-[31px] font-semibold">
                                                    {product?.barcode}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div> : <div className="flex items-center justify-center w-full h-screen flex-col flex-1 px-10 tabletland:px-[91px]">
                                    <Image
                                        src={SadEmoji}
                                        width={120}
                                        height={120}
                                        className="mb-[42px]"
                                        alt=""
                                    />
                                    <Typography className="mb-2 font-crimsonText text-[24px] leading-[31px] md:text-[32px] font-semibold md:leading-[41px] text-[#474935] text-center">
                                        No record of this product on <span className="text-primary">our system</span>
                                    </Typography>
                                    <Typography className=" font-oxygen font-normal  text-center text-[16px] leading-[19px] md:text-[20px]  md:leading-[25px] text-[#474935]">
                                        You might have bought a fake product or the manufacturer is not on our system
                                    </Typography>
                                    <Typography className=" font-oxygen font-normal  text-center text-[16px] leading-[19px] md:text-[20px]  md:leading-[25px] text-[#474935]">
                                        We are working on improving our system for <br/> product consumers to know if their product manufacturer is on our system
                                    </Typography>
                                </div>
                        }
                    </>
            }
        </>
    )
}

export default ProductDetails;
