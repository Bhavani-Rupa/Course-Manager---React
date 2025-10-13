import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="display-2 mb-4 fw-bold">
            Welcome to Course Manager
          </h1>
          <p className="lead mb-5 fs-4">
            Manage your courses efficiently with our comprehensive course management system.
            Create, edit, and organize your educational content with ease.
          </p>
          <div className="mt-5">
            <Link to="/courses" className="btn btn-primary btn-lg me-4 px-5 py-3 home-btn-primary">
              <i className="fas fa-book me-2"></i>
              View Courses
            </Link>
            <Link to="/add-course" className="btn btn-success btn-lg px-5 py-3 home-btn-success">
              <i className="fas fa-plus me-2"></i>
              Add New Course
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
