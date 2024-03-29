import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root/Root';
import Dashboard from './Components/Dashboard/Dashboard';
import Home from './Components/Home/Home';
import KnowledgeBase from './Components/Dashboard/KnowledgeBase';
import AuthProvider from './Components/Logout/Provider/AuthProvider';
import Register from './Components/Register/Register';
import MembarApproval from './Components/Dashboard/MembarApproval';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Login from './Components/Login/Login';
import MakeAdmin from './Components/Dashboard/MakeAdmin';
import ForgetPassword from './Components/Login/ForgetPassword';
import UpdateProfile from './Components/Dashboard/UpdateProfile';
import Dbdc_Energy from './Components/Dashboard/DBDC_Energy/Dbdc_Energy';
import TotalData from './Components/Dashboard/Total_Data/TotalData';
import Analysis_Pro from './Components/Dashboard/Analysis_Pro/Analysis_Pro';
import SelectedDateData from './Components/Dashboard/Analysis_Pro/SelectedDateData';
import SelectedMonthData from './Components/Dashboard/Analysis_Pro/SelectedMonthData';
import SelectedYearData from './Components/Dashboard/Analysis_Pro/SelectedYearData';


const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:"/register",
        element:<Register></Register>
      },
      {
        path:'/forgetPassword',
        element:<ForgetPassword></ForgetPassword>
      },
      {
        path:'/dpdcEnergy',
        element:<Dbdc_Energy></Dbdc_Energy>
      },
      {
        path:'/totalData',
        element:<TotalData></TotalData>
      },
      {
        path:'/analysisPro',
        element:<Analysis_Pro></Analysis_Pro>,
        
         
        
      },
      {
        path:'selectedDateData',
        element:<SelectedDateData></SelectedDateData>
      },
      {
        path:'selectedMonthData',
        element:<SelectedMonthData></SelectedMonthData>
      },
      {
        path:'selectedYearData',
        element:<SelectedYearData></SelectedYearData>
      },
      {
        path:'/dashboard',
        element:<Dashboard></Dashboard>,
        children:[
          {
            path:'knowledgeBase',
            element:<KnowledgeBase></KnowledgeBase>
          },
          {
            path:'membarApproval',
            element:<MembarApproval></MembarApproval>
          },
          {
            path:'makeAdmin',
            element:<MakeAdmin></MakeAdmin>
          },
          {
            path:'updateProfile',
            element:<UpdateProfile></UpdateProfile>
          },
          
          
      
    ]
  },
  
    ]

  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
