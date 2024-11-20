import { useMemo } from "react"

export default function useColumns() {
  const columns = useMemo(
    () => [
      {
        Header: "Creación",
        accessor: "created_at",
      },
      {
        Header: "Tipo",
        accessor: "type",
      },
      {
        Header: "Nombre",
        accessor: "product_name",
      },
      {
        Header: "Marca",
        accessor: "brand",
      },
      {
        Header: "Modelo",
        accessor: "model",
      },
      {
        Header: "Genero",
        accessor: "gender",
      },
      {
        Header: "Color",
        accessor: "color",
      },

      {
        Header: "SubTipo",
        accessor: "sub_type",
      },
    ],
    []
  )

  return columns
}
