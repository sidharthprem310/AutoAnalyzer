import clientPromise from './mongodb';

export interface ReportHistory {
  id: string;
  rcNumber: string;
  timestamp: string;
  data: any; // The full AnalysisResult
}

export async function saveReport(rcNumber: string, reportData: any): Promise<boolean> {
  try {
    const client = await clientPromise;
    const db = client.db('autoanalyzer');
    const collection = db.collection('history');

    const newReport: ReportHistory = {
      id: Date.now().toString(),
      rcNumber: rcNumber.replace(/\s+/g, '').toUpperCase(),
      timestamp: new Date().toISOString(),
      data: reportData
    };

    await collection.insertOne(newReport);
    return true;
  } catch (error) {
    console.error("MongoDB Error in saveReport", error);
    return false;
  }
}

export async function getUserHistory(rcNumber: string): Promise<ReportHistory[]> {
  try {
    const client = await clientPromise;
    const db = client.db('autoanalyzer');
    const collection = db.collection('history');

    const normalizedRc = rcNumber.replace(/\s+/g, '').toUpperCase();
    
    const history = await collection
      .find({ rcNumber: normalizedRc })
      .sort({ timestamp: -1 })
      .toArray();

    // Map _id out so it can be serialized by Next.js
    return history.map(h => ({
      id: h.id,
      rcNumber: h.rcNumber,
      timestamp: h.timestamp,
      data: h.data
    }));
  } catch (error) {
    console.error("MongoDB Error in getUserHistory", error);
    return [];
  }
}
