# User Management

A robust and user-friendly **User Management** system for handling user registrations, logins, and profile management. This project aims to simplify the process of managing user data with features like authentication, user roles, and security.

## 🚀 Features

- User Registration and Authentication
- Role-based Access Control
- Secure Password Hashing (bcrypt)
- JWT Token-based Authentication
- Profile Management

## 📜 Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [API Documentation](#api-documentation)
4. [Contributing](#contributing)
5. [License](#license)
6. [Contact](#contact)
7. [Acknowledgments](#acknowledgments)

## 🛠️ Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm or yarn
- MongoDB (if using MongoDB as your database)

### Clone the repository

```bash
git clone https://github.com/MrImaginatory/userManagement.git
cd userManagement
```

### Install dependencies

```bash
npm install
# or
yarn install
```

### Environment Configuration

Create a `.env` file in the root directory and add the following variables (update with your own credentials):

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=your_preferred_port
```

### Running the app

To start the app in development mode:

```bash
npm run dev
# or
yarn dev
```

Your app should now be running at `http://localhost:PORT`.

## 💻 Usage

### API Endpoints

#### User Registration

- **POST** `/api/auth/register`
  - Registers a new user.
  - Body: `{ "username": "user", "email": "user@example.com", "password": "password123" }`
  
#### User Login

- **POST** `/api/auth/login`
  - Logs in the user and returns a JWT token.
  - Body: `{ "email": "user@example.com", "password": "password123" }`

#### Profile Management

- **GET** `/api/user/me`
  - Get the logged-in user's profile.
  - Requires Authorization Header with Bearer token.

## 📝 API Documentation

You can find the full API documentation at `docs/api.md`.

## 🤝 Contributing

We welcome contributions from the community. To contribute:

1. Fork the repository
2. Create your branch (`git checkout -b feature/feature-name`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature/feature-name`)
5. Open a pull request

Make sure to follow the [Code of Conduct](CODE_OF_CONDUCT.md) and ensure all tests pass before submitting.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For more information, contact us at: [illusionary@duck.com](mailto:illusionary@duck.com)

## 🙏 Acknowledgments

- [Node.js](https://nodejs.org/) for the server-side framework.
- [MongoDB](https://www.mongodb.com/) for the database.
- [JWT](https://jwt.io/) for secure authentication.
