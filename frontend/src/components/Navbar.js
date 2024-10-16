import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthorizationContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate()

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user ? (
            <div>
              <p>{user.email}</p>
              <button onClick={handleClick}>Logout</button>
            </div>
          ) : (
            <div>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
