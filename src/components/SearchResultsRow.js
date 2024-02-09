import { useNavigate } from "react-router-dom";
import '../components.css';


const SearchResultsRow = ({filteredhouse}) => {
    let navigate = useNavigate();
    
    // console.log(filteredhouse.photo)

    let clickHandler = () =>{
        navigate('/searchedhouse/'+filteredhouse._id);

    }
    return ( 
        <tr className="mouse-hover" key={filteredhouse._id} onClick={clickHandler}>
            <td scope="row" ><img className="img-thumbnail w-50  " src={"/images/"+filteredhouse.photo} alt={"/images/"+filteredhouse.photo}/></td>
            <td scope="row" >{filteredhouse.address}</td>
            <td>${filteredhouse.price}</td>
        </tr> 
     );
}
 
export default SearchResultsRow;




