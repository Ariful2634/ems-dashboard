import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const Register = () => {

    const handleRegister = async (e) =>{
        e.preventDefault();
        const form = e.target;
        const first_name = form.first_name.value;
        const email = form.email.value;
        const password = form.password.value;
        const phone_no = form.phone_no.value;
        const company_name = form.company_name.value;
        const address = form.address.value;
        const registerValue = { first_name,email, password,phone_no,company_name,address };
        console.log(registerValue)

        try {
            const response = await axios.post('https://scubetech.xyz/power-monitor/register/', registerValue);
            console.log(response.data)
            if(response.data.token){
                Swal.fire({
                    title: "Thank You!",
                    text: "Your Registration Is Complete!",
                    icon: "success"
                  });
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }

    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content w-[350px] lg:w-[400px] flex-col lg:flex-row">
                    <div className="card flex-shrink-0 w-full max-w-sm  border border-purple-800">
                        <form onSubmit={handleRegister} className="card-body">
                            <h1 className="text-5xl font-bold text-center">Register</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='first_name' placeholder="Your Name" className="input input-bordered" required />
                            </div>
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
                                
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Phone</span>
                                </label>
                                <input type="text" name='phone_no' placeholder="Phone Number" className="input input-bordered" required />
                                
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Company</span>
                                </label>
                                <input type="text" name='company_name' placeholder="Company Name" className="input input-bordered" required />
                                
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Address</span>
                                </label>
                                <input type="text" name='address' placeholder="Address" className="input input-bordered" required />
                                
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn text-white font-bold bg-[#FF3811]">Register</button>
                            </div>
                        </form>
                        <div>
                            <p className='text-center mb-4'>Already have an account? <Link className='text-orange-600 font-bold' to='/'>Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;