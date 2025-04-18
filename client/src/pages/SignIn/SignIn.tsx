import './signin.css'

import {auth, provider, signInWithPopup} from '../../shared/services/auth'
import {  useNavigate } from 'react-router-dom';
import { UserCredential } from 'firebase/auth';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToast } from 'shared/components/toast/toastSlice';

const API_URL = process.env.REACT_APP_API_URL

interface AuthUserCredential extends UserCredential {
    _tokenResponse?: {
      isNewUser: boolean;
    };
  }

function SignIn() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const showToast = (message: string, type: "success" | "error" | "info", link?: string) => {
      dispatch(addToast({ message, type , link}));
    };
  

    // SignIn with GG ====================================== author: Hai
    const GGSingIn = async () => {
        if(!auth || !provider) {
            console.log("ERR: GG Firebse cofig Err!");
            return;
        }
        try {
            const result = (await signInWithPopup(auth, provider)) as AuthUserCredential;
            console.log("SIGNIN SUCCESS: ", result);
        
            // const isNewUser = result._tokenResponse?.isNewUser;
            // if(isNewUser){
            // console.log("NEW USER SIGNIN -> CREATE:");
            const userData = { 
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoUrl: result.user.photoURL,
                emailVerified: result.user.emailVerified,
            }; 
            const res = await axios.post(`${API_URL}/users/google-signin`, userData);
            console.log("GG SigIn RES:", res.data);
            // }

            localStorage.setItem('token', await result.user.getIdToken());
            showToast(`${res.data.code === "success" ?"Đăng nhập thành công": "Oops...!"}`, res.data.code);
            if(res.data.user.role === "admin") showToast("Bạn là ADMIN", "info", '/admin');
            navigate("/member");
        } catch (error) {
          console.error("Login failed", error);
          showToast('Đăng nhập thất bại', "error");
        }
      };
    // ================================================================

    return ( 
        <div className='sigin-full-container h-100 w-100 d-flex justify-content-center align-items-center'>
            <div className="sigin-container d-flex flex-column align-items-baseline gap-4">
                <h1>ĐĂNG NHẬP</h1>
                <span>Sử dụng tài khoản Google để đăng nhập. </span>
                <button
                    className="gg-signin p-4 d-flex gap-3 justify-content-center align-items-center border-0"
                    onClick={() => GGSingIn()} 
                >
                    <i className="pi pi-google"></i>
                    Đăng nhập với Google
                </button>
            </div>
        </div>
    )
}

export default SignIn