# PokeLog API

A RESTful API for managing locations, trainers, and sightings.

## Description

This project provides a RESTful API backend for managing Pokémon-related data, including Trainers, Locations, and Sightings. It features role-based access control using Firebase Authentication and Firestore for storing data. The API interacts with the external PokeAPI to fetch Pokémon details.

## Requirements

Before you begin, ensure you have the following installed and set up:

- **Node.js:** LTS version recommended (e.g., v18.x, v20.x). You can download it from [nodejs.org](https://nodejs.org/).
- **npm** (usually included with Node.js)
- **Firebase Project:**
  - A project created on the [Firebase Console](https://console.firebase.google.com/).
  - **Firebase Authentication** Enabled (Email/Password).
  - **Firestore Database** Created and enabled within the project.
  - A **Firebase Service Account key** (JSON file) downloaded

## Installation

To get this RESTful API backend up and running on your local machine, follow these simple steps:

1.  **Clone the repository:**

    First, open your terminal. Go to the folder where you want the project. Run this command:

    ```bash
    git clone https://github.com/edwrdrvera/capstone-project
    ```

2.  **Navigate to the project directory:**

    Next, go into the project folder you just cloned:

    ```bash
    cd capstone-project
    ```

3.  **Install dependencies:**

    Inside the specified project directory, install all the needed packages with npm:

    ```bash
    npm install
    ```

4.  **Environment Variables:**

    Create a `.env` file in the root of the project directory then fill in the required values.

    ```dotenv
    NODE_ENV=development
    PORT=3000
    FIREBASE_PROJECT_ID=<your_firebase_project_id>
    FIREBASE_PRIVATE_KEY=<your_firebase_private_key_including_newlines>
    FIREBASE_CLIENT_EMAIL=<your_firebase_client_email>
    SWAGGER_SERVER_URL=http://localhost:3000/api/v1 # Or your server URL
    ```

5.  **Start the application:**

    Start the app using the command specified in `package.json` (check the `scripts` section).

    ```bash
    npm start
    ```

The API server should now be running. You can usually access it at `http://localhost:3000`. Check your configuration or `.env` file for the correct port number.

## Features

- **CRUD Operations:** Manage Trainers, Locations, and Sightings (Create, Read, Update, Delete).
- **Authentication:** Secure endpoints using Firebase Authentication.
- **Authorization:** Role-based access control (`admin`, `manager`, `officer`, `user`).
- **Data Validation:** Request body validation using Joi schemas.
- **External API Integration:** Fetches Pokémon data from PokeAPI using `pokenode-ts`.
- **API Documentation:** Find the API docs (Swagger) at `/api-docs`. Once the server runs, go to `http://localhost:3000/api-docs`.
- **Testing:** Unit and integration tests using Jest and Supertest using `npm test`

## Usage

After starting the server, you can interact with the API using tools like `curl`, Postman, or any HTTP client. Most endpoints require authentication.

### Authentication

1.  Authenticate using Firebase Authentication (e.g., via your frontend application or Firebase SDKs) to obtain an ID token for a registered user.
2.  Include this token in the `Authorization` header of your requests as a Bearer token:
    ```
    Authorization: Bearer <YOUR_FIREBASE_ID_TOKEN>
    ```

### Example Requests (using curl)

Replace `<YOUR_FIREBASE_ID_TOKEN>` with an actual token from Firebase Authentication. Adjust the base URL (`http://localhost:3000`) if your `PORT` differs.

**Get all trainers (requires `admin`, `manager`, or `user` role):**

```bash
curl -X GET http://localhost:3000/api/v1/trainers \
  -H "Authorization: Bearer <YOUR_FIREBASE_ID_TOKEN>"
```

## API Endpoints

### Health Check

| Method | Endpoint         | Description                                  | Required Roles |
| :----- | :--------------- | :------------------------------------------- | :------------- |
| GET    | `/api/v1/health` | Checks if the API server is running properly | None           |

### Admin & User Endpoints

| Method | Endpoint               | Description             | Required Roles                    |
| :----- | :--------------------- | :---------------------- | :-------------------------------- |
| POST   | `/api/v1/admin/claims` | Set user claims (roles) | `admin`                           |
| GET    | `/api/v1/users/{uid}`  | Get user profile by UID | `admin`, `manager`, `user` (self) |

### Trainer Endpoints

| Method | Path                    | Description            | Required Roles             |
| :----- | :---------------------- | :--------------------- | :------------------------- |
| POST   | `/api/v1/trainers`      | Create a new trainer   | `admin`, `manager`         |
| GET    | `/api/v1/trainers`      | Get all trainers       | `admin`, `manager`, `user` |
| GET    | `/api/v1/trainers/{id}` | Get a trainer by ID    | `admin`, `manager`, `user` |
| PUT    | `/api/v1/trainers/{id}` | Update a trainer by ID | `admin`, `manager`         |
| DELETE | `/api/v1/trainers/{id}` | Delete a trainer by ID | `admin`                    |

### Location Endpoints

| Method | Path                     | Description             | Required Roles             |
| :----- | :----------------------- | :---------------------- | :------------------------- |
| POST   | `/api/v1/locations`      | Create a new location   | `admin`, `manager`         |
| GET    | `/api/v1/locations`      | Get all locations       | `admin`, `manager`, `user` |
| GET    | `/api/v1/locations/{id}` | Get a location by ID    | `admin`, `manager`, `user` |
| PUT    | `/api/v1/locations/{id}` | Update a location by ID | `admin`, `manager`         |
| DELETE | `/api/v1/locations/{id}` | Delete a location by ID | `admin`                    |

### Sighting Endpoints

| Method | Path                     | Description             | Required Roles                        |
| :----- | :----------------------- | :---------------------- | :------------------------------------ |
| POST   | `/api/v1/sightings`      | Create a new sighting   | `admin`, `officer`, `manager`         |
| GET    | `/api/v1/sightings`      | Get all sightings       | `admin`, `officer`, `manager`, `user` |
| GET    | `/api/v1/sightings/{id}` | Get a sighting by ID    | `admin`, `officer`, `manager`, `user` |
| PUT    | `/api/v1/sightings/{id}` | Update a sighting by ID | `admin`, `officer`, `manager`         |
| DELETE | `/api/v1/sightings/{id}` | Delete a sighting by ID | `admin`, `manager`                    |
