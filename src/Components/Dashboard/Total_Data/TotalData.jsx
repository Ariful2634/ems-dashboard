import Dg_Dpdc_Chart from "./Dg_Dpdc_Chart";
import Live_Total_power from "./Live_Total_power";


const TotalData = () => {
    return (
        <div className="bg-white pt-4  max-w-screen mx-auto min-h-screen">
            <div className="flex justify-center items-center">
                <Dg_Dpdc_Chart></Dg_Dpdc_Chart>
                <Live_Total_power></Live_Total_power>
            </div>
        </div>
    );
};

export default TotalData;