import { DataContext } from "../../context/DataContext"
import { useContext } from "react"

function UserActive() {
  const { user } = useContext(DataContext)
  return (
    <div className="mx-auto max-w-screen-xl px-2 py-2 sm:px-2 sm:py-2 lg:px-2">
      <h1 className="text-2xl font-bold sm:text-3xl text-center">
        Bienvenido{" "}
        {user && user.email
          ? user.email.split("@")[0].charAt(0).toUpperCase() +
            user.email.split("@")[0].slice(1) +
            "!"
          : "Guest"}
      </h1>
    </div>
  )
}

export { UserActive }
