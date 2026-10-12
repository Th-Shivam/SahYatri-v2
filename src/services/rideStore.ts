import { Rider, SharedRide, UserProfile } from '../types';
import { CURRENT_USER, INITIAL_ACTIVE_RIDE, MOCK_RIDERS, RIDE_HISTORY } from '../data/mockData';

const STORAGE_KEYS = {
  USER: 'sahyatri_user_v2',
  ACTIVE_RIDE: 'sahyatri_active_ride_v2',
  HISTORY: 'sahyatri_history_v2',
  SAVED_SEARCH: 'sahyatri_search_v2'
};

export const rideStore = {
  getUser(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return CURRENT_USER;
  },

  updateUser(updated: Partial<UserProfile>): UserProfile {
    const current = this.getUser();
    const next = { ...current, ...updated };
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(next));
    } catch {
      // fallback
    }
    return next;
  },

  getActiveRide(): SharedRide | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_RIDE);
      if (data !== null) return data === '' ? null : JSON.parse(data);
    } catch {
      // fallback
    }
    return INITIAL_ACTIVE_RIDE;
  },

  setActiveRide(ride: SharedRide | null): void {
    try {
      if (ride === null) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_RIDE, '');
      } else {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_RIDE, JSON.stringify(ride));
      }
    } catch {
      // fallback
    }
  },

  getHistory(): SharedRide[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return RIDE_HISTORY;
  },

  addRideToHistory(ride: SharedRide): void {
    const history = this.getHistory();
    const updated = [ride, ...history];
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    } catch {
      // fallback
    }
  },

  requestRideShare(rider: Rider, origin: string, destination: string, departureTime: string): SharedRide {
    const newRide: SharedRide = {
      id: `ride-${Date.now()}`,
      status: 'matched',
      pickup: origin || rider.pickupLocation,
      destination: destination || rider.destination,
      departureDate: 'Today',
      departureTime: departureTime || rider.departureTime,
      meetingPoint: `${rider.pickupLocation} (Verified Common Point)`,
      meetingDirections: 'Meet 5 minutes before scheduled departure time. Coordinate in the chat below.',
      soloFare: rider.soloFare,
      sharedFare: rider.sharedFare,
      savings: rider.estimatedSavings,
      coRider: rider,
      cabService: 'Uber / Ola Shared Split',
      createdAt: new Date().toISOString()
    };

    this.setActiveRide(newRide);
    return newRide;
  },

  cancelActiveRide(): void {
    const current = this.getActiveRide();
    if (current) {
      this.setActiveRide(null);
      this.addRideToHistory({
        ...current,
        status: 'cancelled'
      });
    }
  },

  completeActiveRide(): void {
    const current = this.getActiveRide();
    if (current) {
      this.setActiveRide(null);
      this.addRideToHistory({
        ...current,
        status: 'completed'
      });
      // also increase user stats
      const user = this.getUser();
      this.updateUser({
        totalSaved: user.totalSaved + current.savings,
        tripsCompleted: user.tripsCompleted + 1,
        carbonOffsetKg: Number((user.carbonOffsetKg + 2.4).toFixed(1))
      });
    }
  },

  resetDemoState(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_RIDE);
      localStorage.removeItem(STORAGE_KEYS.HISTORY);
      localStorage.removeItem(STORAGE_KEYS.SAVED_SEARCH);
    } catch {
      // fallback
    }
  }
};
