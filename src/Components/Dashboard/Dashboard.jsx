
import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { SiKnowledgebase } from "react-icons/si";
import { BsFillPeopleFill } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";
import { ImProfile } from "react-icons/im";
import { MdOutlineSettings } from "react-icons/md";
import { GiWatchtower } from "react-icons/gi";
import { GiRadioTower } from "react-icons/gi";
import { useState } from "react";
import Navbar from "../Home/Navbar/Navbar";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    // for Demo 1
    const toggleAccordion1 = () => {
        setIsOpen1(!isOpen1);
    };

    // for Demo 2
    const toggleAccordion2 = () => {
        setIsOpen2(!isOpen2);
    };

    return (
        <div className="h-full">
            <div>
                <Navbar></Navbar>
            </div>
            <div className="  bg-[#2e5a88] min-w-full h-full mx-auto flex">
                <div className={`drawer ${isSidebarOpen ? 'lg:drawer-open' : ''} mx-auto h-full  w-full rounded-2xl`}>
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    {/* page content */}
                    <div className="drawer-content bg-white text-black flex flex-col  -lg:pt-10 lg:pl-10">
                        <div className="sticky top-0 ">
                            <div className="flex lg:hidden justify-between items-center text-black absolute -top-[56px] px-4 py-2">
                                <label
                                    htmlFor="my-drawer-2"
                                    className="drawer-button"
                                >
                                    <AiOutlineMenu className="text-2xl text-white" />
                                </label>
                            </div>
                            <div className="hidden lg:flex items-center justify-center h-full  -top-[65px] relative -left-[890px] mt-3">
                                <button onClick={toggleSidebar}>
                                    {isSidebarOpen ? <AiOutlineClose className="text-2xl" /> : <AiOutlineMenu className="text-2xl  left-[65px] fixed" />}
                                </button>
                            </div>
                        </div>
                        {/* page content */}
                        <div className="md:mt-0 min-h-screen pl-4 -pt-4 ">
                            <Outlet />
                        </div>
                    </div>
                    {/* sidebar */}
                    <div className="drawer-side h-[calc(100vh - 64px)] scrollable-content">
                        <label
                            htmlFor="my-drawer-2"
                            aria-label="close sidebar"
                            className={`drawer-overlay ${isSidebarOpen ? '' : 'hidden lg:block'}`}
                        ></label>
                        <div className={`w-60 min-h-full bg-[#000435]  text-white justify-between flex flex-col ${isSidebarOpen ? '' : 'hidden lg:flex'}`}>
                            <div>
                                <ul className="menu text-lg space-y-2 rounded-lg mt-4">
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive
                                                ? "flex px-4 gap-3 items-center bg-[#2e5a88] text-white p-2 rounded-xl pr-4"
                                                : "flex px-4 p-2 items-center mr-4 gap-3"
                                        }
                                        to="/dashboard/knowledgeBase"
                                    >
                                        <SiKnowledgebase />
                                        Knowledge Base
                                    </NavLink>
                                    <h2 className="border-b border-gray-600 w-full"></h2>

                                    <div className=" mb-2">
                                        {/* Configuration */}
                                        <div
                                            className="flex items-center justify-between p-4 cursor-pointer"
                                            onClick={toggleAccordion1}
                                        >
                                            <span className="text-lg font-medium flex items-center gap-3"><MdOutlineSettings className="text-2xl" /> Configuration</span>
                                            {/* Arrow icon  */}
                                            <svg 
                                                className={`w-5 h-5 ${isOpen1 ? 'transform rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </div>
                                        {/* Content for Configuration */}
                                        {isOpen1 && (
                                            <div>
                                                <div className="p-2 ">
                                                    <NavLink
                                                        className={({ isActive }) =>
                                                            isActive
                                                                ? "flex px-2 gap-3 items-center bg-[#2e5a88] text-white p-2 rounded-xl pr-4"
                                                                : "flex px-2 gap-3 items-center "
                                                        }
                                                        to="/dashboard/membarApproval"
                                                    >
                                                        <BsFillPeopleFill></BsFillPeopleFill>
                                                        Membar Approval
                                                    </NavLink>
                                                </div>
                                                <div className="p-2 ">
                                                    <NavLink
                                                        className={({ isActive }) =>
                                                            isActive
                                                                ? "flex px-2 gap-3 items-center bg-[#2e5a88] text-white p-2 rounded-xl pr-4"
                                                                : "flex px-2 gap-3 items-center "
                                                        }
                                                        to="/dashboard/makeAdmin"
                                                    >
                                                        <RiAdminFill />
                                                        Make Admin
                                                    </NavLink>
                                                </div>
                                                <div className="p-2 ">
                                                    <NavLink
                                                        className={({ isActive }) =>
                                                            isActive
                                                                ? "flex px-2 gap-3 items-center bg-[#2e5a88] text-white p-2 rounded-xl pr-4"
                                                                : "flex px-2 gap-3 items-center "
                                                        }
                                                        to="/dashboard/updateProfile"
                                                    >
                                                        <ImProfile />
                                                        UpdateProfile
                                                    </NavLink>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <h2 className="border-b border-gray-600 w-full"></h2>

                                    {/* Source Energy */}
                                    <div className=" mb-2">
                                        {/* for Source Energy */}
                                        <div
                                            className="flex items-center justify-between p-4 cursor-pointer"
                                            onClick={toggleAccordion2}
                                        >
                                            <span className="text-lg font-medium flex items-center gap-3"><GiWatchtower className="text-3xl"/> Source Energy</span>
                                            {/* for Source Energy*/}
                                            <svg
                                                className={`w-5 h-5 ${isOpen2 ? 'transform rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </div>
                                        {/* Content for Source Energy */}
                                        {isOpen2 && (
                                            <div className="p-2 ">
                                                <NavLink
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? "flex px-2 gap-3 items-center bg-[#2e5a88] text-white p-2 rounded-xl pr-4"
                                                            : "flex px-2 gap-3 items-center "
                                                    }
                                                    to="/dpdcEnergy"
                                                >
                                                    <GiRadioTower className="text-2xl" />
                                                    DPDC Energy
                                                </NavLink>
                                            </div>
                                        )}
                                    </div>
                                    <h2 className="border-b border-gray-600 w-full"></h2>
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive
                                                ? "flex px-4 gap-3 items-center bg-[#2e5a88] text-white p-2 rounded-xl pr-4"
                                                : "flex px-4 p-2 items-center mr-4 gap-3"
                                        }
                                        to="/dashboard/demo3"
                                    >
                                        <SiKnowledgebase />
                                        Demo 3
                                    </NavLink>
                                    <h2 className="border-b border-gray-600 w-full"></h2>
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive
                                                ? "flex px-4 gap-3 items-center bg-[#2e5a88] text-white p-2 rounded-xl pr-4"
                                                : "flex px-4 p-2 items-center mr-4 gap-3"
                                        }
                                        to="/dashboard/demo4"
                                    >
                                        <SiKnowledgebase />
                                        Demo 4
                                    </NavLink>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
