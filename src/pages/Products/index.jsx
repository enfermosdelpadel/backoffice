import { useState } from "react";
import { supabase } from "../../supabase/client";
import Layout from "../../Components/Layout";

const Products = () => {
  const bucket = import.meta.env.VITE_BUKCKET_NAME;
  //   const navigate = useNavigate();
  const [type, setType] = useState("");
  const [subType, setSubType] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [formError, setFormError] = useState(null);

  const uploadImage = async (e) => {
    const date = Date.now();
    const imageFile = e.target.files[0];
    const { data, error } = await supabase.storage
      .from("images/")
      .upload(`public/${date}.png`, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });
    console.log("success", data);
    console.log("error", error);
    if (data) {
      setFileUrl(`${bucket}${data.path}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!name || !brand || !category || !model || !fileUrl) {
    //   setFormError("Please fill in all the fields.");
    // }

    const { data, error } = await supabase.from("products").insert([
      {
        type,
        subType,
        brand,
        color,
        gender,
        size,
        cost,
        price,
        desc,
        fileUrl,
      },
    ]);

    if (error) {
      console.log(error);
      setFormError("Please fill in all the fields.");
    }

    if (data) {
      setFormError(null);
    }
  };

  return (
    <Layout>
      <div className="rounded-lg bg-gray-100 p-8 shadow-lg">
        <form onSubmit={handleSubmit} className=" mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Tipo</label>

            <input
              type="text"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              name="type"
              className="input-primary"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label className="label">Sub Tipo</label>

            <input
              type="text"
              id="subType"
              value={subType}
              onChange={(e) => setSubType(e.target.value)}
              name="subType"
              className="input-primary"
            />
          </div>

          <div className="col-span-6 sm:col-span-3 ">
            <label className="label">Marca</label>

            <input
              type="text"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              name="brand"
              className="input-primary"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label className="label">Color</label>

            <input
              type="text"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              name="color"
              className="input-primary"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label className="label">Genero</label>

            <input
              type="text"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              name="gender"
              className="input-primary"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Talle</label>

            <input
              type="text"
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              name="size"
              className="input-primary"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Costo</label>

            <input
              type="text"
              id="cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              name="cost"
              className="input-primary"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Precio Venta</label>

            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              name="price"
              className="input-primary"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Stock</label>

            <input
              type="text"
              id="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              name="stock"
              className="input-primary"
            />
          </div>
          <div className="col-span-6">
            <label className="label">Descripción</label>
            <textarea
              className="input-primary"
              type="text"
              rows="5"
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              name="desc"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">Imagen</label>

            <input
              type="file"
              id="fileUrl"
              onChange={uploadImage}
              name="image"
              className="input-primary "
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <figure className="w-40 h-40 rounded-lg">
              <img
                className="w-full h-full rounded-lg object-cover"
                src=""
                alt=""
              />
            </figure>
          </div>
          <div className="col-span-6">
            <button className="btn-primary">Guardar</button>
          </div>
        </form>
      </div>

      {formError && <p className="error">{formError}</p>}
    </Layout>
  );
};

export default Products;
