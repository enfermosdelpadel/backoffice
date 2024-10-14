import "regenerator-runtime/runtime"
import PropTypes from "prop-types"
import { useAsyncDebounce } from "react-table"
import { useState } from "react"
import "./styles.css"

function ProducsFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const totalProdsAvailable = preGlobalFilteredRows.length
  const [value, setValue] = useState(globalFilter)

  const onFilterChange = useAsyncDebounce(
    (value) => setGlobalFilter(value || undefined),
    200
  )

  const handleInputChange = (e) => {
    setValue(e.target.value)
    onFilterChange(e.target.value)
  }

  return (
    <span className="style-filter">
      Buscar productos:{" "}
      <input
        size={50}
        value={value || ""}
        onChange={handleInputChange}
        placeholder={"  " + `${totalProdsAvailable} productos disponibles...`}
      />
    </span>
  )
}

ProducsFilter.propTypes = {
  preGlobalFilteredRows: PropTypes.array.isRequired,
  globalFilter: PropTypes.node,
  setGlobalFilter: PropTypes.func.isRequired,
}
export { ProducsFilter }
