import { Button as MaterialButton } from "./MaterialTailwind";
import PropTypes from "prop-types";

const Button = (prop) => {
    const { variant, className, children, ...other } = prop;
    if (variant === "filled") {
        return (
            <MaterialButton className={`bg-primary flex flex-row items-center justify-center gap-x-[10px] capitalize rounded-[5px] border h-[65px] text-[14px] leading-[20px] font-oxygen text-background  ${prop?.className}`}
                variant="filled" {...other}
            >
                {children}
            </MaterialButton>
        )
    }

    else if (variant === "outlined") {
        return (
            <MaterialButton className={`bg-transparent flex flex-row items-center justify-center gap-x-[10px] text-poosGray border-poosGray capitalize rounded-[5px] border h-[65px] text-[14px] leading-[20px] font-oxygen  ${prop?.className}`}
                variant="outlined" {...other}
            >
                {children}
            </MaterialButton>
        )
    }

    else if (variant === "text") {
        return (
            <MaterialButton className={`bg-transparent flex flex-row items-center justify-center gap-x-[10px] capitalize text-[14px] leading-[20px] font-oxygen text-primary ${prop?.className}`}
                variant="text" {...other}
            >
                {children}
            </MaterialButton>
        )
    }
    else {
        return (
            <MaterialButton className={`bg-primary flex flex-row items-center justify-center gap-x-[10px] capitalize rounded-[5px] border h-[65px] text-[14px] leading-[20px] font-oxygen text-background ${prop?.className}`}
                variant="filled" {...other}
            >
                {children}
            </MaterialButton>
        )
    }
}

Button.propType = {
    className: PropTypes.string,
    variant: PropTypes.oneOf(["filled", "outlined", "text"]).isRequired,
    children: PropTypes.node,
    onClick: PropTypes.func
}


export default Button;
