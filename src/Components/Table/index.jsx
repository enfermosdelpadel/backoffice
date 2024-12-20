import { TableFilter } from "../TableFilter"
import PropTypes from "prop-types"
import { CSVLink } from "react-csv"

import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table"

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ClipboardDocumentListIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline"

function Table(props) {
  const { columns, data, name } = props

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
  const csvData = [
    columns.map((column) => column.Header),
    ...data.map((row) => columns.map((column) => row[column.accessor])),
  ]
  return (
    <>
      <div className="w-full mt-4 bg-white ">
        <div className="flex items-stretch px-3 pt-3 pb-2 bg-gray-300">
          <ClipboardDocumentListIcon className="h-6 w-6 mr-2 text-blue-900" />
          <h3 className="text-lg font-medium text-blue-900">
            Listado de {name}
          </h3>
          <div className="flex items-center justify-end ml-auto">
            <CSVLink
              data={csvData}
              filename={`${name}_${new Date().toISOString().split("T")[0]}.csv`}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Exportar a CSV
            </CSVLink>
          </div>
        </div>
        <div className="container">
          <table {...getTableProps()}>
            <thead>
              <tr>
                <th colSpan={10}>
                  <TableFilter
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
                          style={{
                            cursor: "pointer",
                            width: column.width,
                            minWidth: column.minWidth,
                          }}
                        >
                          <span className="flex items-center">
                            {column.render("Header")}
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <ArrowUpIcon className="h-4 w-4 ml-1" />
                              ) : (
                                <ArrowDownIcon className="h-4 w-4 ml-1" />
                              )
                            ) : (
                              ""
                            )}
                          </span>
                        </th>
                      ))
                    }
                  </tr>
                ))
              }
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.length === 0 ? (
                <tr>
                  <td colSpan={headerGroups[0].headers.length}>
                    <div className="text-center">No hay {name}!</div>
                  </td>
                </tr>
              ) : (
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
              )}
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
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
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
              id="pageSize"
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
      </div>
    </>
  )
}

export { Table }

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
}
