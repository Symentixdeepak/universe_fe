import Head from 'next/head';
import { createAsyncComponent, LoaderConfigs } from '@/components/AsyncWrapper';

// Dynamic imports for better performance
const InterestStepper = createAsyncComponent(
  () => import('@/features/IntersetStepper'),
  LoaderConfigs.page
);
const ProtectedRoute = createAsyncComponent(
  () => import('@/components/ProtectedRoute'),
  LoaderConfigs.component
);

export default function Interests() {
  return (
    <ProtectedRoute>
      <Head>
        <title>Interests - Universe Club</title>
      </Head>
      <InterestStepper />
    </ProtectedRoute>
  );
}