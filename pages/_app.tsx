import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Noto_Serif_Display } from "next/font/google";
import "@/styles/global.css";
import "@/styles/slider.css";

import { Providers } from "@/components/providers";
import { ProgressBar } from "@/components";

const notoSerifDisplay = Noto_Serif_Display({
  variable: "--font-noto-serif-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Extended types to support per-page layouts
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="emotion-insertion-point" content="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <title>Universe Club</title>
        <meta name="description" content="" />
      </Head>
      <div className={notoSerifDisplay.variable}>
        <Providers>
          <ProgressBar />
          {getLayout(<Component {...pageProps} />)}
        </Providers>
      </div>
    </>
  );
}