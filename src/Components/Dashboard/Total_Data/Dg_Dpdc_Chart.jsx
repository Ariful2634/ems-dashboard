import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Logout/Provider/AuthProvider";
import axios from "axios";
import { Cell, Pie, PieChart, Tooltip, Legend } from 'recharts';

const Dg_Dpdc_Chart = () => {
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
        { name: 'DPDC', value: dpdcChart.Percentage_DPDC, color: '#4886e4' },
        { name: 'DG', value: dpdcChart.Percentage_Generator, color: '#ff0000' },
    ];

    // Function to render customized label with inline styles
    const renderCustomizedLabel = ({ cx, cy, innerRadius, outerRadius, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
        let x, y;

        if (data[index].name === 'DPDC') {
            x = cx;
            y = cy - radius; // Show DPDC label at the top
        } else {
            x = cx;
            y = cy + radius; // Show DG label at the bottom
        }

        const labelStyle = {
            fill: '#fff',
            textAnchor: 'middle',
            dominantBaseline: 'central',
            fontSize: '13px', // Adjust the font size as needed
        };

        return (
            <text x={x} y={y} style={labelStyle}>
                {`${data[index].name}: ${data[index].value}%`}
            </text>
        );
    };

    return (
        <div >
            <div >
                <PieChart width={200} height={200} >
                    <Pie
                        dataKey="value"
                        isAnimationActive={false}
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        fill="#8884d8"
                        label={renderCustomizedLabel}
                        labelLine={false}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        </div>
    );
};

export default Dg_Dpdc_Chart;
