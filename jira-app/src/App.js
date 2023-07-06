import { Routes, Route } from "react-router-dom";
import Header from "./Components/Pages/AuthPages/Header";
import SignUp from './Components/Pages/AuthPages/SignUp';
import Home from './Components/Pages/AuthPages/Home';
import AuthProvider from './Components/Context/ValContext'
import Login from "./Components/Pages/AuthPages/Login";
import UserDashboard from "./Components/Pages/Users/UserDashboard";
import AdminDashboard from "./Components/Pages/Admin/AdminDashboard";
import Protected from "./Components/Pages/AuthPages/Protected";
import AddProject from "./Components/Pages/Admin/AddProject";
import Profile from "./Components/Pages/Admin/Profile";
import ViewProjects from "./Components/Pages/Admin/ViewProjects";
import Error404 from "./Components/Pages/AuthPages/Error404";
import { EditProject } from "./Components/redux/Actions";
import AddTicket from "./Components/Pages/Admin/AddTicket";
import ViewTickets from "./Components/Pages/Admin/ViewTickets";
import EditTicket from "./Components/Pages/Admin/EditTicket";
import ViewUserTickets from "./Components/Pages/Users/ViewUserTickets";
import ViewTicketDetail from "./Components/Pages/Users/ViewTicketDetail";
import BackLog from "./Components/Pages/Users/BackLog";
import ViewProjectDetail from "./Components/Pages/Users/ViewProjectDetail";

// https://emilus.themenate.net/app/apps/project/list  := admin Pannel 
// https://demos.wrappixel.com/premium-admin-templates/react/elite-react/main/tickt/ticket-list := Ticket 
// https://blog.bitsrc.io/implement-better-drag-and-drop-in-your-react-app-beafc4451599 : dnd

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='signup' element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="userDashboard" element={<Protected Component={UserDashboard} />} />
          <Route path="adminDashboard" element={<Protected Component={AdminDashboard} />} />

          <Route path="adminDashboard/addProject" element={<Protected Component={AddProject} />} />
          <Route path="adminDashboard/viewProjects" element={<Protected Component={ViewProjects} />} />
          <Route path="adminDashboard/profile" element={<Protected Component={Profile} />} />
          <Route path="adminDashboard/addTicket" element={<Protected Component={AddTicket} />} />
          <Route path="adminDashboard/viewTickets" element={<Protected Component={ViewTickets} />} />
          <Route path="adminDashboard/editTicket" element={<Protected Component={EditTicket} />} />

          <Route path="userDashboard/viewTickets" element={<Protected Component={ViewUserTickets} />} />
          <Route path="userDashboard/viewTicketDetail" element={<Protected Component={ViewTicketDetail} />} />
          <Route path="userDashboard/viewProjectDetail" element={<Protected Component={ViewProjectDetail} />} />
          <Route path="userDashboard/backlog" element={<Protected Component={BackLog} />} />
          <Route path='*' element={<Error404/>} />
        </Routes>
      </AuthProvider>
    </div >
  );
}

export default App;
