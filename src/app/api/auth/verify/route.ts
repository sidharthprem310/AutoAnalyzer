import { NextResponse } from 'next/server';
import { verifyVehicleRC } from '@/lib/rto-mock';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rcNumber, phoneNumber } = body;

    if (!rcNumber || !phoneNumber) {
      return NextResponse.json({ success: false, error: 'RC Number and Phone Number are required.' }, { status: 400 });
    }

    const result = await verifyVehicleRC(rcNumber, phoneNumber);

    if (result.success) {
      // 1. Generate a random 5-digit OTP (00000 to 99999)
      const otpCode = Math.floor(10000 + Math.random() * 90000).toString().substring(0, 5); // Fallback logic just in case, but Math.random() * 90000 + 10000 gives 5 digits. Wait, they asked for 00000 to 99999, so it should be zero-padded.
      const otp = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
      
      // 2. Store OTP in MongoDB
      const client = await clientPromise;
      const db = client.db("autoanalyzer");
      
      // Upsert the OTP for the given phone number with an expiration (e.g. 10 mins)
      await db.collection("otps").updateOne(
        { phoneNumber },
        { 
          $set: { 
            otp, 
            createdAt: new Date(),
            rcNumber,
            vehicleData: result.data
          } 
        },
        { upsert: true }
      );

      // 3. Simulated SMS Gateway (Log to console)
      console.log(`\n=========================================`);
      console.log(`📱 SMS SIMULATION - AUTOANALYZER`);
      console.log(`To: ${phoneNumber}`);
      console.log(`Message: Your AutoAnalyzer login OTP is ${otp}. Do not share this code.`);
      console.log(`=========================================\n`);

      return NextResponse.json({ success: true, message: "OTP sent successfully" });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 403 });
    }
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
