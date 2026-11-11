"use client";
import React, { forwardRef } from "react";

const StripeInput = forwardRef(
  (
    {
      id,
      name,
      label,
      element: Element, // 👈 Stripe Element passed here
      options,
      onChange,
      className = "",
      inputClassName = "",
      labelClassName = "",
      disabled = false,
      required = false,
      error,
      icon,
      rightIcon,
    },
    ref
  ) => {
    const inputId = id || name;

    return (
      <div className={`input-field ${className}`}>
        {label && (
          <label htmlFor={inputId} className={`input-label ${labelClassName}`}>
            {label}
            {required ? " *" : null}
          </label>
        )}

        <div
          className={`flex items-center input-wrapper ${
            error ? "input-error" : ""
          } ${disabled ? "input-disabled" : ""}`}
        >
          {icon && <span className="input-icon left">{icon}</span>}

          {/* 🔥 Stripe Element instead of input */}
          <div className={`flex-1 input-element ${inputClassName}`}>
            <Element
              id={inputId}
              options={options}
              onChange={onChange}
            />
          </div>

          {rightIcon && (
            <span className="input-icon right">{rightIcon}</span>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="input-error-text" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default StripeInput;