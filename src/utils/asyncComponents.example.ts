// Example usage file showing how to use the loader and async components

import { createAsyncComponent, LoaderConfigs, withAsyncLoader } from '@/components';

// Example 1: Create async component with custom loader
export const AsyncDashboard = createAsyncComponent(
  () => import('@/app/dashboard/page'),
  LoaderConfigs.page
);

// Example 2: Create async component with inline loader
export const AsyncInterests = createAsyncComponent(
  () => import('@/app/interests/page'),
  LoaderConfigs.component
);

// Example 3: Wrap existing component with async loader
import { InterestStepper } from '@/features/InterestStepper';
export const AsyncInterestStepper = withAsyncLoader(
  InterestStepper,
  LoaderConfigs.component
);

// Example 4: Custom async component for API-heavy components
export const AsyncSignUpStep3 = createAsyncComponent(
  () => import('@/features/Register/components/SignUpStep3'),
  {
    size: 30,
    message: 'Loading registration form...',
    fullScreen: false,
    overlay: false,
  }
);

// Example 5: Page-level async wrapper
export const AsyncNotFound = createAsyncComponent(
  () => import('@/app/not-found'),
  LoaderConfigs.page
);

/* 
Usage Examples:

1. In a page component:
```tsx
import { AsyncDashboard } from '@/utils/asyncComponents';

export default function DashboardPage() {
  return <AsyncDashboard />;
}
```

2. With AsyncWrapper for conditional loading:
```tsx
import AsyncWrapper, { LoaderConfigs } from '@/components';

export default function MyPage() {
  return (
    <AsyncWrapper loaderProps={LoaderConfigs.page}>
      <SomeHeavyComponent />
    </AsyncWrapper>
  );
}
```

3. For API loading states:
```tsx
import { Loader, LoaderConfigs } from '@/components';

export default function MyComponent() {
  const [isLoading, setIsLoading] = useState(false);
  
  if (isLoading) {
    return <Loader {...LoaderConfigs.api} />;
  }
  
  return <div>Content</div>;
}
```
*/