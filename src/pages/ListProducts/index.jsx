import Layout from "../../Components/Layout";
import { supabase } from "../../supabase/client";
import { useEffect, useState } from "react";
import { PlusIcon, MinusIcon, PencilIcon } from "@heroicons/react/24/outline";

const Showproducts = () => {
  const [product, setProduct] = useState([""]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        throw error;
      } else {
        setProduct(data);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Tipo
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Sub Tipo
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Marca
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Color
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Genero
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Talle
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Costo
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Stock
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Modificar
              </th>
            </tr>
          </thead>

          <tbody>
            {product.map((item, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap px-5 py-2 text-gray-700">
                  {item.type}
                </td>
                <td className="whitespace-nowrap px-5 py-2 text-gray-700">
                  {item.subType}
                </td>
                <td className="whitespace-nowrap px-5 py-2 text-gray-700">
                  {item.brand}
                </td>
                <td className="whitespace-nowrap px-5 py-2 text-gray-700">
                  {item.color}
                </td>
                <td className="whitespace-nowrap px-5 py-2 text-gray-700">
                  {item.gender}
                </td>
                <td className="whitespace-nowrap px-5 py-2 text-gray-700">
                  {item.size}
                </td>
                <td className="whitespace-nowrap px-5 py-2 text-gray-700">
                  {item.cost}
                </td>
                <td>
                  <div>
                    <label htmlFor="Quantity" className="sr-only">
                      Quantity
                    </label>

                    <div className="flex">
                      <button
                        type="button"
                        className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                      >
                        <MinusIcon className="size-5" />
                      </button>

                      <input
                        type="number"
                        id="Quantity"
                        value="1"
                        className="h-10 w-10 rounded border-gray-200 text-center"
                      />

                      <button
                        type="button"
                        className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                      >
                        <PlusIcon className="size-5" />
                      </button>
                    </div>
                  </div>
                </td>
                <td>
                  <button
                    type="submit"
                    className="btn-primary flex justify-center"
                  >
                    <PencilIcon className="size-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Showproducts;
