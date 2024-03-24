import { Link } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";


const KnowledgeBase = () => {
    return (
        <div className="grid grid-cols-4 ">
            <Link to='/analysisPro'>
                <div className="bg-purple-600 rounded-lg h-[100px] flex justify-center  flex-col items-center text-xl font-bold text-white">
                        <FaChartLine className="text-2xl" />
                    <h2>Analysis Pro</h2>
                </div>
            </Link>
        </div>
    );
};

export default KnowledgeBase;