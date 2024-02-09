import { Link } from "react-router-dom";
import SearchFilter from "./SearchFilter";
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
    let navigate = useNavigate();

    let loginHandler = () =>{
        navigate('/login');
    }

    let logoutHandler = () =>{
        sessionStorage.clear();
        navigate('/');
    }

    let signupHandler = () =>{
        navigate('/signup');
    }
    
    return (
        <div className="row bg-primary align-items-center">
            
                <div className="col-sm-3">
                <Link to="/"><img className="w-25" src="/images/logo.png" alt="logo here" /></Link>
                </div>
            
            <div className="col-sm-5 d-flex justify-content-center"></div>
            {/* {mx-3 is margin on both left and right 3 space value} */}
            <div className="col-sm-4 d-flex justify-content-end "> 
               <SearchFilter allHouses={props.allHouses}/>       
                {
                /* if sessionStorage.username is exist, show logout */
                // (sessionStorage.getItem("username"))
                (sessionStorage.username)
                ?
                <button className="btn btn-primary btn-outline-light  mx-3" onClick={logoutHandler}>Logout</button>
                :
                // make sure wrap int one parent <div>/<div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary btn-outline-light  mx-3" onClick={loginHandler}>Login</button>
                    <button className="btn btn-primary btn-outline-light " onClick={signupHandler}>SignUp</button>
                </div>
                }
            </div>            
        </div>       
      );
}
 
export default Header;

    
           
