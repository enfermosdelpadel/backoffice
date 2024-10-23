import Layout from "../../Components/Layout"
import { PlusIcon } from "@heroicons/react/24/outline"
import { useForm } from "react-hook-form"

import { Table } from "../../Components/Table"
import useRowsPurchases from "../../hooks/Purchases/useRowsPurchases"
import useColumnsPurchases from "../../hooks/Purchases/useColumnsPurchases"
import useRowsProdutcs from "../../hooks/Products/useRowsProdutcs"

import { useContext } from "react"
import { DataContext } from "../../context/DataContext"

function Purchases() {
  const { suppliers, insertPurchase, loading, colors, sizes, genders } =
    useContext(DataContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const products = useRowsProdutcs().sort((a, b) =>
    a.product_name.localeCompare(b.product_name)
  )

  const onSubmit = (data) => {
    const total_cost = data.quantity * data.uni_cost

    insertPurchase(data, total_cost)
    console.log("Formulario enviado:", data, total_cost)

    reset()
  }

  return (
    <Layout>
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
                Proveedor
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
              {errors.supplier && (
                <span className="span-error">Este campo es requerido</span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="label-form" htmlFor="product">
                Producto
              </label>
              <select
                id="product"
                {...register("product", { required: "select one option" })}
              >
                <option value="" hidden>
                  Seleccione un Producto
                </option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product?.product_name}
                  </option>
                ))}
              </select>
              {errors.product && (
                <span className="span-error">Este campo es requerido</span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="label-form" htmlFor="size">
                Talle
              </label>
              <select
                id="size"
                {...register("size", { required: "select one option" })}
              >
                <option value="" hidden>
                  Seleccionar Talle
                </option>
                {sizes.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size?.name}
                  </option>
                ))}
              </select>
              {errors.size && (
                <span className="span-error">Este campo es requerido</span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="label-form" htmlFor="color">
                Color
              </label>
              <select
                id="color"
                {...register("color", { required: "select one option" })}
              >
                <option value="" hidden>
                  Seleccionar color
                </option>
                {colors.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color?.name}
                  </option>
                ))}
              </select>
              {errors.color && (
                <span className="span-error">Este campo es requerido</span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="label-form" htmlFor="gender">
                Genero
              </label>
              <select
                id="gender"
                {...register("gender", { required: "select one option" })}
              >
                <option value="" hidden>
                  Seleccionar genero
                </option>
                {genders.map((gender) => (
                  <option key={gender.id} value={gender.id}>
                    {gender?.name}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <span className="span-error">Este campo es requerido</span>
              )}
            </div>
          </div>
          <div className="border border-gray-300 px-4 py-2 rounded pb-4 grid grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="label-form" htmlFor="quantity">
                Cantidad
              </label>
              <input
                autoComplete="off"
                id="quantity"
                type="number"
                placeholder="0"
                {...register("quantity", { required: true })}
              />
              {errors.quantity && (
                <span className="span-error">Este campo es requerido</span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="label-form" htmlFor="uni_cost">
                Precio Unitario
              </label>
              <input
                autoComplete="off"
                id="uni_cost"
                type="number"
                placeholder="0"
                {...register("uni_cost", { required: true })}
              />
              {errors.uni_cost && (
                <span className="span-error">Este campo es requerido</span>
              )}
            </div>
          </div>
          <div className="flex justify-start ">
            <button className="btn-primary ">
              {loading ? "Loading..." : "Añadir Compra"}
            </button>
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
