# Event Planner App

A full-stack event planner application built with React (frontend) and Flask (backend). Users can **create**, **view**, **edit**, and **delete** events in both **list** and **timeline** views.

## Tech Stack

- **Frontend**: React, Axios, Tailwind CSS, React Router, React Calendar Timeline
- **Backend**: Python, Flask, Flask-CORS, SQLAlchemy
- **Database**: SQLite (local, via SQLAlchemy ORM)

## Features

- View all events in either **List View** or **Timeline View**.
- **Create** a new event with title, type (dropdown), start and end date/time.
- **Edit** an existing event's details or **delete** it.

---

## Live Deployment

- **Frontend** (React App): [Visit the Live Website](https://exquisite-clafoutis-6e6957.netlify.app/)
- **Backend API** (Flask API): [View API Endpoints](https://event-planner-app-b1q0.onrender.com/events)

---

## 🛠️ Local Development Setup

### Backend (Flask API)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create database if it doesn't exist yet
flask shell
>>> from app import db
>>> db.create_all()
>>> exit()

# Seed sample data
python seed.py

# Start backend server
flask run
```

# Frontend 

# Start the frontend (in the root directory, where package.json is)
npm install
npm start
```