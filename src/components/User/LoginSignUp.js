import React, { useRef, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./LoginSignUp.css";
import Loader from '../layout/loader/Loader';
import profilePng from "../../images/user-profile-icon-free-vector.jpg";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, login, register } from "../../actions/userAction"
import toast from 'react-hot-toast';
import imageCompression from 'browser-image-compression';


const LoginSignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { error, loading, isAuthenticated } = useSelector((state) => state.user);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);


    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState(profilePng);
    const [avatarPreview, setAvatarPreview] = useState(profilePng);

    const redirect = location.search ? location.search.split("=")[1] : "/account"


    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword))
    };


    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("password", password);
        myForm.append("avatar", avatar);

        dispatch(register(myForm));
    };


    // const registerDataChange = (e) => {
    //     if (e.target.name === "avatar") {
    //         const reader = new FileReader();

    //         reader.onload = () => {
    //             if (reader.readyState === 2) {
    //                 setAvatarPreview(reader.result);
    //                 setAvatar(reader.result);
    //             }
    //         };

    //         reader.readAsDataURL(e.target.files[0]);
    //     }
    //     else {
    //         setUser({ ...user, [e.target.name]: e.target.value });
    //     }
    // };

    const registerDataChange = async (event) => {
        if (event.target.name === "avatar") {
            const imageFile = event.target.files[0];
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            }
            const compressedFile = await imageCompression(imageFile, options);
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onloadend = () => {
                const base64String = reader.result;
                setAvatar(base64String);
                setAvatarPreview(base64String);
            }
        } else {
            setUser({ ...user, [event.target.name]: event.target.value });
        }
    }



    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            navigate(`../${redirect}`, { replace: true });
        }

    }, [dispatch, error, isAuthenticated, redirect])


    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };


    return (
        <div>
            {loading ? <Loader /> : <div>
                <div className='LoginSignUpContainer'>
                    <div className='LoginSignUpBox'>
                        <div>
                            <div className='login_signUp_toggle'>
                                <p onClick={e => switchTabs(e, "login")}>LOGIN</p>
                                <p onClick={e => switchTabs(e, "register")}>REGISTER</p>
                            </div>
                            <button ref={switcherTab}></button>
                        </div>
                        <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                            <div className="loginEmail">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                />
                            </div>
                            <div className="loginPassword">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                />
                            </div>
                            <Link to="/password/forgot">Forget Password?</Link>
                            <input type="submit" value="Login" className="loginBtn" />
                        </form>

                        <form
                            className="signUpForm"
                            ref={registerTab}
                            encType="multipart/form-data"
                            onSubmit={registerSubmit}
                        >
                            <div className="signUpName">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className="signUpEmail">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={registerDataChange}
                                />
                            </div>
                            <div className="signUpPassword">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    name="password"
                                    value={password}
                                    onChange={registerDataChange}
                                />
                            </div>

                            <div id="registerImage">
                                <div>
                                    <img src={avatarPreview} alt='Avatar Preview' />
                                </div>

                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={e => registerDataChange(e)}
                                />
                            </div>
                            <input type="submit" value="Register" className="signUpBtn" />
                        </form>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default LoginSignUp