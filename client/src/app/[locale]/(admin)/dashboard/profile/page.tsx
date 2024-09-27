import AdminProfileForm from "./_AdminProfileForm";

export default async function AdminProfilePage() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="profile border border-slate-300 dark:border-gray-700 p-5 sm:w-[450px]">
        <AdminProfileForm />
      </div>
    </div>
  );
}
