'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loader from './Loader';
import { LoaderProps } from './Loader';

interface AsyncWrapperProps {
  children: React.ReactNode;
  loaderProps?: Partial<LoaderProps>;
  fallback?: React.ComponentType;
}

// Higher-order component for async loading with custom loader
export function withAsyncLoader<P extends object>(
  Component: React.ComponentType<P>,
  loaderProps?: Partial<LoaderProps>
) {
  const AsyncComponent: React.FC<P> = (props) => (
    <Suspense 
      fallback={
        <Loader 
          {...loaderProps}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );

  AsyncComponent.displayName = `withAsyncLoader(${Component.displayName || Component.name})`;
  return AsyncComponent;
}

// Wrapper component for Suspense boundaries
const AsyncWrapper: React.FC<AsyncWrapperProps> = ({ 
  children, 
  loaderProps = {}, 
  fallback: FallbackComponent 
}) => {
  const defaultLoaderProps: Partial<LoaderProps> = {
    size: 40,
    ...loaderProps,
  };

  return (
    <Suspense 
      fallback={
        FallbackComponent ? (
          <FallbackComponent />
        ) : (
          <Loader {...defaultLoaderProps} />
        )
      }
    >
      {children}
    </Suspense>
  );
};

// Utility function to create dynamic imports with loader
export function createAsyncComponent<P extends object>(
  importFn: () => Promise<{ default: React.ComponentType<P> }>,
  loaderProps?: Partial<LoaderProps>
) {
  return dynamic(importFn, {
    loading: () => (
      <Loader 
        {...loaderProps}
      />
    ),
    ssr: false, // Disable SSR for dynamic components to prevent hydration issues
  });
}

// Common loader configurations
export const LoaderConfigs = {
  page: {
    size: 22,
  } as Partial<LoaderProps>,
  
  component: {
    size: 22,
  } as Partial<LoaderProps>,
  
  api: {
    size: 22,
  } as Partial<LoaderProps>,
  
  modal: {
    size: 22,
  } as Partial<LoaderProps>,
  
  inline: {
    size: 22,
  } as Partial<LoaderProps>,
};

export default AsyncWrapper;