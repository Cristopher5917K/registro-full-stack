import React, { useContext, useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { login } from "../store.js";
import Swal from 'sweetalert2'



// Creamos el componente para el login
const initalUser = {
    email: "",
    password: ""
}

const Login = () => {


    const [user, setUser] = useState(initalUser)
    const navigate = useNavigate()

    // Realizamos el handleChange para actualizar los inputs
    const handleChange = ({ target }) => {
        setUser({
            ...user,
            [target.name]: target.value
        })
    }

    // Realizamos en handleSubmit para manejar el evento de submit del formulario evitando que se reinicie
    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            // Realizamos la lalamda al login para la peticion del backend
            const status = await login(user)

            // En caso de exista el usuario regresara un 200 lo que nos llevara a la vista de la pagina
            if (status == 200) {

                Swal.fire({
                    title: "Login exitoso",
                    text: "Login realizado correctamente",
                    icon: "success"
                });
                navigate("/")

                // En caso de que no exista el usuario regrea un 401 y generara el mensaje de error
            } else if (status == 401) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Credenciales incorrectas",

                });

            }
        } catch (error) {
            console.log(error)
            return false
        }

    }

    return (
        <div className="container ">
            <div className="row justify-content-center loginBackground">
                <h1 className="text-center">Login</h1>
                <div className="col-12 col-md-6">

                    {/* Creamos el formulaio para el login con la opcion del handleSubmit y el handleChange */}
                    <form
                        className="border p-3 formLogin"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group">
                            <label htmlFor="">Correo Elecronico</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="nombre@email.com"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="contraseña"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mt-3">
                            <button className="btn  w-100">Iniciar Sesión</button>
                        </div>
                    </form>
                    <div className="text-center">
                        <p className="m-0">
                            ¿No tienes una cuenta? <Link to={"/register"}>Regístrate</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login;