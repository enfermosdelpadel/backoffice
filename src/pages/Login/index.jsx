import { supabase } from "../../supabase/client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/outline"

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await supabase.auth.signInWithPassword({ email, password })
      navigate("/")
    } catch (error) {
      alert(`Error signing in: ${error.message}`)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="mx-auto max-w-screen-xl  bg-gray-200 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Ingresar al sistema
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                autoComplete="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Ingresa tu user/email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <AtSymbolIcon className="size-4 text-gray-500" />
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <LockClosedIcon className="size-4 text-gray-500" />
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
