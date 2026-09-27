import { Typography } from "./MaterialTailwind";
import PropType from "prop-types";

const ErrorMessage = (prop)=> {
    return  (
       <>
        {
            prop.error && prop.touched ? 
            <Typography className="text-error font-oxygen font-bold text-[14px] leading-[21px]">
                {prop.error}
            </Typography> : null
        }
       </>
    )
}

ErrorMessage.propType = {
    error: PropType.string.isRequired,
    touched: PropType.oneOfType[PropType.string, PropType.bool]
}

export default ErrorMessage;
