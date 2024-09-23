"use client";

import { usePathname, useRouter } from "next/navigation";
import "@/app/[locale]/globals.css";

export default function NotFound() {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <html>
      <body>
        <section className="bg-white dark:bg-gray-900 font-english">
          <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
            <div className="max-w-screen-sm mx-auto text-center">
              <h1 className="mb-4 font-extrabold tracking-tight text-green-600 text-7xl lg:text-9xl dark:text-green-500">
                404
              </h1>
              <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
                Something's missing.
              </p>
              <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                Sorry, we can't find{" "}
                <span className="font-bold text-green-600 dark:text-green-500">
                  {decodeURIComponent(pathName)}
                </span>
                . You'll find lots to explore on the home page.{" "}
              </p>
              <button
                onClick={() => router.push("/")}
                className="inline-flex text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-green-900 my-4"
              >
                Back to Home Page
              </button>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
