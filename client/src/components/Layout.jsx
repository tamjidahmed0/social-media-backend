import React from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  return (
    <div>
      <main className=" flex ">
      <Sidebar/>
      <div className="flex-1 bg-mirage text-white" >
      {children}
   
      </div>       
    </main>

    </div>
  );
};

export default Layout;
