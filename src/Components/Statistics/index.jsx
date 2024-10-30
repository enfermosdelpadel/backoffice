import { DataContext } from "../../context/DataContext"
import { useContext } from "react"
import { sockTotal } from "../../util"

function Statistics() {
  const { user, stock } = useContext(DataContext)
  const stock_total = sockTotal(stock)
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <h1 className="text-2xl font-bold sm:text-3xl text-center">
        Bienvenido{" "}
        {user.email?.split("@")[0].charAt(0).toUpperCase() +
          user.email?.split("@")[0].slice(1) +
          "!"}
      </h1>
      <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-500">
            Ventas Totales
          </dt>

          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
            $4.8m
          </dd>
        </div>

        <div className="flex flex-col rounded-lg bg-green-50 px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-500">
            Stock Total
          </dt>

          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
            {isNaN(stock_total) ? "..." : stock_total}
          </dd>
        </div>

        <div className="flex flex-col rounded-lg bg-red-50 px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-500">
            Clientes Totales
          </dt>

          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
            86
          </dd>
        </div>
        <div className="flex flex-col rounded-lg bg-red-50 px-4 py-8 text-center">
          <dt className="order-last text-lg font-medium text-gray-500">
            Usuarios de sistema
          </dt>

          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
            2
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default Statistics
