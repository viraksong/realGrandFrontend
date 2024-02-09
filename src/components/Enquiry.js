import axios from 'axios';
import {useState} from 'react';

// Enquiry props from House component
// <Enquiry _id={props.houseInfo._id} address={props.houseInfo.address}/>
const Enquiry = (props) =>{
    const { _id, address } = props ;
    //one way to add _id and address
    // let [enquiryObject,  setEnquiryObject] = useState ({id:_id, address:address,email:'', username:'', phone:'', remarks:''})
    let [enquiryObject,  setEnquiryObject] = useState ({email:'', username:'', phone:'', remarks:''})
   
    let [submitedEnquiry, setSubmitedEnquiry] = useState (false);
    let onChangeHandler = (e) =>{
        setEnquiryObject ( {...enquiryObject, [e.target.name]:e.target.value });
        console.log(enquiryObject);
    }
    console.log(_id);
    
    let onClickHandler = async(e)=>{
        e.preventDefault();
        console.log("enquiry: ",enquiryObject);
         //console.log("email is "+email+"  password is "+ password);
        //use fetch and send these values to middle ware   
        
        
        
        //addEnquiry from user input with id and address user interesting the house to enquirySchema 
        try {
            //another way to add _id and address to state
            enquiryObject = {...enquiryObject, id:_id, address:address};

            // setEnquiryObject({...enquiryObject, _id:_id});
            
            //send data to server to add to DB. AllRoutes.js at backend
            let respond = await axios.post(process.env.REACT_APP_BACKEND_URI+'addenquiry',{...enquiryObject});
            console.log("respond: ",respond);
            console.log("enquiry submitted");
            setSubmitedEnquiry(true);
        } catch (error) {
           console.log(error);
           setSubmitedEnquiry(false);
        }
    }

    return (
        // makesure wrap one parent on each block condition
        (submitedEnquiry)
        ?
        <div className='mt-3'>
            <h5>thanks for submitting! Our realtor will get in touch with you soon!</h5>
        </div>
        :
        <div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    aria-describedby="emailHelpId"
                    placeholder="abc@mail.com"
                    onChange={onChangeHandler}
                />
                
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="username"
                    id="username"
                    aria-describedby="helpId"
                    placeholder="username"
                    onChange={onChangeHandler}
                />                
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Mobile</label>
                <input
                    type="text"
                    className="form-control"
                    name="phone"
                    id="phone"
                    aria-describedby="helpId"
                    placeholder="phone"
                    onChange={onChangeHandler}
                />                
            </div>
            <div className="mb-3">
                <label htmlFor="" className="form-label">Remarks</label>
                <textarea 
                    className="form-control" 
                    name="remarks" 
                    id="remarks" 
                    rows="3"
                    onChange={onChangeHandler}
                />                   
            </div>
            <button
                type="submit"
                className="btn btn-primary m-1"        
                onClick={onClickHandler}        
            >
                Submit
            </button>            
        </div>
    );
}

export default Enquiry;