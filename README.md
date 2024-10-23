# **Brand-Creator Collaboration Platform**

This project is a **Brand-Creator Collaboration Platform** where creators and brands can interact, manage campaigns, submit content, and collaborate on projects. The platform features user registration, login, JWT authentication, campaign management, content submission with file uploads (image/video), and responsiveness for various devices.

## **Table of Contents**

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Backend API Endpoints](#backend-api-endpoints)
- [Frontend](#frontend)
- [File Uploads](#file-uploads)
- [Mobile Responsiveness](#mobile-responsiveness)

## **Features**

### **1. User Authentication**

- Users (Brands and Creators) can register and log in.
- JWT-based authentication is used to protect routes and handle sessions.

### **2. Campaign Management**

- Brands can create campaigns.
- Creators can view available campaigns and submit content.

### **3. Content Submission**

- Creators can submit images and videos to campaigns.
- File uploads are handled securely using **Multer** and **Cloudinary** for storage.

### **4. File Upload Handling**

- Images and videos are uploaded via the frontend, processed in the backend using Multer, and stored in Cloudinary.

### **5. Responsive Design**

- The platform is designed with responsiveness in mind and works well on both desktop and mobile devices.

### **Optional Features**

- Unit tests can be added for additional robustness (not included in this version but recommended).

---

## **Technologies**

### **Frontend:**

- **React**: JavaScript library for building user interfaces.
- **Chakra UI**: Component library for creating beautiful, accessible, and responsive design.

### **Backend:**

- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database used for storing user and campaign data.
- **Multer**: Middleware for handling file uploads in Node.js.
- **Cloudinary**: Service for storing and serving images/videos.
- **JWT (JSON Web Tokens)**: Authentication standard to secure user login and sessions.

---

## **Installation**

### **Backend Setup:**

1. Clone the repository:

   ```bash
   git clone https://github.com/rutyak/brand-creator-portal.git
   cd brand-creator-portl/Backend
   ```

2. Install backend dependencies:
   npm install

3. Set up environment variables in a .env file. (See the Environment Variables section below for details).
   .env : 
   PORT=8000
   MongoDB_url=mongodb+srv://rutikkhandekar123:rutik123@cluster0.kdj7u.mongodb.net/database
   JWT_SECRET=74481614_brand_management


4. Start the backend server:
   "npm start"


### **Frontend Setup:**

   Navigate to the frontend directory:
   cd ../Frontend

5. Install frontend dependencies:
    npm install

6. Start the React development server:
   "npm start"

   Frontend:
   Create a .env file in the root of the frontend directory with the following content:
   REACT_APP_BACKEND_URL=http://localhost:8000


### **Working code video:**

https://drive.google.com/file/d/1oAEMk2PeslGfww_-uAz0YclitKNxr4Nv/view?usp=sharing