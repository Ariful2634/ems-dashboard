
import "./SelectedDateData.css";
import AuthProvider from '../../Logout/Provider/AuthProvider';
import SelectedMonthData from './SelectedMonthData';
import SelectedDateData from './SelectedDateData';
import { useState } from 'react';
import SelectedYearData from './SelectedYearData';


const Analysis_Pro = () => {

  // eslint-disable-next-line no-unused-vars
  const [selectedView, setSelectedView] = useState('daily');

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
      <div className='text-center'>
       <AuthProvider>
       <div className="join ">
          
            <button className={`daily_power ${selectedView === 'daily' ? 'active' : ''}`}
             onClick={() => setSelectedView('daily')}
            >
              Selected Daily Power
            </button>
            <button className={`monthly_energy ${selectedView === 'monthly' ? 'active' : ''}`}
             onClick={() => setSelectedView('monthly')}
            >
              Monthly Energy
            </button>
            <button className={`yearly_energy ${selectedView === 'yearly' ? 'active' : ''}`}
             onClick={() => setSelectedView('yearly')}
            >
              Yearly Energy
            </button>
        </div>
        { renderSelectedView() }
       </AuthProvider>
      </div>
      
    </div>
  );
};

export default Analysis_Pro;