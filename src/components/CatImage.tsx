
import React from 'react';
import { CatImage as CatImageType } from '../services/catService';

interface CatImageProps {
  cat: CatImageType | null;
  isLoading: boolean;
}

const CatImage: React.FC<CatImageProps> = ({ cat, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!cat) {
    return (
      <div className="w-full mt-4 h-64 flex items-center justify-center">
        <img 
          src="/cat-silhouette.svg" 
          alt="Cat silhouette" 
          className="max-h-64"
        />
      </div>
    );
  }

  return (
    <div className="w-full mt-4 flex justify-center">
      <img 
        src={cat.url} 
        alt="Random cat" 
        className="max-w-full max-h-64 object-contain"
      />
    </div>
  );
};

export default CatImage;
