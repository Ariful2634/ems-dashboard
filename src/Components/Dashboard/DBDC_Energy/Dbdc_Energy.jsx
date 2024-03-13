import Monthly_Dpdc_Chart from "./Monthly_Dpdc_Chart";
import Yearly_Dpdc_Chart from "./Yearly_Dpdc_Chart";


const Dbdc_Energy = () => {
   

    return (
        <div className="flex mx-auto gap-3 bg-[#2e5a88] min-h-screen ">
           <Monthly_Dpdc_Chart></Monthly_Dpdc_Chart>
           <Yearly_Dpdc_Chart></Yearly_Dpdc_Chart>
        </div>
    );
};

export default Dbdc_Energy;
