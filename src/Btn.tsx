import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";


const Btn = ({children, onClick, disabled}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (
        <button
            className={`text-white font-bold py-2 px-4 rounded ${disabled ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-700"}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Btn;
