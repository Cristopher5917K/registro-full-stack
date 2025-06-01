export const initialStore=()=>{
  return{
    currentUser:null,
    users:[]
  }
}


// Creo el register para conectar con el backend
export const register=async(userData)=>{
  try {

    // Selecciono la url del backend
    const backend_url= import.meta.env.VITE_BACKEND_URL
    // Realizo la peticion al backend
    const response= await fetch(`${backend_url}/register`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify(userData)
    })
    return response.status
    // Atrapo un error para ver si el porque no se puede conectar
  } catch (error) {
    console.log(error)
    return false
  }
}


// Creo el login para conectar con el backend
export const login=async(userData)=>{
  try {

    // Selecciono la url del backend
    const backend_url="https://zany-fortnight-v6g4gr666vr4hw69g-3001.app.github.dev/api"
    const response=await fetch(`${backend_url}/login`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify(userData)
    })
     const data =await response.json()
     if (response.ok) {
      // Si el usuario existe(si la respuesta es correcta) gurdo el tocken en el localStorage
      localStorage.setItem("token",data.token)
      localStorage.setItem("currentUser",JSON.stringify(data.user))
      return response.status
     }
     return response.status
  } catch (error) {
    console.log(error)
    return 500
  }
}

// Creamos las funciones para manegar el logout del usuario y eliminar el token
export const logout=()=>{
  try {
      localStorage.removeItem("token")
      localStorage.removeItem("currentUser")
      return true
  } catch (error) {
    console.log(error)
    return false
  }
  
}

// Creamos la funcion para traer al usuario registrado
export const getPrivate=async()=>{
  try {
    const backend_url="https://zany-fortnight-v6g4gr666vr4hw69g-3001.app.github.dev/api"
    const response=await fetch(`${backend_url}/private`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${localStorage.getItem("token")}`}
    })
    if(response.ok){
      const data=await response.json()
      localStorage.setItem("currentUser",JSON.stringify(data))
      return data
    }
  } catch (error) {
    
  }
}
// Creo la funcion para traerme todos los uruarios registrados
export const getAllUsers=async()=>{
  try {
    const backend_url="https://zany-fortnight-v6g4gr666vr4hw69g-3001.app.github.dev/api"
    const response=await fetch(`${backend_url}/users`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      }
        
    })
    if (response.ok){
      const data=await response.json()
      return data
    }
    return []
  } catch (error) {
    console.log(error)
    return false
  }
}


function storeReducer(state, action) {
  switch (action.type) {
    // Ejemplo de acción:
    // case "SET_CURRENT_USER":
    //   return { ...state, currentUser: action.payload };
    default:
      return state;
  }
}

export default storeReducer;