import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Noto_Serif_Display } from "next/font/google";
import "@/styles/global.css";
import "@/styles/slider.css";

import { Providers } from "@/components/providers";

const notoSerifDisplay = Noto_Serif_Display({
  variable: "--font-noto-serif-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function App({ Component, pageProps }: AppProps) {
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
          <Component {...pageProps} />
        </Providers>
      </div>
    </>
  );
}