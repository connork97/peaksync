from sqlalchemy_serializer import SerializerMixin
from datetime import datetime, time

from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db, bcrypt

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules=(
        '-signups.user',
        '-signups.clas',
        '-payments.user'
    )

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)
    phone_number = db.Column(db.Integer)
    address = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    zipcode = db.Column(db.Integer)
    date_of_birth = db.Column(db.String)
    emergency_contact_name = db.Column(db.String)
    emergency_contact_phone_number = db.Column(db.Integer)

    waiver = db.Column(db.Boolean, default=False)
    admin = db.Column(db.Boolean, default=False)
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    membership_id = db.Column(db.Integer, db.ForeignKey("memberships.id"), default=1)

    signups = db.relationship('Signup', back_populates="user")
    payments = db.relationship('Payment', back_populates='user')

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        # print(password_hash)
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    @validates('first_name', 'last_name', 'email', '_password_hash', 'phone_number', 'city', 'state', 'zipcode', 'emergency_contact_name', 'emergency_contact_phone_number')
    def validate_user(self, key, value):
        if key == 'first_name' or key == 'last_name' or key == 'city' or key == 'state' or key == 'emergency_contact_name' or key == '_password_hash':
            if type(value) == str and len(value) > 0 and value != None:
                return value
            else:
                print(value)
                raise ValueError("Must be a string that is not empty.")
        
        if key == 'phone_number' or key == 'emergency_contact_phone_number':
            if type(value) == int and len(str(value)) == 10 and value != None:
                return value
            else:
                print(value)
                raise ValueError("Must be a valid phone number, 10 digits long.")
            
        if key == 'zipcode':
            if type(value) == int and len(str(value)) == 5 and value != None:
                return value
            else:
                print(value)
                raise ValueError("Zip code must be 5 digits.")
        
        if key == 'email':
            if len(value) > 3 and "@" in value or "." in value and value != None:
                return value
            else:
                print(value)
                raise ValueError("Invalid email.")

class Membership(db.Model, SerializerMixin):
    __tablename__ = "memberships"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.Text)
    type = db.Column(db.String)
    subtype = db.Column(db.String)
    price = db.Column(db.Float)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


class Class(db.Model, SerializerMixin):
    __tablename__ = "classes"

    serialize_rules=(
        '-signups.user',
        '-signups.clas'
    )

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    price = db.Column(db.Float)
    description = db.Column(db.Text)
    category = db.Column(db.String)
    capacity = db.Column(db.Integer)
    hours = db.Column(db.Integer)
    minutes = db.Column(db.Integer)
    recurring = db.Column(db.Boolean)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    signups = db.relationship('Signup', back_populates="clas")

class Signup(db.Model, SerializerMixin):
    __tablename__ = "signups"

    serialize_rules=(
        '-user.signups',
        '-user._password_hash',
        '-user_id',
        '-clas.signups',
        '-class_id'
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    class_id = db.Column(db.Integer, db.ForeignKey("classes.id"))
    paid = db.Column(db.Boolean)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user = db.relationship('User', back_populates="signups")
    clas = db.relationship('Class', back_populates="signups")

class Payment(db.Model, SerializerMixin):
    __tablename__ = "payments"

    serialize_rules=(
        '-user.payments',
        '-user._password_hash',
        '-user_id'
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    signup_id = db.Column(db.Integer, db.ForeignKey("signups.id"))
    membership_id = db.Column(db.Integer, db.ForeignKey("memberships.id"))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user = db.relationship('User', back_populates="payments")