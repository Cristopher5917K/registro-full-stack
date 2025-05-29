import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate=useNavigate()

	const handleLogout = () => {
		localStorage.removeItem("currentUser");
		localStorage.removeItem("token")
		navigate("/login");
	}

	const isLogged= localStorage.getItem("currentUser") !== null;
	return (

		<nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Main page</span>
                </Link>
                <div className="ml-auto">
                    {isLogged ? (
                        <button className="btn btn-danger mx-2" onClick={handleLogout}>
                            LogOut
                        </button>
                    ) : (
                        <Link to="/register">
                            <button className="btn btn-primary">Register</button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
	);
};