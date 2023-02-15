import clsx from "clsx";
import type { ComponentProps } from "react";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props extends ComponentProps<"textarea"> {
  name: string;
  label: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ placeholder, rows = 4, label, ...props }, ref) => {
    const form = useFormContext();
    const state = form.getFieldState(props.name);

    return (
      <div className="w-full">
        <label className="block w-full text-sm text-gray-600">
          {label}
          <textarea
            {...props}
            placeholder={placeholder}
            rows={rows}
            className={clsx(
              "mt-1 w-full rounded-lg border border-gray-300 p-2.5 text-sm shadow-sm",
              {
                "border border-red-500  text-red-900 placeholder-red-500 focus:border-red-500 focus:ring-red-500":
                  state.error,
              }
            )}
            ref={ref}
          />
        </label>
        {state.error && (
          <p className="mt-1 text-xs text-red-600 ">{state.error.message}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
