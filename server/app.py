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
        all_users_to_dict = [user.to_dict() for user in User.query.all()]
        if all_users_to_dict:
            response = make_response(all_users_to_dict, 200)
        else:
            response = make_response({"error": "Users not found."}, 404)

    return response
        
@app.route('/memberships', methods=['GET'])
def memberships():
    if request.method == 'GET':
        all_memberships_to_dict = [membership.to_dict() for membership in Membership.query.all()]
        if all_memberships_to_dict:
            response = make_response(all_memberships_to_dict, 200)
        else:
            response = make_response({"error": "Memberships not found."}, 404)

    return response

@app.route('/classes', methods=['GET'])
def classes():
    if request.method == 'GET':
        all_classes_to_dict = [cls.to_dict() for cls in Membership.query.all()]
        if all_classes_to_dict:
            response = make_response(all_classes_to_dict, 200)
        else:
            response = make_response({"error": "Classes not found."}, 404)

    return response

if __name__ == '__main__':
    app.run(port=5555, debug=True)
