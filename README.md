# Creator Dashboard - MERN Stack

## 📋 Project Description

The Creator Dashboard is a web application that allows content creators to manage their profiles, earn credits, and interact with personalized content feeds. The platform supports role-based access (User, Admin) and provides a credit points system, feed aggregation from social platforms, and an admin panel to monitor user activities and manage credits efficiently.

### 🚀 Technologies Used

* **Frontend:** React, Vite, Tailwind CSS, shadcn/ui, Redux Toolkit, Radix UI, Framer Motion
* **Backend:** Node.js, Express.js, MongoDB, Redis
* **Deployment:** Render (Backend), Vercel (Frontend)
* **Database:** MongoDB Atlas
* **APIs:** Reddit, Dev.to (for feed aggregation)

## 🛠️ Installation

### Prerequisites

* Node.js (v18 or higher)
* npm
* MongoDB Atlas account
* Redis server
* Render and Vercel accounts for deployment

### 1. Clone the Repository

```
git clone https://github.com/Yadushree-k9898/creator-dashboard.git
cd creator-dashboard
```

### 2. Install Dependencies

#### Frontend

```
cd client
npm run dev
```

#### Backend

```
cd server
npm install
```

## 🌟 Environment Variables

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/creator-dashboard
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://localhost:6379
```

## 💻 Running the Application

### Start Redis Server

```
redis-server
```

### Start Backend

```
cd server
npm run dev
```

### Start Frontend

```
cd client
npm install
npm run dev   # Start development server
npm run build # Build for production
```

### Visit the app

* Open your browser at `http://localhost:5173`

## 🧩 Project Structure

```
creator-dashboard/
├── client/             # Frontend
└── server/             # Backend
```

## 📂 Frontend Folder Structure

* **src/components** - Reusable components (UI, charts, feed)
* **src/pages** - Dashboard, Admin, Auth
* **src/redux** - State management with Redux Toolkit

## 📂 Backend Folder Structure

* **controllers/** - API business logic
* **models/** - Mongoose schemas
* **routes/** - Express routes
* **middlewares/** - JWT authentication, error handling
* **services/** - External API integrations

## 🚀 Deployment

### Backend (Render)

* Create a new service on Render.
* Link to your GitHub repo and deploy.

### Frontend (Vercel)

* Create a new project on Vercel.
* Link to your GitHub repo and deploy.

## ⚙️ Scripts

### Frontend

* `npm run dev` - Start development server
* `npm run build` - Build for production
* `npm run serve` - Preview production build
* `npm run lint` - Run linter
* `npm run lint:fix` - Fix lint errors
* `npm run format` - Format code with Prettier

### Backend

* `npm run dev` - Start development server with Nodemon
* `npm start` - Run production server

## 💡 Features

1. User Authentication with JWT
2. Credit Points System for Activity (daily login, profile completion, feed interaction)
3. Feed Aggregation from Reddit, Dev.to
4. Dashboard for Users and Admin with statistics using charts (pie, donut, bar, line)
5. Role-based Access Control
6. Admin Panel to view and update user credits, monitor feed activity
7. Save, share, and report feed posts

## 📊 Charts and Statistics

* Display user credits and activities with pie, donut, bar, and line charts.
* Real-time updates and responsive design.

## 📝 API Usage

* Integrates with public APIs from Reddit and Dev.to for feed aggregation.
* Data is fetched in real-time and displayed in the user feed.

## 🐛 Known Issues

* CORS issues may arise during API calls from frontend to backend.

## 📧 Contact

For support, contact \[[kyadushree47@gmail.com](mailto:kyadushree47@gmail.com)]
