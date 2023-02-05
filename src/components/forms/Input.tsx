import clsx from "clsx";
import type { ComponentProps } from "react";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props extends ComponentProps<"input"> {
  name: string;
  label: string;
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ placeholder, type = "text", label, ...props }, ref) => {
    const form = useFormContext();
    const state = form.getFieldState(props.name);

    return (
      <>
        <label className="block text-sm text-gray-600">
          {label}
          <input
            {...props}
            type={type}
            placeholder={placeholder}
            className={clsx(
              "mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm",
              {
                "border border-red-500 bg-red-50 text-red-900 placeholder-red-500 focus:border-red-500 focus:ring-red-500":
                  state.error,
              }
            )}
            ref={ref}
          />
        </label>
        {state.error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">
            {state.error.message}
          </p>
        )}
      </>
    );
  }
);

Input.displayName = "Input";
