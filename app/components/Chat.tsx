'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Chat() {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [input, setInput] = useState('');
  const [showPredictionForm, setShowPredictionForm] = useState(false);
  const [formData, setFormData] = useState({
    bars: '',
    kpi: '',
    selisih: '1',
    posisi: 'general manager',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.message, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { text: 'Error processing your request. Please try again.', isUser: false },
      ]);
    }
  };

  const handlePredictionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const predictionCommand = `/predict ${formData.bars} ${formData.kpi} ${formData.selisih} ${formData.posisi}`;
    setInput(predictionCommand);
    setShowPredictionForm(false);
    setFormData({
      bars: '',
      kpi: '',
      selisih: '1',
      posisi: 'general manager',
    });
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4 bg-gray-50">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-4 rounded-lg ${
              message.isUser
                ? 'bg-blue-500 text-white ml-auto'
                : 'bg-white shadow-sm text-gray-800'
            }`}
            dangerouslySetInnerHTML={{ __html: message.text }}
          />
        ))}
      </div>

      {showPredictionForm ? (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onSubmit={handlePredictionSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Employee Prediction Form</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Bars Value</label>
              <input
                type="number"
                value={formData.bars}
                onChange={(e) => setFormData({ ...formData, bars: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                min="0"
                max="100"
                placeholder="Enter Bars value (0-100)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">KPI Value</label>
              <input
                type="number"
                value={formData.kpi}
                onChange={(e) => setFormData({ ...formData, kpi: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
                min="0"
                max="100"
                placeholder="Enter KPI value (0-100)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Selisih Value</label>
              <select
                value={formData.selisih}
                onChange={(e) => setFormData({ ...formData, selisih: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Position</label>
              <select
                value={formData.posisi}
                onChange={(e) => setFormData({ ...formData, posisi: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="general manager">General Manager</option>
                <option value="senior manager">Senior Manager</option>
                <option value="middle manager">Middle Manager</option>
                <option value="junior manager">Junior Manager</option>
                <option value="team leader">Team Leader</option>
                <option value="staff">Staff</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              Predict
            </button>
            <button
              type="button"
              onClick={() => setShowPredictionForm(false)}
              className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      ) : (
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Send
          </button>
          <button
            type="button"
            onClick={() => setShowPredictionForm(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
          >
            Predict
          </button>
        </form>
      )}
    </div>
  );
} 