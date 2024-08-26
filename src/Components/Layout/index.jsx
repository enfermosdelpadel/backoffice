import PropTypes from "prop-types"

const Layout = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center flex-grow">
        {children}
      </div>
    </div>
  )
}

//fix que tuve que aplicar ya que tiraba error el propTypes
Layout.propTypes = { children: PropTypes.node.isRequired }

export default Layout
