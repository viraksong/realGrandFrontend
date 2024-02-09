import { useParams } from "react-router-dom";
import SearchResultsRow from "./SearchResultsRow";
const SearchResult = (props) => {

    let paramsObj = useParams();
     //get county name
    // console.log(paramsObj);
    // console.log(props.allhouses);

    // based on county name, iterate through the housesData and filter
    let filteredHousesArray = props.allhouses.filter((house)=>(paramsObj.county == house.county));
    //array of county
    console.log('filteredHousesArray ',filteredHousesArray);
    return ( 
        <div>
            <h4>Search Result here</h4>
            <div
            className="table-responsive"
            >
            <table
                className="table table-primary table-striped table-hover"
            >
                <thead>
                    {/* {tr table row} */}
                    {/* {th table header} */} 
                    {/* {scope="col" is attribute and referred to the header cell of a column for accessibility, allowing screen reader interpret table structure correctly } */}
                    <tr>
                        <th scope="col" className="col-5">Image</th>
                        <th scope="col" className="col-5">Address</th>
                        <th scope="col" className="col-2">Price USD</th> 
                    </tr>
                </thead>
                {/*  Parent component is calledHigher Order Component */}
                <tbody>
                    {
                        //filter all house by county
                        filteredHousesArray.map( (filteredhouse)=>{
                        return(  
                            
                            <SearchResultsRow key={filteredhouse._id}  filteredhouse={filteredhouse}/>   
                        )  

                        })
                    }

                </tbody>
            </table>
            </div>
        </div>
     );
}
 
export default SearchResult;

