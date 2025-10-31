# Course Manager

A React-based web application for managing courses, built with Vite, JavaScript, Bootstrap, and React Router.

## Features

- 📚 View all courses with pagination
- 🔍 Search and filter courses by category
- ➕ Add new courses with form validation
- ✏️ Edit existing courses
- 🗑️ Delete courses with confirmation modal
- 📱 Responsive design with Bootstrap

## Tech Stack

- **Frontend**: React 18 with JavaScript
- **Build Tool**: Vite
- **Styling**: Bootstrap 5
- **Routing**: React Router DOM
- **Backend**: JSON Server (for development)
- **Hooks**: useState, useEffect, useNavigate, useParams

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository or download the project files
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the JSON server (backend API) in one terminal:
   ```bash
   npm run server
   ```
   This will start the JSON server on `http://localhost:3001`

2. Start the development server in another terminal:
   ```bash
   npm run dev
   ```
   This will start the Vite development server on `http://localhost:3000`

3. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build
- `npm run server` - Start the JSON server for the backend API
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
src/
├── components/
│   ├── AddCourse.jsx      # Form to add new courses
│   ├── Courses.jsx        # Display and manage courses list
│   ├── EditCourse.jsx     # Form to edit existing courses
│   ├── Home.jsx           # Landing page
│   ├── Navbar.jsx         # Navigation component
│   └── Footer.jsx         # Footer component
├── App.jsx                # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles
```

## API Endpoints

The application uses a JSON server that provides the following endpoints:

- `GET /courses` - Get all courses
- `GET /courses/:id` - Get a specific course
- `POST /courses` - Create a new course
- `PUT /courses/:id` - Update a course
- `DELETE /courses/:id` - Delete a course

## Features in Detail

### Course Management
- **Add Course**: Form with validation for title, description, duration, and category
- **Edit Course**: Pre-populated form to update course details
- **Delete Course**: Confirmation modal before deletion
- **Search**: Real-time search by course title
- **Filter**: Filter courses by category
- **Pagination**: Display courses in pages (3 per page)

### Form Validation
- Title must be at least 3 characters
- Description must be at least 10 characters
- Duration must be in format "X weeks" or "X days"
- Category selection is required

### Responsive Design
- Mobile-friendly Bootstrap components
- Responsive grid layout
- Collapsible navigation on mobile devices

## Development

The application uses modern React patterns:
- Functional components with hooks
- JavaScript for development
- React Router for client-side routing
- Fetch API for HTTP requests
- Bootstrap for styling and components

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
