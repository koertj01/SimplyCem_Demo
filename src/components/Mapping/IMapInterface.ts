export interface Grave {
  longitude: number; // Geographic longitude
  latitude: number; // Geographic latitude
  property_id: number; // Property ID
  split: string; // Binary state (e.g., shared grave)
  property_type: string; // Type of property (e.g., Residential)
  cemetery: string; // Cemetery name or identifier
  section: string; // Cemetery section
  block: string; // Cemetery block
  row: string; // Cemetery row
  lot: string; // Cemetery lot
  grave: string; // Specific grave identifier
}

export interface ExtendedGraveData {
    created_date: string; // ISO date string (e.g., "2023-12-30")
    update_date: string; // ISO date string
    viewing_date: string; // ISO date string
    viewing_time: string; // ISO time string (e.g., "14:30:00")
    interment_time: string; // ISO time string
    property_id: number; // Assuming property ID is a number
    age: number; // Assuming age is numeric
  }
  