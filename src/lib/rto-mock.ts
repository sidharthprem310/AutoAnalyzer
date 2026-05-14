import clientPromise from './mongodb';

export interface VehicleData {
  rcNumber: string;
  phoneNumber: string;
  ownerName: string;
  vehicleModel: string;
  vehicleBrand: string;
}

export async function verifyVehicleRC(rcNumber: string, phoneNumber: string): Promise<{ success: boolean; data?: VehicleData; error?: string }> {
  try {
    const client = await clientPromise;
    const db = client.db('autoanalyzer');
    const collection = db.collection('vehicles');

    const normalizedRc = rcNumber.replace(/\s+/g, '').toUpperCase();
    const vehicle = await collection.findOne({ rcNumber: normalizedRc });

    if (!vehicle) {
      return { success: false, error: "Vehicle RC not found in the registry." };
    }

    if (vehicle.phoneNumber !== phoneNumber) {
      return { success: false, error: "SECURITY WARNING: The provided phone number is NOT linked with this Vehicle RC. Unauthorized access is prohibited." };
    }

    const serializedVehicle = {
      rcNumber: vehicle.rcNumber,
      phoneNumber: vehicle.phoneNumber,
      ownerName: vehicle.ownerName,
      vehicleModel: vehicle.vehicleModel,
      vehicleBrand: vehicle.vehicleBrand,
    };

    return { success: true, data: serializedVehicle as VehicleData };
  } catch (error) {
    console.error("MongoDB Error in verifyVehicleRC", error);
    return { success: false, error: "Internal Server Error" };
  }
}

export async function registerVehicle(data: VehicleData): Promise<{ success: boolean; error?: string }> {
  try {
    const client = await clientPromise;
    const db = client.db('autoanalyzer');
    const collection = db.collection('vehicles');

    const normalizedRc = data.rcNumber.replace(/\s+/g, '').toUpperCase();
    
    const existingVehicle = await collection.findOne({ rcNumber: normalizedRc });
    if (existingVehicle) {
      return { success: false, error: "This Vehicle RC is already registered in the system." };
    }

    const newVehicle = {
      ...data,
      rcNumber: normalizedRc
    };

    await collection.insertOne(newVehicle);

    return { success: true };
  } catch (error) {
    console.error("MongoDB Error in registerVehicle", error);
    return { success: false, error: "Internal Server Error" };
  }
}
