import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./../../context/auth.context";

function Navbar() {

    const { user, isLoggedIn, logout } = useContext(AuthContext)

    return (
        <nav>
            <Link to="/">
                <button>Home</button>
            </Link>

            {
                isLoggedIn && (
                    <>
                        <Link to="/projects">
                            <button>Projects</button>
                        </Link>

                        <button onClick={logout}>Logout</button>

                        <p>¡Hola, {user.name}!</p>
                    </>
                )
            }

            {
                !isLoggedIn && (
                    <>
                        <Link to="/signup"> <button>Sign Up</button> </Link>
                        <Link to="/login"> <button>Login</button> </Link>
                    </>
                )
            }

        </nav>
    );
}

export default Navbar;