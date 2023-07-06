import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home';
import Header from './Components/Pages/Header';
import Signup from './Components/Pages/Signup';
import Login from './Components/Pages/Login';
import Dashboard from './Components/Pages/Dashboard';
import Protected from './Components/Pages/Protected';
import Profile from './Components/Pages/Profile';
import AuthProvider from './Components/Context/auth';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='login' element={<Login/>} />
          <Route path='signup' element={<Signup/>} />
          <Route path='dashboard' element={<Protected Component={Dashboard}/>} />
          <Route path='profile' element={<Protected Component={Profile}/>} />
          <Route path='*' element={
            <>
              <h3 className='text-center mt-5 pt-5'>404</h3>
              <h4 className='mt-3 text-center'>Error ! Page not found ....</h4>
              <h6 className='text-center'>Please Go Back to continue</h6>
            </>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
