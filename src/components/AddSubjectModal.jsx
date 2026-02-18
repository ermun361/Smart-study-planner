import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useSubjectStore } from '../store/useSubjectStore'; 

const AddSubjectModal = ({ isOpen, onClose}) => {
    // 1. Local state for the form inputs
    const [formData, setFormData] = useState ({
        name: '',
        examDate: '',
        difficulty: 'Medium',
    });


    //  Access the 'addSubject' function from the Zustand store
    const { addSubject } = useSubjectStore();

    // if (!isOpen) return null; // Don't render the modal if 'isOpen' is false

    //  Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh



    // 2. Simple Validation 
        if (!formData.name || !formData.examDate) {
            alert("Please fill in all required fields.");
            return;
        }

    // 3. Create a new subject object with a unique ID
    const newSubject = {
        ...formData,
        id: Date.now().toString(), // Simple unique ID based on timestamp
    };

    // 4. Add the new subject to the store and close the modal
    addSubject(newSubject);
    onClose(); // Close modal after saving
    setFormData({ name: '', examDate: '', difficulty: 'Medium' }); // Reset form

    console.log("Adding Subject to Store:", newSubject); // <--- ADD THIS
   
  };

  return (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="bg-brandPurple p-6 text-white flex justify-between items-center">
                <h3 className="text-xl font-bold">Add New Subject</h3>
                <button onClick={onClose}><X size={24} /></button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Subject Name</label>
                    <input 
                    type="text"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-brandPurple/20 outline-none"
                    placeholder="e.g. Mathematics"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Exam Date</label>
                    <input 
                    type="date"
                    className="w-full border border-gray-100 rounded-xl px-4 py-2 outline-none"
                    value={formData.examDate}
                    onChange={(e) => setFormData({...formData, examDate: e.target.value})}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Difficulty</label>
                    <select 
                    className="w-full border border-gray-100 rounded-xl px-4 py-2 outline-none"
                    value={formData.difficulty}
                    onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                    >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                    </select>
                </div>

                <button 
                    type="submit"
                    className="w-full bg-brandPurple text-white py-3 rounded-xl font-bold hover:brightness-110 transition-all">
                    Save Subject
                </button>
                </form>
            </div>
        </div>
  );

}

export default AddSubjectModal;