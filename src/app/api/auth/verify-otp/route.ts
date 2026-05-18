import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phoneNumber, otp } = body;

    if (!phoneNumber || !otp) {
      return NextResponse.json({ success: false, error: 'Phone Number and OTP are required.' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("autoanalyzer");
    
    // Find the OTP record
    const otpRecord = await db.collection("otps").findOne({ phoneNumber, otp });

    if (!otpRecord) {
      return NextResponse.json({ success: false, error: 'Invalid or expired OTP.' }, { status: 400 });
    }

    // Optional: Check if OTP is expired (e.g. older than 10 minutes)
    const now = new Date();
    const createdAt = new Date(otpRecord.createdAt);
    const diffMins = Math.round(((now.getTime() - createdAt.getTime()) % 86400000) / 60000);
    
    if (diffMins > 10) {
      await db.collection("otps").deleteOne({ _id: otpRecord._id });
      return NextResponse.json({ success: false, error: 'OTP has expired. Please request a new one.' }, { status: 400 });
    }

    // Success! Delete the OTP so it can't be reused
    await db.collection("otps").deleteOne({ _id: otpRecord._id });

    // In a real production app, set a secure HTTP-only JWT cookie here.
    return NextResponse.json({ 
      success: true, 
      message: "Authentication successful",
      data: otpRecord.vehicleData 
    });
    
  } catch (error) {
    console.error("OTP Verification Error:", error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
