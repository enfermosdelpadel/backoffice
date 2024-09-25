import Layout from "../../Components/Layout"
import { useContext } from "react"
import { DataContext } from "../../context/DataContext"
import { PhotoIcon } from "@heroicons/react/24/outline"

function Sales() {
  const { products } = useContext(DataContext)

  const brand = [
    "Solinco",
    "Nox",
    "Babolat",
    "Sane",
    "Hiro Star",
    "Odea",
    "X-Trust",
    "Head",
    "Black Crown",
    "Prokennex",
    "Adidas",
    "Bullpadel",
    "Side Spin",
  ]

  const models = [
    "Liso",
    "ML10 PROCUP 3K LUXURY",
    "ADIPOWER CTRL MTW PRO EDT 24",
    "CARAMELERA",
    "Jumbo",
    "Técnica Competición",
    "Live",
    "Tolito",
    "Navy",
    "AT10 GENIUS 18K TAPIA",
    "VERTEX WOMAN 23",
    "Microperforado",
    "LW PRISMA CARBON 9 2023",
    "SYNTEC PRO FEEL WHITE",
    "Long",
    "Cool Elastic",
    "Clasico",
    "Pro",
    "SPEED MOTION",
    "LW CARBON TI 22",
    "MAXIMA SUMMUM PRISMA SOFT 2023",
    "SPEED PRO 2023",
    "TL 10 - TINO LIBAAK",
    "ZUKUR CTRL 2.0 GREEN",
    "HACK 03 23",
    "HESACORE ",
    "DUAL ABSORBING",
    "Pro Burdeos",
    " Live",
    "Odpro Flex",
    "Glossmate",
    "HY0505",
    "ADIPOWER MULTIWEIGHT MASTER LTD",
    "DELTA MOTION",
  ]

  const color = ["azul", "rojo", "verde", "naranja", "morado", "amarillo"]
  const gender = ["hombre", "mujer"]
  const size = ["xs", "s", "m", "l", "xl", "xxl"]

  const type = ["Accesorio", "Paleta", "Indumentaria", "Bolso", "Zapatilla"]
  const subtype = ["redonda", "lagrima", "diamante"]

  return (
    <Layout>
      <form className="max-w-sm mx-auto flex flex-col  ">
        <div className="mb-4 border border-gray-300 rounded-md p-4">
          <h3 className="pb-2 text-lg font-medium">
            Que producto desea añadir?
          </h3>
          <div className="flex gap-4 mb-4 flex-col  ">
            <select defaultValue={"DEFAULT"} id="type" className="">
              <option value="DEFAULT" disabled>
                Tipo..
              </option>
              {type.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select defaultValue={"DEFAULT"} id="subtype" className="">
              <option value="DEFAULT" disabled>
                Sub Tipo..
              </option>
              {subtype.map((subtype, index) => (
                <option key={index} value={subtype}>
                  {subtype}
                </option>
              ))}
            </select>

            <select defaultValue="DEFAULT" id="brand" className="">
              <option value="DEFAULT" disabled>
                Marca..
              </option>
              {brand.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <select defaultValue={"DEFAULT"} id="model" className="">
              <option value="DEFAULT" disabled>
                Modelo..
              </option>
              {models.map((model, index) => (
                <option key={index} value={model}>
                  {model}
                </option>
              ))}
            </select>
            <select defaultValue={"DEFAULT"} id="color" className="">
              <option value="DEFAULT" disabled>
                Color..
              </option>
              {color.map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
              ))}
            </select>
            <select defaultValue={"DEFAULT"} id="size" className="">
              <option value="DEFAULT" disabled>
                Talle..
              </option>
              {size.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <select defaultValue={"DEFAULT"} id="size" className="">
              <option value="DEFAULT" disabled>
                Género..
              </option>
              {gender.map((gender, index) => (
                <option key={index} value={gender}>
                  {gender}
                </option>
              ))}
            </select>

            <div className="col-span-6">
              <label className="label">Descripción</label>
              <textarea
                className="input-primary"
                type="text"
                rows="5"
                id="desc"
                name="desc"
              />
            </div>

            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <PhotoIcon className="w-10 h-10 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click para subir</span> o
                    arrastra una imagen
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  )
}

export { Sales }
