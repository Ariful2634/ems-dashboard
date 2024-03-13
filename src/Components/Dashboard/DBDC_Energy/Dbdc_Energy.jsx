import Daily_Dpdc_Chart from "./Daily_Dpdc_Chart";
import Monthly_Dpdc_Chart from "./Monthly_Dpdc_Chart";
import Yearly_Dpdc_Chart from "./Yearly_Dpdc_Chart";


const Dbdc_Energy = () => {


    return (
        <div className="bg-white pt-4  max-w-screen mx-auto min-h-screen">
            <div>
                <Daily_Dpdc_Chart></Daily_Dpdc_Chart>
            </div>
            <div className="flex gap-3  ">
                <Monthly_Dpdc_Chart></Monthly_Dpdc_Chart>
                <Yearly_Dpdc_Chart></Yearly_Dpdc_Chart>
            </div>
        </div>
    );
};

export default Dbdc_Energy;
