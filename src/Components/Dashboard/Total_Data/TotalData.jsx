import Copy_Dpdc_Chart from "./Copy_Dpdc_Chart";
import Dg_Dpdc_Chart from "./Dg_Dpdc_Chart";
import Live_Total_power from "./Live_Total_power";


const TotalData = () => {
    return (
        <div>
            <div className="flex justify-center gap-5 h-[200px] w-[1500px] mt-10 mx-auto items-center  px-6 rounded  shadow-2xl">
                <Dg_Dpdc_Chart></Dg_Dpdc_Chart>
                <Live_Total_power></Live_Total_power>
            </div>
            <div>
                <Copy_Dpdc_Chart></Copy_Dpdc_Chart>
            </div>
        </div>
    );
};

export default TotalData;