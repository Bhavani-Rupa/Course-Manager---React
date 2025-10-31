// App component
// Sets up global layout, routing, and shared UI (Navbar/Footer)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Courses from './components/Courses';
import AddCourse from './components/AddCourse';
import EditCourse from './components/EditCourse';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        <div className="container mt-4 flex-grow-1">
          <h1 className="text-center mb-4">Course Manager</h1>
          <Routes>
            {/* Landing page */}
            <Route path="/" element={<Home />} />
            {/* Courses listing page */}
            <Route path="/courses" element={<Courses />} />
            {/* Add new course form */}
            <Route path="/add-course" element={<AddCourse />} />
            {/* Edit existing course by id */}
            <Route path="/edit-course/:id" element={<EditCourse />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
