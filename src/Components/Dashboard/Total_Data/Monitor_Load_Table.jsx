/* eslint-disable no-undef */
/* eslint-disable no-loss-of-precision */
import { useContext, useEffect, useState } from "react";
import { RiArrowUpDownLine } from "react-icons/ri";
import { FaArrowUp } from "react-icons/fa6";
import { AuthContext } from "../../Logout/Provider/AuthProvider";
import axios from "axios";

const Monitor_Load_Table = () => {

    const [sortAscending, setSortAscending] = useState(true);
    const [sortBy, setSortBy] = useState("");

    const { logout } = useContext(AuthContext);
    const [token, setToken] = useState(null);
    const [dpdc, setDpdc] = useState({})
    const [generator, setGenerator] = useState({})


    useEffect(() => {
        setToken(logout);
    }, [logout]);

    const fetchLoadLight = async () => {
        try {
            const headers = {
                Authorization: `Token ${token}`
            };
            const res = await axios.get('https://scubetech.xyz/power-monitor/monitor-load-light/', { headers });
            setDpdc(res.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchLoadHeavy = async () => {
        try {
            const headers = {
                Authorization: `Token ${token}`
            };
            const res = await axios.get('https://scubetech.xyz/power-monitor/monitor-load-heavy/', { headers });
            setGenerator(res.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    console.log(dpdc)


    useEffect(() => {
        if (token) {
            fetchLoadLight();
            fetchLoadHeavy();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);


    const data = [
        {
            name: 'DPDC', ...dpdc
        },
        {
            name: 'Generator', ...generator
        }
    ]

    console.log(data)

    const toggleSort = (column) => {
        if (sortBy === column) {
            setSortAscending(!sortAscending);
        } else {
            setSortBy(column);
            setSortAscending(true);
        }
    };

    // Sorting the data based on column and order
    const sortedData = [...data].sort((a, b) => {
        if (sortBy === "name") {
            return sortAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else {
            return sortAscending ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
        }
    });

    return (
        <div className=" text-black">
            <div>
                <table>
                    <thead onClick={() => toggleSort("name")} className="border bg-blue-200 ">
                        <th rowSpan={2} className="border-r px-2 w-[120px] "><span className="flex justify-center items-center gap-1">Name {sortAscending ? <RiArrowUpDownLine /> : <FaArrowUp className="text-xs" />}</span></th>
                        <th rowSpan={2} className="border-r px-2 w-[130px] "><span className="flex justify-center items-center gap-1">Live Power {sortAscending ? <RiArrowUpDownLine /> : <FaArrowUp className="text-xs" />}</span></th>
                        <th rowSpan={2} className="border-r px-2 w-[120px] "><span className="flex justify-center items-center gap-1">Frequency {sortAscending ? <RiArrowUpDownLine /> : <FaArrowUp className="text-xs" />}</span></th>
                        <th className="border-r">
                            <th colSpan={3} className=" border-b w-[270px]">Live Voltage</th>
                            <tr className="px-2">
                                <th className="border-r  "><span className="flex justify-center items-center gap-1">Line 1 {sortAscending ? <RiArrowUpDownLine /> : <FaArrowUp className="text-xs" />}</span></th>
                                <th className="border-r  "><span className="flex justify-center items-center gap-1">Line 2 {sortAscending ? <RiArrowUpDownLine /> : <FaArrowUp className="text-xs" />}</span></th>
                                <th className="   "><span className="flex justify-center items-center gap-1">Line 3 {sortAscending ? <RiArrowUpDownLine /> : <FaArrowUp className="text-xs" />}</span></th>
                            </tr>
                        </th>

                        <th className="border-r">
                            <th colSpan={3} className=" border-b w-[270px]">Live Current </th>
                            <tr className="px-2 ">
                                <th className="border-r  w-[90px] "><span className="flex justify-center items-center gap-1">Line 1 {sortAscending ? <RiArrowUpDownLine /> : <FaArrowUp className="text-xs" />}</span></th>
                                <th className="border-r  w-[90px] "><span className="flex justify-center items-center gap-1">Line 2 {sortAscending ? <RiArrowUpDownLine /> : <FaArrowUp className="text-xs" />}</span></th>
                                <th className="   w-[90px]"><span className="flex justify-center items-center gap-1">Line 3 {sortAscending ? <RiArrowUpDownLine /> : <FaArrowUp className="text-xs" />}</span></th>
                            </tr>
                        </th>
                        <th className="border-r">
                            <th colSpan={2} className=" border-b  w-[270px]">Harmonics</th>
                            <tr className="px-2">
                                <th className="border-r  px-2"><span className="flex justify-center items-center gap-1">Voltage {sortAscending ? <RiArrowUpDownLine /> : <FaArrowUp className="text-xs" />}</span></th>
                                <th className="  px-2"><span className="flex justify-center items-center gap-1">Current {sortAscending ? <RiArrowUpDownLine /> : <FaArrowUp className="text-xs" />}</span></th>

                            </tr>
                        </th>
                        <th rowSpan={2} className="border-r px-2 w-[130px]"><span className="flex justify-center items-center gap-1">Today En... {sortAscending ? <RiArrowUpDownLine /> : <FaArrowUp className="text-xs" />}</span></th>
                    </thead>
                    <tbody className="">
                        {
                            sortedData.map(tdata => (<tr key={tdata.id} className="border">
                                <td className="border-r text-center" >{tdata.name}</td>
                                <td className="border-r text-center">{tdata.live_power?.toFixed(2)} kW</td>
                                <td className="border-r text-center flex justify-center gap-1">
                                    {tdata.live_frequency && <p>{tdata.live_frequency?.toFixed(2)} </p> || tdata.live_power_factor &&
                                        <p>{tdata.live_power_factor?.toFixed(2)} </p>} Hz
                                </td>
                                <td className=" border-r w-[270px]">
                                    <td className="border-r w-[90px] text-center">{tdata.live_voltage_l1?.toFixed(2)} V</td>
                                    <td className="border-r w-[90px] text-center">{tdata.live_voltage_l2?.toFixed(2)} V</td>
                                    <td className="w-[90px] text-center">{tdata.live_voltage_l3?.toFixed(2)} V</td>
                                </td>
                                <td className=" border-r w-[270px]">
                                    <td className="border-r w-[90px] text-center">{tdata.live_current_l1?.toFixed(2)} A</td>
                                    <td className="border-r w-[90px] text-center">{tdata.live_current_l2?.toFixed(2)} A</td>
                                    <td className="w-[90px] text-center">{tdata.live_current_l3?.toFixed(2)} A</td>
                                </td>
                                <td className="border-r w-[270px]">
                                    <td className="border-r w-[136px] text-center">{tdata.average_voltage_harmonics?.toFixed(2)} THD</td>
                                    <td className="w-[134px]  text-center">{tdata.average_current_harmonics?.toFixed(2)} THD</td>
                                </td>
                                <td className="border-r text-center">{tdata.todays_energy?.toFixed(2)} kWh</td>
                            </tr>))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Monitor_Load_Table;