import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import ResultCard from '../components/ResultCard';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Dashboard = () => {

  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const { axios } = useAppContext();


  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) return;
    setLoading(true);
    try {

      const { data } = await axios.post('/api/ai/generate-Email', { prompt });
      console.log(data);
      if (data.success) {
        console.log(data);
        setResult(data);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message || "Failed to generate. Please Try Again");
    } finally {
      setLoading(false);
    }
  }
  return (

    <>
      <div className="min-h-screen bg-gray-50 flex">

        {/* Left Sidebar */}
        <Sidebar />

        {/* Right Section */}
        <div className="flex-1 flex flex-col">

          {/* Top Navbar */}
          <Navbar />

          {/* Dashboard Content */}
          <main className="flex-1 p-6">

            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">

              {/* Input Section */}
              <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">New Campaign</h2>
                <form onSubmit={handleGenerate} className="flex-1 flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">Context / Prompt</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="flex-1 w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow resize-none"
                    placeholder="e.g. Write a cold email to a marketing director at a SaaS company offering our AI-driven analytics tool that increases retention by 20%..."
                  />
                  <button
                    type="submit"
                    disabled={loading || !prompt.trim()}
                    className="mt-4 w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </span>
                    ) : 'Generate Output'}
                  </button>
                </form>
              </div>

              {/* Output Section */}
              <div className="w-full lg:w-2/3 flex flex-col overflow-y-auto">
                {result ? (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">AI Results</h2>
                    <ResultCard title="Subject Line" content={result.historyEntry.subject} type="subject" />
                    <ResultCard title="Cold Email" content={result.historyEntry.emailBody} type="email" />
                    <ResultCard title="LinkedIn DM" content={result.historyEntry.linkdInDM} type="linkedin" />
                    <ResultCard title="Follow-up Email" content={result.historyEntry.followUpEmail} type="followup" />
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-white border border-gray-200 rounded-xl">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <ClipboardDocumentIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm">Submit a prompt to generate AI outputs.</p>
                  </div>
                )}
              </div>
            </div>


          </main>

        </div>

      </div>
    </>




  )
}

export default Dashboard
