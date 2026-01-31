"use client";
import React from "react";

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  error?: string;
  register: any;
}

export default function InputField({
  label,
  id,
  type = "text",
  placeholder,
  error,
  register,
}: InputFieldProps) {
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...register(id)}
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full border border-border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
