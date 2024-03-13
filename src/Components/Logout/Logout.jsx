import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoPersonSharp } from "react-icons/io5";
import { HiPhone } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { MdLocationCity } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";



const Logout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate()

    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(logout);
    }, [logout]);

    const fetchDatas = async () => {
        try {
            const headers = {
                Authorization: `Token ${token}`
            };
            const res = await axios.get('https://scubetech.xyz/power-monitor/user-profile/', { headers });
            return res.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    };

    const { data: user = [] } = useQuery({
        queryKey: ['user'],
        queryFn: fetchDatas,
        enabled: !!token,
        refetchOnWindowFocus: false
    });

    console.log(user)

    const hanldeOut = () => {



        if (token) {
            const headers = {
                Authorization: `Token ${token}`
            };


            axios.post('https://scubetech.xyz/power-monitor/logout/', null, { headers })
                .then(res => {
                    console.log(res.data);

                    navigate('/', { replace: true })

                })
                .catch(error => {
                    console.error('Error logging out:', error);

                });
        } else {
            console.error('Logout token is missing or invalid.');

        }
    };

    return (
        <div>
            <div className="dropdown dropdown-end">
                <details className="dropdown">
                    <summary className="m-1 btn bg-transparent border-none text-white"><CgProfile className="lg:text-xl" /> {user.first_name}</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        <li><button className="btn  w-full" onClick={() => document.getElementById('my_modal_4').showModal()}><IoPersonSharp className="text-blue-500" /> Personal Data</button></li>


                        <li><button onClick={hanldeOut} className="btn w-full"><IoLogOutOutline className="text-xl text-red-600" /> Logout</button></li>
                    </ul>
                </details>
            </div>
            <div>
                <dialog id="my_modal_4" className="modal w-full">

                    <div className="modal-box w-full   max-w-5xl">

                        <div className="modal-box-1 w-full max-w-5xl mb-8 h-12 flex justify-center items-center bg-blue-500 rounded-lg">
                            <h3 className="font-bold text-xl text-white flex items-center gap-3"><IoPersonSharp /> Personal Data</h3>
                        </div>
                        <div className="text-white text-lg mb-4 space-y-3 ">
                            <h2 className="flex items-center gap-2"><IoPersonSharp className="text-blue-500" /> Name: {user.first_name}</h2>
                            <h2 className="flex items-center gap-2"><MdEmail className="text-green-700" /> Email: {user.email}</h2>
                            <h2 className="flex items-center gap-2"><HiPhone className="text-orange-500" /> Phone: {user.phone_no}</h2>
                            <h2 className="flex items-center gap-2"><MdLocationCity className="text-purple-500" /> Company: {user.company_name}</h2>
                            <h2 className="flex items-center gap-2"><IoLocationSharp className="text-red-500" /> Address: {user.address}</h2>
                        </div>
                        <div className="modal-action flex justify-center ">
                            <form method="dialog">
                                {/* if there is a button, it will close the modal */}
                                <button className="btn bg-blue-500 text-white">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>

        </div>
    );
};

export default Logout;