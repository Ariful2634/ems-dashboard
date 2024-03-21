import { useContext, useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { AuthContext } from '../../Logout/Provider/AuthProvider';
import axios from 'axios';


const Daily_Dpdc_Power_Chart = () => {
    const { getToken } = useContext(AuthContext);
    const [token, setToken] = useState(null);
    const [power, setPower] = useState(0);

    useEffect(() => {
        setToken(getToken);
    }, [getToken]);

    const fetchData = async () => {
        try {
            const headers = {
                Authorization: `Token ${token}`
            };
            const res = await axios.get('https://scubetech.xyz/power-monitor/single-dpdc-power/', { headers });
            setPower(res.data.dpdc_power.toFixed(2)); // Assuming power data is structured as { dpdc_power: value }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const RADIAN = Math.PI / 180;
    const cx = 180;
    const cy = 170;
    const iR = 100;
    const oR = 120; // Decreased outer radius
    const chartColor = '#800080'; // Purple color

    const needle = (value, cx, cy, iR, oR, color) => {
        const total = 10; // Assuming full chart is 10 kW
        const angle = 180.0 * (1 - value / total);
        const length = (iR + 2 * oR) / 4;
        const sin = Math.sin(-RADIAN * angle);
        const cos = Math.cos(-RADIAN * angle);
        const r = 5;
        const x0 = cx + 5;
        const y0 = cy + 5;
        const xba = x0 + r * sin;
        const yba = y0 - r * cos;
        const xbb = x0 - r * sin;
        const ybb = y0 + r * cos;
        const xp = x0 + length * cos;
        const yp = y0 + length * sin;

        return (
            <>
                <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />
                <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />
            </>
        );
    };

    const ranges = [{ name: '0 kW', value: 0 }, { name: '5 kW', value: 5 }, { name: '10 kW', value: 10 }];

    return (
        <div className='w-[400px] shadow-xl h-[300px] rounded'>
            <PieChart width={360} height={300}>
                <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={ranges}
                    cx={cx}
                    cy={cy}
                    innerRadius={iR}
                    outerRadius={oR}
                    fill={chartColor} // Set chart color to purple
                    stroke="none"
                >
                    {ranges.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === ranges.length - 1 ? '#800080' : chartColor} />
                    ))}
                </Pie>
                <Tooltip />
                {ranges.map((entry, index) => (
                    <text
                        key={`label-${index}`}
                        x={cx + (iR + 52) * Math.cos(-RADIAN * (180 - (index * (180 / (ranges.length - 1)))))}
                        y={cy + (iR + 25) * Math.sin(-RADIAN * (180 - (index * (180 / (ranges.length - 1)))))}
                        fill="#333"
                        textAnchor="middle"
                        dominantBaseline="central"
                    >
                        {entry.name}
                    </text>
                ))}

                {needle(power, cx, cy, iR, oR, '#800080')}
            </PieChart>
            <div className='-mt-[110px] ml-[158px]'>
                <h2 className='font-bold text-purple-700'>{power} kW</h2>
            </div>
        </div>
    );
};

export default Daily_Dpdc_Power_Chart;
