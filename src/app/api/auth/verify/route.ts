import { NextResponse } from 'next/server';
import { verifyVehicleRC } from '@/lib/rto-mock';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rcNumber, phoneNumber } = body;

    if (!rcNumber || !phoneNumber) {
      return NextResponse.json({ success: false, error: 'RC Number and Phone Number are required.' }, { status: 400 });
    }

    const result = await verifyVehicleRC(rcNumber, phoneNumber);

    if (result.success) {
      // In a real app, you would set a secure HTTP-only cookie here with JWT
      return NextResponse.json({ success: true, data: result.data });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 403 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
