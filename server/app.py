#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource
from flask import request, make_response, session
from flask_cors import CORS
# Local imports
from config import app, db, api
from models import User, Membership, Event, Signup, Payment, Session

CORS(app)
# Views go here!

@app.route('/')
def home():
    return ''


@app.route('/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':

        print("Fetching all user profiles...")

        all_users_dict = [user.to_dict() for user in User.query.all()]
        
        if all_users_dict:
            response = make_response(all_users_dict, 200)
        
        else:
            response = make_response({"error": "Users not found."}, 404)
    
    if request.method == 'POST':

        print("Creating new user...")

        try:
            form_data = request.get_json()
            new_user = User(
                first_name=form_data['first_name'],
                last_name=form_data['last_name'],
                email=form_data['email'],
                password_hash=form_data['password'],
                phone_number=int(form_data['phone_number']),
                address=form_data['address'],
                city=form_data['city'],
                state=form_data['state'],
                zipcode=int(form_data['zipcode']),
                date_of_birth=form_data['date_of_birth'],
                emergency_contact_name=form_data['emergency_contact_name'],
                emergency_contact_phone_number=int(form_data['emergency_contact_phone_number']),
                waiver=form_data['waiver'],
                admin=form_data['admin']
            )
            db.session.add(new_user)
            db.session.commit()
            # session['user_email'] = new_user.email
            response = make_response(new_user.to_dict(), 201)
            # newest_user = User.query.order_by(User.id.desc()).first()
        
        except:
            response = make_response({"error": "Unsuccessful creation of new user"}, 404)

    return response

@app.route('/signup', methods=['POST'])
def signup():
    if request.method == 'POST':

        print("Creating new user...")

        try:
            form_data = request.get_json()
            new_user = User(
                first_name=form_data['firstName'],
                last_name=form_data['lastName'],
                email=form_data['email'],
                password_hash=form_data['password'],
                phone_number=int(form_data['phoneNumber']),
                address=form_data['address'],
                city=form_data['city'],
                state=form_data['state'],
                zipcode=int(form_data['zipcode']),
                date_of_birth=form_data['dateOfBirth'],
                emergency_contact_name=form_data['emergencyContactName'],
                emergency_contact_phone_number=int(form_data['emergencyContactPhoneNumber']),
                waiver=form_data['waiver'],
                admin=form_data['admin']
            )
            db.session.add(new_user)
            db.session.commit()
            # session['user_email'] = new_user.email
            response = make_response(new_user.to_dict(), 201)
            # newest_user = User.query.order_by(User.id.desc()).first()
            response.set_cookie('user_email', new_user.email)
    
        except:
            response = make_response({"error": "Unsuccessful creation of new user"}, 404)
    
    return response

@app.route('/users/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def user_by_id(id):

    user = User.query.filter(User.id == id).one_or_none()
    
    if user:

        if request.method == 'GET':
            response = make_response(user.to_dict(), 200)

        if request.method == 'PATCH':

            try:
                form_data = request.get_json()
                for attr in form_data:
                    setattr(user, attr, form_data[attr])

                db.session.add(user)
                db.session.commit()
                response = make_response(user.to_dict(), 200)

            except:
                response = make_response({"error": f"404: Could not update user of id {id}."}, 404)

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

        
@app.route('/memberships', methods=['GET', 'POST'])
def memberships():
    if request.method == 'GET':
        print("Fetching all memberships...")
        all_memberships_dict = [membership.to_dict() for membership in Membership.query.all()]
        if all_memberships_dict:
            response = make_response(all_memberships_dict, 200)
        else:
            response = make_response({"error": "Memberships not found."}, 404)

    if request.method == 'POST':

        print("Creating new memberhip...")

        try:
            form_data = request.get_json()
            new_membership = Membership(
                name=form_data['name'],
                price=form_data['price'],
                type=form_data['type'],
                subtype=form_data['subtype'],
                description=form_data['description']
            )
            db.session.add(new_membership)
            db.session.commit()
            response = make_response(new_membership.to_dict(), 200)

        except:
            response = make_response({"error": "Unsuccessful creation of new membership."}, 404)

    return response

@app.route('/memberships/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def membership_by_id(id):
    membership = Membership.query.filter(Membership.id == id).one_or_none()
    if membership:
        if request.method == 'GET':
            response = make_response(membership.to_dict(), 200)

        if request.method == 'PATCH':
            
            try:
                form_data = request.get_json()
                for attr in form_data:
                    setattr(membership, attr, form_data[attr])

                db.session.add(membership)
                db.session.commit()
                response = make_response(membership.to_dict(), 200)

            except:
                response = make_response({"error": f"404: Could not update user of id {id}."}, 404)

        if request.method == 'DELETE':

            print(f"Deleting membership of id {id}...")

            try:
                db.session.delete(membership)
                db.session.commit()
                response = make_response({"success": f"Membership of id {id} deleted."}, 204)
            except:
                response = make_response({"error": f"Membership of id {id} not deleted"}, 404)

    else:
        response = make_response({"error": f"404: Membership of id {id} not found."})

    return response

@app.route('/events', methods=['GET', 'POST'])
def events():
    if request.method == 'GET':
        print("Fetching all events...")
        all_events_dict = [event.to_dict() for event in Event.query.all()]
        if all_events_dict:
            response = make_response(all_events_dict, 200)
        else:
            response = make_response({"error": "eventses not found."}, 404)
    
    if request.method == 'POST':
        print("Creating new events...")
        try:
            form_data = request.get_json()
            new_event = Event(
                name=form_data['name'],
                price=form_data['price'],
                category=form_data['category'],
                capacity=int(form_data['capacity']),
                hours=int(form_data['hours']),
                minutes=int(form_data['minutes']),
                description=form_data['description']
            )
            db.session.add(new_event)
            db.session.commit()
            response = make_response(new_event.to_dict(), 200)

        except:
            response = make_response({"error": "Unsuccessful creation of new events"}, 404)

    return response

@app.route('/events/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def events_by_id(id):
    one_event = Event.query.filter(Event.id == id).one_or_none()

    if one_event:
    
        if request.method == 'GET':
            response = make_response(one_event.to_dict(), 200)
    
        if request.method == 'PATCH':
            
            try:
                form_data = request.get_json()
                for attr in form_data:
                    setattr(one_event, attr, form_data[attr])

                db.session.add(one_event)
                db.session.commit()
                response = make_response(one_event.to_dict(), 200)

            except:
                response = make_response({"error": f"404: Could not update user of id {id}."}, 404)
    
        if request.method == 'DELETE':
            try:
                db.session.delete(one_event)
                db.session.commit()
                response = make_response({"success": f"events of id {id} deleted."}, 204)
            except:
                response = make_response({"error": f"events of id {id} not deleted"}, 404)
    else:
        response = make_response({"error": f"404: events of id {id} not found."})

    return response

@app.route('/signups', methods=['GET', 'POST'])
def signups():

    if request.method == 'GET':
        print("Fetching all signups...")
        signups_dict = [signup.to_dict() for signup in Signup.query.all()]
        
        if signups_dict:
            response = make_response(signups_dict, 200)
        
        else:
            response = make_response({"error": "404: Signups not found."})
    
    if request.method == 'POST':
        print("Creating new signup...")
        form_data = request.get_json()
        new_signup= Signup(
            user_id=form_data['userId'],
            events_id=form_data['eventsId']
            # paid ?
        )

        db.session.add(new_signup)
        db.session.commit()
        response = make_response(new_signup.to_dict(), 204)

    return response

@app.route('/signups/<int:id>', methods=['GET', 'DELETE'])
def signup_by_id(id):
    signup = Signup.query.filter(Signup.id == id).one_or_none()

    if signup:

        if request.method == 'GET':
            response = make_response(signup.to_dict(), 200)
    
        if request.method == 'DELETE':
            try:
                db.session.delete(signup)
                db.session.commit()
                response = make_response({"success": f"204: Signup of id {id} deleted."})
            except:
                response = make_response({"error": f"404: Signup of {id} not deleted."})

    else:
        response = make_response({"error": f"404: Signup of id {id} not found."})

    return response

@app.route('/sessions', methods=['GET', 'POST'])
def sessions():
    
    if request.method == 'GET':
        all_sessions_dict = [session.to_dict() for session in Session.query.all()]
        if all_sessions_dict:
            response = make_response(all_sessions_dict, 200)
        else:
            response = make_response({"error": "404: Sessions not found."})

    if request.method == 'POST':
        try:
            form_data = request.get_json()
            new_session = Session(
                date=form_data['date'],
                time=form_data['time'],
                event_id=form_data['event_id']
            )
            db.session.add(new_session)
            db.session.commit()
            response = make_response(new_session.to_dict(), 204)
        except:
            response = make_response({"error": "404: Could not create new session"})

    return response

@app.route('/payments', methods=['GET'])
def payments():

    if request.method == 'GET':
        print("Fetching all payments...")
        payments_dict = [payment.to_dict() for payment in Payment.query.all()]
        
        if payments_dict:
            response = make_response(payments_dict, 200)
        
        else:
            response = make_response({"error": "404: Payments not found."})

    return response

@app.route('/login', methods=['POST'])
def login():

    if request.method == 'POST':
        print("Logging in user...")
        form_data = request.get_json()
        email = form_data['email']
        password = form_data['password']

        user = User.query.filter(User.email == email).one_or_none()

        if user and user.authenticate(password):
            response = make_response(user.to_dict(), 200)
            # session['user_id'] = user.id
            # session['user_last_name'] = user.last_name
            # session['user_address'] = user.address

            # response.set_cookie('user_id', user.id)
            response.set_cookie('user_email', user.email)
            # response.set_cookie('user_first_name', user.first_name)

        else:
            response = make_response({"error": "Unable to authenticate user login."}, 404)

    return response

@app.route('/logout', methods=['DELETE'])
def logout():
    if request.method == 'DELETE':
        print("Logging out user...")
        response = make_response({"success": "Logged out and cookies cleared."})

        # for cookie in request.cookies:
        response.set_cookie('user_email', '', expires=0)

        return response

if __name__ == '__main__':
    app.run(port=5555, debug=True)
