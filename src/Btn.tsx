import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";


const Btn = ({children, onClick}: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Btn;
