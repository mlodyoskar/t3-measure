import { Spinner } from "./icons";

interface Props {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  onClick?: () => unknown;
}

export const Button = ({ children, isLoading, ...props }: Props) => {
  return (
    <button
      {...props}
      disabled={isLoading}
      className={`rounded-lg ${
        isLoading ? "bg-emerald-800" : "bg-emerald-600"
      }  w-full px-5 py-3.5 text-sm font-medium text-white transition-all hover:bg-emerald-800 focus:outline-none  focus:ring-4 focus:ring-emerald-300 sm:py-2.5`}
    >
      {isLoading ? <Spinner className="mx-auto  fill-white" /> : children}
    </button>
  );
};
