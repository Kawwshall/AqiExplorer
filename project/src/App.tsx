import React, { useState, useEffect } from 'react';
import { Map, Search, Wind, AlertTriangle, BookOpen, Thermometer, Droplets, Activity, Sun, Moon } from 'lucide-react';
import { useTheme } from './context/ThemeContext';
import type { AQIData } from './types';

const API_TOKEN = '45332d0fcd9c8a1c84b0ccf25ed596b3a08d6e77';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700" />
      )}
    </button>
  );
}

function EducationalPanel() {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Understanding Air Quality</h2>
      </div>
      
      <div className="flex gap-2 mb-6">
        {['overview', 'parameters', 'health'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              The Air Quality Index (AQI) is a standardized indicator that measures air quality conditions and their potential health impacts. Understanding AQI levels helps you make informed decisions about outdoor activities.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { range: '0-50', level: 'Good', color: 'bg-green-500' },
                { range: '51-100', level: 'Moderate', color: 'bg-yellow-500' },
                { range: '101-150', level: 'Unhealthy for Sensitive Groups', color: 'bg-orange-500' },
                { range: '151-200', level: 'Unhealthy', color: 'bg-red-500' },
                { range: '201-300', level: 'Very Unhealthy', color: 'bg-purple-500' },
                { range: '301+', level: 'Hazardous', color: 'bg-red-900' },
              ].map((item) => (
                <div key={item.range} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className={`w-4 h-4 ${item.color} rounded-full`} />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{item.level}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{item.range}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'parameters' && (
          <div className="grid gap-4">
            {[
              {
                icon: <Wind className="h-5 w-5" />,
                name: 'PM2.5',
                description: 'Fine particulate matter that can penetrate deep into the lungs and bloodstream.'
              },
              {
                icon: <Droplets className="h-5 w-5" />,
                name: 'PM10',
                description: 'Larger particles that can cause respiratory issues and aggravate asthma.'
              },
              {
                icon: <Thermometer className="h-5 w-5" />,
                name: 'Ozone (O₃)',
                description: 'Ground-level ozone that can trigger breathing problems and damage lungs.'
              },
              {
                icon: <Activity className="h-5 w-5" />,
                name: 'Nitrogen Dioxide (NO₂)',
                description: 'Gas that can cause inflammation of airways and worsen respiratory conditions.'
              },
            ].map((param) => (
              <div key={param.name} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400">
                  {param.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">{param.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{param.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'health' && (
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Air quality has significant impacts on human health, affecting both short-term well-being and long-term health outcomes.
            </p>
            <div className="grid gap-4">
              {[
                {
                  title: 'Short-term Effects',
                  items: ['Irritation of eyes, nose, and throat', 'Coughing and sneezing', 'Shortness of breath', 'Fatigue and dizziness']
                },
                {
                  title: 'Long-term Effects',
                  items: ['Respiratory diseases', 'Heart disease', 'Lung cancer', 'Damage to brain, liver, and kidneys']
                },
                {
                  title: 'Sensitive Groups',
                  items: ['Children and elderly', 'People with asthma', 'Pregnant women', 'Those with heart or lung conditions']
                }
              ].map((section) => (
                <div key={section.title} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-3">{section.title}</h3>
                  <ul className="grid gap-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AQIInfo({ data }: { data: AQIData }) {
  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    if (aqi <= 200) return 'bg-red-500';
    if (aqi <= 300) return 'bg-purple-500';
    return 'bg-red-900';
  };

  const getAQIStatus = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Current Air Quality</h3>
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${getAQIColor(data.aqi)}`} />
          <span className="font-medium text-gray-900 dark:text-white">{data.aqi}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { label: 'PM2.5', value: `${data.pm25} µg/m³`, icon: <Wind className="h-5 w-5" /> },
          { label: 'PM10', value: `${data.pm10} µg/m³`, icon: <Droplets className="h-5 w-5" /> },
          { label: 'O₃', value: `${data.o3} ppb`, icon: <Thermometer className="h-5 w-5" /> },
          { label: 'NO₂', value: `${data.no2} ppb`, icon: <Activity className="h-5 w-5" /> },
        ].map((item) => (
          <div key={item.label} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center gap-2 mb-2 text-blue-600 dark:text-blue-400">
              {item.icon}
              <span className="font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <span>{getAQIStatus(data.aqi)}</span>
        </div>
        <span>Updated: {new Date(data.timestamp).toLocaleTimeString()}</span>
      </div>
    </div>
  );
}

function App() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ station: string; uid: number }>>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [aqiData, setAqiData] = useState<AQIData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchLocation = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`https://api.waqi.info/search/?token=${API_TOKEN}&keyword=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.status === 'ok') {
        setSearchResults(data.data.map((item: any) => ({
          station: item.station.name,
          uid: item.uid
        })));
      }
    } catch (error) {
      console.error('Error searching locations:', error);
      setError('Failed to search locations. Please try again.');
    }
  };

  const fetchAQIData = async (stationId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.waqi.info/feed/@${stationId}/?token=${API_TOKEN}`);
      const data = await response.json();
      
      if (data.status === 'ok') {
        setAqiData({
          aqi: data.data.aqi,
          pm25: data.data.iaqi.pm25?.v || 0,
          pm10: data.data.iaqi.pm10?.v || 0,
          o3: data.data.iaqi.o3?.v || 0,
          no2: data.data.iaqi.no2?.v || 0,
          so2: data.data.iaqi.so2?.v || 0,
          co: data.data.iaqi.co?.v || 0,
          timestamp: data.data.time.iso
        });
        setSelectedLocation(data.data.city.name);
      } else {
        setError('Could not fetch air quality data for this location.');
      }
    } catch (error) {
      console.error('Error fetching AQI data:', error);
      setError('Failed to fetch air quality data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial data fetch for a default location (e.g., London)
    fetchAQIData('5724');
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchLocation(query);
  };

  const handleLocationSelect = (uid: number) => {
    setSearchQuery('');
    setSearchResults([]);
    fetchAQIData(uid.toString());
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <ThemeToggle />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Map className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Air Quality Explorer</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search for a city..."
                className="w-full px-4 py-3 pl-11 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              
              {searchResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  {searchResults.map((result) => (
                    <button
                      key={result.uid}
                      onClick={() => handleLocationSelect(result.uid)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      {result.station}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedLocation && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing results for: {selectedLocation}
              </div>
            )}

            {error && (
              <div className="bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-300 p-4 rounded-lg">
                {error}
              </div>
            )}

            {loading ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading air quality data...</p>
              </div>
            ) : aqiData ? (
              <AQIInfo data={aqiData} />
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No air quality data available for this location</p>
              </div>
            )}
          </div>
          
          <EducationalPanel />
        </div>
      </div>
    </div>
  );
}

export default App;