/* eslint-disable no-undef */
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Logout/Provider/AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const MakeAdmin = () => {

    const { getToken } = useContext(AuthContext);
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(getToken);
    }, [getToken]);

    const fetchData = async () => {
        try {
            const headers = {
                Authorization: `Token ${token}`
            };
            const res = await axios.get('https://scubetech.xyz/power-monitor/approved-users/', { headers });
            return res.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    };

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: fetchData,
        enabled: !!token,
        refetchOnWindowFocus: false
    });
    console.log(users)



    const makeSuperUser = async (id) => {
        try {
            const headers = {
                Authorization: `Token ${token}`
            };
            const res = await axios.put(`https://scubetech.xyz/power-monitor/grant-superuser/${id}/`, {}, { headers });

            refetch()
            return res.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }


    const toggleButton = (user) => {

        if (user.is_superuser) {
            return (
                <button onClick={() => toggleUserRole(user.id)} className="btn btn-warning text-white font-bold w-32" >No Access</button>
            );
        } else if (user.is_staff) {
            return (
                <button onClick={() => makeSuperUser(user.id)} className="btn btn-accent text-white font-bold w-32" >Make User</button>
            );
        } else {
            return (
                <button onClick={() => makeSuperUser(user.id)} className="btn btn-accent text-white font-bold w-32" >Make Admin</button>
            );
        }
    };







    const handleDelete = async (id) => {
        try {
            const headers = {
                Authorization: `Token ${token}`
            };
            await axios.delete(`https://scubetech.xyz/power-monitor/delete-user/${id}/`, { headers });
            refetch();
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            );
        } catch (error) {
            console.error("Error deleting data:", error);
            Swal.fire(
                'Error!',
                'Failed to delete the file. Please try again later.',
                'error'
            );
        }
    };

    return (
        <div>
            <h2 className="text-center mb-8 text-2xl">Make Admin and User</h2>
            <div>
                <div >
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-black">#</th>
                                <th className="text-black">Id</th>
                                <th className="text-black">Name</th>
                                <th className="text-black">Email</th>
                                <th className="text-black">Role</th>
                                <th className="text-black">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((data, i) => (
                                <tr key={data.id}>
                                    <th>{i + 1}</th>
                                    <td>{data.id}</td>
                                    <td>{data.first_name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.is_superuser && data.is_staff === true ? 'Super Admin' : !data.is_superuser && data.is_staff === true ? 'Admin' : 'User'}</td>
                                    <div className="flex items-center ">
                                        <td>{toggleButton(data)}</td>
                                        <button onClick={() => handleDelete(data.id)} className="btn bg-red-600 font-bold text-white">Delete</button>
                                    </div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MakeAdmin;