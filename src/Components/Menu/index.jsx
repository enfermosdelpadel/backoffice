import {
  DocumentArrowUpIcon,
  DocumentTextIcon,
  UsersIcon,
  HomeIcon,
  ShoppingBagIcon,
  ArrowLeftEndOnRectangleIcon,
} from "@heroicons/react/24/outline"
import { NavLink } from "react-router-dom"
import { supabase } from "../../supabase/client"
function Menu() {
  return (
    <div className="flex h-screen w-32 flex-col justify-between border-e fixed top-0 left-0 bg-white">
      <div className="flex size-16 items-center justify-center">
        <NavLink to="/">
          <span className=" fle justify-center fixed rounded-lg bg-gray-100 text-xs text-gray-600">
            <HomeIcon className="size-10" />
          </span>
        </NavLink>
      </div>

      <div className="border-t border-gray-100">
        <div className="px-2 py-4">
          <NavLink
            to="/products"
            className="t group relative flex justify-right rounded bg-blue-50
            px-2 py-1.5"
          >
            <DocumentArrowUpIcon className="size-5" />
            <p className="ml-2 font-medium">Alta</p>
          </NavLink>
          <ul>
            <li>
              <NavLink
                to="/listproducts"
                className="group relative flex justify-right rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <span className="flex items-right space-x-2">
                  <span className="justify-right">
                    <DocumentTextIcon className="size-5" />
                  </span>
                  <span>Listado</span>
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="#"
                className="group relative flex justify-right rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <span className="flex items-center space-x-2">
                  <span className="justify-right">
                    <ShoppingBagIcon className="size-5" />
                  </span>
                  <span>Ventas</span>
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/users"
                className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <span className="flex items-right space-x-2">
                  <span>
                    <UsersIcon className="size-5" />
                  </span>
                  <span>Usuarios</span>
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
        <form action="#">
          <button
            onClick={() => supabase.auth.signOut()}
            className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            <ArrowLeftEndOnRectangleIcon className="size-6" />

            <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
              Logout
            </span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Menu
