import Link from "next/link";

interface Props {
  children: React.ReactNode;
  href: string;
}

export const ButtonLink = ({ children, ...props }: Props) => {
  return (
    <Link
      {...props}
      className="rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
    >
      {children}
    </Link>
  );
};