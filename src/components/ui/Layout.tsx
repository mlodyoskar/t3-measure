import Head from "next/head";

interface Props {
  children: React.ReactNode;
  title?: string;
}

export const Layout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <title>{`Measure ${title ? `| ${title}` : ""}`}</title>
        <meta
          name="description"
          content="Measure your body to know if you are making progress!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
};
