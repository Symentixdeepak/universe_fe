import Head from 'next/head';
import InterestStepper from '@/features/IntersetStepper';
import { ProtectedRoute } from '@/components';

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