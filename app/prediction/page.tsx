'use client';

import { useState } from 'react';

export default function PredictionPage() {
  const [formData, setFormData] = useState({
    bars: '',
    kpi: '',
    selisih: '',
    posisi: 'middle manager'
  });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const positions = [
    'general manager',
    'senior manager',
    'middle manager',
    'junior manager',
    'team leader',
    'staff'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          bars: parseFloat(formData.bars),
          kpi: parseFloat(formData.kpi),
          selisih: parseFloat(formData.selisih),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setResult(data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-8">Employee Position Prediction</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="bars" className="block text-sm font-medium text-gray-700">
              Bars
            </label>
            <input
              type="number"
              step="0.01"
              name="bars"
              id="bars"
              value={formData.bars}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="kpi" className="block text-sm font-medium text-gray-700">
              KPI
            </label>
            <input
              type="number"
              step="0.01"
              name="kpi"
              id="kpi"
              value={formData.kpi}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="selisih" className="block text-sm font-medium text-gray-700">
              Selisih
            </label>
            <input
              type="number"
              step="0.01"
              name="selisih"
              id="selisih"
              value={formData.selisih}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="posisi" className="block text-sm font-medium text-gray-700">
              Current Position
            </label>
            <select
              name="posisi"
              id="posisi"
              value={formData.posisi}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              {positions.map((position) => (
                <option key={position} value={position}>
                  {position.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Predicting...' : 'Predict'}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-md">
            <p className="font-medium">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
} 