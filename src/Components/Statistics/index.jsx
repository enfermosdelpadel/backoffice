import { DataContext } from "../../context/DataContext"
import { useContext } from "react"
import { sockTotal } from "../../util"

function Statistics() {
  const context = useContext(DataContext)
  const stock = sockTotal(context.products)
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
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
            {isNaN(stock) ? "..." : stock}
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
      </dl>
    </div>
  )
}

export default Statistics
