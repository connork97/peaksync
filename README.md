Application Instructions (5/21/23):

Setup:

1 - Fork and clone repository
2 - In the "server" directory, run the following commands: "pipenv install; pipenv shell"
3 - Navigate back into the server directory.
4 - Run each of the following commands:
    "export FLASK_APP=app.py"
    "export FLASK_RUN_PORT=5555"
    "flask run"
5 - In a new terminal, navigate into the "client" directory and run "npm install" followed by "npm start"

Using the Application:

1 - Login
    1a - For the guest profile experience, the preset account username/email is "guest@guest.com" with the password "password"
    1b - For the admin profile experience, the preset account username/email is "admin@admin.com" with the password "password"
2 - After logging in, give the application a few seconds for guest profiles and up to 30 seconds or so for the admin profile to render the "Dashboard" navbar link at the top right.
3 - Once the "Dashboard" link has rendered, you will have access to your user profile as a guest, and the entire database as an admin.

Note:  In the case of the application crashing/erroring out, navigate back to the login page where you will need to logout and repeat steps 1 through 3 to access the same functionality.  Bugs are being worked on.