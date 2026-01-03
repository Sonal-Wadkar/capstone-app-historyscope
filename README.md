# HistoryScope

A full-stack web application that explores history, travel, and art through interactive features and real-time data integration. Discover historical events, plan trips to significant locations, and explore art galleries all in one place.

## Features

- Travel Planner: Browse restaurants, hotels, and attractions using interactive maps powered by Google Maps and Travel Advisor APIs
- Historical Event Timeline: Search and explore world history events by year with detailed information
- Art Gallery: Discover and showcase artwork in a responsive, visually appealing gallery format
- User Authentication: Secure JWT-based login and registration system with password encryption
- Responsive Design: Fully responsive interface optimized for desktop and mobile devices
- Real-time Data: Integration with multiple third-party APIs for up-to-date information

## Tech Stack

### Frontend Technologies
- React 19 (UI library with functional components and hooks)
- Vite (build tool)
- Material-UI (MUI) (responsive component library)
- Leaflet and MapLibre GL (interactive mapping)
- Axios (HTTP client)
- React Router DOM (client-side routing)
- React-Toastify (notification system)

### Backend Technologies
- Node.js and Express.js (server runtime and web framework)
- MongoDB and Mongoose (NoSQL database and ODM)
- JWT (token-based authentication)
- Bcrypt (password hashing and encryption)
- Joi (data validation)
- CORS (cross-origin resource sharing)

### External APIs and Services
- Google Maps API (location services and mapping)
- Travel Advisor API (travel recommendations and place data)
- RapidAPI World History Timeline (historical event data)
- Firebase (authentication and cloud services)

## Installation


### Prerequisites
- Node.js version 14 or higher
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/HistoryScope.git
   cd HistoryScope
   ```

2. Install frontend dependencies
   ```bash
   npm install
   ```

3. Install backend dependencies
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. Configure environment variables

   Create .env file in root directory:
   ```
   VITE_API_URL=http://localhost:5000
   ```

   Create .env file in backend directory:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

5. Start development servers

   Terminal 1 - Frontend:
   ```bash
   npm run dev
   ```

   Terminal 2 - Backend:
   ```bash
   cd backend
   npm start
   ```

6. Access the application
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Usage

- Register and login with user credentials
- Navigate to Travel Planner, Historical Events, or Art Gallery services
- Use filters to search for specific places, events, or artwork
- Click on items to view detailed information and resources

## Project Structure

```
HistoryScope/
├── src/
│   ├── components/          Reusable React components
│   ├── pages/               Page components
│   ├── api/                 API integration functions
│   ├── assets/              Images and static files
│   ├── App.jsx
│   └── main.jsx
├── backend/
│   ├── Controllers/         Request handlers
│   ├── Models/              Database schemas
│   ├── Routes/              API routes
│   ├── Middlewares/         Authentication and validation
│   └── index.js
├── public/                  Static files
├── package.json
├── vite.config.js
└── README.md
```

## Security

- JWT-based authentication with secure token storage
- Bcrypt password hashing for user credentials
- Joi validation for incoming requests
- CORS configuration for secure cross-origin requests
- Protected API routes with middleware authentication

## API Endpoints

Authentication:
- POST /api/auth/register - User registration
- POST /api/auth/login - User login

Travel Planning:
- GET /api/travel/places - Fetch travel recommendations

Historical Events:
- GET /api/history/events - Fetch historical events by year

## Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

Sonal - Diploma Capstone Project

## Acknowledgments

- Material-UI for React components
- Travel Advisor and RapidAPI for data integration
- Google Maps API for mapping services
- Open source community

