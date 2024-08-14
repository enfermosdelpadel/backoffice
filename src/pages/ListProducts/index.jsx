import Layout from "../../Components/Layout";
import { supabase } from "../../supabase/client";
import { useEffect, useState } from "react";

const reactimages =
  "https://cniymayhyvbjdmrlopea.supabase.co/storage/v1/object/public/images/";

const Showproducts = () => {
  const [product, setProduct] = useState([]);

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
                Imagen
              </th>
            </tr>
          </thead>

          <tbody>
            {product.map((item) => (
              <tr key={item.id}>
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
                  <figure className="w-20 h-20">
                    <img
                      className="size-20 rounded-lg object-cover"
                      src={`${reactimages}/${item.fileUrl}`}
                    />
                  </figure>
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
