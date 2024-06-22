# E-commerce API

This is a scalable server-side application for an e-commerce platform, focusing on creating robust APIs, integrating with third-party services, and ensuring secure and efficient data handling.

## Features

- User management (registration and login)
- Product management
- Order processing
- JWT-based authentication
- Secure and efficient data handling with MongoDB
- Mock integrations for payment gateways and logistics providers
- SSL/TLS for secure communication
- Input validation, rate limiting, and secure storage of sensitive information

## Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Rahu1999/ecommerce_api.git
    cd ecommerce-api
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root of your project directory and add the following environment variables:

    ```sh
    touch .env
    ```

    ```env
    MONGO_URI=mongodb://127.0.0.1:27017/ecommerce_api
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

## Scripts

- **Run in development mode**:

    ```sh
    npm run dev
    ```

- **Build the project**:

    ```sh
    npm run build
    ```

- **Run the compiled project**:

    ```sh
    npm start
    ```

## Running the Project

1. **Development Mode**:

    ```sh
    npm run dev
    ```

    This will start the server using `ts-node` and automatically reload the server when any file is saved.

2. **Build and Run**:

    ```sh
    npm run build
    npm start
    ```

    This will compile the TypeScript files into JavaScript and then run the compiled files from the `dist` directory.

## Postman Collection

To test the API endpoints, you can use the provided Postman collection.

1. Import the Postman collection:

    - Download the [Postman Collection](./postman_collection.json) file.
    - Open Postman, click on `Import` in the top left corner.
    - Select the downloaded JSON file and click `Import`.

2. Use the collection to test various API endpoints with example requests.

## Example Environment Variables

Here is an example of what your `.env` file should look like:

```env
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
PORT=5000
