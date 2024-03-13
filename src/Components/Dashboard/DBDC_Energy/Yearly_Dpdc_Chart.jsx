/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList } from 'recharts';
import { AuthContext } from '../../Logout/Provider/AuthProvider';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FaCircle } from "react-icons/fa";
import { MdOutlineBarChart } from "react-icons/md";

const Yearly_Dpdc_Chart = () => {
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
            const res = await axios.get('https://scubetech.xyz/power-monitor/yearly-total-energy/', { headers });
            return res.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    };

    const { data: yearData = [] } = useQuery({
        queryKey: ['yearData'],
        queryFn: fetchData,
        enabled: !!token,
        refetchOnWindowFocus: false
    });

    // Generate labels for each month in the year
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Populate data with months, values, and labels
    const data = months.map((month, index) => {
        const matchingEntry = yearData.find(entry => new Date(entry.date).getMonth() === index);
        
        console.log(matchingEntry)
        
        
        return {
            month,
            value: matchingEntry ? matchingEntry.yearly_dpdc_energy : null
        };
    });

    // Custom content for the tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const month = payload[0].payload.month;
            return (
                <div className="custom-tooltip bg-black p-3 rounded-lg">
                    <p className="date text-center">{month}</p>
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
                <h2 className='font-bold '>This Year DPDC Energy</h2>
                <p className='flex items-center justify-center'><MdOutlineBarChart /> DPDC Energy(kWh)</p>
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
                barSize={40}
            >
                <XAxis
                    dataKey="month"
                    scale="point"
                    padding={{ left: 20, right: 20 }}
                    tick={{ fill: 'black' }}
                    interval={0} // Disable automatic skipping of ticks
                />
                <YAxis tick={{ fill: 'black' }} />
                <Tooltip content={<CustomTooltip />} contentStyle={{ color: 'black' }} />
                {/* <Legend /> */}
                <CartesianGrid stroke="#7C7C7C" />
                <Bar dataKey="value" fill="#8884d8">
                    <LabelList dataKey="value" position="top" formatter={value => value !== null ? value.toFixed(2) : ""} fill="black" />
                </Bar>
            </BarChart>
        </div>
    );
};

export default Yearly_Dpdc_Chart;
