"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const pathName = usePathname();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    mount && (
      <html>
        <body>
          <section className="bg-white dark:bg-gray-900 font-english">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center">
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-green-600 dark:text-green-500">
                  404
                </h1>
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                  Something's missing.
                </p>
                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                  Sorry, we can't find{" "}
                  <span className="font-bold text-green-600 dark:text-green-500">
                    {pathName}
                  </span>
                  . You'll find lots to explore on the home page.{" "}
                </p>
                <button
                  onClick={() => router.push("/")}
                  className="inline-flex text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-green-900 my-4"
                >
                  Back to HomePage
                </button>
              </div>
            </div>
          </section>
        </body>
      </html>
    )
  );
}
