import logo from './logo.svg';
import './App.css';
// Importing necessary components and modules from React and React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import AddSales from './pages/AddSales';
import TopSales from './pages/TopSales';
import TodayTotalRevenue from './pages/TodayTotalRevenue';

// Main functional component for the application
function App() {
  return (
    <div className='app-bg'>
      
       {/* Setting up React Router with BrowserRouter */}
    
    <BrowserRouter>
    
     {/* Including the navigation bar component */}
      
      <NavBar />      
      
      {/* Defining routes for different pages */}
     
      <Routes>
        {/* Route for the default path, rendering the Login component */}
       
        <Route exact path="/" element={<Login />}></Route>
        
         {/* Route for the 'addsales' path, rendering the AddSales component */}
        
        <Route exact path="/addsales" element={<AddSales />}></Route>
        
        {/* Route for the 'topsales' path, rendering the TopSales component */}
        
        <Route exact path="/topsales" element={<TopSales/>}></Route>
        
        {/* Route for the 'todaytotalrevenue' path, rendering the TodayTotalRevenue component */}
        
        <Route exact path="/todaytotalrevenue" element={<TodayTotalRevenue/>}></Route>
        
        {/* Route for the 'login' path, rendering the Login component */}
        
        <Route exact path="/login" element={<Login />}></Route>
        
        {/* Route for the 'register' path, rendering the Register component */}
        
        <Route exact path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  </div>
  );
}
// Exporting the App component as the default export
export default App;
