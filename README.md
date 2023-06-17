# E-learning App with MERN Stack
This is an E-learning app built with the MERN stack, which stands for MongoDB, Express.js, React.js, and Node.js. The app allows users to browse, enroll and participate in courses, take quizzes and track their progress.

# Table of Contents
Getting Started
Prerequisites
Installation
Usage
Built With
Contributing
License
Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
To run this project, you will need to have the following installed on your machine:

Node.js
MongoDB
# Installation
1. Clone the repository  
git clone https://github.com/albapozhegu/Learning_Website.git
2. Create a .env file inside backend folder and set the following variables:  
MONGO_URI=<your_mongodb_uri>
2. Start the server  
cd backend  
npm install  
npm start  
The server should now be running on http://localhost:5000.
4. Start the client  
cd frontend  
npm install  
npm start

# Usage
Authentication
To use the app, you need to first create an account by clicking on the sign-up link on the login page. After you have created an account, you can log in to the app using your email and password.

Browsing Courses
Once you are logged in, you can browse courses by clicking on the "Courses" link in the navigation bar. This will take you to the courses page, where you can see a list of all the available courses. Clicking on a course will take you to the course page, where you can see the course details and enroll in the course.

Taking Quizzes
After enrolling in a course, you can take quizzes by clicking on the "Quizzes" link in the navigation bar. This will take you to the quizzes page, where you can see a list of all the available quizzes for the courses you are enrolled in. Clicking on a quiz will take you to the quiz page, where you can take the quiz and see your score.

Tracking Progress
You can track your progress by clicking on the "Progress" link in the navigation bar. This will take you to the progress page, where you can see your progress for all the courses you are enrolled in.

# Built With
MongoDB - NoSQL database  
MySQL - SQL database
Express.js - Node.js web framework  
React.js - Front-end JavaScript framework  
Node.js - JavaScript runtime  
Bootstrap - Front-end CSS framework

# Contributing
Contributions are welcome! :)
