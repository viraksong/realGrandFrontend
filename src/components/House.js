// import { useState } from "react";
import Enquiry from "./Enquiry";

const House = (props) => {

    // let [showEnquiry, setShowEnquiry] = useState (true);
       
    console.log(props.houseInfo);

// props.houseInfo is undefined 
// because the data fetching operation is asynchronous, 
//the component renders before the data is fetched.
//to avoid renders before data is undefined
//check condition to make sure data is available
//before House component render
//It is the reason to use the condition
    if (!props.houseInfo){
        return <h4>....loading</h4>
    }

    return ( 
    <div>
        <div className="row">
            <div className="col-sm-7">
                <h6>Address:</h6>
                <p>{props.houseInfo.address}</p>
            </div>
            <div className="col-sm-5">               
               <h6>Price USD: </h6>
               <p> ${props.houseInfo.price} </p> 
            </div>
        </div>
        <div className="row">
            <div className="col-sm-7">
                <img className="img-thumbnail" src={"/images/"+props.houseInfo.photo} alt={"/images/"+props.houseInfo.photo}/>
            </div>
            <div className="col-sm-5">
                <h6>Description:</h6>                
                <p>{props.houseInfo.description}</p> 

            
            {/* for now show the enquiry form, once login works, check and show only */}
            {/* if showEnquiry true, then show Enquiry, else do nothing */}
            {/* from SearchedHouse component */}
            {/* if sessionStorage.email is exist meaning user is login, then true meaning showEnquiry else false meaning hide Enquiry} */}
            {/* <House houseInfo={searchedHouseObj} showEnquiry={(sessionStorage.email)?true:false}/> */}
            
            {props.showEnquiry && <Enquiry _id={props.houseInfo._id} address={props.houseInfo.address}/>}

            </div>
        </div>
    </div>        
     );
}
export default House;