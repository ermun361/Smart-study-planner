import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';

function App() {

  
 const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track if the mobile menu (sidebar) is open or closed
 const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Function to toggle the mobile menu


  return (
    <div className="flex h-screen bg-[#F9F9FB] font-sans relative overflow-hidden">

      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      <div className="flex-1 flex flex-col w-full">
        <Header toggleMenu={toggleMenu} />

        <main className="flex-1 overflow-y-auto P-4 LG:p-8 ">
         <Dashboard />
        </main>
        
      </div>

    </div>
  );
}

export default App;



/**
     * MAIN WRAPPER: A flex container that takes the full height of the screen, with a light background and sans-serif font.
     * 'overflow-hidden' prevents the page from "shaking" or scrolling when the mobile menu is toggled open or closed. This ensures a smooth user experience on mobile devices.
     */