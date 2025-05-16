
# 🎬 MovieMania

A full-stack Netflix-style streaming web app built with **React**, **Node.js**, **MongoDB**, and the **TMDB API**. Users can browse movies and TV shows, view trailers, manage a watchlist, search content, and register using **OTP email verification** — all in a clean, responsive UI.

---

## 🚀 Features

- 🔐 **User Authentication** with **OTP email verification** and **Forgot Password option** (Nodemailer)
- 🔒 **Forgot Password** flow that updates the user's password securely
- 🔍 **Search** Movies and TV Shows using TMDB API
- 🎞️ **View Trailers** and Detailed Info
- ❤️ **Watchlist** (Favorites stored per user in MongoDB)
- 🔥 **Trending Section** (Popular Movies/Shows via TMDB)
- 📱 **Responsive UI** (Mobile & Desktop)

> ℹ️ **Note**: All movie/TV posters and trailers are fetched from TMDB. Only branding and UI tweaks (like logo) are custom-designed.

---

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Axios  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB + Mongoose  
- **Authentication**: JWT + OTP Email Verification (Nodemailer)  
- **External API**: [TMDB API](https://www.themoviedb.org/documentation/api)  
- **Deployment**: Vercel (frontend), Railway/Render (backend), MongoDB Atlas (database)

---

## 📁 Folders Overview

### /Backend
- /config/ - Contains additional backend components and environment variables (Mongo, ENV_VARS). 
- /controllers/ - Handles user requests, processes data via models, and returns responses to views.
- /mailTrap/ - Used for sending verification mails to the users.
- /middleware/ - Processes requests and responses between client and server.
- /models/ - MongoDB schemas and models  
- /routes/ - Processes requests and responses between client and server.
- /Services/ - To fetch data from TMDB.
- /utils/ - Generates a JWT token for a user.
- server.js - Main entry point for the backend server  

### /Frontend
- src/pages/ - Screens like Login, Signup, Home, Profile.  
- src/components/ - Reusable UI components (e.g., Footer, MovieSlider, Navbar, Watchlistbutton, Skeleton)  
- src/hooks/ - Fetches trending content based on the current contentType from your store.   
- src/utils/ - To access movie or tv images from TMDB.  
- src/store/ - Uses AuthStore and contentStore for easy usage.
- public - To access custom-designed images.

## 📷 Screenshots

> *(Add screenshots from both desktop and mobile views — include homepage, search, trailer popup, watchlist, OTP screen, etc.)*

---

## ⚙️ Local Setup

1. **Clone the repo**:
   ```bash
   git clone https://github.com/Subho4156/MovieMania.git
   ```

2. **Install dependencies**:

   - Frontend:
     ```bash
     cd Frontend
     npm install
     ```

   - Backend:
     ```bash
     npm install
     ```

3. **Set up environment variables** in `backend/.env`:
   ```
   MONGO_URI=your_mongodb_connection
   PORT= your_backend_port_number
   JWT_SECRET=your_jwt_secret
   TMDB_API_KEY=your_tmdb_api_key
   GMAIL_USER=your_email@gmail.com
   GMAIL_PASS=your_app_password
   CLIENT=url_for_forgot_password_link

4. **Run the app**:

   - Backend:
     ```bash
     npm start
     ```

   - Frontend:
     ```bash
     cd ../Frontend
     npm run dev
     ```

---

## ✅ To Do (Optional Improvements)
- Continue Watching section  
- User Profiles  
- Admin Panel for Movie Management  

---

## 📄 License
  
Movie data and posters are fetched via the [TMDB API](https://www.themoviedb.org/documentation/api).
