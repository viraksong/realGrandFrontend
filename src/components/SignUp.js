import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    let [formObj,setFormObj] = useState({username:"", phone:"",email:"", password:"", verifiedPassword:"" });
    let [signUp, setSignUp] = useState(false);
    let [accExist, setAccExist] = useState(false);
    let [matchedPass, setMatchedPass] = useState(false);
    // let navigate = useNavigate();

    //when using onchange with destructure, using value of input name, password etc  as key
    //must be matched with assign obj in useState ({})
    let changeHandler = (e)=>{
        setFormObj({...formObj, [e.target.name]:e.target.value}); 
        console.log('formObj:',formObj);       
    }
     
    let clickHandler = async(e)=>{

        // prevent form send query through URL
        e.preventDefault();
        console.log("SignUp: ",formObj);
        console.log(` password: ${formObj.password} verified password: ${formObj.verifiedPassword}`)
        // password not matched
        if ( formObj.password !== formObj.verifiedPassword){
            console.log(`Password was not matched, duplicated ${accExist}, notmatch${matchedPass}, enrol ${signUp}`);      
             
              //set to true to display message for not match password to user
              setAccExist(false);
              setMatchedPass(true)
        }else {

            console.log("matched password",formObj);
            //use fetch and send these values to middle ware  
            
            try {//send to server 
                let respond = await axios.post(process.env.REACT_APP_BACKEND_URI+"signup",{...formObj});//make sure to specify app.use(express.json()); to accept as json format
                console.log("respond: ", respond);

                console.log("respond status: ", respond.status);
                // account is successfully signup
                if (respond.status==200) {
                    setAccExist(false);
                    setMatchedPass(false)
                    setSignUp(true);
                    console.log(`successfully signup duplicated ${accExist}, matchpass ${matchedPass}, enrollok ${signUp}`);
                }
                
            } catch (error) {
                setSignUp(false);
                console.log('my error',error);
                console.log("my error.respond :", error.response.data.code);
                    if (error.response.data.code===11000){
                        //accExist set to true for duplicated Account
                        setAccExist(true);
                        setMatchedPass(false)
                        console.log(`Account is already exist, please use other email duplicated ${accExist}, matchPass${matchedPass}, enrol ${signUp}`)
                    }else{
                        console.log("other error");
                    }                
            } 
        }
    }

    return (
    <div className="row">   
    {
         /*accExist is true for duplicated account and display message here */          
        accExist &&(<div className="col-12 text-center mb-3 display-6"><p>The account is already exist, please use other email</p></div>)
    }

    {   
        matchedPass && (<div className="col-12 text-center mb-3 display-6"><p>Password is not matched</p></div>)    
    }

    {    /* if successfully signup, show message Thank */
        (signUp)
        ?               
            <div className=" col-12 mb-3 display-6 text-center">
                Thanks you for signup account with us. Please login
            </div>              
        :
        /* else has not signup ask to sign up form */        
        <div className="col-12 d-flex justify-content-center"> 
            <form className="w-50" onSubmit={clickHandler}>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            id="username"
                            aria-describedby="helpId"
                            placeholder="username"
                            required
                            onChange={changeHandler}
                        />
                        
                    </div>

                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Phone</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="phone"
                            id="phone"
                            aria-describedby="helpId"
                            placeholder="phone"
                            required
                            onChange={changeHandler}
                        />
                        
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            aria-describedby="emailHelpId"
                            placeholder="abc@mail.com"
                            required
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            placeholder="********"
                            required
                            onChange={changeHandler}
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Verified Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="verifiedPassword"
                            id="verifiedPassword"
                            placeholder="********"
                            required
                            onChange={changeHandler}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary mb-1"                 
                    >
                        Submit
                    </button>
            </form>
        </div>
    }
    </div>        
    );
}
 
export default SignUp;