import React, {DetailedHTMLProps, InputHTMLAttributes} from "react";

const Input = ({placeholder, value, onChange, disabled}: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => (
    <input
        placeholder={placeholder}
        className={`max-w-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${disabled ? "bg-gray-100" : "bg-white"}`}
        value={value}
        onChange={onChange}
    />
)

export default Input;
