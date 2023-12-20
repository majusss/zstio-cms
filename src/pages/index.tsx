import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Home() {
  const router = useRouter();
  const { error: message } = router.query;
  const [error, setError] = useState<string | string[] | null | undefined>(
    null
  );
  useEffect(() => {
    setError(message);
  }, [message]);
  return (
    <div className="bg-[#010101] h-screen overflow-hidden flex justify-center flex-col items-center text-gray-50">
      <h1 className="text-2xl font-semibold">ZSTIO CMS</h1>
      <p className="text-center mx-2">
        © {new Date().getFullYear()} Made with ❤️ for ZSTiO by Szymański Paweł &
        Majcher Kacper
      </p>
      <button
        onClick={() => {
          signIn("github", { callbackUrl: "/dashboard/start" });
        }}
        className="mt-2 px-4 py-2 border"
      >
        Zaloguj się
      </button>
      {error && (
        <div className="mt-2 text-red-500">
          Wystąpił błąd: <span>{Array.isArray(error) ? error[0] : error}</span>
        </div>
      )}
    </div>
  );
}

export default Home;
