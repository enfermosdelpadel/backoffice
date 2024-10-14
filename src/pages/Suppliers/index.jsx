import { useForm } from "react-hook-form"
import { useState } from "react"
import Layout from "../../Components/Layout"

function Supliers() {
  const proveedores = [
    {
      id: 1,
      nombre: "Proveedor 1",
      compania: "Compañía 1",
      correo: "proveedor1@example.com",
      telefono: "123-456-7890",
      direccion: "Calle 1, Ciudad 1",
    },
    {
      id: 2,
      nombre: "Proveedor 2",
      compania: "Compañía 2",
      correo: "proveedor2@example.com",
      telefono: "987-654-3210",
      direccion: "Calle 2, Ciudad 2",
    },
    {
      id: 3,
      nombre: "Proveedor 3",
      compania: "Compañía 3",
      correo: "proveedor3@example.com",
      telefono: "555-123-4567",
      direccion: "Calle 3, Ciudad 3",
    },
    {
      id: 4,
      nombre: "Proveedor 4",
      compania: "Compañía 4",
      correo: "proveedor4@example.com",
      telefono: "901-234-5678",
      direccion: "Calle 4, Ciudad 4",
    },
    {
      id: 5,
      nombre: "Proveedor 5",
      compania: "Compañía 5",
      correo: "proveedor5@example.com",
      telefono: "111-222-3333",
      direccion: "Calle 5, Ciudad 5",
    },
  ]

  const { register, handleSubmit, errors } = useForm()
  const [proveedor, setProveedor] = useState({})

  const onSubmit = async (data) => {
    // Aquí puedes hacer la lógica para guardar el proveedor en tu backend
    console.log(data)
  }

  return (
    <Layout>
      <div className="flex flex-row w-full justify-center ">
        <div className="w-1/4 p-4 bg-white rounded shadow-md">
          <h2 className="text-lg font-bold mb-4">Cargar Proveedor</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre del Proveedor
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="nombre"
                type="text"
                {...register("nombre", { required: true })}
              />
              {errors?.nombre && (
                <p className="text-red-500 text-xs italic">
                  Este campo es requerido
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="compania"
              >
                Compañía
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="compania"
                type="text"
                {...register("compania", { required: true })}
              />
              {errors?.compania && (
                <p className="text-red-500 text-xs italic">
                  Este campo es requerido
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="correo"
              >
                Correo Electrónico
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="correo"
                type="email"
                {...register("correo", { required: true })}
              />
              {errors?.correo && (
                <p className="text-red-500 text-xs italic">
                  Este campo es requerido
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="telefono"
              >
                Teléfono
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="telefono"
                type="text"
                {...register("telefono", { required: true })}
              />
              {errors?.telefono && (
                <p className="text-red-500 text-xs italic">
                  Este campo es requerido
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="direccion"
              >
                Dirección
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="direccion"
                type="text"
                {...register("direccion", { required: true })}
              />
              {errors?.direccion && (
                <p className="text-red-500 text-xs italic">
                  Este campo es requerido
                </p>
              )}
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Cargar Proveedor
            </button>
          </form>
        </div>
        <div className="w-1/2 p-4 bg-white rounded shadow-md">
          <h2 className="text-lg font-bold mb-4">Listado de Proveedores</h2>
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="border border-gray-400 p-2">Nombre</th>
                <th className="border border-gray-400 p-2">Compañía</th>
                <th className="border border-gray-400 p-2">
                  Correo Electrónico
                </th>
                <th className="border border-gray-400 p-2">Teléfono</th>
                <th className="border border-gray-400 p-2">Dirección</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.map((proveedor, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 p-2">
                    {proveedor.nombre}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {proveedor.compania}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {proveedor.correo}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {proveedor.telefono}
                  </td>
                  <td className="border border-gray-400 p-2">
                    {proveedor.direccion}
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

export { Supliers }
