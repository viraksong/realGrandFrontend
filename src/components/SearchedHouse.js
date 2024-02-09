//useParams to capture the parameters from the current route
import { useParams } from "react-router-dom";
import House from "./House";


const SearchedHouse = (props) => {
    //get the id from params in location bar
    let paramsObj = useParams();
    console.log(paramsObj.id);
    
    // compare paramsObj.id with house.id where both id is matched, 
    // return the obj at the matched id to searchedHouseObj
    let searchedHouseObj = props.allhouses.find((house) => { return paramsObj.id == house._id});
    console.log(searchedHouseObj);
    
    
    return (
        <>
        <h1> Searched House !</h1>

        {/* {reuse house component to be displayed at searched house} */}
        {/* if sessionStorage.email is exist meaning user is login, then true meaning showEnquiry else false meaning hide Enquiry} */}
        <House houseInfo={searchedHouseObj} showEnquiry={(sessionStorage.email)?true:false}/>
        </>
     );
}
 
export default SearchedHouse;