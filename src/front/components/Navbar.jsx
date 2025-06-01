import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
    
    // Creo la constante para navegar entre las rutas
	const navigate=useNavigate()


    // genero el logout que elimina el token y el usuario
	const handleLogout = () => {
		localStorage.removeItem("currentUser");
		localStorage.removeItem("token")
		navigate("/login");
	}

    // Verifico si esta logueado o no
	const isLogged= localStorage.getItem("currentUser") !== null;
	return (

		<nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Main page</span>
                </Link>
                <div className="ml-auto">
                    {isLogged ? (
                        <button className="btn-danger mx-2" onClick={handleLogout}>
                            LogOut
                        </button>
                    ) : (
                        <Link to="/register">
                            <button className="btn ">Register</button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
	);
};