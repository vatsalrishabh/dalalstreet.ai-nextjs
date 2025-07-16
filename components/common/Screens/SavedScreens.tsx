'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Screen from './Screen';
import { motion, AnimatePresence } from 'framer-motion';
import { getAllScreens } from '@/services/screenService';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/redux/store';

interface ScreenData {
  uid: string;
  title: string;
  description: string;
  screen_query: string;
  timestamp: string;
}

export default function SavedScreens() {
  const [screens, setScreens] = useState<ScreenData[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state: RootState) => state.auth.token);

  const fetchScreens = useCallback(async () => {
    try {
      if (!token) return;
      const data = await getAllScreens(token);
      setScreens(data);
    } catch (error) {
      console.error('❌ Failed to fetch screens:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const handleDeleteRefresh = () => {
    fetchScreens(); // Re-fetch screens after delete
  };

  useEffect(() => {
    fetchScreens();
  }, [fetchScreens]);

  return (
    <div className="px-4 py-6 min-h-screen bg-base-200">
      <h1 className="text-3xl font-bold mb-6 text-primary">📊 Saved Screens</h1>

      {loading ? (
        <div className="text-center text-base-content">Loading screens...</div>
      ) : screens.length === 0 ? (
        <div className="text-center text-base-content/70">No saved screens found.</div>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {screens.map((screen) => (
              <Screen
               key={`${screen.uid}-${screen.timestamp}`}
                title={screen.title}
                description={screen.description}
                screen_query={screen.screen_query}
                timestamp={screen.timestamp}
                onDelete={handleDeleteRefresh}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
