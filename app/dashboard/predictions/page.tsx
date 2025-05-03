"use client";

import { useState } from "react";

export default function PredictionsPage() {
  const [showPredictionForm, setShowPredictionForm] = useState(true);
  const [formData, setFormData] = useState({
    bars: "",
    kpi: "",
    selisih: "1",
    posisi: "general manager",
  });
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handlePredictionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setFormError(null);
    if (!formData.bars || !formData.kpi || !formData.selisih || !formData.posisi) {
      setFormError("Semua field harus diisi!");
      return;
    }
    setLoading(true);
    try {
      const bars = Number(formData.bars);
      const kpi = Number(formData.kpi);
      const selisih = Number(formData.selisih);
      const posisi = formData.posisi;

      if (
        isNaN(bars) || isNaN(kpi) || isNaN(selisih) ||
        !posisi || posisi.trim() === ''
      ) {
        setFormError("Semua field harus diisi dengan benar!");
        setLoading(false);
        return;
      }

      const message = `/predict ${bars} ${kpi} ${selisih} ${posisi}`;
      console.log('bars:', bars, 'kpi:', kpi, 'selisih:', selisih, 'posisi:', posisi);
      console.log('message:', message);
      console.log('message.split:', message.split(' '));
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      setResult(data.message);
    } catch (error) {
      setResult("Terjadi kesalahan. Silakan coba lagi.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-blue-100 p-8">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-6 text-center">Prediksi Karir Karyawan</h1>
        {showPredictionForm && (
          <form onSubmit={handlePredictionSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-blue-700">Bars Value</label>
                <input
                  type="number"
                  value={formData.bars}
                  onChange={(e) => setFormData({ ...formData, bars: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-blue-200 shadow focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  required
                  min="0"
                  max="100"
                  placeholder="Nilai Bars (0-100)"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-blue-700">KPI Value</label>
                <input
                  type="number"
                  value={formData.kpi}
                  onChange={(e) => setFormData({ ...formData, kpi: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-blue-200 shadow focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  required
                  min="0"
                  max="100"
                  placeholder="Nilai KPI (0-100)"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-blue-700">Selisih</label>
                <select
                  value={formData.selisih}
                  onChange={(e) => setFormData({ ...formData, selisih: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-blue-200 shadow focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  required
                >
                  {[1,2,3,4,5,6,7,8,9,10].map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-blue-700">Posisi Saat Ini</label>
                <select
                  value={formData.posisi}
                  onChange={(e) => setFormData({ ...formData, posisi: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-blue-200 shadow focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                  required
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
            {formError && (
              <div className="text-red-600 text-center font-semibold">{formError}</div>
            )}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xl font-bold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-200 mt-4 tracking-wide"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Prediksi Sekarang"}
            </button>
          </form>
        )}
        {result && (
          <div className="mt-10 p-6 bg-blue-50 border-2 border-blue-300 rounded-xl text-2xl text-center text-blue-900 font-bold shadow animate-fade-in">
            {result}
          </div>
        )}
      </div>
    </div>
  );
} 