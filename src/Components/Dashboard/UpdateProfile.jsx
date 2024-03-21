import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Logout/Provider/AuthProvider";



const UpdateProfile = () => {

    const { getToken } = useContext(AuthContext);
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(getToken);
    }, [getToken]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const first_name = form.first_name.value;
        const phone_no = form.phone_no.value;
        const company_name = form.company_name.value;
        const address = form.address.value;
        const updatedValue = { first_name, phone_no, company_name, address };
        console.log(updatedValue)

        try {

            const headers = {
                Authorization: `Token ${token}`
            };

            const response = await axios.put('https://scubetech.xyz/power-monitor/update-profile/', updatedValue, { headers });
            console.log(response.data)
            if (response.data.token) {
                Swal.fire({
                    title: "Thank You!",
                    text: "Your Data Is Updated!",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }

    }
    const handleChange = async (e) => {
        e.preventDefault();
        const form = e.target;
        const old_password = form.old_password.value;
        const new_password = form.new_password.value;
        const updatedPassword = { old_password, new_password };
        console.log(updatedPassword)

        try {

            const headers = {
                Authorization: `Token ${token}`
            };

            const response = await axios.post('https://scubetech.xyz/power-monitor/change-password/', updatedPassword, { headers });
            console.log(response.data)
            if (response.data.token) {
                Swal.fire({
                    title: "Thank You!",
                    text: "Your Data Is Updated!",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }

    }

    return (
        <div className="w-full flex items-center justify-center ">
            <div >
                <div className="text-center">
                    <form onSubmit={handleUpdate} className="card-body">
                        <div className="form-control w-[700px] flex justify-center">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="first_name" placeholder="Name" className="input input-bordered bg-transparent border-black" required />
                        </div>
                        <div className="form-control w-[700px] flex justify-center">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input type="text" name="phone_no" placeholder="Phone Number" className="input input-bordered bg-transparent border-black" required />
                        </div>
                        <div className="form-control w-[700px] flex justify-center">
                            <label className="label">
                                <span className="label-text">Company Name</span>
                            </label>
                            <input type="text" name="company_name" placeholder="Company Name" className="input input-bordered bg-transparent border-black" required />
                        </div>
                        <div className="form-control w-[700px] flex justify-center">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input type="text" name="address" placeholder="Address" className="input input-bordered bg-transparent border-black" required />
                        </div>
                        <div className="form-control w-[700px] mt-6">
                            <button type="submit" className="btn text-white font-bold bg-[#FF3811]">Update Profile</button>
                        </div>
                    </form>
                </div>
                <h2 className="border-b border-gray-500 w-full"></h2>
                <div className="text-center">
                    <form onSubmit={handleChange} className="card-body">
                        <div className="form-control w-[700px] flex justify-center">
                            <label className="label">
                                <span className="label-text">Old Password</span>
                            </label>
                            <input type="text" name="old_password" placeholder="Old Password" className="input input-bordered bg-transparent border-black" required />
                        </div>
                       
                        <div className="form-control w-[700px] flex justify-center">
                            <label className="label">
                                <span className="label-text">New Password</span>
                            </label>
                            <input type="text" name="new_password" placeholder="New Password" className="input input-bordered bg-transparent border-black" required />
                        </div>

                        <div className="form-control w-[700px] mt-6">
                            <button type="submit" className="btn text-white font-bold bg-[#FF3811]">Update Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;