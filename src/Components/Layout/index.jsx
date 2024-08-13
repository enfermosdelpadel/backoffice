import PropTypes from "prop-types";
import Menu from "../Menu";

const Layout = ({ children }) => {
  return (
    <div className="flex items-center">
      <Menu />
      <div className="flex items-center justify-center flex-grow">
        {children}
      </div>
    </div>
  );
};

//fix que tuve que aplicar ya que tiraba error el propTypes
Layout.propTypes = { children: PropTypes.node.isRequired };

export default Layout;
