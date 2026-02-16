import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import { useSubjectStore } from './store/useSubjectStore'; // Import the Zustand store hook
import AddSubjectModal from './components/AddSubjectModal';



function App() {

  
 const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track if the mobile menu (sidebar) is open or closed
 const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility


 const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Function to toggle the mobile menu


  return (
    <div className="flex h-screen bg-[#F9F9FB] font-sans relative overflow-hidden">

      {/* Passing state to Sidebar & Header */}
      <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      <div className="flex-1 flex flex-col w-full">
        <Header toggleMenu={toggleMenu} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
         <Dashboard onAddClick = {() => setIsModalOpen(true)} />
        </main>

      </div>
      <AddSubjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
     />

    </div>
  );
}

export default App;

