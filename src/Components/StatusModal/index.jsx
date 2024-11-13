import { XMarkIcon } from "@heroicons/react/24/outline"
import { DataContext } from "../../context/DataContext"
import { useContext } from "react"

function StatusModal() {
  const { orderId, setModalStatus } = useContext(DataContext)
  return (
    <div className="bg-white rounded-lg w-96 h-96 p-5">
      <div className="flex justify-end">
        <button
          onClick={() => setModalStatus(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <fieldset className="space-y-4">
        <legend className="sr-only">Status</legend>
        <div className="flex justify-center items-center px-3 pt-3 pb-2 bg-slate-100">
          <h2 className=" text-2xl">Cambiar estado del pedido</h2>
        </div>

        <div>
          <label
            htmlFor="StatusStandard"
            className="flex cursor-pointer items-center justify-center gap-4 rounded-lg border border-gray-100 bg-blue-600 p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
          >
            <p className="text-white">Enviado</p>

            <input
              type="radio"
              name="StatusOption"
              value="StatusStandard"
              id="StatusStandard"
              className="sr-only"
              checked
            />
          </label>
        </div>

        <div>
          <label
            htmlFor="StatusPriority"
            className="flex cursor-pointer items-center justify-center gap-4 rounded-lg border border-gray-100 bg-green-600 p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
          >
            <p className="text-white">Entregado</p>

            <input
              type="radio"
              name="StatusOption"
              value="StatusPriority"
              id="StatusPriority"
              className="sr-only"
            />
          </label>
        </div>
      </fieldset>
    </div>
  )
}
export { StatusModal }
