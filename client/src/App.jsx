// src/App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import TaskTable from './pages/TaskTable';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/tasks" element={<ProtectedRoute element={<TaskTable />} />} />
          <Route path="/" element={<ProtectedRoute element={<TaskTable />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;