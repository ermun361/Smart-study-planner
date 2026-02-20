import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useSubjectStore } from '../store/useSubjectStore'; 

const AddSubjectModal = ({  onClose, editingSubject }) => {
    // 1. Initialize local state. 
    // If editingSubject is passed, we fill the form with its data.
    // Otherwise, we start with empty fields.

    const [formData, setFormData] = useState ({
        name: editingSubject ? editingSubject.name : '',
        examDate: editingSubject ? editingSubject.examDate : '',
        difficulty: editingSubject ? editingSubject.difficulty : 'Medium',
    });


    //  Access the 'addSubject' function from the Zustand store
    const { addSubject, updateSubject } = useSubjectStore();

    //  Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh



    // 2. Simple Validation 
        if (!formData.name || !formData.examDate) {
            alert("Please fill in all required fields.");
            return;
        }

        if (editingSubject) {
            //3.EDIT MODE: update existing subject
            updateSubject(editingSubject.id, formData);
            console.log("Updating Subject:", formData);
        } else {
            // 4. ADD MODE: Create new subject
            const newSubject = {
                ...formData,
                id: Date.now().toString(),
            };
            addSubject(newSubject);
            console.log("Adding New Subject:", newSubject);
        }

        onClose(); // Close modal after saving
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