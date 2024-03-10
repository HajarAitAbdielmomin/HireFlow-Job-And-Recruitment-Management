Steps to execute the project
Make sure that node js is installed in your system. (Used version: v16.15.0)
The backend side using JDK 17.

Things to do after downloading the project:
1.	Navigate to the following directory: 
jobs&interviews&recrutement management system\backend\src\main\resource and open the application.properties 
In the application.properties file, you can make the following changes:
Change the username and password for your data source if needed.
Optionally, you can rename the database name (database name is careerhub). If you choose to rename it, make sure to create a database with the same name in your MySQL database server (in our project we used MySQL workbench).

2.	Run the Backend Application to ensure the mapping but before that make sure that database server is running and accessible.
Once the backend server is running, you can check if the mapping and API endpoints are working correctly. 
Note: you can test the APIs using postman.

3.	
-	Open the terminal within your IDE (e.g., WebStorm)
-	Navigate to the "frontend" directory using the `cd` command:
cd jobs&interviews&recrutement management system/frontend
-	Install the required Node.js modules with the following command:
npm install --legacy-peer-deps
Adding the `--legacy-peer-deps` flag can help avoid compatibility issues during installation.
-	After the installation is complete, start the frontend server: npm start

4.	Navigate to the following URL http://localhost:3000
**Authentication Roles: **
The application has three user roles: Admin, Recruiter, and Applicant. Here's how to access their respective authentication forms:

-	 Admin Authentication:
 To authenticate as an admin, use the following URL: http://localhost:3000/authenticate
(You can create an admin inside the database to access the interfaces of him)
-	Recruiter and Applicant Authentication:
For recruiter and applicant roles, you can access the authentication forms via the application's regular sign-in interface.
