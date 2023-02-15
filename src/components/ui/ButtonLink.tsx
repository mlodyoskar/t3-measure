import Link from "next/link";

interface Props {
  children: React.ReactNode;
  href: string;
}

export const ButtonLink = ({ children, ...props }: Props) => {
  return (
    <Link
      {...props}
      className="block w-full rounded-lg bg-emerald-600 px-5 py-3.5 text-center text-sm  font-medium text-white transition-colors hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300   sm:py-2.5"
    >
      {children}
    </Link>
  );
};
