interface Props {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => unknown;
}

export const Button = ({ children, ...props }: Props) => {
  return (
    <button
      {...props}
      className="rounded-lg bg-emerald-700 px-5 py-3.5 text-sm font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 sm:py-2.5"
    >
      {children}
    </button>
  );
};
