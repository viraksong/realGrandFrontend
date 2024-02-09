import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import House from './components/House';
import { useEffect, useState } from 'react';
// import SearchFilter from './components/SearchFilter';
import { Routes, Route } from 'react-router-dom';
import SearchResult from './components/SearchResults';
import Login from './components/Login';
import SignUp from './components/SignUp';
import SearchedHouse from './components/SearchedHouse';
import PageNotFound from './components/PageNotFound';
import axios from 'axios';
import Enquiries from './components/Enquiries';


function App() {
  //state variable to store housesData ..
  // ..... this will be used to send as props to components as and when needed
  let [housesData,setHousesData] = useState([]);


  //useEffect with [] , so that this block of code is called only once
  // getting the house infor from public folder
  // using fetch and async -await
  // later when we work on middle ware we will replace the "/houses.json" to url to middle ware

  //props drilling because app component pass  props to house, house pass props to enquires 
  useEffect(
    ()=>{
// the async keyword is used to define the fetchData function as an asynchronous function, which means it will return a promise. 
      let fetchData = async () => {
        // USING lOCAL FILE
//The await keyword is used to wait for the asynchronous fetch operation to complete before moving on to the next line. 
        // let response = await fetch("/houses.json");
       
//await is necessary to ensure that the json method is only called after the fetch operation is complete. 
//response.json(); extracts the JSON data from the response
      //  let data = await response.json();
      // setHousesData(data);

      // USING CLOUD BACKEND SERVER at port 5000
      // let response = await axios.get("http://localhost:5000/houses");
      
      console.log("process.env "+ process.env.REACT_APP_BACKEND_URI);
      let response = await axios.get(process.env.REACT_APP_BACKEND_URI+"houses");
      console.log('response',response);
       setHousesData(response.data);
      }
    fetchData();
    },[]);

  return (
    <div className="container-fluid">
      <Header allHouses={housesData}/>
      {/* <SearchFilter allHouses={housesData}/> */}
      <Routes>
        <Route path="/" element={<House houseInfo={housesData[5]} />} />        
        <Route path="/enquiries" element={<Enquiries/>}></Route>
        <Route path="/searchresults/:county" element={<SearchResult allhouses={housesData}/>}/>
        <Route path="/searchedhouse/:id" element={<SearchedHouse allhouses={housesData}/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="*" element={<PageNotFound/>}/>
        
      </Routes>
      
      <Footer/>
    </div>
  );
}

export default App;
// to run  project for frontend
//npm start // check nodepack.json





