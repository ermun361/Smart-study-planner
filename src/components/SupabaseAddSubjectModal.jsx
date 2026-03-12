import React, { useState } from 'react';
import { X } from 'lucide-react';
// 1. IMPORT: Notice we point to the SUPABASE store here
import { useSubjectStore } from '../store/useSupabaseSubjectStore'; 

const SupabaseAddSubjectModal = ({ onClose, editingSubject }) => {
    const [formData, setFormData] = useState({
        name: editingSubject ? editingSubject.name : '',
        examDate: editingSubject ? editingSubject.examDate : '',
        difficulty: editingSubject ? editingSubject.difficulty : 'Medium',
    });

    // 2. LOADING STATE: Since the cloud is slower than your brain, 
    // we need to track if we are currently "talking" to Supabase.
    const [isSaving, setIsSaving] = useState(false);

    const { addSubject, updateSubject } = useSubjectStore();

    // 3. ASYNC HANDLER: We use 'async' because we have to wait for the internet.
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.examDate) {
            alert("Please fill in all required fields.");
            return;
        }

        setIsSaving(true); // "Wait a second, I'm sending this to the cloud..."

        try {
            if (editingSubject) {
                // EDIT MODE
                await updateSubject(editingSubject.id, formData);
                console.log("Cloud Updated Subject:", formData);
            } else {
                // ADD MODE: Notice we DON'T generate an ID here anymore!
                // HUMAN LOGIC: "We send the data, and Supabase generates the ID for us."
                await addSubject(formData);
                console.log("Cloud Added New Subject:", formData);
            }
            onClose(); 
        } catch (error) {
            alert("Database Error: " + error.message);
        } finally {
            setIsSaving(false); // "Okay, the conversation with the cloud is over."
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="bg-[#5e5ce6] p-6 text-white flex justify-between items-center">
                    <h3 className="text-xl font-bold">
                        {editingSubject ? 'Edit Subject (Cloud)' : 'Add New Subject (Cloud)'}
                    </h3>
                    <button onClick={onClose}><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Subject Name</label>
                        <input 
                            type="text"
                            required
                            className="w-full border border-gray-200 rounded-xl px-4 py-2 outline-none"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Exam Date</label>
                        <input 
                            type="date"
                            required
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
                            <option value="Hard">Hard</option>
                            <option value="Medium">Medium</option>
                            <option value="Easy">Easy</option>
                        </select>
                    </div>

                    <button 
                        type="submit"
                        disabled={isSaving}
                        className={`w-full py-3 rounded-xl font-bold text-white transition-all 
                        ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#5e5ce6] hover:brightness-110'}`}>
                        {isSaving ? 'Saving to Cloud...' : 'Save to Supabase'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SupabaseAddSubjectModal;