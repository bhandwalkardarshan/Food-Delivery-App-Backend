# Food-Delivery-App-Backend

This is the backend server for a food delivery app built using Node.js, Express, and MongoDB. The server provides various API endpoints to manage users, restaurants, and orders.

## Installation

1. **Clone the Repository**: 
   ```sh
   git clone https://github.com/yourusername/food-delivery-app-backend.git
   cd food-delivery-app-backend
2. **Install Dependencies**:
    ```sh
    npm install
3. **Configure Environment Variables**:
Create a .env file and configure your environment variables, including the MongoDB connection string and JWT secret key.

4. **Start the Server**:
    ```sh
    npm start 
Routes and Usage
User Routes
1. User Registration
Route: POST /register
Description: Allows users to register for the app. The password is hashed before storing.
Request Body Example:
    ```sh
    {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "password123",
    "address": {
        "street": "123 Main St",
        "city": "Cityville",
        "state": "Stateville",
        "country": "Countryland",
        "zip": "12345"
        }
    }
2. User Login
Route: POST /login
Description: Allows users to log in and returns a JWT token for authentication.
Request Body Example:
    ```sh
    {
    "email": "johndoe@example.com",
    "password": "password123"
    }
3. User Password Reset
Route: POST /user/:id/reset
Description: Allows users to reset their password by providing the current and new passwords in the request body.
Request Body Example:
    ```sh
    {
    "currentPassword": "password123",
    "newPassword": "newpassword456"
    }
Restaurant Routes
1. Create Restaurant
Route: POST /restaurants
Description: Allows the creation of a new restaurant, including menu items.
Request Body Example:
    ```sh
    {
    "name": "Sample Restaurant",
    "address": {
        "street": "456 Elm St",
        "city": "Restaurantville",
        "state": "Foodstate",
        "country": "Deliciousland",
        "zip": "54321"
    },
    "menu": [
        {
        "name": "Burger",
        "description": "Delicious burger",
        "price": 9.99,
        "image": "burger.jpg"
        },
        {
        "name": "Pizza",
        "description": "Tasty pizza",
        "price": 12.99,
        "image": "pizza.jpg"
        }
    ]
    }
Order Routes
1. Place an Order
Route: POST /orders
Description: Allows users to place an order.
Request Body Example: See the example above.
2. Get Order Details
Route: GET /orders/:id
Description: Returns the details of a specific order identified by its ID, including user and restaurant details.
3. Update Order Status
Route: PUT /orders/:id
Description: Allows users to update the status of a specific order identified by its ID.
Request Body Example:
    ```sh
    {
    "status": "preparing" // Update with the desired status
    }
Dependencies
- Express.js: Web application framework.
- Mongoose: MongoDB object modeling.
- Bcrypt: Password hashing and comparison.
- JSON Web Tokens (JWT): User authentication and authorization.