import AdminProfileForm from "./_AdminProfileForm";
import { getTranslations } from "next-intl/server";

export default async function AdminProfilePage() {
  const t = await getTranslations("AdminProfile");

  const translations = {
    currentEmailTxt: t("currentEmail"),
    newPasswordTxt: t("newPassword"),
    newEmailTxt: t("newEmail"),
    saveBtn: t("save"),
    successUpdateAdminProfileTxt: t("successUpdateAdminProfile"),
  };

  return (
    <div className="relative flex items-center justify-center">
      <div className="profile border border-slate-300 dark:border-gray-700 p-5 sm:w-[450px]">
        <AdminProfileForm {...translations} />
      </div>
    </div>
  );
}
