"use client";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useState } from "react";
import { login } from "@/actions/auth";
import ToastMessage from "@/components/ToastMessage";
import { useRouter } from "next/navigation";

export default function LoginForm({
  currentLang,
  emailInput,
  passwordInput,
  signInBtn,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login({ email, password });
      localStorage.setItem("user", JSON.stringify(data?.user));
      router.replace(`/${currentLang}/dashboard/statistics`);
    } catch (err) {
      const errorMessage =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      setError(errorMessage || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      {error && <ToastMessage message={error} error={true} />}
      <Input
        labelText={emailInput}
        id={"email"}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        labelText={passwordInput}
        id={"password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />

      <Button
        type="submit"
        className="w-full"
        text={signInBtn}
        disabled={loading}
      />
    </form>
  );
}
