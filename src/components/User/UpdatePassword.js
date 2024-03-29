import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./UpdatePassword.css";
import Loader from '../layout/loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, updatePassword } from "../../actions/userAction"
import { UPDATE_PASSWORD_RESET } from '../../constants/userContants';
import MetaData from "../layout/MetaData.js";
// import { toast } from 'react-toastify';
import toast from 'react-hot-toast';

const UpdatePassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isUpdated, loading } = useSelector(state => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.append("oldPassword", oldPassword);
        myForm.append("newPassword", newPassword);
        myForm.append("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
    };


    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("Profile Updated Successfully!");
            navigate("/account");
            dispatch({ type: UPDATE_PASSWORD_RESET })
        }

    }, [dispatch, error, isUpdated])


    return (
        <div>
            {loading ? <Loader /> : <div>
                <MetaData title="Change Password" />
                <div className='updatePasswordContainer'>
                    <div className='updatePasswordBox'>
                        <h2 className='updatePasswordHeading'>Change Password</h2>
                        <form
                            className="updatePasswordForm"
                            onSubmit={updatePasswordSubmit}
                        >
                            <div className="loginPassword">
                                <input
                                    type="password"
                                    placeholder="Old Password"
                                    required
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>

                            <div className="loginPassword">
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>

                            <div className="loginPassword">
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <input type="submit" value="Change" className="updatePasswordBtn" />
                        </form>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default UpdatePassword