export interface Rider {
  id: string;
  name: string;
  avatar: string;
  role: string;
  institution: string; // e.g. "VIT Bhopal", "AIIMS Bhopal", "MANIT"
  rating: number;
  totalRides: number;
  verifiedStudent: boolean;
  verifiedPhone: boolean;
  approxDistance: string; // e.g. "350m from your spot"
  pickupLocation: string;
  destination: string;
  departureTime: string; // e.g. "16:30"
  timeFlexibility: string; // e.g. "±10 mins"
  routeCompatibility: number; // e.g. 94%
  estimatedSavings: number; // e.g. 190
  sharedFare: number; // e.g. 210
  soloFare: number; // e.g. 420
  bio?: string;
  vehiclePreference?: string;
  genderPreference?: 'any' | 'same-gender';
  luggageSize?: 'small' | 'medium' | 'large';
}

export interface SharedRide {
  id: string;
  status: 'matched' | 'cab_booked' | 'in_transit' | 'completed' | 'cancelled';
  pickup: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  meetingPoint: string;
  meetingDirections: string;
  soloFare: number;
  sharedFare: number;
  savings: number;
  coRider: Rider;
  cabService?: string; // e.g. "Uber XL / Ola Prime"
  driverName?: string;
  vehicleNumber?: string;
  otp?: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  institution: string;
  verifiedStudent: boolean;
  totalSaved: number;
  tripsCompleted: number;
  carbonOffsetKg: number;
  preferredMusic: string;
  chattyRides: boolean;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
}
