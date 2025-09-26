import React from "react";

const Input = ({ label, type = "text", name, value, onChange, placeholder, required }) => {
    return (
        <div>
            {label && (
                <label htmlFor={name} className="block text-gray-700 text-sm font-medium">
                    {label}
                </label>
            )}
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        </div>
    );
};

export default Input;
