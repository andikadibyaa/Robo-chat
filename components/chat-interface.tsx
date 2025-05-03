"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInterfaceProps {
  isFullPage?: boolean
}

interface PredictionFormData {
  bars: string;
  kpi: string;
  selisih: string;
  posisi: string;
}

export default function ChatInterface({ isFullPage = false }: ChatInterfaceProps) {
  const [message, setMessage] = useState("")
  const [showPredictionForm, setShowPredictionForm] = useState(false)
  const [predictionResult, setPredictionResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState<PredictionFormData>({
    bars: '',
    kpi: '',
    selisih: '',
    posisi: 'middle manager'
  })

  const positions = [
    'general manager',
    'senior manager',
    'middle manager',
    'junior manager',
    'team leader',
    'staff'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitPrediction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPredictionResult(null);

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

      setPredictionResult(data.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (message.toLowerCase() === '/predict') {
      setShowPredictionForm(true);
      setMessage('');
    } else {
      // Handle normal chat message
      setMessage('');
    }
  };

  return (
    <div className={`flex flex-col ${isFullPage ? 'h-full' : 'h-full'}`}>
      <div className={cn(
        "flex-1 overflow-y-auto p-6 space-y-4",
        "scrollbar-thin scrollbar-thumb-blue-100 scrollbar-track-transparent"
      )}>
        {/* Initial bot message */}
        <div className="flex items-start gap-3">
          <div className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full",
            "bg-gradient-to-r from-blue-500 to-blue-600",
            "flex items-center justify-center",
            "text-white text-sm font-medium"
          )}>
            R
          </div>
          <div className={cn(
            "bg-white rounded-2xl rounded-tl-sm p-4",
            "shadow-sm border border-blue-100/50",
            "max-w-[80%]"
          )}>
            <p className="text-sm text-gray-700">Halo! Ada yang bisa saya bantu? Ketik /predict untuk memprediksi posisi karyawan.</p>
          </div>
        </div>

        {/* Prediction Form */}
        {showPredictionForm && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-100/50">
            <form onSubmit={handleSubmitPrediction} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bars
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="bars"
                  value={formData.bars}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  KPI
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="kpi"
                  value={formData.kpi}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Selisih
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="selisih"
                  value={formData.selisih}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Position
                </label>
                <select
                  name="posisi"
                  value={formData.posisi}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Predicting...' : 'Predict'}
              </Button>
            </form>
          </div>
        )}

        {/* Prediction Result */}
        {predictionResult && (
          <div className="flex items-start gap-3">
            <div className={cn(
              "flex-shrink-0 w-8 h-8 rounded-full",
              "bg-gradient-to-r from-blue-500 to-blue-600",
              "flex items-center justify-center",
              "text-white text-sm font-medium"
            )}>
              R
            </div>
            <div className={cn(
              "bg-white rounded-2xl rounded-tl-sm p-4",
              "shadow-sm border border-blue-100/50",
              "max-w-[80%]"
            )}>
              <p className="text-sm text-gray-700">{predictionResult}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-3">
            <div className={cn(
              "flex-shrink-0 w-8 h-8 rounded-full",
              "bg-gradient-to-r from-red-500 to-red-600",
              "flex items-center justify-center",
              "text-white text-sm font-medium"
            )}>
              !
            </div>
            <div className={cn(
              "bg-red-50 rounded-2xl rounded-tl-sm p-4",
              "shadow-sm border border-red-100/50",
              "max-w-[80%]"
            )}>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Message Input */}
      <div className={cn(
        "p-4 bg-white/50",
        "border-t border-blue-100/50",
        "backdrop-blur-sm"
      )}>
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ketik pesan Anda... (Ketik /predict untuk prediksi posisi)"
            className={cn(
              "flex-1 px-4 py-3",
              "bg-white/80 backdrop-blur-sm",
              "border border-blue-100/50",
              "rounded-full",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/30",
              "text-sm text-gray-700",
              "placeholder:text-gray-400"
            )}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
          />
          <Button 
            onClick={handleSendMessage}
            className={cn(
              "rounded-full px-4",
              "bg-gradient-to-r from-blue-500 to-blue-600",
              "hover:from-blue-600 hover:to-blue-700",
              "shadow-md hover:shadow-lg",
              "transition-all duration-200"
            )}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
