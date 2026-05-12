import { NextResponse } from 'next/server';
import { registerVehicle } from '@/lib/rto-mock';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rcNumber, phoneNumber, ownerName, vehicleModel, vehicleBrand } = body;

    if (!rcNumber || !phoneNumber || !ownerName || !vehicleModel || !vehicleBrand) {
      return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 });
    }

    const result = await registerVehicle({ rcNumber, phoneNumber, ownerName, vehicleModel, vehicleBrand });

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
