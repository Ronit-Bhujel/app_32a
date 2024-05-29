import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Homepage from './pages/homepage/Homepage';
import Loginpage from './pages/login/Loginpage';
import Registerpage from './pages/register/Registerpage';
import Navbar from './components/Navbar/Navbar.jsx';

// Toast Config
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './pages/admin/admin_dashboard/AdminDashboard.jsx';

function App() {
  return (
    <Router>

      <Navbar/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/register' element={<Registerpage/>} />
        <Route path='/login' element={<Loginpage/>} />

        {/* Admin routes &*/}
        <Route path='/admin/dashboard' element={<AdminDashboard/>} />

      </Routes> 
    </Router>
  );
}

export default App;
  