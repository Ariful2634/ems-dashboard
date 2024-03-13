import Logout from "../../Logout/Logout";




const Navbar = () => {
    return (
        <div className="border-b border-gray-600 ">
            <div className="navbar bg-[#000435] shadow-xl ">
                <div className="navbar-start">
                    <h2 className="ml-12 lg:ml-24 lg:text-xl text-white">Scube</h2>
                </div>
                <div className="navbar-center">
                    <a className="btn btn-ghost lg:text-xl text-white">Enargy Monitoring System</a>
                </div>
                <div className="navbar-end">
                <Logout></Logout>
                </div>
            </div>
        </div>
    );
};

export default Navbar;