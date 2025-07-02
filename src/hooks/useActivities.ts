import { useState, useEffect } from 'react';
import { Activities } from '../types';
import activitiesData from '../data/activities.json';

export const useActivities = () => {
  const [activities, setActivities] = useState<Activities>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setActivities(activitiesData as Activities);
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar atividades');
      setLoading(false);
    }
  }, []);

  return { activities, loading, error };
};