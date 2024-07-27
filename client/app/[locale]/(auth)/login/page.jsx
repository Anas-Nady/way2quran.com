import LoginForm from "./_LoginForm";
import SiteTitle from "@/components/SiteTitle";
import { useTranslations } from "next-intl";
import Link from "next/link";
import IsAuthenticated from "./_IsAuthenticated";

export const metadata = {
  title: "Login",
  robots: {
    index: false,
    follow: true,
    nocache: false,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function LoginPage({ params: { locale } }) {
  const t = useTranslations("LoginPage");

  const translations = {
    emailInput: t("email"),
    passwordInput: t("password"),
    signInBtn: t("signInBtn"),
  };

  return (
    <IsAuthenticated>
      <div className="relative flex flex-col items-center justify-center px-6 py-8 mx-auto my-10 lg:py-0">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <SiteTitle />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {t("signIn")}
            </h1>
            <LoginForm currentLang={locale} {...translations} />
          </div>
        </div>
      </div>
    </IsAuthenticated>
  );
}
