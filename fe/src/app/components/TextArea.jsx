import { Textarea as MaterialTextArea } from "./MaterialTailwind"

const TextArea = (prop) => {
    const { className, error, touched, inputClassName, Icon, ...other } = prop;
    return (
        <div className={`relative flex items-start   ${className}`}>
            <MaterialTextArea
                error={error && touched}
                placeholder="Enter value"
                className={`pl-[59px] placeholder-[#47493580]    ${!error && touched ? " !border-[#47493580] focus:!border-primary " : " "}  focus:border-t-0    ${inputClassName}`}
                containerProps={{
                    className: "min-w-0 h-full",
                }}
                labelProps={{
                    className: `!text-opacity-0 ${!error && touched ? " peer-focus:!text-primary peer-focus:after:!border-primary peer-focus:before:!border-primary " : " "} peer-focus:!text-opacity-100`
                }}
                {...other}

            />
            {
                Icon &&
                <div className="!absolute left-[21px] top-[10px] w-6 h-6  rounded">
                    <Icon />
                </div>
            }
        </div>
    )
}


export default TextArea;
