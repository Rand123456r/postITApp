import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import logo from "../Images/logo-t.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Features/UserSlice";
import { useSelector } from "react-redux";
import { FaHome, FaUserAlt, FaSignOutAlt, FaUsersCog } from "react-icons/fa";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);

  const handlelogout = async () => {
    dispatch(logout());
    //ensure that the state update from the logout action has been processed before proceeding to the next step.
    await new Promise((resolve) => setTimeout(resolve, 100));

    navigate("/login"); //redirect to login page route.
  };

  return (
    <>
      <Navbar className="header">
        <Nav>
          <NavItem>
            <Link>
              <img src={logo} className="logo" />
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/profile">Profile</Link>
          </NavItem>
          <NavItem>
            <Link onClick={handlelogout}>Logout</Link>
          </NavItem>
          <NavItem>
            {user.userType === "admin" && (
              <li className="nav-item">
                <Link to="/manage">
                  <FaUsersCog id="manage" />
                </Link>
              </li>
            )}
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
