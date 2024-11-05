import { useContext } from "react"
import { DataContext } from "../../context/DataContext"
import { PropTypes } from "prop-types"
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline"

const FormOrderDetail = (props) => {
  const { orderDetails } = useContext(DataContext)
  const { orderId } = props
  return (
    <div className="w-full mt-4 bg-white ">
      <div className="flex items-stretch px-3 pt-3 pb-2 bg-gray-300">
        <ClipboardDocumentIcon className="h-6 w-6 mr-2 text-blue-900" />
        <h3 className="h3">Detalle del pedido</h3>
      </div>
      <div className="flex flex-col w-full h-full p-4 pb-4">
        <div className="grid grid-cols-3">
          <div className="text-center font-bold bg-blue-400 border px-2 py-1">
            Producto
          </div>
          <div className="text-center font-bold bg-blue-400 border px-2 py-1">
            Cantidad
          </div>
          <div className="text-center font-bold bg-blue-400 border px-2 py-1">
            Precio Unitario
          </div>
        </div>
        {orderDetails
          ?.filter((detail) => detail.order_id === orderId)
          .map((detail) => (
            <div key={detail.id}>
              <div className="grid grid-cols-3">
                <div className="text-center border px-2 py-1">
                  {detail.products.sub_type +
                    " " +
                    detail.products.brand +
                    " " +
                    detail.products.model}
                </div>
                <div className="text-center border px-2 py-1">
                  {detail.quantity}
                </div>
                <div className="text-center border px-2 py-1">
                  {detail.unit_price.toLocaleString("es-AR", {
                    maximumFractionDigits: 2,
                    style: "currency",
                    currency: "ARS",
                    useGrouping: true,
                  })}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
export default FormOrderDetail

FormOrderDetail.propTypes = {
  orderId: PropTypes.number,
}
