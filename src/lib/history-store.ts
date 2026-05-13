import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'history.json');

export interface ReportHistory {
  id: string;
  rcNumber: string;
  timestamp: string;
  data: any; // The full AnalysisResult
}

function getHistoryDatabase(): ReportHistory[] {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function saveReport(rcNumber: string, reportData: any): Promise<boolean> {
  try {
    const database = getHistoryDatabase();
    
    const newReport: ReportHistory = {
      id: Date.now().toString(),
      rcNumber: rcNumber.replace(/\s+/g, '').toUpperCase(),
      timestamp: new Date().toISOString(),
      data: reportData
    };

    database.push(newReport);
    fs.writeFileSync(DB_PATH, JSON.stringify(database, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error("Failed to save report history", error);
    return false;
  }
}

export async function getUserHistory(rcNumber: string): Promise<ReportHistory[]> {
  try {
    const database = getHistoryDatabase();
    const normalizedRc = rcNumber.replace(/\s+/g, '').toUpperCase();
    
    // Return sorted by newest first
    return database
      .filter(h => h.rcNumber === normalizedRc)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } catch (error) {
    console.error("Failed to fetch report history", error);
    return [];
  }
}
