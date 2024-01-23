import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./UpdateProfile.css";
import Loader from '../layout/loader/Loader';
import profilePng from "../../images/user-profile-icon-free-vector.jpg";
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction"
import { UPDATE_PROFILE_RESET } from '../../constants/userContants';
import MetaData from "../layout/MetaData.js";
import { toast } from 'react-toastify';

const UpdateProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector(state => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(profilePng);

    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.append("name", name);
        myForm.append("email", email);
        myForm.append("avatar", avatar);

        dispatch(updateProfile(myForm));
    };


    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);

    };



    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("Profile Updated Successfully!")
            dispatch(loadUser());
            navigate("/account");
            dispatch({ type: UPDATE_PROFILE_RESET })
        }

    }, [dispatch, error, user, isUpdated])

    return (
        <div>
            {loading ? <Loader /> : <div>
                <MetaData title="Update Profile" />
                <div className='updateProfileContainer'>
                    <div className='updateProfileBox'>
                        <h2 className='updateProfileHeading'>Update Profile</h2>
                        <form
                            className="updateProfileForm"
                            encType="multipart/form-data"
                            onSubmit={updateProfileSubmit}
                        >
                            <div className="updateProfileName">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="updateProfileEmail">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div id="updateProfileImage">
                                <div>
                                    <img src={avatarPreview} alt='Avatar Preview' />
                                </div>
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={updateProfileDataChange}
                                />
                            </div>

                            <input type="submit" value="Update" className="updateProfileBtn" />
                        </form>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default UpdateProfile