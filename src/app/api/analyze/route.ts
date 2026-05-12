import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize SDK. It will automatically use process.env.GEMINI_API_KEY if present
const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({}) : null;

// Mock Response Fallback
const MOCK_RESPONSE = {
  totalServiceCost: 15000,
  partsCost: 10500,
  laborCost: 4500,
  vehicleDetails: {
    make: "Hyundai",
    model: "Creta 2021",
    mileage: "45,000 km",
    serviceDate: "2026-05-10"
  },
  partsAnalysis: [
    {
      partName: "Synthetic Engine Oil",
      partCode: "OIL-5W30-SYN",
      cost: 3200,
      labor: 300,
      description: "Engine oil lubricates the engine's moving parts, reducing friction and preventing overheating. Synthetic oil lasts longer and protects better than conventional oil.",
      condition: "Replaced as per standard service interval."
    },
    {
      partName: "Brake Pads (Front)",
      partCode: "BRK-PAD-FR-001",
      cost: 4500,
      labor: 1200,
      description: "Brake pads squeeze the brake rotors to slow down and stop the car. They wear down over time due to friction.",
      condition: "Worn out past safety limit, required immediate replacement."
    },
    {
      partName: "Air Filter",
      partCode: "FLT-AIR-CR01",
      cost: 800,
      labor: 200,
      description: "The air filter cleans the air entering the engine. A clean filter improves fuel efficiency and engine performance.",
      condition: "Clogged with dust, replaced."
    },
    {
      partName: "Spark Plugs (Set of 4)",
      partCode: "SPK-IR-004",
      cost: 2000,
      labor: 800,
      description: "Spark plugs ignite the fuel-air mixture in the engine cylinders to create power. Bad spark plugs cause misfires and poor fuel economy.",
      condition: "Replaced as per 40k km maintenance schedule."
    }
  ],
  extraConsumables: [
    { name: "Windshield Washer Fluid", cost: 150 },
    { name: "Brake Cleaning Spray", cost: 350 }
  ]
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    // Attempt to use Real API if configured
    if (ai) {
      try {
        const buffer = await file.arrayBuffer();
        
        // Convert to base64 for Gemini Vision API
        const base64String = Buffer.from(buffer).toString('base64');
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
              {
                role: 'user',
                parts: [
                  { text: `Analyze this vehicle service bill. Extract the total cost, parts cost, and labor cost. 
                  Provide a list of parts with their code, cost, labor, and a simple explanation of what the part does for a common person. 
                  Return the result ONLY as a JSON object matching this structure: 
                  {
                    "totalServiceCost": number,
                    "partsCost": number,
                    "laborCost": number,
                    "vehicleDetails": { "make": string, "model": string, "mileage": string, "serviceDate": string },
                    "partsAnalysis": [ { "partName": string, "partCode": string, "cost": number, "labor": number, "description": string, "condition": string } ],
                    "extraConsumables": [ { "name": string, "cost": number } ]
                  }` },
                  {
                    inlineData: {
                      data: base64String,
                      mimeType: file.type
                    }
                  }
                ]
              }
            ],
            config: {
                responseMimeType: "application/json",
            }
        });

        const textResponse = response.text;
        if (textResponse) {
             const parsedData = JSON.parse(textResponse);
             return NextResponse.json({ success: true, data: parsedData, isMock: false });
        }
      } catch (apiError) {
        console.error("Gemini API Error, falling back to mock:", apiError);
        // Fallback to mock on error
      }
    }

    // Simulate processing delay for mock
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    return NextResponse.json({ 
      success: true, 
      data: MOCK_RESPONSE,
      isMock: true 
    });

  } catch (error) {
    console.error('Error processing bill:', error);
    return NextResponse.json({ success: false, error: 'Failed to process service bill' }, { status: 500 });
  }
}
