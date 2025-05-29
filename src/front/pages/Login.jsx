import React, { useContext, useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { login } from "../store.js";


const initalUser = {
    email: "",
    password: ""
}

const Login = () => {

    const [user, setUser] = useState(initalUser)
    const navigate = useNavigate()
    const handleChange = ({ target }) => {
        setUser({
            ...user,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const status = await login(user)
            if (status == 200) {
                navigate("/")
                alert("Login exitoso")
            } else if (status == 401) {
                alert("Credenciales incorrectas")
            }
        } catch (error) {
            console.log(error)
            return false
        }

    }

    return (
            <div className="container">
            <div className="row justify-content-center">
                <h1 className="text-center my-5">Login</h1>
                <div className="col-12 col-md-6">
                    <form
                        className="border p-3"
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
                            <button className="btn btn-primary w-100">Iniciar Sesión</button>
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