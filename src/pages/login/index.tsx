import type { GetServerSideProps } from "next";

export default function Login() {
    return null;
}

export const getServerSideProps: GetServerSideProps = async ({ locale, defaultLocale }) => {
    const prefix = locale && locale !== defaultLocale ? `/${locale}` : "";
    return { redirect: { destination: `${prefix}/?login=1`, permanent: false } };
};
