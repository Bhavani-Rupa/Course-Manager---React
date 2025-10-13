import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const coursesPerPage = 3;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3001/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async () => {
    if (!courseToDelete) return;
    try {
      const response = await fetch(`http://localhost:3001/courses/${courseToDelete}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete course');
      }
      setCourses(courses.filter((course) => course.id !== courseToDelete));
      setShowModal(false);
      setCourseToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const openDeleteModal = (id) => {
    setCourseToDelete(id);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setShowModal(false);
    setCourseToDelete(null);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === '' || course.category === categoryFilter)
  );

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const categories = Array.from(new Set(courses.map((course) => course.category)));

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <div className="text-center mb-5">
        <h2 className="display-4 fw-bold mb-3">
          <i className="fas fa-graduation-cap me-3"></i>
          Our Courses
        </h2>
        <p className="lead">Discover and manage your educational journey</p>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search courses by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-filter"></i>
                </span>
                <select
                  className="form-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {currentCourses.length === 0 ? (
        <div className="text-center py-5">
          <div className="card">
            <div className="card-body">
              <i className="fas fa-search fa-3x text-muted mb-3"></i>
              <h5 className="card-title">No courses found</h5>
              <p className="card-text">Try adjusting your search or filter criteria.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          {currentCourses.map((course) => (
            <div key={course.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <div className="mb-3">
                    <i className="fas fa-book fa-2x text-primary mb-2"></i>
                    <h5 className="card-title">{course.title}</h5>
                  </div>
                  <p className="card-text flex-grow-1">{course.description}</p>
                  <div className="mb-3">
                    <p className="card-text mb-1">
                      <i className="fas fa-clock me-2 text-info"></i>
                      <strong>Duration:</strong> {course.duration}
                    </p>
                    <p className="card-text mb-0">
                      <i className="fas fa-tag me-2 text-success"></i>
                      <strong>Category:</strong> {course.category}
                    </p>
                  </div>
                  <div className="mt-auto">
                    <Link to={`/edit-course/${course.id}`} className="btn btn-primary me-2">
                      <i className="fas fa-edit me-1"></i>
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => openDeleteModal(course.id)}
                    >
                      <i className="fas fa-trash me-1"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Delete Confirmation Modal */}
      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Deletion</h5>
              <button type="button" className="btn-close" onClick={closeDeleteModal}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this course?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default Courses;
