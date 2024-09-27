"use client";
import { useState } from "react";
import { login } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import ToastMessage from "@/components/ui/ToastMessage";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { LocaleProps } from "@/types/types";
import getErrorMessage from "@/helpers/getErrorMessage";

export default function LoginForm({ locale }: LocaleProps) {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
  });
  const router = useRouter();

  const t = useTranslations("LoginPage");
  const translations = {
    emailInput: t("email"),
    passwordInput: t("password"),
    signInBtn: t("signInBtn"),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formState;
    setFormState((prev) => ({ ...prev, error: "", loading: true }));

    try {
      const data = await login({ email, password });
      localStorage.setItem("user", JSON.stringify(data?.user));
      router.replace(`/${locale}/dashboard/statistics`);
    } catch (err: unknown) {
      setFormState((prev) => ({
        ...prev,
        error: getErrorMessage(err),
      }));
    } finally {
      setFormState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      {formState.error && (
        <ToastMessage message={formState.error} error={true} />
      )}
      <Input
        labelText={translations.emailInput}
        id={"email"}
        type="email"
        value={formState.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFormState((prev) => ({ ...prev, email: e.target.value }))
        }
      />
      <Input
        labelText={translations.passwordInput}
        id={"password"}
        value={formState.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFormState((prev) => ({ ...prev, password: e.target.value }))
        }
        type="password"
      />
      <Button
        type="submit"
        className="w-full"
        disabled={formState.loading}
        isLoading={formState.loading}
      >
        {translations.signInBtn}
      </Button>
    </form>
  );
}
