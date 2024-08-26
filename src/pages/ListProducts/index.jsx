import Layout from "../../Components/Layout"
import { useContext } from "react"
import { PencilIcon } from "@heroicons/react/24/outline"
import { DataContext } from "../../context/DataContext"

const Showproducts = () => {
  const context = useContext(DataContext)
  const product = context.product

  return (
    <Layout>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="th">Tipo</th>
              <th className="th">Sub Tipo</th>
              <th className="th">Marca</th>
              <th className="th">Color</th>
              <th className="th">Genero</th>
              <th className="th">Talle</th>
              <th className="th">Costo</th>
              <th className="th">Precio de Venta</th>
              <th className="th">Stock</th>
              <th className="th">Modificar</th>
            </tr>
          </thead>

          <tbody>
            {product.map((item, index) => (
              <tr key={index}>
                <td className="td">{item.type}</td>
                <td className="td">{item.subType}</td>
                <td className="td">{item.brand}</td>
                <td className="td">{item.color}</td>
                <td className="td">{item.gender}</td>
                <td className="td">{item.size}</td>
                <td className="td">{item.cost}</td>
                <td className="td">{item.price}</td>
                <td className="td">{item.stock}</td>
                <td>
                  <button
                    type="submit"
                    className="btn-primary flex justify-center"
                  >
                    <PencilIcon className="size-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export default Showproducts
