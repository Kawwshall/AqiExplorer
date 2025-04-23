export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  category?: string;
  imageUrl?: string;
}

export interface AQIData {
  aqi: number;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
  timestamp: string;
}

export interface Bookmark {
  id: string;
  locationId: string;
  name: string;
  latitude: number;
  longitude: number;
  dateAdded: Date;
}

export interface SearchResult {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  category?: string;
  address?: string;
}

export type Theme = 'light' | 'dark';

export type AQILevel = 'good' | 'moderate' | 'unhealthy-sensitive' | 'unhealthy' | 'very-unhealthy' | 'hazardous';