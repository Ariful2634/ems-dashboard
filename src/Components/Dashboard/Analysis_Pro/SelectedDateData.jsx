/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Chart from 'chart.js/auto';
import "./SelectedDateData.css";
import { AuthContext } from '../../Logout/Provider/AuthProvider';

const SelectedDateData = () => {

    const currentDate = format(new Date(), 'yyyy-MM-dd');
    const [startDate, setStartDate] = useState(currentDate);
    const [endDate, setEndDate] = useState(currentDate);
    const [selectedButtons, setSelectedButtons] = useState(['power']); // State for selected buttons
    const [checkboxes, setCheckboxes] = useState({
        sourceCheckbox: true,
        sourceCheckbox1: true,
        sourceCheckbox2: true,
        loadCheckbox: true,
        loadCheckbox1: true,
        loadCheckbox2: true
    });

    const chartRef = React.createRef(null);

    const { getToken } = useContext(AuthContext);
    const [token, setToken] = useState(getToken);


    useEffect(() => {
        setToken(getToken);
    }, [getToken]);

    // console.log(token)


    useEffect(() => {
        handleSend();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [token, selectedButtons, checkboxes]); // Update the chart when token, selectedButtons, or checkboxes change

    const handleResize = () => {
        if (chartRef.current && chartRef.current.chart) {
            chartRef.current.chart.resize();
        }
    };

    const handleSend = async () => {
        try {
            const headers = {
                Authorization: `Token ${token}`
            };

            const response = await axios.post(
                'https://scubetech.xyz/power-monitor/filter-dgr-data/',
                {
                    start: startDate + ' 00:00:00.001',
                    end: endDate + ' 23:59:59.999'
                },
                { headers }
            );

            drawChart(response.data.dgr_data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const drawChart = (data) => {
        const ctx = chartRef.current.getContext('2d');
        if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
        }

        const dateTimeLabels = data.map(item => {
            const date = new Date(item.timedate);
            date.setHours(date.getHours() - 6); // Subtracting 6 hours
            // const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
            let formattedTime;
            if (date.getHours() === 0) {
                formattedTime = `00:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
            } else {
                formattedTime = date.toLocaleString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }); // Format the time in the local time zone with leading zeroes for hours
            }
            return `${formattedDate} ${formattedTime}`;
        });

        // Reverse the dateTimeLabels array
        dateTimeLabels.reverse();

        // Initialize an empty array to store datasets
        const datasets = [];

        // Initialize an empty array to Populate data  based on selected buttons and checkboxes
        let powerData = [];
        let costData = [];
        // Populate data arrays based on selected buttons and checkboxes
        data.forEach(item => {
            const date = new Date(item.timedate);
            date.setHours(date.getHours() - 6); // Subtracting 6 hours

            if (selectedButtons.includes('power') && checkboxes.sourceCheckbox && checkboxes.sourceCheckbox1) {
                powerData.push(item.dpdc_power);
            }
            if (selectedButtons.includes('cost') && checkboxes.sourceCheckbox && checkboxes.sourceCheckbox1) {
                costData.push(item.dpdc_cost);
            }
        });

        // Check if 'power' button is selected and sourceCheckbox is checked
        if (selectedButtons.includes('power') && checkboxes.sourceCheckbox) {
            if (checkboxes.sourceCheckbox1) {
                datasets.push({
                    label: 'DPDC Power',
                    data: data.map(item => item.dpdc_power).reverse(),
                    borderColor: 'rgba(75, 120, 192, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    lineTension: 0.4,
                    unit: ' kW'
                });
            }
            if (checkboxes.sourceCheckbox2) {
                datasets.push({
                    label: 'Generator Power',
                    data: data.map(item => item.generator_power).reverse(),
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(255, 159, 64, 1)',
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    lineTension: 0.4,
                    unit: ' kW'
                });
            }
        }

        // Check if 'cost' button is selected and sourceCheckbox is checked
        if (selectedButtons.includes('cost') && checkboxes.sourceCheckbox) {
            if (checkboxes.sourceCheckbox1) {
                datasets.push({
                    label: 'DPDC Cost',
                    data: data.map(item => item.dpdc_cost).reverse(),
                    borderColor: 'rgba(55, 99, 132, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    lineTension: 0.4,
                    unit: ' ৳',
                    yAxisID: 'costAxis',
                });
            }
            if (checkboxes.sourceCheckbox2) {
                datasets.push({
                    label: 'Generator Cost',
                    data: data.map(item => item.generator_cost).reverse(),
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    lineTension: 0.4,
                    unit: ' ৳',
                    yAxisID: 'costAxis',
                });
            }
        }

        // Check if 'diesel' button is selected and sourceCheckbox2 is checked
        if (selectedButtons.includes('diesel') && checkboxes.sourceCheckbox2) {
            datasets.push({
                label: 'Generator Fuel Intake',
                data: data.map(item => item.generator_fuel_intake).reverse(),
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointRadius: 0,
                pointHoverRadius: 4,
                lineTension: 0.4,
                unit: ' L',
            });
        }

        // Check if 'power' button is selected and loadCheckbox is checked
        if (selectedButtons.includes('power') && checkboxes.loadCheckbox) {
            if (checkboxes.loadCheckbox1) {
                datasets.push({
                    label: 'Heavy Load',
                    data: data.map(item => item.heavy_load_power).reverse(),
                    borderColor: 'rgba(15, 192, 192, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    lineTension: 0.4,
                    unit: ' kW',
                });
            }
            if (checkboxes.loadCheckbox2) {
                datasets.push({
                    label: 'Light Load',
                    data: data.map(item => item.light_load_power).reverse(),
                    borderColor: 'rgba(159, 100, 225, 0.9)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(255, 159, 64, 1)',
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    lineTension: 0.4,
                    unit: ' kW'

                });
            }
        }

        // Check if 'cost' button is selected and loadCheckbox is checked
        if (selectedButtons.includes('cost') && checkboxes.loadCheckbox) {
            if (checkboxes.loadCheckbox1) {
                datasets.push({
                    label: 'Heavy Load Cost',
                    data: data.map(item => item.heavy_load_cost).reverse(),
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    lineTension: 0.4,
                    unit: ' ৳',
                    yAxisID: 'costAxis',
                });
            }
            if (checkboxes.loadCheckbox2) {
                datasets.push({
                    label: 'Light Load Cost',
                    data: data.map(item => item.light_load_cost).reverse(),
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    lineTension: 0.4,
                    unit: ' ৳',
                    yAxisID: 'costAxis',
                });
            }
        }

        if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
        }

        // Construct chart data object
        const chartData = {
            labels: dateTimeLabels,
            datasets: datasets
        };

        const hoverLine = {
            id: 'hoverLine',
            afterDatasetsDraw(chart, args, plugins) {
                const { ctx, tooltip, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;

                if (tooltip && tooltip._active && tooltip._active.length > 0) { // Check if tooltip and tooltip._active exist
                    const xCoor = x.getPixelForValue(tooltip.dataPoints[0].dataIndex);
                    const yCoor = y.getPixelForValue(tooltip.dataPoints[0].parsed.y);

                    ctx.save();
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = 'rgb(0, 0, 0, 0.3)';
                    ctx.moveTo(xCoor, top);
                    ctx.lineTo(xCoor, bottom);
                    ctx.stroke();
                    ctx.closePath();
                }

            }
        };

        // Construct chart options object
        const chartOptions = {
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: (context) => {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y.toFixed(2) + (context.dataset.unit || '');
                            }
                            return label;
                        }
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    },
                    min: 0,
                },
                x: {
                    grid: {
                        display: true
                    },
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: (() => {
                            if (dateTimeLabels.length >= 720) {
                                return Math.ceil(dateTimeLabels.length / 720);
                            } else if (dateTimeLabels.length >= 450) {
                                return Math.ceil(dateTimeLabels.length / 450);
                            } else if (dateTimeLabels.length >= 360) {
                                return Math.ceil(dateTimeLabels.length / 360);
                            } else if (dateTimeLabels.length >= 240) {
                                return Math.ceil(dateTimeLabels.length / 240);
                            } else if (dateTimeLabels.length >= 120) {
                                return Math.ceil(dateTimeLabels.length / 120);
                            } else if (dateTimeLabels.length >= 60) {
                                return Math.ceil(dateTimeLabels.length / 60);
                            } else {
                                return 1;
                            }
                        })(),
                        // callback: function (value) {
                        //     return this.getLabelForValue(value).substring(0, 10);
                        // },
                        callback: function (value, index, values) {
                            // Only return label for values other than index 0
                            if (index == 0) {
                                return this.getLabelForValue(value).substring(0, 0);
                            } else {
                                return this.getLabelForValue(value).substring(0, 10);
                            }
                        },
                        color: 'green',
                        align: 'start',
                        fontweight: 'bold',
                    }
                },
                // costAxis: {
                //     position: 'right', // Position Y-axis on the right
                //     title: { display: true, text: 'Cost (৳)', color: 'rgba(55, 99, 132, 1)' }
                // }
            }
        };

        // Add Y-axis for 'cost' data if 'cost' button is selected
        if (selectedButtons.includes('cost')) {
            chartOptions.scales.costAxis = {
                position: 'right', // Position Y-axis on the right
                title: { display: true, text: 'Cost (৳)', color: 'rgba(55, 99, 132, 1)' }
            };
        }

        // Create or update chart
        if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
        }

        chartRef.current.chart = new Chart(ctx, {
            type: 'line',
            responsive: true,
            maintainAspectRatio: true,
            data: chartData,
            plugins: [hoverLine],
            options: chartOptions
        });

    };

    // Function to handle button click and toggle its selection
    const handleButtonClick = (button) => {
        if (selectedButtons.includes(button)) {
            setSelectedButtons(selectedButtons.filter((btn) => btn !== button));
        } else {
            setSelectedButtons([...selectedButtons, button]);
        }
    };

    // Function to handle checkbox change
    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        setCheckboxes(prevState => ({
            ...prevState,
            [id]: checked
        }));
    };

    // Function to handle parent checkbox change
    const handleParentCheckboxChange = (parent, children) => {
        const allChecked = children.every(child => checkboxes[child]);
        setCheckboxes(prevState => ({
            ...prevState,
            [parent]: !allChecked
        }));
        children.forEach(child => {
            setCheckboxes(prevState => ({
                ...prevState,
                [child]: !allChecked
            }));
        });
    };

    return (
        <>
            {/* Button group */}
            <div className="container">
                <div className="btn-group dgrbuttongroup">
                    <button
                        className={`power_button ${selectedButtons.includes('power') ? 'active' : ''}`}
                        onClick={() => handleButtonClick('power')}
                    >
                        Power
                    </button>
                    <button
                        className={`cost_button ${selectedButtons.includes('cost') ? 'active' : ''}`}
                        onClick={() => handleButtonClick('cost')}
                    >
                        Cost
                    </button>
                    <button
                        className={`diesel_button ${selectedButtons.includes('diesel') ? 'active' : ''}`}
                        onClick={() => handleButtonClick('diesel')}
                    >
                        Diesel
                    </button>
                </div>
            </div>

            {/* Form inputs */}
            <div className="dgr_form_container">
                <div className="select_startdate_div">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        className="form_control"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="select_enddate_div">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        className="form_control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <button type='button' className="btn btn-outline-primary selected_date_submit_btn" onClick={handleSend}>
                    Submit
                </button>
            </div>

            {/* checkbox and chart */}
            <div className='flex  gap-5 p-6 '>
                <div className=''>
                    <div className="checkbox_container  w-[230px] ">
                        <div className="">
                            <div className=" shadow-xl p-[34px]">
                                <div className='Parent_source_Checkboxes'>
                                    {/* Parent source Checkboxes */}
                                    <div className="parent_checkbox">
                                        <input
                                            type="checkbox"
                                            id="sourceCheckbox"
                                            checked={checkboxes.sourceCheckbox}
                                            onChange={(event) => {
                                                handleCheckboxChange(event);
                                                handleParentCheckboxChange('sourceCheckbox', ['sourceCheckbox1', 'sourceCheckbox2']);
                                            }}
                                        />
                                        <label htmlFor="sourceCheckbox">Source</label>
                                    </div>
                                    {/* Render source child Checkboxes only if the parent checkbox is checked */}
                                    {checkboxes.sourceCheckbox &&
                                        <>
                                            <div className="source_child_checkbox">

                                                <input
                                                    type="checkbox"
                                                    id="sourceCheckbox1"
                                                    checked={checkboxes.sourceCheckbox1}
                                                    onChange={(event) => handleCheckboxChange(event)}
                                                />
                                                <label htmlFor="sourceCheckbox1">DPDC</label>
                                            </div>
                                            <div className="source_child_checkbox">
                                                <input
                                                    type="checkbox"
                                                    id="sourceCheckbox2"
                                                    checked={checkboxes.sourceCheckbox2}
                                                    onChange={(event) => handleCheckboxChange(event)}
                                                />
                                                <label htmlFor="sourceCheckbox2">Generator</label>
                                            </div>
                                        </>
                                    }
                                </div>
                                <div className="Parent_load_Checkboxes">
                                    {/* Parent Load Checkboxes */}
                                    <div className="parent_checkbox">
                                        <input
                                            type="checkbox"
                                            id="loadCheckbox"
                                            checked={checkboxes.loadCheckbox}
                                            onChange={(event) => {
                                                handleCheckboxChange(event);
                                                handleParentCheckboxChange('loadCheckbox', ['loadCheckbox1', 'loadCheckbox2']);
                                            }}
                                        />
                                        <label htmlFor="loadCheckbox">Load</label>
                                    </div>
                                    {/* Render load child Checkboxes only if the parent checkbox is checked */}
                                    {checkboxes.loadCheckbox &&
                                        <>
                                            <div className="load_child_checkbox">
                                                <input
                                                    type="checkbox"
                                                    id="loadCheckbox1"
                                                    checked={checkboxes.loadCheckbox1}
                                                    onChange={(event) => handleCheckboxChange(event)}
                                                />
                                                <label htmlFor="loadCheckbox1">Cooling Load</label>
                                            </div>
                                            <div className="load_child_checkbox">
                                                <input
                                                    type="checkbox"
                                                    id="loadCheckbox2"
                                                    checked={checkboxes.loadCheckbox2}
                                                    onChange={(event) => handleCheckboxChange(event)}
                                                />
                                                <label htmlFor="loadCheckbox2">Critical Load</label>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='h-[100%]  w-[100%] shadow-xl p-2 rounded'>
                    <div className='chart_container '>
                        <canvas ref={chartRef} height={'80%'} ></canvas>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SelectedDateData;