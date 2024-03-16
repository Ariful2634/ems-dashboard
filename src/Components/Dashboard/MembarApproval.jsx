import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../Logout/Provider/AuthProvider";
import Swal from "sweetalert2";

const MembarApproval = () => {
    const { logout } = useContext(AuthContext);
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(logout);
    }, [logout]);

    const fetchData = async () => {
        try {
            const headers = {
                Authorization: `Token ${token}`
            };
            const res = await axios.get('https://scubetech.xyz/power-monitor/pending-user/', { headers });
            return res.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    };

    const { data: membar = [], refetch } = useQuery({
        queryKey: ['membar'],
        queryFn: fetchData,
        enabled: !!token,
        refetchOnWindowFocus: false
    });

    console.log(membar)

    const handleDelete = async (id) => {
        try {
            const headers = {
                Authorization: `Token ${token}`
            };
            await axios.delete(`https://scubetech.xyz/power-monitor/delete-user/${id}/`,  { headers });
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

    const sentId = async(id)=> {
        try {
            const headers = {
                Authorization: `Token ${token}`
            };
            const res = await axios.put(`https://scubetech.xyz/power-monitor/admin-approval/${id}/`, {}, { headers });
            
            refetch()
            return res.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    };

    return (
        <div>
            {
                membar.length > 0 ? <div>
                <h2 className="text-center mb-8 text-2xl">Member Approval</h2>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th className="text-black">#</th>
                                    <th className="text-black">Id</th>
                                    <th className="text-black">Name</th>
                                    <th className="text-black">Role</th>
                                    <th className="text-black">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {membar.map((data, i) => (
                                    <tr key={data.id}>
                                        <th>{i + 1}</th>
                                        <td>{data.id}</td>
                                        <td>{data.first_name}</td>
                                        <td>{data.is_superuser && data.is_staff  === true ? 'Super Admin' : !data.is_superuser && data.is_staff === true ? 'Admin' : 'User'}</td>
                                        <td>
                                            <button onClick={()=>sentId(data.id)} className="btn mr-4 bg-emerald-500 border-none text-white">Approve</button>
                                            <button onClick={()=>handleDelete(data.id)} className="btn bg-red-600 text-white">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> :
            <div className="flex justify-center items-center h-[40vh]">
                <h2 className="text-red-600 text-4xl font-bold ">There is no pending request</h2>
            </div>
            }
        </div>
    );
};

export default MembarApproval;
