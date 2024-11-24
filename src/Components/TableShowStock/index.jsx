import PropTypes from "prop-types"
function TableShowStock({ data, title, sortOrder }) {
  const products = [...data].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.quantity - b.quantity
    } else if (sortOrder === "desc") {
      return b.quantity - a.quantity
    } else {
      return 0
    }
  })
  return (
    <div
      style={{ height: "290px" }}
      className="overflow-x-auto rounded-lg border border-gray-200"
    >
      <h2 className="px-4 py-2 text-lg font-medium text-gray-800 bg-blue-200">
        {title}
      </h2>
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <tbody className="divide-y divide-gray-200">
          {products.map((item, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap px-4 py-2 font-light text-gray-900">
                {item.product}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export { TableShowStock }

TableShowStock.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
}
