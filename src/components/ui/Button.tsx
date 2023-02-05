interface Props {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

export const Button = ({ children, type = "button" }: Props) => {
  return (
    <button
      type={type}
      className="mr-2 mb-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
    >
      {children}
    </button>
  );
};
