import Layout from "../../Components/Layout"
import { ProducsFilter } from "../../Components/ProducsFilter"
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table"
import useRows from "../../hooks/useRows"
import useColumns from "../../hooks/useColumns"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline"

function ListProducts() {
  const columns = useColumns()
  const data = useRows()

  const table = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
        pageIndex: 0,
        globalFilter: "",
        sortBy: [],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const {
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { globalFilter, pageIndex, pageSize },
  } = table

  return (
    <Layout>
      {/* Añadimos las propiedades a nuestra tabla nativa */}
      <div className="container">
        <table {...getTableProps()}>
          <thead>
            <tr>
              <th colSpan={4}>
                <ProducsFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </th>
            </tr>
            {
              // Recorremos las columnas que previamente definimos
              headerGroups.map((headerGroup, index) => (
                // Añadimos las propiedades al conjunto de columnas
                <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Recorremos cada columna del conjunto para acceder a su información
                    headerGroup.headers.map((column, columnIndex) => (
                      // Añadimos las propiedades a cada celda de la cabecera
                      <th
                        key={columnIndex}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        className={
                          column.isSorted
                            ? column.isSortedDesc
                              ? "desc"
                              : "asc"
                            : ""
                        }
                      >
                        {
                          // Pintamos el título de nuestra columna (propiedad "Header")
                          column.render("Header")
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>

          <tbody {...getTableBodyProps()}>
            {
              // Recorremos las filas
              page.map((row, index) => {
                // Llamamos a la función que prepara la fila previo renderizado
                prepareRow(row)
                return (
                  // Añadimos las propiedades a la fila
                  <tr key={index} {...row.getRowProps()}>
                    {
                      // Recorremos cada celda de la fila
                      row.cells.map((cell, index) => {
                        // Añadimos las propiedades a cada celda de la fila
                        return (
                          <td key={index} {...cell.getCellProps()}>
                            {
                              // Pintamos el contenido de la celda
                              cell.render("Cell")
                            }
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <div className="pagination">
          <span>
            Página {""}
            <strong>
              {pageIndex + 1} {""}de {""}
              {pageOptions.length}
            </strong>
          </span>
          <div className="controls">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              <ChevronDoubleLeftIcon className="page-controller" />
            </button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              <ChevronLeftIcon className="page-controller" />
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              <ChevronRightIcon className="page-controller" />
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <ChevronDoubleRightIcon className="page-controller" />
            </button>
          </div>

          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 15].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Layout>
  )
}

export { ListProducts }
