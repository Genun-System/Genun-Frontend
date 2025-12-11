'use client'

import { useRouter } from "next/navigation";
import Button from "../components/Button";
import { Typography } from "../components/MaterialTailwind"

const GetStarted = () => {
    const router = useRouter()
    return (
        <section>
            <div className="mb-9">
                <Typography className="font-crimsonText text-center text-[21px] leading-[32px] md:text-[32px] font-semibold md:leading-[41px] text-[#474935]">
                    We help you be just
                    <span variant="" className="font-crimsonText text-[21px] leading-[32px] md:text-[32px] font-semibold md:leading-[41px] text-primary">
                        {" "}YOU
                    </span>
                </Typography>
            </div>
            <div className="flex flex-col space-y-[19px] md:flex-row md:space-y-0 md:space-x-[19px] px-[30px] md:px-0">
                <Button variant="outlined" className="w-full md:w-[189px]" 
                    onClick={() => router.push("/connect-wallet?action=register")}
                >
                    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 0C12.9391 0 11.9217 0.421427 11.1716 1.17157C10.4214 1.92172 10 2.93913 10 4C10 5.06087 10.4214 6.07828 11.1716 6.82843C11.9217 7.57857 12.9391 8 14 8C15.0609 8 16.0783 7.57857 16.8284 6.82843C17.5786 6.07828 18 5.06087 18 4C18 2.93913 17.5786 1.92172 16.8284 1.17157C16.0783 0.421427 15.0609 0 14 0ZM14 1.9C14.2758 1.9 14.5489 1.95432 14.8036 2.05985C15.0584 2.16539 15.2899 2.32007 15.4849 2.51508C15.6799 2.71008 15.8346 2.94158 15.9401 3.19636C16.0457 3.45115 16.1 3.72422 16.1 4C16.1 4.27578 16.0457 4.54885 15.9401 4.80364C15.8346 5.05842 15.6799 5.28992 15.4849 5.48492C15.2899 5.67993 15.0584 5.83461 14.8036 5.94015C14.5489 6.04568 14.2758 6.1 14 6.1C13.7242 6.1 13.4511 6.04568 13.1964 5.94015C12.9416 5.83461 12.7101 5.67993 12.5151 5.48492C12.3201 5.28992 12.1654 5.05842 12.0599 4.80364C11.9543 4.54885 11.9 4.27578 11.9 4C11.9 3.44305 12.1212 2.9089 12.5151 2.51508C12.9089 2.12125 13.443 1.9 14 1.9ZM3 3V6H0V8H3V11H5V8H8V6H5V3H3ZM14 9C11.33 9 6 10.33 6 13V16H22V13C22 10.33 16.67 9 14 9ZM14 10.9C16.97 10.9 20.1 12.36 20.1 13V14.1H7.9V13C7.9 12.36 11 10.9 14 10.9Z" fill="#474935" fill-opacity="0.5" />
                    </svg>
                    Register
                </Button>
                <Button variant="filled" className="w-full md:w-[189px]"
                    onClick={() => router.push("/connect-wallet?action=login")}
                >
                    <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.25 8V8.25H3.5H4.5H4.75V8V4C4.75 3.53587 4.93437 3.09075 5.26256 2.76256C5.59075 2.43437 6.03587 2.25 6.5 2.25H12.5C12.9641 2.25 13.4092 2.43437 13.7374 2.76256C14.0656 3.09075 14.25 3.53587 14.25 4V17C14.25 17.4641 14.0656 17.9092 13.7374 18.2374C13.4092 18.5656 12.9641 18.75 12.5 18.75H6.5C6.03587 18.75 5.59075 18.5656 5.26256 18.2374C4.93437 17.9092 4.75 17.4641 4.75 17V13V12.75H4.5H3.5H3.25V13V17C3.25 17.862 3.59241 18.6886 4.2019 19.2981C4.8114 19.9076 5.63805 20.25 6.5 20.25H12.5C13.362 20.25 14.1886 19.9076 14.7981 19.2981C15.4076 18.6886 15.75 17.862 15.75 17V4C15.75 3.13805 15.4076 2.3114 14.7981 1.7019C14.1886 1.09241 13.362 0.75 12.5 0.75H6.5C5.63805 0.75 4.8114 1.09241 4.2019 1.7019C3.59241 2.3114 3.25 3.13805 3.25 4V8ZM0.5 9.75H0.25V10V11V11.25H0.5H10.1464L7.32322 14.0732L7.15737 14.2391L7.31232 14.4152L7.97232 15.1652L8.14836 15.3652L8.33678 15.1768L12.8368 10.6768L13.0136 10.5L12.8368 10.3232L8.33678 5.82322L8.14836 5.6348L7.97232 5.83484L7.31232 6.58484L7.15737 6.76092L7.32322 6.92678L10.1464 9.75H0.5Z" fill="#FAFBFD" stroke="#FAFBFD" stroke-width="0.5" />
                    </svg>
                    Login
                </Button>
            </div>
        </section>
    )
}


export default GetStarted;
