/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList } from 'recharts';
import { AuthContext } from '../../Logout/Provider/AuthProvider';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FaCircle } from "react-icons/fa";


const Monthly_Dpdc_Chart = () => {
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
            const res = await axios.get('https://scubetech.xyz/power-monitor/monthly-total-energy/', { headers });
            return res.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    };

    const { data: monthData = [] } = useQuery({
        queryKey: ['monthData'],
        queryFn: fetchData,
        enabled: !!token,
        refetchOnWindowFocus: false
    });

    // Get current date
    const currentDate = new Date();

    // Extract current month and year
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // Get last day of current month
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Generate labels for days of current month
    const labels = Array.from({ length: lastDayOfMonth }, (_, i) => (i + 1).toString());

    // Populate data with dates, values, and labels
    const data = labels.map((day) => {
        const dateString = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        // console.log(dateString)
        const matchingEntry = monthData.find(entry => entry.date === dateString);
        
        return {
            date: dateString,
            value: matchingEntry ? matchingEntry.total_energy : null
        };
    });

    // Format the date to show only the day
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.getDate();
    };

    // Custom content for the tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const date = payload[0].payload.date;
            return (
                <div className="custom-tooltip bg-black p-3 rounded-lg">
                    <p className="date text-center">{formatDate(date)}</p>
                    <hr className="line" />
                    <p className='flex items-center justify-center gap-1'><FaCircle className='text-xs text-purple-600' /> DPDC Energy(kWh) : {payload[0].value.toFixed(2)}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className=' shadow-xl h-[460px] mt-4'>
            <div className='text-center mb-2'>
                <h2 className='font-bold text-black'>This Month DPDC Energy</h2>
            </div>
            <BarChart
                width={750} // Increase width to accommodate all ticks
                height={400}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                barSize={20}
            >
                <XAxis
                    dataKey="date"
                    scale="point"
                    padding={{ left: 20, right: 20 }}
                    tickFormatter={(value) => formatDate(value)} // Use formatDate function to format ticks
                    tick={{ fill: 'black' }}
                    interval={0} // Disable automatic skipping of ticks
                />
                <YAxis tick={{ fill: 'black' }} />
                <Tooltip content={<CustomTooltip />} contentStyle={{ color: 'black' }} labelFormatter={formatDate} />
                {/* <Legend /> */}
                <CartesianGrid stroke="#7C7C7C" />
                <Bar dataKey="value" fill="#8884d8">
                    <LabelList dataKey="value" position="top" formatter={value => value !== null ? value.toFixed(2) : ""} fill="black" />
                </Bar>
            </BarChart>
        </div>
    );
};

export default Monthly_Dpdc_Chart;