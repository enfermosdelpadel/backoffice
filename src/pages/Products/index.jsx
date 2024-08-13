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
      <div className="flex items-center border-2 border-blue-500 p-5">
        <form
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="name">Tipo</label>
            <input
              type="text"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />

            <label htmlFor="brand">Sub Tipo</label>
            <input
              type="text"
              id="subType"
              value={subType}
              onChange={(e) => setSubType(e.target.value)}
            />

            <label htmlFor="brand">Marca</label>
            <input
              type="text"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />

            <label htmlFor="category">Color</label>
            <input
              type="text"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />

            <label htmlFor="category">Genero</label>
            <input
              type="text"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="category">Talle</label>
            <input
              type="text"
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            <label htmlFor="category">Costo</label>
            <input
              type="text"
              id="cost"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />

            <label htmlFor="file">Subir Imagen</label>
            <input type="file" id="fileUrl" onChange={uploadImage} />

            <button className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
              Guardar
            </button>
          </div>
        </form>
      </div>
      {formError && <p className="error">{formError}</p>}
    </Layout>
  );
};

export default Products;
