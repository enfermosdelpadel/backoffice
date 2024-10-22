import { supabase } from "../../supabase/client"
import { useNavigate } from "react-router-dom"
import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()
  const onSubmit = async (data) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })
    navigate("/")

    if (error) {
      alert(`Error en el Logueo: ${error.message}`)
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
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Ingresa tu user/email"
                {...register("email", { required: true })}
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <AtSymbolIcon className="size-4 text-gray-500" />
              </span>
            </div>
            {errors.email && (
              <span className="span-error">Debe ingresar un email</span>
            )}
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                id="password"
                autoComplete="current-password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Ingresa tu contraseña"
                {...register("password", { required: true })}
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <LockClosedIcon className="size-4 text-gray-500" />
              </span>
            </div>
            {errors.password && (
              <span className="span-error">Debe ingresar una contraseña</span>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button className="btn-primary">Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
