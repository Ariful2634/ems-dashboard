import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Logout/Provider/AuthProvider";
import axios from "axios";
import { Pie, PieChart, Tooltip, Cell } from 'recharts';

const Copy_Dpdc_Chart = () => {
    const { logout } = useContext(AuthContext);
    const [token, setToken] = useState(null);
    const [dpdcChart, setDpdcChart] = useState([]);

    useEffect(() => {
        setToken(logout);
    }, [logout]);

    useEffect(() => {
        const fetchDpdcChart = async () => {
            try {
                const headers = { Authorization: `Token ${token}` };
                const res = await axios.get('https://scubetech.xyz/power-monitor/power-usage-in-percentage/', { headers });
                setDpdcChart(res.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (token) {
            fetchDpdcChart();
        }
    }, [token]);

    const data = [
        { name: 'DPDC', value: dpdcChart.Percentage_DPDC, color: '#2979ef' },
        { name: 'Cooling', value: 20, color: '#800000' }, 
        { name: 'DG', value: dpdcChart.Percentage_Generator, color: '#ff0000' },
        { name: 'Critical', value: 30, color: '#009c00' }, 
    ];

    const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, value, name }) => {
        let labelX, labelY, valueX, valueY;

        if (name === 'DG' || name === 'Cooling') {
            labelX = cx + (outerRadius + 40) * Math.cos(-midAngle * (Math.PI / 180));
            labelY = cy + (outerRadius + 35) * Math.sin(-midAngle * (Math.PI / 180));
            valueX = cx + (outerRadius + 40) * Math.cos(-midAngle * (Math.PI / 180));
            valueY = cy + (outerRadius + 50) * Math.sin(-midAngle * (Math.PI / 180));
        } else {
            if (midAngle < 90 || midAngle > 270) {
                // Labels on the lower half of the chart
                labelX = cx + (outerRadius + 30) * Math.cos(-midAngle * (Math.PI / 180));
                labelY = cy + (outerRadius + 30) * Math.sin(-midAngle * (Math.PI / 180));
                valueX = cx + (outerRadius + 30) * Math.cos(-midAngle * (Math.PI / 180));
                valueY = cy + (outerRadius + 50) * Math.sin(-midAngle * (Math.PI / 180));
            } else {
                // Labels on the upper half of the chart
                labelX = cx + (outerRadius + 30) * Math.cos(-midAngle * (Math.PI / 180));
                labelY = cy + (outerRadius + 30) * Math.sin(-midAngle * (Math.PI / 180));
                valueX = cx + (outerRadius + 30) * Math.cos(-midAngle * (Math.PI / 180));
                valueY = cy + (outerRadius + 10) * Math.sin(-midAngle * (Math.PI / 180));
            }
        }

        return (
            <g>
                <text x={labelX} y={labelY} fill="#000000" textAnchor="end" fontSize="12px" fontWeight="bold" dominantBaseline="central">
                    {name}
                </text>
                <text x={valueX} y={valueY} fill="#000000" textAnchor="end" fontSize="12px" fontWeight="bold" dominantBaseline="central">
                    {`${value}%`}
                </text>
            </g>
        );
    };

    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                labelLine={true}
                label={renderCustomLabel}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );
};

export default Copy_Dpdc_Chart;
