import Layout from "../../Components/Layout"

import { CurrencyDollarIcon } from "@heroicons/react/24/outline"

import { useForm } from "react-hook-form"
import { useContext } from "react"
import { DataContext } from "../../context/DataContext"

function Prices() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const { types, updatePercentage } = useContext(DataContext)

  const onSubmit = (data) => {
    updatePercentage(data)
    console.log(data)
    reset()
  }
  return (
    <Layout>
      <div className="w-full mt-4 bg-white ">
        <div className="flex items-stretch px-3 pt-3 pb-2 bg-gray-300">
          <CurrencyDollarIcon className="h-6 w-6 mr-2 text-blue-900" />
          <h3 className="h3">Definir porcentajes de venta</h3>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full h-full p-4 pb-0"
        >
          <div className="mb-2 border border-gray-300 rounded-md p-4 mr-6 ml-4">
            <div className="grid grid-cols-3 gap-4 mb-2">
              <div className="grid grid-cols-1 gap-0 ">
                <label htmlFor="item" className="label-form">
                  Tipo:
                </label>
                <select
                  id="item"
                  {...register("item", { required: "select one option" })}
                  className="form-control"
                >
                  <option value="" hidden>
                    Seleccione un tipo
                  </option>
                  {types.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors && errors.item && (
                  <span className="span-error">Este campo es requerido</span>
                )}
              </div>
              <div className="grid grid-cols-1 gap-0 ">
                <label htmlFor="percentage" className="label-form">
                  Porcentaje:
                </label>
                <input
                  autoComplete="off"
                  id="percentage"
                  type="number"
                  placeholder="0"
                  {...register("percentage", { required: true })}
                />
                {errors && errors.percentage && (
                  <span className="span-error">Este campo es requerido</span>
                )}
              </div>

              <div className="grid grid-cols-1 gap-0 pt-2">
                <button className="btn-primary h-10 w-40">Guardar</button>
              </div>
            </div>
          </div>
        </form>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Porcentaje</th>
                <th>Fecha de cambio</th>
              </tr>
            </thead>
            <tbody>
              {types.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.adjustment_percentage}%</td>
                  <td>
                    {new Date(item.adjustement_date).toLocaleDateString(
                      "es-ES",
                      {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      }
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export { Prices }
