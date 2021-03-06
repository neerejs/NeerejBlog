import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogList from './BlogList';
import BlogDetails from './BlogDetails';
import TopNav from './TopNav';
import ContactMe from './ContactMe';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>

<BrowserRouter>
<TopNav />
  <Routes>
    <Route path="/:year/:month" element={<BlogList  />}> </Route>
    <Route path="/" element={<BlogList  />}> </Route>
    <Route path="/details/:blogid" element={<BlogDetails />}> </Route>
    <Route path="/contactus" element={<ContactMe />}> </Route>
  </Routes>
</BrowserRouter>
</>
  
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
