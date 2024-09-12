import Layout from "../../Components/Layout"
import FormProducts from "../../Components/FormProducts"
import { useContext, useState, useCallback } from "react"
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

  // Sorting
  const [sort, setSort] = useState({ column: "id", order: "asc" })

  const handleSort = useCallback((column) => {
    setSort((prevSort) => {
      if (prevSort.column === column) {
        return { column, order: prevSort.order === "asc" ? "desc" : "asc" }
      }
      return { column, order: "asc" }
    })
  }, [])

  const sortedRows = currentRows.sort((a, b) => {
    if (sort.order === "asc") {
      return a[sort.column] > b[sort.column] ? 1 : -1
    }
    return a[sort.column] < b[sort.column] ? 1 : -1
  })

  // Pagination
  const renderRows = () => {
    return sortedRows.map((item, index) => (
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
            title="Editar"
          >
            <PencilIcon className="size-5" />
          </button>
        </td>
        <td>
          <button
            onClick={() => handleDelete(item.id)}
            className="btn-delete flex justify-center"
            title="Eliminar"
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
        <div className="overflow-x-auto sm:rounded-lg">
          <table className="w-full text-left  rtl:text-right divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th
                  scope="col"
                  onClick={() => handleSort("type")}
                  className="th"
                >
                  Tipo
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort("subType")}
                  className="th"
                >
                  Sub Tipo
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort("model")}
                  className="th"
                >
                  Modelo
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort("brand")}
                  className="th"
                >
                  Marca
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort("color")}
                  className="th"
                >
                  Color
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort("gender")}
                  className="th"
                >
                  Genero
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort("size")}
                  className="th"
                >
                  Talle
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort("cost")}
                  className="th"
                >
                  Costo
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort("price")}
                  className="th"
                >
                  Precio de Venta
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort("stock")}
                  className="th"
                >
                  Stock
                </th>
                <th></th>
                <th></th>
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
