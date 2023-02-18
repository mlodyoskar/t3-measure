import { forwardRef } from "react";

interface Props {
  label: string;
}

export const Toggle = forwardRef<HTMLInputElement, Props>(
  ({ label, ...props }, ref) => (
    <label className="relative mb-4 flex cursor-pointer flex-col items-start">
      <span className=" mb-1 text-sm  text-gray-600 ">{label}</span>
      <input ref={ref} type="checkbox" {...props} className="peer sr-only" />
      <div className=" h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[1.6rem] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4   peer-focus:ring-emerald-300"></div>
    </label>
  )
);

Toggle.displayName = "Toggle";
