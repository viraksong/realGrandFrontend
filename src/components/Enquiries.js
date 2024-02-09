import { useEffect, useState } from "react";
import axios from "axios";
const Enquiries = ()=>{

    // get Enqury from date base by fetching it at useEffect
    // create state variable to keep render each time data change
    // after having data, iterate data array using map() to display data on table

    let [allEnquiries,setAllEnquiries] = useState([]);

    useEffect( ()=>{
        let fetchData = async () =>{
            try {
                //fetch enqury from data at useEffect
                let respond = await axios.get(process.env.REACT_APP_BACKEND_URI+"enquiries")
                let data = await respond.data;
                
                //store in state variable 
                setAllEnquiries(data);
                console.log(allEnquiries);

            } catch (error) {
                //check if any error, show message error
                console.log("error while fetching enquiries");
                console.log(error);

            }
        }
        fetchData();
    }
        ,[]);
    return (

       
        <div
            className="table-responsive"
        >
            <table
                className="table table-primary"
            >
                <thead>
                    <tr>
                        <th scope="col">ID House</th>
                        <th scope="col">Address</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile Number</th>
                        <th scope="col">Comments</th>
                        <th scope="col">SubmittedDate</th>
                    </tr>
                </thead>
                <tbody>
                    {
// after having data, iterate data array using map() to display data on table
                    allEnquiries.map((enqury, index)=>{
                        return (
                        <tr className="" key={index}>
                            <td scope="row">{enqury.id}</td>
                            <td>{enqury.address}</td>
                            <td>{enqury.username}</td>
                            <td>{enqury.email}</td>
                            <td>{enqury.phone}</td>
                            <td>{enqury.remarks}</td>
                            <td>{enqury.submittedDate}</td>
                        </tr>
                        );
                    })
                    
                    }
                    
                    
                </tbody>
            </table>
        </div>
        
    );
};

export default Enquiries;