import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = body;

    if (message.startsWith('/predict')) {
      const parts = message.split(' ');
      if (parts.length !== 5) {
        return NextResponse.json(
          { message: 'Invalid prediction format. Use: /predict <bars> <kpi> <selisih> <position>' },
          { status: 400 }
        );
      }

      const [_, bars, kpi, selisih, posisi] = parts;

      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          bars: parseFloat(bars),
          kpi: parseFloat(kpi),
          selisih: parseFloat(selisih),
          posisi: posisi.toLowerCase(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json(
          { message: errorData.error || 'Error from prediction server' },
          { status: response.status }
        );
      }

      const data = await response.json();
      return NextResponse.json({ message: data.message });
    }

    return NextResponse.json({ message: 'Invalid command' });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Error processing your request. Please try again.' },
      { status: 500 }
    );
  }
}
