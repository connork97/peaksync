#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource
from flask import request, make_response, session
from flask_cors import CORS
# Local imports
from config import app, db, api
from models import User, Membership, Class, Signup, Payment

CORS(app)
# Views go here!

@app.route('/')
def home():
    return ''

@app.route('/users', methods=['GET'])
def users():
    if request.method == 'GET':
        all_users_dict = [user.to_dict() for user in User.query.all()]
        if all_users_dict:
            response = make_response(all_users_dict, 200)
        else:
            response = make_response({"error": "Users not found."}, 404)

    return response

@app.route('/users/<int:id>', methods=['GET', 'DELETE'])
def user_by_id(id):
    user = User.query.filter(User.id == id).one_or_none()
    if user:
        if request.method == 'GET':
            response = make_response(user.to_dict(), 200)
        if request.method == 'DELETE':
            try:
                db.session.delete(user)
                db.session.commit()
                response = make_response({"success": f"User of id {id} deleted."}, 204)
            except:
                response = make_response({"error": f"User of id {id} not deleted"}, 404)
    else:
        response = make_response({"error": f"404: User of id {id} not found."})

    return response

        
@app.route('/memberships', methods=['GET'])
def memberships():
    if request.method == 'GET':
        all_memberships_dict = [membership.to_dict() for membership in Membership.query.all()]
        if all_memberships_dict:
            response = make_response(all_memberships_dict, 200)
        else:
            response = make_response({"error": "Memberships not found."}, 404)

    return response

@app.route('/memberships/<int:id>', methods=['GET', 'DELETE'])
def membership_by_id(id):
    membership = Membership.query.filter(Membership.id == id).one_or_none()
    if membership:
        if request.method == 'GET':
            response = make_response(membership.to_dict(), 200)
        if request.method == 'DELETE':
            try:
                db.session.delete(membership)
                db.session.commit()
                response = make_response({"success": f"Membership of id {id} deleted."}, 204)
            except:
                response = make_response({"error": f"Membership of id {id} not deleted"}, 404)

    else:
        response = make_response({"error": f"404: Membership of id {id} not found."})

    return response

@app.route('/classes', methods=['GET'])
def classes():
    if request.method == 'GET':
        all_classes_dict = [cls.to_dict() for cls in Membership.query.all()]
        if all_classes_dict:
            response = make_response(all_classes_dict, 200)
        else:
            response = make_response({"error": "Classes not found."}, 404)

    return response

@app.route('/classes/<int:id>', methods=['GET', 'DELETE'])
def class_by_id(id):
    one_class = Class.query.filter(Class.id == id).one_or_none()
    if one_class:
        if request.method == 'GET':
            response = make_response(one_class.to_dict(), 200)
        if request.method == 'DELETE':
            try:
                db.session.delete(one_class)
                db.session.commit()
                response = make_response({"success": f"Class of id {id} deleted."}, 204)
            except:
                response = make_response({"error": f"Class of id {id} not deleted"}, 404)
    else:
        response = make_response({"error": f"404: Class of id {id} not found."})

    return response

if __name__ == '__main__':
    app.run(port=5555, debug=True)
