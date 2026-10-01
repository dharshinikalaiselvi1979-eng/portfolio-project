import React from 'react';

export function CardSkeleton() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 animate-pulse bg-gray-100 dark:bg-gray-800">
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-md mb-4"></div>
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
    </div>
  );
}

export function TextSkeleton({ lines = 3 }) {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-gray-300 dark:bg-gray-700 rounded ${
            i === lines - 1 ? 'w-1/2' : 'w-full'
          }`}
        ></div>
      ))}
    </div>
  );
}
