import React, { useState} from 'react';
import { useAuthStore } from '../store/useSupabaseAuthStore';
import { User, Mail, Save, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const SettingsPage = () => {
    const { user, updateProfile, error, isLoading } = useAuthStore();

    // Local state for the form input
    const [fullName, setFullName] = useState(
        user?.user_metadata?.full_name || ""
    );

    const [successMessage, setSuccessMessage] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');

        const result = await updateProfile({ fullName });

        if(result.success) {
            setSuccessMessage("Profile updated successfully");
            setTimeout(() => setSuccessMessage(''), 3000);
        }
    };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto px-4">
      {/* --- HEADER --- */}
      <div className="flex items-center gap-3 mb-8 bg-gray-100/50 p-4 rounded-2xl">
        <div className="p-2 bg-indigo-100 rounded-lg text-brandPurple">
          <User size={24} />
        </div>
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">Account Settings</h1>
      </div>

      {/* --- FORM CARD --- */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* FULL NAME INPUT */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-600 flex items-center gap-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your Name"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brandPurple/20 transition-all"
              />
            </div>
          </div>

          {/* EMAIL (READ ONLY) */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-600">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-100 rounded-2xl text-gray-400 cursor-not-allowed"
              />
            </div>
            <p className="text-[10px] text-gray-400 px-2 uppercase tracking-widest font-bold">
              Email cannot be changed
            </p>
          </div>

          {/* MESSAGES (SUCCESS / ERROR) */}
          {successMessage && (
            <div className="flex items-center gap-2 p-4 bg-green-50 text-green-600 rounded-2xl text-sm font-bold animate-in fade-in zoom-in duration-300">
              <CheckCircle size={18} />
              {successMessage}
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-brandPurple hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Save size={20} />
            )}
            {isLoading ? 'Saving Changes...' : 'Save Changes'}
          </button>

        </form>
      </div>
      
      {/* Footer Info */}
      <div className="mt-8 p-6 bg-indigo-50/30 rounded-[2rem] border border-indigo-100/50">
          <h4 className="text-indigo-900 font-bold mb-1 text-sm">Personalization</h4>
          <p className="text-indigo-600/70 text-xs">
              Your name is used to customize your dashboard and study reminders. 
              Coming soon: Change password and theme preferences.
          </p>
      </div>
    </div>
  );
};

export default SettingsPage;