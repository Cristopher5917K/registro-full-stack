from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

db = SQLAlchemy()

# Seleccionamos que el usuario va a tener nombre, email, password y no podran estar vacias
class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name:Mapped[str]=mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    salt:Mapped[str]=mapped_column(String(120), nullable=False)
    
# No serializamos la password ni la salt por cuestiones de seguridad
    def serialize(self):
        return {
            "id": self.id,
            "name":self.name,
            "email": self.email,
        }