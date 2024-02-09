import {useNavigate} from "react-router-dom";

const SearchFilter = (props) => {
    let navigate = useNavigate();

    //get distinct counties from house data
            //get housedata -- done. got it from props
            // get county from each of the array element (houses data)
        console.log(props.allHouses);
    //check condition to make sure data is available
    //before props.allHouses component render
    if (!props.allHouses){
        return <h4>Loading</h4>
    }
    //access array Counties
    let arrWithDupeCounties = props.allHouses.map( (house)=>{
        return house.county
    });
    console.log("arrWithDupeCounties:",arrWithDupeCounties);

    //remove array duplicate county 
    //with Array.from: Convert the Set back to an array while maintaining the original order
    //without Array.from: the Set will not maintaining the original order  
    //uniqueCountiesSet = new Set(arrWithDupeCounties);
    const uniqueCounties = Array.from(new Set(arrWithDupeCounties)) ;
    console.log(uniqueCounties);

    let clickHandler = (e) =>{ // e= synthetic event
        console.log(e);
        console.log("changed:"+ e.target.value);
        let countyName  = e.target.value;
        //Navigate to search results component
        navigate('/searchresults/'+countyName);

    }

    return ( 
        <div className="row d-flex justify-center">
            <div className="col-sm-12 text-center">
                <div className="dropdown open mt-0">
                    <button
                        className="btn btn-primary btn-outline-light dropdown-toggle"
                        type="button"
                        id="triggerId"
                        data-bs-toggle="dropdown"

                        //primarily used for accessibility purposes mainly meant for screen readers 
                        //and other assistive technologies to provide information about the state of the dropdown to users with disabilities.
                        aria-haspopup="true" // indicates the button has a popup menu
                        aria-expanded="false" // indicates the associated dropdown menu is initially collapsed or hidden.
                        //the dropdown menu becomes visible, aria-expanded="true" attribute is updated to true.
                        
                    >
                        Select County:
                    </button>
                    <div className="dropdown-menu" aria-labelledby="triggerId">
                        {
                            uniqueCounties.map( (countyName) =>{
                                {/* an event and an event handler */}
                            return <button className="dropdown-item" href="#" key={countyName} onClick={clickHandler} value={countyName} >{countyName}</button>
                            })
                        }                    

                    </div>
                </div>             
            </div>
        </div>
     );
}
 
export default SearchFilter;