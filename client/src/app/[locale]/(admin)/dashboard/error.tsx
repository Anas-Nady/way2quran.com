"use client";

interface ErrorProps {
  error: Error;
}

export default function ErrorComponent({ error }: ErrorProps) {
  return (
    <div
      className="min-h-screen max-w-[900px] flex items-center flex-col gap-4 mx-auto"
      dir="ltr"
    >
      <h3 className="flex text-lg gap-1 text-red-600">
        <p className="text-lg sm:text-xl xl:text-2xl">{error.message}</p>
      </h3>
    </div>
  );
}
