import axios from 'axios';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';



const ForgetPassword = () => {
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [resentLink, setResentLink] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();



    console.log(resentLink)

    
    

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const changeValue = { email };
        try {
            const response = await axios.post('https://scubetech.xyz/power-monitor/forget-password/', changeValue);
            setResentLink(response.data.resent_link);
            setEmailSubmitted(true);
            setError('');
            console.log(response.data)
        } catch (error) {
            setError('Error sending email. Please try again.');
            console.error('Error sending email:', error);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        const otp = e.target.otp.value;
        const password = e.target.password.value;
        const newValue = { otp, password };
        try {
           
          
            const response = await axios.post(resentLink, newValue);
            console.log(response.data);
            // If password update is successful, navigate to login page
            navigate('/login');
        } catch (error) {
            setError('Error updating password. Please try again.');
            console.error('Error updating password:', error);
        }
    };

    return (
        <div className="w-full flex flex-col justify-center items-center h-screen">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {!emailSubmitted && (
                <div className="text-center">
                    <h2>Change Password</h2>
                    <form onSubmit={handleEmailSubmit} className="card-body">
                        <div className="form-control w-[300px] flex justify-center">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control w-[300px] mt-6">
                            <button type="submit" className="btn text-white font-bold bg-[#FF3811]">Submit</button>
                        </div>
                    </form>
                </div>
            )}
            {emailSubmitted && (
                <div className="text-center mt-8">
                    <form onSubmit={handleOtpSubmit} className="card-body">
                        <div className="form-control w-[300px] flex justify-center">
                            <label className="label">
                                <span className="label-text">OTP</span>
                            </label>
                            <input type="password" name="otp" placeholder="Enter OTP" className="input input-bordered" required />
                        </div>
                        <div className="form-control w-[300px] flex justify-center">
                            <label className="label">
                                <span className="label-text">New Password</span>
                            </label>
                            <input type="password" name="password" placeholder="New Password" className="input input-bordered" required />
                        </div>
                        <div className="form-control w-[300px] mt-6">
                            <button type="submit" className="btn text-white font-bold bg-[#FF3811]">Submit</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ForgetPassword;
