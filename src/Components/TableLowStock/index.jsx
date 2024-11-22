import PropTypes from "prop-types"
function TableLowStock({ lowStock }) {
  const products = [...lowStock].sort((a, b) => a.stock - b.stock)
  return (
    <div
      style={{ height: "290px" }}
      className="overflow-x-auto rounded-lg border border-gray-200"
    >
      <h2 className="px-4 py-2 text-lg font-medium text-gray-800 bg-red-200">
        Productos sin stock y próximos a agotarse
      </h2>
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <tbody className="divide-y divide-gray-200">
          {products.map((item, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap px-4 py-2 font-light text-gray-900">
                {item.product}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {item.stock}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export { TableLowStock }

TableLowStock.propTypes = {
  lowStock: PropTypes.array.isRequired,
}
