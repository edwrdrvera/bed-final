# PokeLog API

A RESTful API for managing locations, trainers, and sightings.

## Description

This project provides a RESTful API backend for managing Pokémon-related data, including Trainers, Locations, and Sightings. It features role-based access control using Firebase Authentication and Firestore for storing data. The API interacts with the external PokeAPI to fetch Pokémon details.

## Features

- **CRUD Operations:** Manage Trainers, Locations, and Sightings (Create, Read, Update, Delete).
- **Authentication:** Secure endpoints using Firebase Authentication
- **Authorization:** Role-based access control (`admin`, `manager`, `officer`, `user`)
- **Data Validation:** Request body validation using Joi schemas.
- **External API Integration:** Fetches Pokémon data from PokeAPI using `pokenode-ts`.
- **API Documentation:** OpenAPI (Swagger) documentation generated from code annotations.
- **Testing:** Unit and integration tests using Jest and Supertest.

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
