
import React, { useState, useEffect, useCallback } from 'react';
import Checkbox from './Checkbox';
import Button from './Button';
import CatImage from './CatImage';
import { fetchRandomCat, CatImage as CatImageType } from '../services/catService';
import { useToast } from '@/components/ui/use-toast';

const CatGallery: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [cat, setCat] = useState<CatImageType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchCat = useCallback(async () => {
    if (!enabled) return;
    
    setIsLoading(true);
    try {
      const newCat = await fetchRandomCat();
      setCat(newCat);
    } catch (error) {
      console.error('Failed to fetch cat:', error);
      toast({
        title: "Error",
        description: "Failed to fetch a cat image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [enabled, toast]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (enabled && autoRefresh) {
      timer = setInterval(() => {
        fetchCat();
      }, 5000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [enabled, autoRefresh, fetchCat]);

  // Initial cat fetch
  useEffect(() => {
    if (enabled) {
      fetchCat();
    }
  }, [enabled, fetchCat]);

  return (
    <div className="bg-white p-6 rounded shadow-sm max-w-md w-full">
      <Checkbox 
        label="Enabled" 
        checked={enabled} 
        onChange={setEnabled} 
      />
      <Checkbox 
        label="Auto-refresh every 5 second" 
        checked={autoRefresh} 
        onChange={setAutoRefresh} 
      />
      
      <div className="mt-2 mb-4">
        <Button 
          onClick={fetchCat} 
          disabled={!enabled || isLoading}
        >
          Get cat
        </Button>
      </div>
      
      <CatImage cat={cat} isLoading={isLoading} />
    </div>
  );
};

export default CatGallery;
