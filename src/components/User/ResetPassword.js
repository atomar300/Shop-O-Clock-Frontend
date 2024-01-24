import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "./ResetPassword.css";
import Loader from '../layout/loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, resetPassword } from "../../actions/userAction"
import MetaData from "../layout/MetaData.js";
//import { toast } from 'react-toastify';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();
    const { error, success, loading } = useSelector(state => state.forgotPassword);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.append("newPassword", newPassword);
        myForm.append("confirmPassword", confirmPassword);

        dispatch(resetPassword(token, myForm));
    };


    useEffect(() => {

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            toast.success("Password Updated Successfully!");
            navigate("/login");
        }

    }, [dispatch, error, success])


    return (
        <div>
            {loading ? <Loader /> : <div>
                <MetaData title="Change Password" />
                <div className='resetPasswordContainer'>
                    <div className='resetPasswordBox'>
                        <h2 className='resetPasswordHeading'>Change Password</h2>
                        <form
                            className="resetPasswordForm"
                            onSubmit={resetPasswordSubmit}
                        >
                            <div>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>

                            <div>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <input type="submit" value="Update" className="resetPasswordBtn" />
                        </form>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default ResetPassword