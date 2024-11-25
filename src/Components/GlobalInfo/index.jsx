import PropTypes from "prop-types"
import {
  BanknotesIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
  RectangleStackIcon,
  ChartBarSquareIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline"
function GlobalInfo({
  totalEarned,
  totalPurchased,
  totalSold,
  totalStock,
  totalOrders,
}) {
  return (
    <div className="flex flex-row space-y-12 sm:space-y-0 sm:space-x-4">
      <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-3 justify-center w-1/2 sm:w-auto">
        <span className="rounded-full bg-cyan-100 p-3 text-cyan-600">
          <ChartBarSquareIcon className="size-8" />
        </span>
        <p className="text-2xl font-medium text-gray-900">Totales</p>
      </article>
      <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-3 sm:justify-between">
        <span className="rounded-full bg-green-100 p-3 text-green-600 sm:order-last">
          <BanknotesIcon className="size-8" />
        </span>
        <div>
          <p className="text-2xl font-medium text-gray-900">
            {totalEarned.toLocaleString("es-AR", {
              maximumFractionDigits: 2,
              style: "currency",
              currency: "ARS",
              useGrouping: true,
            })}
          </p>
          <p className="text-sm text-gray-500"> en ganancias</p>
        </div>
      </article>
      <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-3 sm:justify-between">
        <span className="rounded-full bg-red-100 p-3 text-red-600 sm:order-last">
          <ShoppingBagIcon className="size-8" />
        </span>

        <div>
          <p className="text-2xl font-medium text-gray-900">
            {totalPurchased.toLocaleString("es-AR", {
              maximumFractionDigits: 2,
              style: "currency",
              currency: "ARS",
              useGrouping: true,
            })}
          </p>

          <p className="text-sm text-gray-500"> en compras</p>
        </div>
      </article>
      <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-3 sm:justify-between">
        <span className="rounded-full bg-blue-100 p-3 text-blue-600 sm:order-last">
          <ArrowTrendingUpIcon className="size-8" />
        </span>

        <div>
          <p className="text-2xl font-medium text-gray-900">
            {totalSold.toLocaleString("es-AR", {
              maximumFractionDigits: 2,
              style: "currency",
              currency: "ARS",
              useGrouping: true,
            })}
          </p>

          <p className="text-sm text-gray-500"> en ventas realizadas</p>
        </div>
      </article>
      <article className="flex items-center gap-4 w-56 rounded-lg border border-gray-100 bg-white p-3 sm:justify-between">
        <span className="rounded-full bg-orange-100 p-3 text-orange-600 sm:order-last">
          <ShoppingCartIcon className="size-8" />
        </span>
        <div>
          <p className="text-2xl font-medium text-gray-900">{totalOrders}</p>
          <p className="text-sm text-gray-500"> órdenes realizadas</p>
        </div>
      </article>
      <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-3 sm:justify-between">
        <span className="rounded-full bg-purple-100 p-3 text-purple-600 sm:order-last">
          <RectangleStackIcon className="size-8" />
        </span>
        <div>
          <div className="flex flex-row gap-2 ">
            <p className=" text-2xl font-medium text-gray-900">{totalStock} </p>
            <p className="text-2xl font-medium text-gray-900"> items</p>
          </div>
          <p className="text-sm text-gray-500"> en Stock</p>
        </div>
      </article>
    </div>
  )
}
export { GlobalInfo }

GlobalInfo.propTypes = {
  totalEarned: PropTypes.number.isRequired,
  totalPurchased: PropTypes.number.isRequired,
  totalSold: PropTypes.number.isRequired,
  totalStock: PropTypes.number.isRequired,
  totalOrders: PropTypes.number.isRequired,
}
