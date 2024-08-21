import Layout from "../../Components/Layout";
import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";

const Users = () => {
  const context = useContext(TaskContext);

  return (
    <Layout>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Nombre
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Apellido
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Documento
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Dirección
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Fecha Nacimiento
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Correo
              </th>
            </tr>
          </thead>

          <tbody>
            {context.profile.map((item) => (
              <tr key={item.id}>
                <td className="whitespace-nowrap px-5 py-2 text-gray-700">
                  {item.first_name}
                </td>
                <td className="whitespace-nowrap px-5 py-2 text-gray-700">
                  {item.last_name}
                </td>
                <td className="whitespace-nowrap px-5 py-2 text-gray-700">
                  {item.dni}
                </td>
                <td className="whitespace-nowrap px-5 py-2 text-gray-700">
                  {item.address}
                </td>
                <td className="whitespace-nowrap px-5 py-2 text-gray-700">
                  {new Date(item.date_of_birth).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </td>

                <td className="whitespace-nowrap px-5 py-2 text-gray-700">
                  {item.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Users;
