# GameVault - Video Game Backlog & Review Hub

**Course:** CA03 - Full Stack Web Development

## Project Overview

GameVault is a full-stack web application for tracking video games, managing a personal gaming backlog, and recording ratings and playtime.

## Technologies Used

- React and Vite
- Node.js and Express.js
- MongoDB with Mongoose
- JWT authentication

## Features

- User registration and login
- Add, view, edit, and delete games
- Track game status, ratings, and hours played
- Increase playtime using the +1h button
- Filter games by platform, genre, and status

## Setup Instructions

1. Start MongoDB.
2. Open PowerShell in the project folder and run cd server.
3. Run npm install.
4. Create server/.env using server/.env.example as a template and configure PORT, MONGO_URI, and JWT_SECRET.
5. Run npm start in the server folder. The API should run at http://localhost:5000.
6. Open a second terminal, navigate to the project folder, and run cd client.
7. Run npm install and npm run dev in the client folder.
8. Open http://localhost:5173 in your browser.

## API Endpoints

- POST /api/auth/register - Register a user
- POST /api/auth/login - Log in
- GET /api/games - Retrieve games
- POST /api/games - Add a game
- PUT /api/games/:id - Update a game
- DELETE /api/games/:id - Delete a game

## Project Structure

- client/ - Frontend application
- server/ - Backend application
- README.md - Project documentation

## Repository

Suggested repository name: 25070521165-CA-03
