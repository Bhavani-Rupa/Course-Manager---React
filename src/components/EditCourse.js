import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditCourse() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const categories = ['Web Development', 'Data Science', 'Programming', 'Other'];

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:3001/courses/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course');
        }
        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setDuration(data.duration);
        setCategory(data.category);
        setLoading(false);
      } catch (err) {
        setErrors({ form: err.message });
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }
    if (description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters long';
    }
    if (!/^\d+\s*(weeks|days)$/i.test(duration)) {
      newErrors.duration = 'Duration must be in the format "X weeks" or "X days"';
    }
    if (!category) {
      newErrors.category = 'Please select a category';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`http://localhost:3001/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, duration, category }),
      });
      if (!response.ok) {
        throw new Error('Failed to update course');
      }
      navigate('/courses');
    } catch (err) {
      setErrors({ form: err.message });
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (errors.form) return <div className="alert alert-danger">{errors.form}</div>;

  return (
    <div>
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Course Title</label>
          <input
            type="text"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {errors.title && <div className="invalid-feedback">{errors.title}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="duration" className="form-label">Duration</label>
          <input
            type="text"
            className={`form-control ${errors.duration ? 'is-invalid' : ''}`}
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          {errors.duration && <div className="invalid-feedback">{errors.duration}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            className={`form-select ${errors.category ? 'is-invalid' : ''}`}
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <div className="invalid-feedback">{errors.category}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Update Course</button>
      </form>
    </div>
  );
}

export default EditCourse;
