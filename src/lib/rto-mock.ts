import fs from 'fs';
import path from 'path';

export interface VehicleData {
  rcNumber: string;
  phoneNumber: string;
  ownerName: string;
  vehicleModel: string;
  vehicleBrand: string;
}

const DB_PATH = path.join(process.cwd(), 'data', 'vehicles.json');

function getDatabase(): VehicleData[] {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function verifyVehicleRC(rcNumber: string, phoneNumber: string): Promise<{ success: boolean; data?: VehicleData; error?: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const normalizedRc = rcNumber.replace(/\s+/g, '').toUpperCase();
  const database = getDatabase();
  const vehicle = database.find(v => v.rcNumber === normalizedRc);

  if (!vehicle) {
    return { success: false, error: "Vehicle RC not found in the registry." };
  }

  if (vehicle.phoneNumber !== phoneNumber) {
    return { success: false, error: "SECURITY WARNING: The provided phone number is NOT linked with this Vehicle RC. Unauthorized access is prohibited." };
  }

  return { success: true, data: vehicle };
}

export async function registerVehicle(data: VehicleData): Promise<{ success: boolean; error?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const normalizedRc = data.rcNumber.replace(/\s+/g, '').toUpperCase();
  const database = getDatabase();
  
  if (database.some(v => v.rcNumber === normalizedRc)) {
    return { success: false, error: "This Vehicle RC is already registered in the system." };
  }

  const newVehicle = {
    ...data,
    rcNumber: normalizedRc
  };

  database.push(newVehicle);
  fs.writeFileSync(DB_PATH, JSON.stringify(database, null, 2), 'utf-8');

  return { success: true };
}
