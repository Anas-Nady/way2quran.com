import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Input, Layout, TitleSite } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authActions";
import { toast } from "react-toastify";
import { userReset } from "../redux/slices/authSlices";
import { Helmet } from "react-helmet";

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.login);
  const isAdmin = JSON.parse(sessionStorage.getItem("user"))?.isAdmin;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(login(email, password));
  };

  useEffect(() => {
    if (success) {
      navigateTo("/dashboard");
    } else if (isAdmin) {
      navigateTo("/dashboard");
    }

    if (error) {
      toast.error(error);
    }
    dispatch(userReset());
  }, [error, success, isAdmin, navigateTo]);

  return (
    <>
      <Helmet>
        <title>Login Page</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div>
        {!isAdmin && (
          <Layout>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <Link
                to="/"
                className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
              >
                <TitleSite />
              </Link>
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    {t("signIn")}
                  </h1>
                  <form className="space-y-4 md:space-y-6" action="#">
                    <Input
                      labelText={"emailInput"}
                      id={"email"}
                      placeholder={"emailPlaceholder"}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      labelText={"passwordInput"}
                      id={"password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={"passwordPlaceholder"}
                      type={"password"}
                    />

                    <Button
                      type="submit"
                      className={`w-full ${
                        loading && "cursor-not-allowed opacity-40"
                      }`}
                      text="signInBtn"
                      handleSubmit={handleSubmit}
                    />
                  </form>
                </div>
              </div>
            </div>
          </Layout>
        )}
      </div>
    </>
  );
};

export default Login;
