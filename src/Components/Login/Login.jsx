import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Logout/Provider/AuthProvider";

const Login = () => {
    const { updateToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const loginValue = { email, password };

        try {
            const response = await axios.post('https://scubetech.xyz/power-monitor/login/', loginValue);
            const token = response.data.token;
            updateToken(token);
            navigate('/dashboard/knowledgeBase', { replace: true });
        } catch (error) {
            setError('Invalid email or password. Please try again.');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content w-[350px] lg:w-[400px] flex-col lg:flex-row">
                    <div className="card flex-shrink-0 w-full max-w-sm  border border-purple-800">
                        <form onSubmit={handleLogin} className="card-body">
                            <h1 className="text-5xl font-bold text-center">Login</h1>
                            {error && <div className="text-red-500 mb-4">{error}</div>}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="Password" className="input input-bordered" required />
                                <label className="label">
                                    <Link to='/forgetPassword'>Forgot password?</Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn text-white font-bold bg-[#FF3811]">Login</button>
                            </div>
                        </form>
                        <div>
                            <p className='text-center mb-4'>Do not have an account? <Link className='text-orange-600 font-bold' to='/register'>Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
