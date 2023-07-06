import logo from './logo.svg';
import './App.css';
import Home from './components/body/Home';
import Template1 from './components/templates/Template1';
import Template2 from './components/templates/Template2';
import Template3 from './components/templates/Template3';
import { Route, Routes } from 'react-router-dom';
import ResumeTemplate from './components/body/ResumeTemplate';
import ResumeForm from './components/inputs/ResumeForm';
import AuthProvider from './components/context/ValContext';
import Resume from './components/body/Resume';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='template:id' element={<ResumeTemplate />} />
          <Route path='template:id/save-resume' element={<Resume/>}/>
        </Routes>
        {/* <Home/> */}
        {/* <Template1/> */}
        {/* <Template2/> */}
        {/* <Template3/> */}
        {/* <ResumeForm/> */}
      </div>
    </AuthProvider>
  );
}

export default App;
