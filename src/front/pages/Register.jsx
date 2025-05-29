import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { register } from "../store.js";


const initalUser = {
	name: "",
	email: "",
	password: ""
}
export const Register = () => {
	const [user, setUser] = useState(initalUser)


	const handleChange = ({ target }) => {
		setUser({
			...user,
			[target.name]: target.value
		})
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		const status = await register(user)
		if (status == 200) {
			alert("Usuario registrado correctamente")
			setUser(initalUser)
		} else {
			alert("Error al registrarse")
		}
	}

	return (
		<div className="container">
			<div className="col-12 col-md-6">
				<div className="row justy-content">
					<form
						onSubmit={handleSubmit}
						className="border p-3 mt-3"
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

						<div>
							<label>Email</label>
							<input
								type="email"
								className="form-control"
								placeholder="Email"
								name="email"
								value={user.email}
								onChange={handleChange}
							/>
						</div>


						<div>
							<label>Password</label>
							<input
								type="text"
								className="form-control"
								placeholder="Password"
								name="password"
								value={user.password}
								onChange={handleChange}
							/>
						</div>

						<button type="submit" className="btn btn-danger mt-3 mb-2 register-btn">Registrarse</button>
					</form>
					<div className="text-center">
						<p className="m-0">
							¿ Tienes una cuenta? <Link to="/login">Entrar</Link>
						</p>
					</div>

				</div>


			</div>

		</div>
	);
}; 