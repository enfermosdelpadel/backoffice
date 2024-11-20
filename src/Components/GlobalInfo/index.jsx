import PropTypes from "prop-types"
import {
  BanknotesIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline"
function GlobalInfo({ totalEarned, totalPurchased, totalSold }) {
  return (
    <div className="flex flex-col space-y-4">
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

          <p className="text-sm text-gray-500">Total Ganancias</p>
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

          <p className="text-sm text-gray-500">Total Compras</p>
        </div>
      </article>
      <article className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-3 sm:justify-between">
        <span className="rounded-full bg-blue-100 p-3 text-blue-600 sm:order-last">
          <ShoppingCartIcon className="size-8" />
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

          <p className="text-sm text-gray-500">Total Ventas</p>
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
}
