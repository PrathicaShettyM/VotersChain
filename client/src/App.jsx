import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './admin/AdminDashboard';
import AddVoter from './admin/AddVoter';
import ViewVoters from './admin/ViewVoters';
import AddCandidate from './admin/AddCandidate';
import AddElection from './admin/AddElection';
import NotFound from './pages/NotFound';
import ViewCandidates from './admin/ViewCandidates';
import ViewElection from './admin/ViewElection';

function App() {
  return(
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login/>} />

            <Route path="/admin/dashboard" element={<AdminDashboard/>}/>

            <Route path="/admin/register-voter" element={<AddVoter/>}/>
            <Route path="/admin/view-voters" element={<ViewVoters/>}/>

            <Route path="/admin/register-candidate" element={<AddCandidate/>}/>
            <Route path="/admin/view-candidates" element={<ViewCandidates/>}/>

            <Route path="/admin/register-election" element={<AddElection/>}/>
            <Route path="/admin/view-elections" element={<ViewElection/>}/>

            <Route path="*" element={<NotFound />} />
            
          </Routes>
        </BrowserRouter>
      );
}

export default App;
