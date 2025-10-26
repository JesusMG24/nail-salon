"use client";

import React, { useState } from "react";

export default function Auth() {
  const [auth, setAuth] = useState("isLogin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint =
      auth === "isLogin"
        ? `https://backend-production-909e.up.railway.app/api/auth/login`
        : `https://backend-production-909e.up.railway.app/api/auth/register`;
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error");
        return;
      }

      window.location.href = "/";
    } catch (error) {
      setError("Network error");
    }
  };

  return (
    <main className="text-gray-600 bg-linear-to-b from-pink-50 to-pink-200 h-screen w-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 bg-white/40 rounded-2xl p-10 shadow-xl"
      >
        <input
          className="border border-rose-500 rounded-full px-2 py-2 shadow-xl"
          placeholder="Nombre"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          className="border border-rose-500 rounded-full px-2 py-2 shadow-xl"
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button
          className="bg-rose-400 hover:bg-rose-500 text-white rounded-full px-4 py-2 shadow-xl"
          type="submit"
        >
          {auth === "isLogin" ? "Iniciar Sesión" : "Registrarse"}
        </button>
        {error && <div className="text-red-500 font-bold">{error}</div>}
        <div className="flex flex-col">
          {auth === "isLogin" ? "¿Aún no tienes cuenta?" : "¿Ya tienes cuenta?"}
          <button
            type="button"
            className="text-rose-400 hover:text-rose-500 font-bold ml-2"
            onClick={() =>
              setAuth(auth === "isLogin" ? "isRegister" : "isLogin")
            }
          >
            {auth === "isLogin" ? "Regístrate aquí" : "Inicia aquí"}
          </button>
        </div>
      </form>
    </main>
  );
}
