# Project Title

MERN Contact Form Email

# Description

A full-stack Sending Email functionality using Node.js, Express.js, MongoDB, and Nodemailer.

# Live Demo

Not deployed yet

# Features

- Send contact form with Name, Email, and Message
- Sended data will sent to your Email address for confirmation
- Data will be stored on MongoDB

# Tech Stack

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express.js
- Other: Nodemailer
- Database: MongoDB
- Version Control: Git, GitHub

# Setup Instructions

1. Clone the repository:

```
git clone https://github.com/hayapy88/mern-contact-form-email
```

2. Navigate to the project directory and install dependencies for both the frontend and backend:

```
cd client
npm install
cd ../server
cd server
npm install
```

3. Create a .env file in the server root directory with the following environment variables:
   MONGODB_URI=MongoDB-connection-string  
   PORT=4000 (or any port you prefer)  
   GMAIL_EMAIL=Your-gmail-address (used when sending emails through Gmail's SMTP service)  
   GMAIL_PASSWORD=Your-app-passwords (required for secure email sending via Gmail)  
   ADMIN_EMAIL=Your-Email-address (receive the inquiry as the admin)

4. Start the frontend and backend (Backend only for now):

```
cd client
npm start
cd ../server
npm run dev
```

<!-- Frontend: Open http://localhost:3000 in your browser to view the frontend.   -->

Backend: The backend will be running on http://localhost:4000 (or whichever port you set).

# API Endpoints

GET /api/v1/inquiries/ - Create an inquiry and send notification Emails

---

You can post a request with the following three values.

```
{
  "name": "Your Test Name",
  "email": "youremail@test.com",
  "message": "Hi, this is a test email."
}
```

# Future Improvements

- Deploy

# Contact Information

Email: hayatoyokoi.work@gmail.com  
LinkedIn: https://www.linkedin.com/in/hayatoyokoi/
