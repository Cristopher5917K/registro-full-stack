"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import os
from base64 import b64encode
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Definimos la ruta para el registro del usuario
@api.route('/register', methods=['POST'])
def add_new_user():

    # Ponemos el codigo dentro de un try except para ver si hay errores
    try:
    #    Obtenemos los datos
       body_froms=request.json  

       name=body_froms.get("name", None)
       email=body_froms.get("email", None)
       password=body_froms.get("password",None)

    #Validamos que no esten incompletas

       if name is None or email is None or password is None:
        return jsonify({'WARNING: Credenciales incompletas'}),400
       
       else:
          user=User()
          user_exist=user.query.filter_by(email=email).one_or_none()

        # Verificamos que el usuario no exista
          if user_exist is not None:
             return jsonify("Usuario existente"),401
          else:
            salt=b64encode(os.urandom(32)).decode("utf-8")
            password=generate_password_hash(f'{password}{salt}')

            user.name=name
            user.email=email
            user.password=password
            user.salt=salt

        # Añadimos al usuario
            db.session.add(user)
            try:
                db.session.commit()
                return jsonify('Usuario creado exitosamente'),201
            except Exception as err:
                # En caso de presentar algun problema realizamos un rollback
                db.session.rollback()
                return jsonify(f'Error{err.args}'),401
    except Exception as err:
        return jsonify(f'Error{err.args}'),500
    

@api.route('/login',methods=['POST'])
def login():
    try:
        body_froms = request.get_json()

        if not body_froms:
            return jsonify({"error": "No se proporcionó un JSON válido"}), 400

        email = body_froms.get("email", None)
        password = body_froms.get("password", None)

        if email is None or password is None:
            return jsonify({"error": "Credenciales incompletas"}), 401

        user = User.query.filter_by(email=email).one_or_none()

        if user is None:
            return jsonify({"error": "Credenciales inválidas"}), 401

        if check_password_hash(user.password, f'{password}{user.salt}'):
            token = create_access_token(identity=str(user.id))
            return jsonify(token=token, user=user.serialize()), 200
        else:
            return jsonify({"error": "Credenciales inválidas"}), 401

    except Exception as err:
        print(f'Error en login: {err}')
        return jsonify({"error": str(err)}), 500


@api.route("/private", methods=['GET'])
@jwt_required() 
def get_private():
   try:
       user_id=get_jwt_identity()
       user=User.query.get(user_id)
       if user is None:
        return jsonify({"WARNING: Usuario no encontrado"}),404
       else:
        return jsonify(user.serialize()),200  

   except Exception as err:
        return jsonify(f'Error: {err.args}'),500
  
@api.route("/users",methods=['GET'])
@jwt_required()
def get_users():
   try:
      users=User.query.all()
      return jsonify([user.serialize() for user in users]), 200
   except Exception as err:
      return jsonify(f'Error: {err.args}'),500  
   