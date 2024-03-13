/* eslint-disable react/prop-types */
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { AuthContext } from '../../Logout/Provider/AuthProvider';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FaCircle } from "react-icons/fa";

const Daily_Dpdc_Chart = () => {
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
            const res = await axios.get('https://scubetech.xyz/power-monitor/todays-dpdc-power/', { headers });
            return res.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    };

    const { data: dailyData = { 'DPDC Today DATA': [] } } = useQuery({
        queryKey: ['dailyData'],
        queryFn: fetchData,
        enabled: !!token,
        refetchOnWindowFocus: false
    });

    // Get the current date and time
    const currentDate = new Date();
    const currentDay = currentDate.getDate(); // Get the current day of the month

    // Create labels for each hour with minute intervals (e.g., 0:00, 0:01, 0:02, ..., 23:59)
    const hourLabels = Array.from({ length: 24 }, (_, hour) => {
        return Array.from({ length: 60 }, (_, minute) => {
            return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        });
    }).flat();

    // Filter out entries that are not from the current day
    const filteredData = dailyData['DPDC Today DATA'].filter(entry => {
        const entryTime = new Date(entry.timedate);
        return entryTime.getDate() === currentDay; // Check if the entry is from the current day
    });

    // Map over each minute and get the corresponding dpdcPower value
    const data = hourLabels.map((hourLabel, index) => {
        // Calculate the time for the current index by subtracting 6 hours and 40 minutes
        const currentTime = new Date(currentDate.getTime() - (10 * 60 * 60 * 1000) - (26 * 60 * 1000));
        currentTime.setMinutes(currentTime.getMinutes() + index); // Add the index as minutes

        // Find the dpdcPower value for the current time
        const matchingMinuteData = filteredData.find(entry => {
            const entryTime = new Date(entry.timedate);
            return entryTime.getHours() === currentTime.getHours() && entryTime.getMinutes() === currentTime.getMinutes();
        });

        // If data for the current minute exists, return it, otherwise return null
        return {
            time: hourLabel,
            dpdcPower: matchingMinuteData ? matchingMinuteData.dpdc_power : null
        };
    });

    // Calculate the maximum value of dpdcPower for setting Y-axis domain
    const maxDpdcPower = Math.max(...data.map(entry => entry.dpdcPower || 0));
    const yAxisDomain = [0, Math.ceil(maxDpdcPower / 10) * 10];

    //  Custom content for the tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const time = payload[0].payload.time; // Get the time from payload
            const dpdcPower = payload[0].payload.dpdcPower; // Get the DPDC power from payload

            return (
                <div className="custom-tooltip bg-black p-3 rounded-lg">
                    <p className="time text-center">{time}</p>
                    <hr className="line" />
                    <p className='flex items-center justify-center gap-1'><FaCircle className='text-xs text-purple-600' /> DPDC Energy : {dpdcPower.toFixed(3)} kWh</p>
                </div>
            );
        }
        return null;
    };


    return (
        <div className='shadow-xl'>
            <div>
                <h2 className='text-center mb-2 text-black font-bold'>DPDC Energy</h2>
            </div>
            <LineChart
            width={1000}
            height={400}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid stroke="#E5E4E2" />
            <XAxis dataKey="time" interval={59} tick={{ fontSize: 10, fill: 'black' }} />
            <YAxis domain={yAxisDomain} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="line" dataKey="dpdcPower" stroke="#8884d8" dot={false} />
        </LineChart>
        </div>
    );
};

export default Daily_Dpdc_Chart;
