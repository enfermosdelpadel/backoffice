import { useState } from "react";
import { supabase } from "../../supabase/client";
import Layout from "../../Components/Layout";

const Products = () => {
  //   const navigate = useNavigate();
  const [type, setType] = useState("");
  const [subType, setSubType] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [gender, setGender] = useState("");
  const [size, setSize] = useState("");
  const [cost, setCost] = useState("");
  const [fileUrl, setFileUrl] = useState("");
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
      setFileUrl(data.path);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!name || !brand || !category || !model || !fileUrl) {
    //   setFormError("Please fill in all the fields.");
    // }

    const { data, error } = await supabase
      .from("products")
      .insert([{ type, subType, brand, color, gender, size, cost, fileUrl }]);

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
      <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="label">Tipo</label>
            <input
              className="input-primary"
              type="text"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />

            <label className="label" htmlFor="brand">
              Sub Tipo
            </label>
            <input
              className="input-primary"
              type="text"
              id="subType"
              value={subType}
              onChange={(e) => setSubType(e.target.value)}
            />

            <label className="label" htmlFor="brand">
              Marca
            </label>
            <input
              className="input-primary"
              type="text"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />

            <label className="label" htmlFor="category">
              Color
            </label>
            <input
              className="input-primary"
              type="text"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />

            <label className="label" htmlFor="category">
              Genero
            </label>
            <input
              className="input-primary"
              type="text"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
            <label className="label" htmlFor="category">
              Talle
            </label>
            <input
              className="input-primary"
              type="text"
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            <label className="label" htmlFor="category">
              Costo
            </label>
            <input
              className="input-primary"
              type="text"
              id="cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />

            <label className="label" htmlFor="file">
              Subir Imagen
            </label>
            <input
              className="input-primary"
              type="file"
              id="fileUrl"
              onChange={uploadImage}
            />

            <button className="btn-primary">Guardar</button>
          </div>
        </form>
      </div>
      {formError && <p className="error">{formError}</p>}
    </Layout>
  );
};

export default Products;
