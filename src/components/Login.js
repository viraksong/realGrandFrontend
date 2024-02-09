import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    // email in useState are from  the name = "email" of input type email 
    // password in useState is from the name = "password" of input type password
    let [formObj,setFormObj] = useState({email:"", password:""});

    //toggle state for invalid user found on DB
    // let [invalidCredentials, setInvalidCredentials] = useState(false);

    // another way of toggle invalid user using state
    let [invalidCredentials, setInvalidCredentials] = useState("");



    let navigate = useNavigate();
    //when using onchange with destructure, using input type name = "email", name ="password"  as key
    //must be matched with assign obj in useState ({email:"", password})
    let changeHandler = (e)=>{
        //e.target.name: name is the name of input field such as input type text, email or password
        //e.target.value  value is what user type in the input field
        //email key in useState must be the same name as e.target.name when using destructure 
        //destructure ...formObj will overwrite value when key the same name; otherwise, the new obj having different key will be created
        setFormObj({...formObj, [e.target.name]:e.target.value}); 
        console.log(formObj);
    }

    let clickHandler = async (e)=>{
        e.preventDefault();
        console.log("Login: ",formObj);

         //console.log("email is "+email+"  password is "+ password);
        //use fetch and send these values to middle ware   
        try {
            let respond = await axios.post(process.env.REACT_APP_BACKEND_URI+"login",{email:formObj.email, password:formObj.password});
            
            console.log('login respond: ',respond);
            // Received data from server meaning user is exist on DB
            
            if (respond.data.length>0) {  
                
                // store data temporarily during a browsing session.
                // methods like setItem(), getItem(), removeItem(), and clear()
                sessionStorage.setItem('username', respond.data[0].username);
                sessionStorage.setItem('email', respond.data[0].email);  
                
                console.log('sessionStorage', sessionStorage);
                console.log('sessionStorage.username', sessionStorage.username);
               ( respond.data[0].role ==='realtor')?navigate('/enquiries'):navigate('/');
                
                console.log('login successfully')
            }else {
                //set true when user is not found on DB
                // setInvalidCredentials(true);

                //another way of toggle not found user
                setInvalidCredentials("invalid user, password, or user not found");
            }
                
        } catch (error) {
            console.log(error);
            
        }
    }

    return ( 
        <div className="d-flex justify-content-center">
            <form>
                {/* invalidCredential is true, user not found */}
                {/* {invalidCredentials&&(<div className="mb-3">
                    <h4 className='display6'> invalid user, password or have not signup yet </h4>
                </div>)
                } */}
                <div className="mb-3">
                    <h4 className='display6'> {invalidCredentials} </h4>
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
                        onChange={changeHandler}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary mb-1"
                    onClick={clickHandler}
                >
                    Submit
                </button>
            </form>
        </div>
     );
}
 
export default Login;