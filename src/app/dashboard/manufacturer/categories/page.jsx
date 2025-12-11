"use client";

import Button from "@/app/components/Button";
import { Typography, Accordion, AccordionBody, AccordionHeader } from "../../../components/MaterialTailwind";
import { categories } from "../data";
import Image from "next/image";
import { useState, useEffect } from "react";
import CreateProductForm from "./CreateCategoryForm";
import { getCategoriesFromProducts } from "@/app/actions/product";

const Categories = () => {
    const [openCreateCategoryModal, setOpenCreateCategoryModal] = useState(false);
    const [open, setOpen] = useState(1);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);
    const [fetchingCategory, setFetchingCategory] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            setFetchingCategory(true)
            try {
                const response = await getCategoriesFromProducts();
                const result = await response.json();
                if (response.ok) {
                    //console.log("products:", result?.categories)
                    //router.replace("/dashboard/manufacturer")
                    setFetchingCategory(false)
                    setCategories(result?.categories)
                }

                else {

                    setFetchingCategory(false)
                    if (result?.message) {
                        toast.error(result?.message)
                    }

                }
            }

            catch (err) {
                console.log("error:", err)
                setFetchingCategory(false)
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

    const handleCreateCategory = () => {
        setOpenCreateCategoryModal(true);
    }



    return (
        <section className="min-h-full pt-[71px]">


            {/* cattegories list */}
            {
                categories?.map((category, index) => (
                    <Accordion className={`${index + 1 === categories?.length ? "mb-0" : "mb-[15px]"} pt-[15px]`}
                        key={category?.id} open={open === index + 1}
                    >
                        <AccordionHeader onClick={() => handleOpen(index + 1)}
                            className="flex justify-between w-full rounded-[5px] bg-white border-none"
                            style={{ boxShadow: "0px 1px 3px 0px #00000014" }}
                        >
                            <div>
                                <Typography className="font-crimsonText font-bold text-[20px] leading-[26px] text-[#474935] pl-[29px]">
                                    {category.name}
                                </Typography>
                            </div>
                            <div className="flex justify-end w-full  items-center space-x-[22px]">
                                <div className="bg-primary rounded-[10px] p-[5px] h-[31px] flex items-center text-center">
                                    <Typography className="text-white font-oxygenMono text-[16px] leading-[20px]">
                                        {category?.products?.length > 500 ? "500+" : category?.products?.length}
                                    </Typography>
                                </div>
                                <div>
                                    {
                                        open === index + 1 ?
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9596 13.5821C16.9139 13.7594 16.834 13.8942 16.7374 13.9569C16.6408 14.0196 16.5354 14.005 16.4443 13.9164L12.0015 9.58779L7.55946 13.9179C7.51426 13.9629 7.46495 13.9901 7.41436 13.9977C7.36376 14.0054 7.31289 13.9935 7.26467 13.9627C7.21645 13.9318 7.17184 13.8827 7.13341 13.8181C7.09498 13.7534 7.06349 13.6746 7.04075 13.5862C7.01801 13.4977 7.00448 13.4014 7.00094 13.3027C6.9974 13.204 7.00391 13.1049 7.0201 13.0111C7.03629 12.9174 7.06184 12.8308 7.09528 12.7564C7.12871 12.6819 7.16938 12.6211 7.21492 12.5775L11.8292 8.07944C11.8827 8.0272 11.9417 8 12.0015 8C12.0613 8 12.1203 8.0272 12.1738 8.07944L16.7881 12.5775C16.879 12.6666 16.9482 12.8224 16.9803 13.0107C17.0125 13.199 17.005 13.4045 16.9596 13.5821Z" fill="#474935" />
                                            </svg> :
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.04044 10.4179C7.08613 10.2406 7.16603 10.1058 7.26262 10.0431C7.35921 9.98042 7.46461 9.99497 7.5557 10.0836L11.9985 14.4122L16.4405 10.0821C16.4857 10.0371 16.5351 10.0099 16.5856 10.0023C16.6362 9.99458 16.6871 10.0065 16.7353 10.0373C16.7836 10.0682 16.8282 10.1173 16.8666 10.1819C16.905 10.2466 16.9365 10.3254 16.9592 10.4138C16.982 10.5023 16.9955 10.5986 16.9991 10.6973C17.0026 10.796 16.9961 10.8951 16.9799 10.9889C16.9637 11.0826 16.9382 11.1692 16.9047 11.2436C16.8713 11.3181 16.8306 11.3789 16.7851 11.4225L12.1708 15.9206C12.1173 15.9728 12.0583 16 11.9985 16C11.9387 16 11.8797 15.9728 11.8262 15.9206L7.21194 11.4225C7.12097 11.3334 7.05183 11.1776 7.01968 10.9893C6.98753 10.801 6.99499 10.5955 7.04044 10.4179Z" fill="#474935" />
                                            </svg>
                                    }
                                </div>
                            </div>
                        </AccordionHeader>
                        <AccordionBody>
                            <div className="flex   flex-row   gap-x-8 gap-y-8 tabletland:gap-x-[58px] tabletland:gap-y-[58px]  flex-wrap">
                                {
                                    category?.products?.map((product, index) => (
                                        <li key={index} style={{ boxShadow: "0px 1px 3px 0px #00000014" }}
                                            className=" bg-white list-none  p-[14px] rounded-[5px] w-full md:w-[209px] h-[260px] space-y-1"
                                        >
                                            <div className="relative w-full h-[150px] ">
                                                <Image
                                                    src={product?.imageUrl}
                                                    fill={true}
                                                    className="object-cover h-[150px] w-full rounded-[5px]"
                                                />
                                            </div>
                                            <Typography className="text-primary mt-[15px] font-bold font-crimsonText text-[18px] leading-[22px] md:text-[20px] md:leading-[26px]">
                                                {product?.name}
                                            </Typography>
                                            <Typography className="text-[#47493580] mt-[15px] font-bold font-oxygen text-[14px] leading-[18px] md:text-[16px] md:leading-[20px]">
                                                {product?.quantity} available
                                            </Typography>
                                            {
                                                product?.barcode &&
                                                <Typography className="text-[#47493580] mt-[15px] font-bold font-oxygen text-[14px] leading-[18px] md:text-[16px] md:leading-[20px]">
                                                    {product?.barcode}
                                                </Typography>
                                            }
                                        </li>
                                    ))
                                }
                            </div>
                        </AccordionBody>
                    </Accordion>
                ))
            }

            <div className="w-full flex justify-end mt-[15px]">
                <Button variant="filled" onClick={handleCreateCategory}>
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_215_154)">
                            <path d="M21.5 1.5C21.8978 1.5 22.2794 1.65804 22.5607 1.93934C22.842 2.22064 23 2.60218 23 3V21C23 21.3978 22.842 21.7794 22.5607 22.0607C22.2794 22.342 21.8978 22.5 21.5 22.5H3.5C3.10218 22.5 2.72064 22.342 2.43934 22.0607C2.15804 21.7794 2 21.3978 2 21V3C2 2.60218 2.15804 2.22064 2.43934 1.93934C2.72064 1.65804 3.10218 1.5 3.5 1.5H21.5ZM3.5 0C2.70435 0 1.94129 0.316071 1.37868 0.87868C0.816071 1.44129 0.5 2.20435 0.5 3V21C0.5 21.7956 0.816071 22.5587 1.37868 23.1213C1.94129 23.6839 2.70435 24 3.5 24H21.5C22.2956 24 23.0587 23.6839 23.6213 23.1213C24.1839 22.5587 24.5 21.7956 24.5 21V3C24.5 2.20435 24.1839 1.44129 23.6213 0.87868C23.0587 0.316071 22.2956 0 21.5 0H3.5Z" fill="#FAFBFD" />
                            <path d="M12.5 6C12.6989 6 12.8897 6.07902 13.0303 6.21967C13.171 6.36032 13.25 6.55109 13.25 6.75V11.25H17.75C17.9489 11.25 18.1397 11.329 18.2803 11.4697C18.421 11.6103 18.5 11.8011 18.5 12C18.5 12.1989 18.421 12.3897 18.2803 12.5303C18.1397 12.671 17.9489 12.75 17.75 12.75H13.25V17.25C13.25 17.4489 13.171 17.6397 13.0303 17.7803C12.8897 17.921 12.6989 18 12.5 18C12.3011 18 12.1103 17.921 11.9697 17.7803C11.829 17.6397 11.75 17.4489 11.75 17.25V12.75H7.25C7.05109 12.75 6.86032 12.671 6.71967 12.5303C6.57902 12.3897 6.5 12.1989 6.5 12C6.5 11.8011 6.57902 11.6103 6.71967 11.4697C6.86032 11.329 7.05109 11.25 7.25 11.25H11.75V6.75C11.75 6.55109 11.829 6.36032 11.9697 6.21967C12.1103 6.07902 12.3011 6 12.5 6Z" fill="#FAFBFD" />
                        </g>
                        <defs>
                            <clipPath id="clip0_215_154">
                                <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                            </clipPath>
                        </defs>
                    </svg>
                    Add Category
                </Button>
            </div>

            {/* Create product form */}
            <CreateProductForm open={openCreateCategoryModal}
                setOpen={setOpenCreateCategoryModal}
            />
        </section>
    )
}

export default Categories;
