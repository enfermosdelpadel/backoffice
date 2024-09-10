import Layout from "../../Components/Layout"
import FormProducts from "../../Components/FormProducts"
import { useContext, useState } from "react"
import {
  PencilIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline"
import { DataContext } from "../../context/DataContext"

const Showproducts = () => {
  const context = useContext(DataContext)
  const products = context.products

  const handleDelete = async (id) => {
    if (!confirm("¿Deseas eliminar este producto?")) return
    await context.deleteProduct(id)
  }

  const handleEdit = async (item) => {
    context.setSelectedItem(item)
    context.openForm()
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage] = useState(10)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = products.slice(indexOfFirstRow, indexOfLastRow)

  const renderRows = () => {
    return currentRows.map((item, index) => (
      <tr key={index}>
        <td className="hidden">{item.id}</td>
        <td className="hidden">{item.fileUrl}</td>
        <td className="td">{item.type}</td>
        <td className="td">{item.subType}</td>
        <td className="td">{item.model}</td>
        <td className="td">{item.brand}</td>
        <td className="td">{item.color}</td>
        <td className="td">{item.gender}</td>
        <td className="td">{item.size}</td>
        <td className="td">{item.cost}</td>
        <td className="td">{item.price}</td>
        <td className="td">{item.stock}</td>

        <td>
          <button
            onClick={() => handleEdit(item)}
            className="btn-primary flex justify-center"
          >
            <PencilIcon className="size-5" />
          </button>
        </td>
        <td>
          <button
            onClick={() => handleDelete(item.id)}
            className="btn-delete flex justify-center"
          >
            <TrashIcon className="size-5" />
          </button>
        </td>
      </tr>
    ))
  }

  const renderPagination = () => {
    const pageNumbers = []
    for (
      let i = 1;
      i <= Math.ceil(context.products.length / rowsPerPage);
      i++
    ) {
      pageNumbers.push(i)
    }

    return pageNumbers.map((pageNumber) => (
      <li
        className={pageNumber === currentPage ? "li-active" : "li"}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </li>
    ))
  }

  return (
    <Layout>
      <div className="rounded-t-lg border-b border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="th">Tipo</th>
                <th className="th">Sub Tipo</th>
                <th className="th">Modelo</th>
                <th className="th">Marca</th>
                <th className="th">Color</th>
                <th className="th">Genero</th>
                <th className="th">Talle</th>
                <th className="th">Costo</th>
                <th className="th">Precio de Venta</th>
                <th className="th">Stock</th>
                <th className="th">Modificar</th>
                <th className="th">Eliminar</th>
              </tr>
            </thead>

            <tbody>{renderRows()}</tbody>
          </table>
        </div>
        <div className="rounded-b-lg border-t border-gray-200 px-4 py-2 bg-white">
          <ol className="flex justify-end gap-1 text-xs font-medium bg-white">
            <li>
              <a className="chevron">
                <span className="sr-only">Prev Page</span>
                <ChevronLeftIcon className="size-3" />
              </a>
            </li>

            {renderPagination()}

            <li>
              <a className="chevron">
                <span className="sr-only">Next Page</span>
                <ChevronRightIcon className="size-3" />
              </a>
            </li>
          </ol>
        </div>
      </div>
      <FormProducts />
    </Layout>
  )
}

export default Showproducts
