# Quiz Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Multiplayer Functionality](#multiplayer-functionality)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction
The Quiz Application is a **web-based platform** designed to facilitate both **individual and multiplayer quiz sessions**. Users can sign up, log in, and choose topics and subtopics to start a quiz. The application is built using **React** for the frontend and **Node.js** with **Express** for the backend, with data stored in **MongoDB**.

## Features
- **User Authentication**: Sign up, log in, and log out functionality.
- **Topic and Subtopic Management**: View and select topics and subtopics for quizzes.
- **Quiz Modes**: Choose between individual and multiplayer modes.
- **Timed Questions**: Each question has a timer, moving to the next question automatically.
- **Synchronized Multiplayer**: Play with multiple players in real-time with synchronized timers.
- **Scoring System**: Tracks and displays scores based on correct answers.
- **Leaderboard**: View top scores for quizzes.

## Technologies Used
- **Frontend**: React, React Router, Redux, Axios, CSS Modules
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **State Management**: Redux
- **HTTP Client**: Axios
- **WebSockets**: Socket.io (for real-time multiplayer synchronization)

## Prerequisites
- **Node.js** and **npm** installed on your machine
- **MongoDB** instance (local or cloud)

## Installation
1. **Clone the repository:**
    ```bash
    git clone https://github.com/Rohank1442/PineTree.git
    cd PineTree
    ```

2. **Install dependencies for both frontend and backend:**
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

3. **Start the backend server:**
    ```bash
    cd server
    npm run dev
    ```

4. **Start the frontend server:**
    ```bash
    cd client
    npm start
    ```

## Usage
1. **Access the application:**
    Open your browser and navigate to `http://localhost:3000`.

2. **Sign up or log in:**
    Create a new account or log in with existing credentials.

3. **Select a topic and subtopic:**
    Browse through the available topics and subtopics.

4. **Start a quiz:**
    Choose between individual or multiplayer mode and begin the quiz.

5. **Answer questions:**
    Each question will be displayed with a timer. Answer the questions within the given time.

6. **View results:**
    After completing the quiz, view your score and performance.

## Project Structure
quiz-app/
├── server/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── .env
│ ├── app.js
│ └── package.json
├── client/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── Redux/
│ │ ├── App.js
│ │ ├── index.js
│ ├── public/
│ ├── .env
│ └── package.json
└── README.md

## API Endpoints
### Authentication
- **POST** `/auth/signup`: User registration
- **POST** `/auth/login`: User login
- **POST** `/quiz`: Create quiz
- **POST** `/quiz/storeResponse`: Stores Response 

### Topics
- **GET** `/topics`: Fetch all topics
- **GET** `/topics/:id`: Fetch a specific topic by ID

### Subtopics
- **GET** `/topics/:id/subtopics`: Fetch all subtopics for a specific topic
- **GET** `/subtopics/:id`: Fetch a specific subtopic by ID

### Quiz
- **GET** `/quiz/getQuizData/:subTopicId`: Get Quiz Data
- **GET** `/quiz/getQuizJoinId/:joiningId`: Join Quiz from Homepage

## Multiplayer Functionality
### Overview
The multiplayer mode allows multiple players to join a quiz session and answer questions in real-time. 
All players see the same questions simultaneously, with a global timer ensuring synchronization across all clients.

### Key Features
- **Real-time Synchronization**: Using **Socket.io**, all players' sessions are synchronized, ensuring that everyone receives the questions at the same time.
- **Global Timer**: A timer runs globally for the entire quiz, ensuring that all players move to the next question simultaneously.
- **Individual Question Timer**: Each question has a countdown timer, ensuring players answer within the allotted time.

### Implementation Details
- **Socket.io**: Used for real-time communication between the server and clients.
- **Global Timer Logic**: Managed on the server-side to ensure all clients are in sync.
- **Player Management**: Handles player joining, leaving, and tracking scores in real-time.

### Usage
1. **Select Multiplayer Mode**: Choose a topic and subtopic, then select the multiplayer option.
2. **Join or Create a Room**: Players can join an existing room or create a new one.
3. **Start Quiz**: Once enough players have joined, the host can start the quiz.
4. **Answer Questions**: Each question will be displayed with a timer. All players will see the same question and timer.
5. **View Results**: After completing the quiz, view individual and overall scores.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the project's coding standards and includes appropriate tests.

## License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more information.

## Contact
For any inquiries or issues, please contact [rohankumar1442@gmail.com](mailto:rohankumar1442@gmail.com) or Linkdin(https://www.linkedin.com/in/rohan-kumar-1656b923b/).
