import { useState, useEffect } from 'react';
import { CoffeeEntry, NewCoffeeEntry, ChartData } from '@/types/coffee';

// Mock data for demonstration (replace with Supabase integration)
const mockEntries: CoffeeEntry[] = [
  {
    id: '1',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    quantidade: 'média',
    torra: 'média',
    especie: 'arábica',
    preparo: 'expresso'
  },
  {
    id: '2',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    quantidade: 'grande',
    torra: 'escura',
    especie: 'robusta',
    preparo: 'coado'
  },
  {
    id: '3',
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    quantidade: 'pequena',
    torra: 'clara',
    especie: 'arábica',
    preparo: 'aeropress'
  }
];

export const useCoffeeEntries = () => {
  const [entries, setEntries] = useState<CoffeeEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading and return mock data
  useEffect(() => {
    const loadEntries = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setEntries(mockEntries);
      setLoading(false);
    };

    loadEntries();
  }, []);

  const addEntry = async (newEntry: NewCoffeeEntry): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const entry: CoffeeEntry = {
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      ...newEntry
    };

    setEntries(prev => [entry, ...prev]);
  };

  // Get recent entries (last 5)
  const recentEntries = entries.slice(0, 5);

  // Generate chart data for last 7 days
  const chartData: ChartData[] = (() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    return last7Days.map(date => {
      const dayEntries = entries.filter(entry => 
        entry.created_at.split('T')[0] === date
      );
      
      return {
        date,
        doses: dayEntries.length
      };
    });
  })();

  return {
    entries,
    recentEntries,
    chartData,
    loading,
    addEntry
  };
};