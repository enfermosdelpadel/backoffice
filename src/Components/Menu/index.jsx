import {
  DocumentTextIcon,
  UsersIcon,
  HomeIcon,
  ShoppingBagIcon,
  ArrowLeftEndOnRectangleIcon,
  IdentificationIcon,
  InboxStackIcon,
  ChevronDownIcon,
  PlusCircleIcon,
  TagIcon,
  UserGroupIcon,
  DocumentCurrencyDollarIcon,
  PaintBrushIcon,
  PresentationChartBarIcon,
  WrenchScrewdriverIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline"
import { NavLink } from "react-router-dom"

import { DataContext } from "../../context/DataContext"
import { useContext } from "react"
function Menu() {
  const context = useContext(DataContext)

  return (
    <div
      className={`${
        context.isUserLogin ? "flex" : "hidden"
      }  h-screen w-50 flex-col justify-between border-e fixed top-0 left-0 bg-white`}
    >
      <div className="border-t border-gray-100">
        <div className="px-2 py-4">
          <ul className="mt-20 space-y-2">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "btn-menu-active" : "btn-menu"
                }
              >
                <span className="flex items-right space-x-2">
                  <span className="justify-right">
                    <HomeIcon className="size-5" />
                  </span>
                  <span>Tablero</span>
                </span>
              </NavLink>
            </li>
            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden hover:cursor-pointer">
                <summary className="btn-menu gap-2">
                  <span className="justify-right">
                    <DocumentTextIcon className="size-5" />
                  </span>
                  <span>Productos</span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <ChevronDownIcon className="size-5" />
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <NavLink
                      to="/products"
                      className={({ isActive }) =>
                        isActive ? "btn-menu-active" : "btn-menu"
                      }
                    >
                      <span className="flex items-right space-x-2">
                        <span className="justify-right">
                          <PlusCircleIcon className="size-5" />
                        </span>
                        <span>Añadir</span>
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/listproducts"
                      className={({ isActive }) =>
                        isActive ? "btn-menu-active" : "btn-menu"
                      }
                    >
                      <span className="flex items-right space-x-2">
                        <span className="justify-right">
                          <InboxStackIcon className="size-5" />
                        </span>
                        <span>Stock</span>
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/prices"
                      className={({ isActive }) =>
                        isActive ? "btn-menu-active" : "btn-menu"
                      }
                    >
                      <span className="flex items-right space-x-2">
                        <span className="justify-right">
                          <DocumentCurrencyDollarIcon className="size-5" />
                        </span>
                        <span>Precios</span>
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive ? "btn-menu-active" : "btn-menu"
                }
              >
                <span className="flex items-center space-x-2">
                  <span className="justify-right">
                    <ShoppingCartIcon className="size-5" />
                  </span>
                  <span>Órdenes</span>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/customers"
                className={({ isActive }) =>
                  isActive ? "btn-menu-active" : "btn-menu"
                }
              >
                <span className="flex items-right space-x-2">
                  <span>
                    <IdentificationIcon className="size-5" />
                  </span>
                  <span>Clientes</span>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/suppliers"
                className={({ isActive }) =>
                  isActive ? "btn-menu-active" : "btn-menu"
                }
              >
                <span className="flex items-right space-x-2">
                  <span>
                    <UserGroupIcon className="size-5" />
                  </span>
                  <span>Proveedores</span>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/purchases"
                className={({ isActive }) =>
                  isActive ? "btn-menu-active" : "btn-menu"
                }
              >
                <span className="flex items-right space-x-2">
                  <span>
                    <ShoppingBagIcon className="size-5" />
                  </span>
                  <span>Compras</span>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive ? "btn-menu-active" : "btn-menu"
                }
              >
                <span className="flex items-right space-x-2">
                  <span>
                    <UsersIcon className="size-5" />
                  </span>
                  <span>Usuarios</span>
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Reports"
                className={({ isActive }) =>
                  isActive ? "btn-menu-active" : "btn-menu"
                }
              >
                <span className="flex items-right space-x-2">
                  <span>
                    <PresentationChartBarIcon className="size-5" />
                  </span>
                  <span>Reportes</span>
                </span>
              </NavLink>
            </li>
            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden hover:cursor-pointer">
                <summary className="btn-menu gap-2">
                  <span className="justify-right">
                    <WrenchScrewdriverIcon className="size-5" />
                  </span>
                  <span>Ajustes</span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <ChevronDownIcon className="size-5" />
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <NavLink
                      to="/categories"
                      className={({ isActive }) =>
                        isActive ? "btn-menu-active" : "btn-menu"
                      }
                    >
                      <span className="flex items-right space-x-2">
                        <span className="justify-right">
                          <TagIcon className="size-5" />
                        </span>
                        <span>Categorias</span>
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/attributes"
                      className={({ isActive }) =>
                        isActive ? "btn-menu-active" : "btn-menu"
                      }
                    >
                      <span className="flex items-right space-x-2">
                        <span className="justify-right">
                          <PaintBrushIcon className="size-5" />
                        </span>
                        <span>Atributos</span>
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
        <button
          onClick={context.logout}
          className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
        >
          <ArrowLeftEndOnRectangleIcon className="size-6" />

          <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
            Logout
          </span>
        </button>
      </div>
    </div>
  )
}

export default Menu
