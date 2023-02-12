import { forwardRef } from "react";
import { PhotoIcon } from "./icons";

interface Props {
  errorMessage?: string;
  label?: string;
  accept?: string;
}

export const FileInput = forwardRef<HTMLInputElement, Props>(
  ({ errorMessage, accept, label = "Zdjęcie bokiem", ...props }, ref) => {
    return (
      <div className="flex w-full flex-col items-center justify-center">
        {label && (
          <span className="mb-1 self-start text-sm text-gray-600">{label}</span>
        )}
        <label
          htmlFor="dropzone-file"
          className={`flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 shadow-sm ${
            errorMessage ? "border-red-400" : "border-gray-300"
          }    transition-colors hover:bg-gray-100`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <PhotoIcon
              className={`mb-3 h-10 w-10 ${
                errorMessage ? "text-red-400" : "text-emerald-600"
              }`}
              aria-hidden="true"
            />
            <p className="mb-2 text-sm text-gray-500 ">
              <span className="font-semibold">Kliknij, aby dodać zdjęcie</span>
            </p>
            <p className="text-xs text-gray-500 ">PNG, JPG (MAX. 3MB)</p>
          </div>
          <input
            {...props}
            ref={ref}
            id="dropzone-file"
            type="file"
            className="hidden"
            accept={accept}
          />
        </label>
        {errorMessage && (
          <p className="mt-1 self-start text-sm text-red-400">{errorMessage}</p>
        )}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";
