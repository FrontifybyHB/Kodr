import React from "react";

const Button = ({ type = "button", children, fullWidth = false, onClick }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${fullWidth ? "w-full" : ""
                } py-2 px-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300`}
        >
            {children}
        </button>
    );
};

export default Button;
