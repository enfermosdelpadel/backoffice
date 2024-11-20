import { XMarkIcon } from "@heroicons/react/24/outline"
import PropTypes from "prop-types"

function StatusModal({
  orderId,
  setModalStatus,
  changeStatus,
  sendEmail,
  userEmail,
}) {
  const handleStatusChange = async (e) => {
    e.preventDefault()
    const msgEnviado =
      "<br/> Pronto tendrás los productos en tu casa. <br/><br/>EDP"
    const msgEntregado =
      "<br/> Espero que lo disfrutes<br/> <br/> Gracias por tu compra!<br/><br/>EDP"
    const status = e.target.value
    const infoMail = {
      to: userEmail,
      subject: "Cambio de estado del Pedido",
      html: `El estado del pedido ${orderId} a cambiado a ${status}.<br/>${
        status === "Enviado" ? msgEnviado : msgEntregado
      }`,
    }
    sendEmail(infoMail)
    await changeStatus(orderId, status)
  }

  return (
    <div className="bg-white rounded-lg w-96 h-96 p-5">
      <div className="flex justify-end">
        <button
          onClick={() => setModalStatus(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
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
              onClick={handleStatusChange}
              type="radio"
              name="StatusOption"
              value="Enviado"
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
              onClick={handleStatusChange}
              type="radio"
              name="StatusOption"
              value="Entregado"
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

StatusModal.propTypes = {
  orderId: PropTypes.string.isRequired,
  setModalStatus: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  sendEmail: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired,
}
