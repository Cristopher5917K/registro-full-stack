# Codigo
Este código consiste en la creación de un sistema de registro y login en el cual se pueden ver los usuarios que también se registraron previamente

Los comandos usados para el backend fueron 
 - pipenv install
 - pipenv run start
 - 
 **Para la base de datos**
 
 - pipenv run migrate
 - pipenv run upgrade
 
 Los comandos para la parte del frontend fueron
 
 - npm install
 - npm run start

 
 
# 1

Primero se realizó la creación de la base de datos con los valores solicitados, los cuales son el **nombre**, el **email** y la **constraseña**

## 2

Posteriormente a crear la base de datos, se realizaron las rutas del backend, siendo el **register** (*permite el registro de los usuarios*), **login** (*permite que los usuarios hagan* *login*), **private** (*obtiene al usuario logueado*) y el **getUsers** (*trae todos los usuarios, sin información que ponga en riesgo como las contraseñas*). Se probó la funcionalidad de las rutas usando POSTMAN.

## 3

Conectamos el frontend con el backend en el store.js, creando las llamadas respectivas al backend, para el register, login, private y getUsers.

## 4

Se crearon las distintas pestañas y las rutas para poder probar si existía conectividad con la parte del backend sin presentar problemas con funciones como el handleChange y el handleSubmit, además del uso del useState para los formularios.

## 5

Finalmente, después de probar que funciona la conexión del backend con el frontend, se empezó a desarrollar el CSS para que sea apreciada de una mejor manera visual.




