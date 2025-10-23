import Head from 'next/head';
import InterestStepper from '@/features/IntersetStepper';

export default function Interests() {
  return (
    <>
      <Head>
        <title>Interests - Universe Club</title>
      </Head>
      <InterestStepper />
    </>
  );
}