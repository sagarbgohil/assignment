# Assignment

## 1. Registration API

- **Objective**: Allow users to register by providing their email and password.
- **Steps**:
  1. User inputs email and password for registration.
  2. Implement email verification logic before registration using a one-time password (OTP) sent to the provided email address.

## 2. Login API

- **Objective**: Enable users to log in using their registered email and password.
- **Steps**:
  1. Users log in by providing their email and password.
  2. Upon successful authentication, generate and return an Auth JWT (JSON Web Token) as an authentication token.

## 3. Reference Token API

- **Objective**: Create an API to refresh the token.
- **Steps**:
  1. User inputs refresh token.
  2. Return an Auth JWT token with expiry 1 hour.

## 4. Get User API

- **Objective**: Retrieve user information.
- **Steps**: Implement an API endpoint that fetches user details based on their authentication.

## 5. Update User API

- **Objective**: Enable users to update their information.
- **Steps**: Implement an API endpoint that allows users to update their profile details.

## Language and Tools

- NestJS
- TypeScript
- Prisma (ORM)

## Acceptance Criteria

1. Create the login token validation part as a separate middleware for other servers to use.
2. Do not use any as the type of arg injected into each function.
3. Each validator that checks for a string should not accept an empty string.
4. For environment variables, validate using the Config Module of Nest JS.
5. Validation Requirements for Required APIs: Ensure compliance with specified standards and security measures.
6. DB validation is required for retrieving user identity information. Avoid using Type ANY.

# Assignment API Documentation

This documentation outlines the endpoints and their usage for the Assignment API.

## Base URL
All endpoints are relative to the base URL: `http://localhost:3000`

## Authentication
The API uses JSON Web Tokens (JWT) for authentication. To access protected endpoints, you need to include a valid JWT token in the Authorization header using the Bearer scheme.

## Endpoints

### Register
- **Method:** POST
- **URL:** `/users/register`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
      "email": "sbg362002@gmail.com",
      "password": "Test@123"
  }
  ```

- **Response:** No response returned.

### Verify
- **Method:** POST
- **URL:** `/users/verify`
- **Description:** Verifies user with OTP.
- **Request Body:**
  ```json
  {
      "email": "sbg362002@gmail.com",
      "otp": "239960"
  }
  ```
- **Response:** No response returned.

### All Users
- **Method:** GET
- **URL:** `/users/all`
- **Description:** Retrieves all users.
- **Response:** Returns a list of all users.

### Get User
- **Method:** GET
- **URL:** `/users`
- **Description:** Retrieves details of the authenticated user.
- **Request Header:** Authorization: Bearer `<JWT Token>`
- **Response:** Returns user details.

### Login
- **Method:** POST
- **URL:** `/login`
- **Description:** Logs in a user.
- **Request Body:**
  ```json
  {
      "email": "test@example.com",
      "password": "Test@123"
  }
  ```
- **Response:** No response returned.

### Update User
- **Method:** PATCH
- **URL:** `/users`
- **Description:** Updates user details.
- **Request Header:** Authorization: Bearer `<JWT Token>`
- **Request Body:**
  ```json
  {
      "email": "test@example.com",
      "name": "Sagar",
      "gender": "M"
  }
  ```
- **Response:** No response returned.

### Refresh Token
- **Method:** POST
- **URL:** `/users/refresh-token`
- **Description:** Refreshes the JWT token.
- **Request Body:**
  ```json
  {
      "refreshToken": "<refreshToken>"
  }
  ```
- **Response:** No response returned.
```
Please replace `<JWT Token>` and `<refreshToken>` with actual values when making requests.
