import Layout from "../../Components/Layout"
import { PlusIcon } from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"

import { Table } from "../../Components/Table"
import useRowsPurchases from "../../hooks/Purchases/useRowsPurchases"
import useColumnsPurchases from "../../hooks/Purchases/useColumnsPurchases"
import useRowsProdutcs from "../../hooks/Products/useRowsProdutcs"

import { useContext, useMemo, useState } from "react"
import { DataContext } from "../../context/DataContext"

import { Toaster } from "react-hot-toast"

function Purchases() {
  const { suppliers, insertPurchase, loading, sizes } = useContext(DataContext)

  const [selectedProduct, setSelectedProduct] = useState(null)

  const handleSizeChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex]
    const selectedType = selectedOption.getAttribute("data-type")
    setSelectedProduct(selectedType)
  }

  const filteredSizes = useMemo(() => {
    if (selectedProduct === "Indumentaria") {
      return sizes.filter((size) => size.category === "clothing")
    } else if (selectedProduct === "Zapatillas") {
      return sizes.filter((size) => size.category === "shoes")
    }
    return []
  }, [selectedProduct, sizes])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const products = useRowsProdutcs()
    .map((p) => {
      if (p.type !== "Paleta") {
        return {
          ...p,
          product_name: `${p.product_name} ${p.gender} ${p.color}`,
        }
      }
      return p
    })
    .sort((a, b) => a.product_name.localeCompare(b.product_name))

  const onSubmit = (data) => {
    const total_cost = data.quantity * data.uni_cost

    insertPurchase(data, total_cost)

    reset()
  }

  return (
    <Layout>
      <Toaster gutter={30} duration={4000} />
      <div className="w-full">
        <div className="flex items-stretch px-3 pt-3 pb-2 bg-gray-300">
          <PlusIcon className="h-6 w-6 mr-2 text-blue-900" />
          <h3 className="text-lg font-medium text-blue-900">
            Añadir una compra
          </h3>
        </div>
        <form
          className="flex flex-col w-full h-full p-4 bg-white rounded shadow-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="border border-gray-300 px-4 py-2 rounded pb-4 grid grid-cols-2 gap-4 mb-2">
            <div className="flex flex-col">
              <label className="label-form" htmlFor="supplier">
                Proveedor (*){" "}
                {errors.supplier && (
                  <span className="span-error">Este campo es requerido</span>
                )}
              </label>
              <select
                id="supplier"
                name="supplier"
                {...register("supplier", { required: "select one option" })}
              >
                <option value="" hidden>
                  Seleccione un Proveedor
                </option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier?.company}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="label-form" htmlFor="product">
                Producto (*){" "}
                {errors.product && (
                  <span className="span-error">Este campo es requerido</span>
                )}
              </label>
              <select
                onInput={handleSizeChange}
                id="product"
                {...register("product", { required: "select one option" })}
              >
                <option value="" hidden>
                  Seleccione un Producto
                </option>
                {products.map((product) => (
                  <option
                    data-type={product.type}
                    key={product.id}
                    value={product.id}
                  >
                    {product?.product_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="label-form" htmlFor="size">
                Talle
              </label>
              <select id="size" {...register("size")}>
                <option value="" hidden>
                  Seleccionar Talle
                </option>
                {filteredSizes.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="border border-gray-300 px-4 py-2 rounded pb-4 grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="label-form" htmlFor="quantity">
                Cantidad (*){" "}
                {errors.quantity && (
                  <span className="span-error">Este campo es requerido</span>
                )}
              </label>
              <input
                autoComplete="off"
                id="quantity"
                type="number"
                placeholder="0"
                {...register("quantity", { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <label className="label-form" htmlFor="uni_cost">
                Precio Unitario (*){" "}
                {errors.uni_cost && (
                  <span className="span-error">Este campo es requerido</span>
                )}
              </label>
              <input
                autoComplete="off"
                id="uni_cost"
                type="number"
                placeholder="0"
                {...register("uni_cost", { required: true })}
              />
            </div>
          </div>
          <div className="flex justify-start ">
            <button className="btn-primary ">
              {loading ? "Guardando..." : "Añadir Compra"}
            </button>
            <span className="p-2 pl-4"> (*) Campos obligatorios </span>
          </div>
        </form>
      </div>
      <Table
        columns={useColumnsPurchases()}
        data={useRowsPurchases()}
        name={"Compras"}
      />
    </Layout>
  )
}

export { Purchases }
