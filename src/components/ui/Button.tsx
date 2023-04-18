import clsx from "clsx";
import { Spinner } from "./icons";
import { twMerge } from "tailwind-merge";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary";
  isLoading?: boolean;
  onClick?: () => unknown;
  fullWidth?: boolean;
}

const variants = {
  primary:
    "bg-emerald-600 text-white border-white focus:ring-emerald-300 hover:bg-emerald-800",
} as const;

export const Button = ({
  children,
  isLoading,
  fullWidth,
  variant = "primary",
  className,
  ...props
}: Props) => {
  return (
    <button
      {...props}
      disabled={isLoading}
      className={twMerge(
        clsx(
          variants[variant],
          { "w-full": fullWidth },
          "flex items-center justify-center rounded-lg px-5 py-3.5 text-sm font-medium transition-all focus:outline-none focus:ring-4  sm:py-2.5",
          className
        )
      )}
    >
      {isLoading ? <Spinner className="mx-auto  fill-white" /> : children}
    </button>
  );
};
