"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)  // Состояние для загрузки
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)  // Включаем загрузку

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })

    setLoading(false)  // Выключаем загрузку

    if (res.ok) {
      router.push("/login")
    } else {
      setError("Registration failed")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="w-full max-w-sm bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-amber-400 mb-1">
          Create Account
        </h2>
        <p className="text-sm text-center text-white/60 mb-6">
          Join the coffeewka ☕
        </p>

        {error && (
          <p className="text-red-400 text-sm text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 text-white bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 text-white bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 text-white bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}  // Блокируем кнопку при загрузке
            className={`w-full py-2 rounded-md font-medium transition active:scale-95 ${
              loading
                ? "bg-amber-300 text-black cursor-not-allowed"
                : "bg-amber-400 text-black hover:bg-amber-300"
            }`}
          >
            {loading ? "Loading..." : "Register"}  {/* Изменяем текст на кнопке */}
          </button>
        </form>

        <p className="text-center text-sm text-white/60 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-amber-400 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
