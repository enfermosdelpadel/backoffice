import Layout from "../../Components/Layout"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

const NotFound = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
        <p>La página que estas buscando no existe.</p>
      </div>
    </Layout>
  )
}

export default NotFound
