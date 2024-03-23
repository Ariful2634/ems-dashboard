import "./SelectedDateData.css";
import AuthProvider from '../../Logout/Provider/AuthProvider';
import SelectedMonthData from './SelectedMonthData';
import SelectedDateData from './SelectedDateData';
import { useState } from 'react';
import SelectedYearData from './SelectedYearData';
import { FaCheck, FaCalendarAlt } from "react-icons/fa";

const Analysis_Pro = () => {

  const [selectedView, setSelectedView] = useState('daily');

  const renderIcon = (view) => {
    return selectedView === view ? <FaCheck /> : <FaCalendarAlt />;
  };

  const renderSelectedView = () => {
    switch (selectedView) {
      case 'daily':
        return <SelectedDateData />;
      case 'monthly':
        return <SelectedMonthData />;
      case 'yearly':
        return <SelectedYearData />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className='text-center mt-10'>
        <AuthProvider>
          <div className="join ">

            <button className={`daily_power ${selectedView === 'daily' ? 'active' : ''}`}
              onClick={() => setSelectedView('daily')}
            >
              <span className="flex items-center gap-2">{renderIcon('daily')}
                Selected Daily Power</span>
            </button>
            <button className={`monthly_energy ${selectedView === 'monthly' ? 'active' : ''}`}
              onClick={() => setSelectedView('monthly')}
            >
              <span className="flex items-center gap-2">{renderIcon('monthly')}
                Monthly Energy</span>
            </button>
            <button className={`yearly_energy ${selectedView === 'yearly' ? 'active' : ''}`}
              onClick={() => setSelectedView('yearly')}
            >
              <span className="flex items-center gap-2">{renderIcon('yearly')}
                Yearly Energy</span>
            </button>
          </div>
          {renderSelectedView()}
        </AuthProvider>
      </div>
    </div>
  );
};

export default Analysis_Pro;
