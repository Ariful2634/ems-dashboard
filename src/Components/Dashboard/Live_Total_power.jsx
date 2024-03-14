const Live_Total_power = () => {
    return (
        <div className="bg-white min-h-screen text-black">
            <div>
                <table>
                    <thead className="border">
                        <th rowSpan={2} className="border-r">Name</th>
                        <th rowSpan={2} className="border-r">Live Power</th>
                        <th rowSpan={2} className="border-r">Frequency</th>
                        <th className="border-r">
                            <th colSpan={3} className=" border-b ">Live Voltage</th>
                            <tr className="">
                                <th className="border-r font-normal w-[50px]">Line 1</th>
                                <th className="border-r font-normal w-[50px]">Line 2</th>
                                <th className=" w-[50px] font-normal ">Line 3</th>
                            </tr> 
                        </th>
                        
                        <th className="border-r">
                            <th colSpan={3} className=" border-b ">Live Current</th>
                            <tr className="">
                                <th className="border-r font-normal w-[50px]">Line 1</th>
                                <th className="border-r font-normal w-[50px]">Line 2</th>
                                <th className=" w-[50px] font-normal">Line 3</th>
                            </tr> 
                        </th>
                        <th className="border-r">
                            <th colSpan={2} className=" border-b ">Harmonics</th>
                            <tr className="">
                                <th className="border-r font-normal w-[50px]">Voltage</th>
                                <th className=" font-normal w-[50px]">Current</th>
                                
                            </tr> 
                        </th>
                        <th rowSpan={2} className="border-r">Today En...</th>
                    </thead>
                    <tbody>
                        <tr className="border">
                            <td className="border-r" >Demo 1</td>
                            <td className="border-r">456</td>
                            <td className="border-r">456</td>
                            <td className="w-[150px] border-r">
                                <td className="border-r w-[50px]">000</td>
                                <td className="border-r w-[50px]">$500</td>
                                <td className=" w-[50px]">$500</td>
                            </td>
                            <td className="w-[150px] border-r">
                                <td className="border-r w-[50px]">000</td>
                                <td className="border-r w-[50px]">$500</td>
                                <td className=" w-[50px] ">$500</td>
                            </td>
                            <td className="border-r w-[100px]">
                                <td className="border-r  w-[56px]">000</td>
                                <td className=" w-[55px]">$500</td>  
                            </td>
                            <td className="border-r">456</td> 
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Live_Total_power;
