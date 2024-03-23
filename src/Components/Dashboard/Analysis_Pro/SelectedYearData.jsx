/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inner-declarations */
import { useContext, useState, useEffect } from "react";
import Chart from "chart.js/auto";
import "./SelectedMonthData.css";


import { AuthContext } from "../../Logout/Provider/AuthProvider";

function SelectedYearData() {

    const { getToken } = useContext(AuthContext);
    const [token, setToken] = useState(getToken);


    useEffect(() => {
        setToken(getToken);
    }, [getToken]);

    // console.log(token)

    const currentDate = new Date();
    // const defaultMonth = currentDate.getMonth() + 1;
    const defaultYear = currentDate.getFullYear();

    // const [month, setMonth] = useState(defaultMonth.toString());
    const [year, setYear] = useState(defaultYear.toString());
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedButtons, setSelectedButtons] = useState(["power"]);

    // Source
    const [sourceChecked, setSourceChecked] = useState(true);

    // Power
    const [dpdcPowerChecked, setDpdcPowerChecked] = useState(true);
    const [generatorPowerChecked, setGeneratorPowerChecked] = useState(true);
    const [coolingPowerChecked, setCoolingPowerChecked] = useState(true);
    const [criticalPowerChecked, setCriticalPowerChecked] = useState(true);

    // Cost
    const [dpdcCostChecked, setDpdcCostChecked] = useState(true);
    const [generatorCostChecked, setGeneratorCostChecked] = useState(true);
    const [criticalCostChecked, setCriticalCostChecked] = useState(true);
    const [coolingCostChecked, setCoolingCostChecked] = useState(true);

    // diesel
    const [generatorFuelChecked, setGeneratorFuelChecked] = useState(true)

    // Load
    const [loadChecked, setLoadChecked] = useState(true)


    // eslint-disable-next-line no-unused-vars
    const [chartData, setChartData] = useState(null);
    const [chart, setChart] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        const apiUrl = "https://scubetech.xyz/power-monitor/filter-yearly-data/";
        const headers = {
            'Authorization': 'Token ' + token
        };
        const requestData = { year };

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const result = await response.json();
            setData(result.dgr_data);
            setError(null);
        } catch (error) {
            console.error("Error fetching data:", error.message);
            setData(null);
            setError(
                "No Data Available. Please Change Month and Year and Click Submit Again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token]);

    const handleSubmit = e => {
        e.preventDefault();
        fetchData();
    };

    console.log(data)

    useEffect(() => {
        if (data) {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const labels = monthNames; // Using month names as labels

            const newChartData = {
                labels: labels,
                datasets: [],
            };


            // Add dataset based on selected buttons and checkboxes
            if (selectedButtons.includes("power")) {
                if (dpdcPowerChecked) {
                    newChartData.datasets.push({
                        label: "DPDC Energy",
                        data: data.map(item => ({
                            x: monthNames[new Date(item.date).getMonth()],
                            y: item.yearly_dpdc_energy,
                        })),
                        backgroundColor: "rgba(75, 192, 192, 0.8)",
                    });
                }

                if (generatorPowerChecked) {
                    newChartData.datasets.push({
                        label: "Generator Energy",
                        data: data.map(item => ({
                            x: monthNames[new Date(item.date).getMonth()],
                            y: item.yearly_generator_energy,
                        })),
                        backgroundColor: "rgba(155, 199, 132, 0.8)",
                    });
                }
                if (coolingPowerChecked) {
                    newChartData.datasets.push({
                        label: "Cooling Load Energy",
                        data: data.map(item => ({
                            x: monthNames[new Date(item.date).getMonth()],
                            y: item.yearly_heavy_energy,
                        })),
                        backgroundColor: "rgba(220, 144, 64, 0.5)",
                    });
                }
                if (criticalPowerChecked) {
                    newChartData.datasets.push({
                        label: "Critical Load Energy",
                        data: data.map(item => ({
                            x: monthNames[new Date(item.date).getMonth()],
                            y: item.yearly_light_energy,
                        })),
                        backgroundColor: "rgba(245, 40, 145, 0.8)",
                    });
                }
            }




            if (selectedButtons.includes("cost")) {
                if (dpdcCostChecked && dpdcPowerChecked) {
                    newChartData.datasets.push({
                        label: "DPDC Cost",
                        data: data.map(item => ({
                            x: monthNames[new Date(item.date).getMonth()],
                            y: item.dpdc_cost,
                        })),
                        backgroundColor: "rgba(18, 159, 255, 1)",

                    });
                }
                if (generatorCostChecked && generatorPowerChecked) {
                    newChartData.datasets.push({
                        label: "Generator Cost",
                        data: data.map(item => ({
                            x: monthNames[new Date(item.date).getMonth()],
                            y: item.yearly_generator_cost,
                        })),
                        backgroundColor: "rgba(253, 255, 18, 1)",

                    });
                }
                if (criticalCostChecked && criticalPowerChecked) {
                    newChartData.datasets.push({
                        label: "Critical Load Cost",
                        data: data.map(item => ({
                            x: monthNames[new Date(item.date).getMonth()],
                            y: item.light_cost,
                        })),
                        backgroundColor: "rgba(17, 81, 40, 1)",

                    });
                }
                if (coolingCostChecked && coolingPowerChecked) {
                    newChartData.datasets.push({
                        label: "Cooling Load Cost",
                        data: data.map(item => ({
                            x: monthNames[new Date(item.date).getMonth()],
                            y: item.heavy_cost,
                        })),
                        backgroundColor: "rgba(3, 81, 41, 0.55)",

                    });
                }
            }

            if (selectedButtons.includes("diesel")) {
                if (generatorCostChecked && generatorPowerChecked && generatorFuelChecked) {
                    newChartData.datasets.push({
                        label: "Diesel Tank",
                        data: data.map(item => ({
                            x: monthNames[new Date(item.date).getMonth()],
                            y: item.yearly_generator_fuel,
                        })),
                        backgroundColor: "rgba(0, 0, 0, 0.55)",

                    });
                }


            }
            setChartData(newChartData);

            if (chart) {
                chart.destroy();
            }

            const ctx = document.getElementById("myChart").getContext("2d");
            const newChartInstance = new Chart(ctx, {
                type: "bar",
                data: newChartData, // Pass newChartData here
                options: {
                    scales: {
                        
                        y: {
                            position: "left",
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: selectedButtons.includes("power")
                                    ? "Power (kWh)"
                                    : selectedButtons.includes("diesel")
                                        ? "Generator Fuel (L)"
                                        : "",
                            },
                             
                        },
                        costAxis: {
                            position: "right",
                            title: {
                                display: selectedButtons.includes("cost"),
                                text: selectedButtons.includes("cost") ? "Cost (৳)" : "",
                            },
                            min: 0,
                            
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            mode: "index",
                            intersect: false,
                            callbacks: {
                                label: function (context) {
                                    let label = context.dataset.label || "";
                                    if (label) {
                                        label += ": ";
                                    }
                                    label += `${context.parsed.y.toFixed(2)} ${getUnit(context.dataset.label)}`;
                                    return label;
                                },
                            },
                        },
                    },
                },
            });

            setChart(newChartInstance);



            function getUnit(label) {
                switch (label) {
                    case "DPDC Energy":
                    case "Generator Energy":
                    case "Critical Load Energy":
                    case "Cooling Load Energy":
                        return "kWh";
                    case "Diesel Tank":
                        return "L";
                    case "DPDC Cost":
                    case "Generator Cost":
                    case "Critical Load Cost":
                    case "Cooling Load Cost":
                        return "৳";
                    default:
                        return "";
                }
            }

            setChart(newChartInstance);
        }
    }, [
        data,

        // eslint-disable-next-line react-hooks/exhaustive-deps
        +year,
        selectedButtons,
        dpdcPowerChecked,
        dpdcCostChecked,
        generatorPowerChecked,
        generatorCostChecked,
        criticalPowerChecked,
        coolingPowerChecked,
        criticalCostChecked,
        coolingCostChecked,
        generatorFuelChecked

    ]);

    const handleCheckboxChange = (setState, isChecked) => {
        setState(isChecked);
    };

    const handleButtonClick = button => {
        setSelectedButtons(prevButtons =>
            prevButtons.includes(button)
                ? prevButtons.filter(btn => btn !== button)
                : [...prevButtons, button]
        );
    };

    const handleSourceCheckboxChange = event => {
        const isChecked = event.target.checked;
        setSourceChecked(isChecked);

        if (isChecked) {
            setDpdcPowerChecked(true);
            setDpdcCostChecked(true);
            setGeneratorPowerChecked(true)
            setGeneratorCostChecked(true)
            setGeneratorFuelChecked(true)


        } else {
            setDpdcPowerChecked(false);
            setDpdcCostChecked(false);
            setGeneratorPowerChecked(false);
            setGeneratorCostChecked(false);
            setGeneratorFuelChecked(false)



        }
    };
    const handleLoadCheckboxChange = event => {
        const isChecked = event.target.checked;
        setLoadChecked(isChecked);

        if (isChecked) {
            setCriticalPowerChecked(true);
            setCriticalCostChecked(true)
            setCoolingPowerChecked(true);
            setCoolingCostChecked(true)


        } else {
            setCriticalPowerChecked(false);
            setCriticalCostChecked(false)
            setCoolingPowerChecked(false);
            setCoolingCostChecked(false)
        }
    };



    return (
        <div className="overflow-x-hidden">
            <div className="btn-group monthly_dgrbuttongroup">
                <button
                    className={`monthly_power_button ${selectedButtons.includes("power") ? "active" : ""
                        }`}
                    onClick={() => handleButtonClick("power")}
                >
                    Power
                </button>
                <button
                    className={`monthly_cost_button ${selectedButtons.includes("cost") ? "active" : ""
                        }`}
                    onClick={() => handleButtonClick("cost")}
                >
                    Cost
                </button>
                <button
                    className={`monthly_diesel_button ${selectedButtons.includes("diesel") ? "active" : ""
                        }`}
                    onClick={() => handleButtonClick("diesel")}
                >
                    Diesel
                </button>
            </div>
            <div>
                <div className="form-container">

                    <div className="px-2 py-3 mr-3 border rounded border-blue-600">
                        <form onSubmit={handleSubmit}>
                            <label>

                                Year:
                                <select

                                    value={year}
                                    onChange={e => setYear(e.target.value)}
                                >
                                    {Array.from({ length: 2030 - 2020 + 1 }, (_, index) => (
                                        <option

                                            key={2020 + index}
                                            value={2020 + index}
                                        >
                                            {2020 + index}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </form>
                    </div>
                    <div className="btn btn-outline btn-primary">
                        <form onSubmit={handleSubmit}>
                            <button

                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {error ? (
                <p>{error}</p>
            ) : data ? (
                <div>
                    <div className="flex items-center gap-5 p-6">
                        <div className="shadow-xl p-6 rounded font-bold h-[50vh] ">
                            <ul style={{ listStyleType: "none", padding: 0 }}>
                                <li
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "25px",
                                    }}
                                >

                                    <input
                                        type="checkbox"
                                        id="sourceCheckbox"
                                        name="source"
                                        checked={sourceChecked}
                                        onChange={handleSourceCheckboxChange}
                                        style={{ marginRight: "10px" }}
                                    />
                                    <label
                                        htmlFor="sourceCheckbox"
                                        style={{
                                            color: "black",
                                            marginLeft: "5px",
                                            fontWeight: "700",
                                        }}
                                    >
                                        Source
                                    </label>
                                </li>
                                {sourceChecked && (
                                    <>
                                        <li
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                marginLeft: "40px",
                                                marginBottom: "25px",
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                id="dpdcPowerCheckbox"
                                                name="dpdcPower"
                                                checked={dpdcPowerChecked}
                                                onChange={e =>
                                                    handleCheckboxChange(
                                                        setDpdcPowerChecked,
                                                        e.target.checked
                                                    )
                                                }
                                                style={{ marginRight: "5px" }}
                                            />
                                            <label
                                                htmlFor="dpdcPowerCheckbox"
                                                style={{ color: "black", marginLeft: "15px" }}
                                            >
                                                DPDC{" "}
                                            </label>
                                        </li>

                                        <li
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                marginLeft: "40px",
                                                marginBottom: "25px",
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                id="generatorPowerCheckbox"
                                                name="generatorPower"
                                                checked={generatorPowerChecked}
                                                onChange={e =>
                                                    handleCheckboxChange(
                                                        setGeneratorPowerChecked,
                                                        e.target.checked
                                                    )
                                                }
                                                style={{ marginRight: "5px" }}
                                            />
                                            <label
                                                htmlFor="generatorPowerCheckbox"
                                                style={{ color: "black", marginLeft: "15px" }}
                                            >
                                                Generator{" "}
                                            </label>
                                        </li>

                                    </>
                                )}
                            </ul>
                            <ul style={{ listStyleType: "none", padding: 0 }}>
                                <li
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginBottom: "25px",
                                    }}
                                >

                                    <input
                                        type="checkbox"
                                        id="loadCheckbox"
                                        name="load"
                                        checked={loadChecked}
                                        onChange={handleLoadCheckboxChange}
                                        style={{ marginRight: "10px" }}
                                    />
                                    <label
                                        htmlFor="loadCheckbox"
                                        style={{
                                            color: "black",
                                            marginLeft: "5px",
                                            fontWeight: "700",
                                        }}
                                    >
                                        Load
                                    </label>
                                </li>
                                {loadChecked && (
                                    <>
                                        <li
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                marginLeft: "40px",
                                                marginBottom: "25px",
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                id="coolingPowerCheckbox"
                                                name="coolingPower"
                                                checked={coolingPowerChecked}
                                                onChange={e =>
                                                    handleCheckboxChange(
                                                        setCoolingPowerChecked,
                                                        e.target.checked
                                                    )
                                                }
                                                style={{ marginRight: "5px" }}
                                            />
                                            <label
                                                htmlFor="coolingPowerCheckbox"
                                                style={{ color: "black", marginLeft: "15px" }}
                                            >
                                                Cooling{" "}
                                            </label>
                                        </li>

                                        <li
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                marginLeft: "40px",
                                                marginBottom: "25px",
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                id="criticalPowerCheckbox"
                                                name="criticalPower"
                                                checked={criticalPowerChecked}
                                                onChange={e =>
                                                    handleCheckboxChange(
                                                        setCriticalPowerChecked,
                                                        e.target.checked
                                                    )
                                                }
                                                style={{ marginRight: "5px" }}
                                            />
                                            <label
                                                htmlFor="criticalPowerCheckbox"
                                                style={{ color: "black", marginLeft: "15px" }}
                                            >
                                                Critical{" "}
                                            </label>
                                        </li>

                                    </>
                                )}
                            </ul>
                        </div>
                        <div className="h-[50vh] shadow-xl rounded p-2  w-[100%]">
                            <canvas id="myChart"></canvas>
                        </div>
                    </div>
                </div>
            ) : (
                <p>
                    {loading
                        ? "Loading data..."
                        : "No Data Available. Please Change Month and Year and Click Submit."}
                </p>
            )}
        </div>
    );
}

export default SelectedYearData;