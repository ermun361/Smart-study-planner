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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 transition-all">
        <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl border dark:border-gray-800 transition-colors duration-300">
            {/* Header - Kept the Brand Purple for identity */}
            <div className="bg-brandPurple p-6 text-white flex justify-between items-center">
                <h3 className="text-xl font-bold">
                    {editingSubject ? 'Edit Subject (Cloud)' : 'Add New Subject (Cloud)'}
                </h3>
                <button 
                    onClick={onClose} 
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
                {/* SUBJECT NAME */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 px-1">
                        Subject Name
                    </label>
                    <input 
                        type="text"
                        required
                        placeholder="e.g. Molecular Biology"
                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-brandPurple/20 text-gray-900 dark:text-white transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>

                {/* EXAM DATE */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 px-1">
                        Exam Date
                    </label>
                    <input 
                        type="date"
                        required
                        style={{ colorScheme: 'dark' }} // Helps force the browser calendar to dark mode
                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-brandPurple/20 text-gray-900 dark:text-white transition-all"
                        value={formData.examDate}
                        onChange={(e) => setFormData({...formData, examDate: e.target.value})}
                    />
                </div>

                {/* DIFFICULTY */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 px-1">
                        Difficulty Level
                    </label>
                    <select 
                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-3 outline-none focus:ring-2 focus:ring-brandPurple/20 text-gray-900 dark:text-white transition-all appearance-none"
                        value={formData.difficulty}
                        onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                    >
                        <option value="Hard">🔥 Hard</option>
                        <option value="Medium">⚡ Medium</option>
                        <option value="Easy">🍃 Easy</option>
                    </select>
                </div>

                {/* SUBMIT BUTTON */}
                <button 
                    type="submit"
                    disabled={isSaving}
                    className={`w-full py-4 mt-2 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-[0.98]
                    ${isSaving 
                        ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed opacity-50' 
                        : 'bg-brandPurple hover:bg-indigo-700'
                    }`}
                >
                    {isSaving ? (
                        <span className="flex items-center justify-center gap-2">
                            <Loader2 className="animate-spin" size={18} /> Saving to Cloud...
                        </span>
                    ) : 'Save to Supabase'}
                </button>
            </form>
        </div>
    </div>
);
};

export default SupabaseAddSubjectModal;