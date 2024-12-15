import { useForm } from "react-hook-form"
import { PlusIcon } from "@heroicons/react/24/outline"
// import { useContext } from "react"
// import { DataContext } from "../../context/DataContext"

import Layout from "../../Components/Layout"

import { Table } from "../../Components/Table"
import useRowsUsers from "../../hooks/Users/useRowsUsers"
import useColumnsUsers from "../../hooks/Users/useColumnsUsers"

import { Toaster } from "react-hot-toast"

function Users() {
  // const { insertSupplier } = useContext(DataContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    // watch,
  } = useForm()

  const onSubmit = async (data) => {
    // insertSupplier(data)
    console.log(data)
    reset()
  }

  return (
    <Layout>
      <Toaster gutter={30} duration={4000} />
      <div className="w-full">
        <div className="flex items-stretch px-3 pt-3 pb-2 bg-gray-300">
          <PlusIcon className="h-6 w-6 mr-2 text-blue-900" />
          <h3 className="text-lg font-medium text-blue-900">
            Añadir un usuario del sistema
          </h3>
        </div>
        <form
          className="flex flex-col w-full h-full p-4 bg-white rounded shadow-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="border border-gray-300 px-4 py-2 rounded pb-4 grid grid-cols-2 gap-4 mb-2">
            <div className="mb-4">
              <label className="label-form" htmlFor="dni">
                DNI (*){" "}
                {errors.dni && (
                  <span className="span-error">Este campo es requerido</span>
                )}
              </label>
              <input
                autoComplete="off"
                className="input-primary"
                id="dni"
                type="text"
                {...register("dni", { required: true })}
              />
            </div>
            <div className="mb-4">
              <label className="label-form" htmlFor="name">
                Nombre (*){" "}
                {errors.name && (
                  <span className="span-error">Este campo es requerido</span>
                )}
              </label>
              <input
                autoComplete="off"
                className="input-primary"
                id="name"
                type="text"
                {...register("name", { required: true })}
              />
            </div>
            <div className="mb-4">
              <label className="label-form" htmlFor="email">
                Correo Electrónico (*){" "}
                {errors.email && (
                  <span className="span-error">Este campo es requerido</span>
                )}
              </label>
              <input
                autoComplete="off"
                className="input-primary"
                id="email"
                type="email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="mb-4">
              <label className="label-form" htmlFor="phone">
                Teléfono (*){" "}
                {errors?.phone && (
                  <span className="text-red-500 text-xs italic">
                    Este campo es requerido
                  </span>
                )}
              </label>
              <input
                autoComplete="off"
                className="input-primary"
                id="phone"
                type="text"
                {...register("phone", { required: true })}
              />
            </div>
            <div className="mb-4">
              <label className="label-form" htmlFor="address">
                Dirección (*){" "}
                {errors.address && (
                  <span className="span-error">Este campo es requerido</span>
                )}
              </label>
              <input
                autoComplete="off"
                className="input-primary"
                id="address"
                type="text"
                {...register("address", { required: true })}
              />
            </div>
          </div>
          <div className="flex justify-start ">
            <button className="btn-primary ">Añadir usuario</button>
            <span className="p-2 pl-4">(*) Campos obligatorios</span>
          </div>
          <pre>{/* <code>{JSON.stringify(watch(), null, 2)}</code> */}</pre>
        </form>
      </div>
      <Table
        columns={useColumnsUsers()}
        data={useRowsUsers()}
        name="usuarios del sistema"
      />
    </Layout>
  )
}

export default Users
