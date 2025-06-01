import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Swal from 'sweetalert2'
import { register } from "../store.js";


const initalUser = {
    name: "",
    email: "",
    password: ""
}

export const Register = () => {
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
       
        if(!user.name || !user.email || !user.password){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Todos los campos son obligatorios",
            });
            return;
        }

        if(user.password.length<6){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "La contraseña debe tener al menos 6 caracteres",

            });
            return 
        }

        const status = await register(user)
        if (status == 201) {
            Swal.fire({
                title: "Usuario registrado",
                text: "El usuario se ha registrado correctamente",
                icon: "success"
            });
            setUser(initalUser)
            navigate("/login")
        } else {
            
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al registrar el usuario",

            });
        }
    }

    return (

        <div className="container">
            <div className="row justify-content-center">
                <h1 className="text-center my-5">Register</h1>
                <div className="col-12 col-md-6">
                    <form
                        className="border p-3"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label>Nombre Completo</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre Completo"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                            />
                        </div>
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
                            <button className="btn w-100">Iniciar Sesión</button>
                        </div>
                    </form>
                    <div className="text-center">
                        <p className="m-0">
                            ¿Ya tienes una cuenta? <Link to={"/login"}>Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
}; 