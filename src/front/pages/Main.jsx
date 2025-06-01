import React, { useContext, useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { getAllUsers } from "../store.js";


export const Main = () => {

  const [user, setUser] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers()
      if (data) {
        setUser(data)
      } else {
        setUser([])
      }
    }
    const storeUser = localStorage.getItem("currentUser")
    if (storeUser) {
      setCurrentUser(JSON.parse(storeUser))
    } else {
      setCurrentUser(null)
    }
    fetchUsers()
  }, [])


  return (
    <div className="main-page">
    <div className="container mt-4">
      {currentUser ? (
        <div>
          <h2>Usuarios Registrados</h2>
          <h4>Bienvenido {currentUser.name}</h4>

          {user.length === 0 ? (
            <p>No hay usuarios registrados.</p>
          ) : (
            <ul className="list-group">
              {user.map((user) => (
                <li key={user.id} className="list-group-item">
                  <strong>{user.name}</strong> - {user.email}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <h3>
          ¿Desea ver los usuarios de la aplicación?
          <br />
          <div className="main-buttons">
            <Link to="/register" className="btn buttonsMainRegister">Registrarse</Link>
            <Link to="/login" className="btn buttonsMainLogin">Iniciar Sesión</Link>
          </div>
        </h3>
      )}
    </div>
  </div>
  )
}