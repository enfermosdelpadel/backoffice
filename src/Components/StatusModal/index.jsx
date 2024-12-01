import { XMarkIcon } from "@heroicons/react/24/outline"
import PropTypes from "prop-types"

function StatusModal({
  orderId,
  setModalStatus,
  changeStatus,
  sendEmail,
  userEmail,
  orderNumber,
  clientName,
}) {
  const handleStatusChange = async (e) => {
    e.preventDefault()
    const msgEnviado = `Pronto tendrás los productos en tu casa! <br/><br/>`
    const msgEntregado = `Esperamos que lo disfrutes<br/> <br/> Gracias por tu compra! &#129392;<br/><br/>`
    const status = e.target.value
    const infoMail = {
      to: userEmail,
      subject: "EDP - Cambio de estado del Pedido",
      html: `<div style="font-family: sans-serif; font-size: 1.2rem; line-height: 1rem; background-color: #f5f5f5; padding: 1rem;">
        <h3 style="color: #333; font-weight: 600; margin-bottom: 0.5rem;">Hola ${clientName}! &#128075;</h3>
        <p style="margin-bottom: 0.5rem;">El estado del pedido &#128666; <strong>#${orderNumber}</strong> ha cambiado a <strong>${status}</strong></p>
        <p style="color: #666; font-size: 1rem;">${
          status === "Enviado" ? msgEnviado : msgEntregado
        }</p>
        <p style="text-align: center; margin-top: 0.5rem;">
          <a href="https://edp-front.netlify.app/">
            <img
              src="https://cniymayhyvbjdmrlopea.supabase.co/storage/v1/object/public/images/public/utils/footer-mail.png?t=2024-11-29T23%3A26%3A25.470Z"
              alt="Logo de EDG"
              style="width: 100%; height: auto; max-width: 694px;"
            />
          </a>
        </p>
      </div>`,
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
  orderNumber: PropTypes.string.isRequired,
  clientName: PropTypes.string.isRequired,
}
