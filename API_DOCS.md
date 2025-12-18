# MindSpace API Documentation

Base URL: `http://localhost:5001/api`

## Authentication

### Register User
- **Endpoint**: `POST /auth/register`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: `201 Created` with Token

### Login User
- **Endpoint**: `POST /auth/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: `200 OK` with Token

### Get Current User
- **Endpoint**: `GET /auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK` with User details

---

## Journals

### Get All Journals
- **Endpoint**: `GET /journals`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK` (Array of journals)

### Create Journal Entry
- **Endpoint**: `POST /journals`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "My Day",
    "content": "Today was a good day...",
    "mood": "Happy"
  }
  ```
- **Response**: `201 Created`

---

## Moods

### Log Mood
- **Endpoint**: `POST /moods`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "value": 4, // 1-5 scale
    "note": "Feeling energetic"
  }
  ```
- **Response**: `201 Created`

### Get Mood History
- **Endpoint**: `GET /moods`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK`

---

## Goals

### Get Goals
- **Endpoint**: `GET /goals`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: `200 OK`

### Create Goal
- **Endpoint**: `POST /goals`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "text": "Meditate daily",
    "deadline": "2023-12-31"
  }
  ```
- **Response**: `201 Created`

---

## Meditation

### Save Session
- **Endpoint**: `POST /meditations`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "duration": 600, // seconds
    "type": "Breathing"
  }
  ```
- **Response**: `201 Created`
