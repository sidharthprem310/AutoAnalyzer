import { NextResponse } from 'next/server';
import { getUserHistory } from '@/lib/history-store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const rcNumber = searchParams.get('rcNumber');

    if (!rcNumber) {
      return NextResponse.json({ success: false, error: 'RC Number is required.' }, { status: 400 });
    }

    const history = await getUserHistory(rcNumber);

    return NextResponse.json({ success: true, data: history });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
