import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link id="favicon" rel="icon" href="/assets/images/logos/universal_logo_light.png" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
              (function() {
                const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const link = document.querySelector('#favicon');
                link.href = dark ? '/assets/images/logos/universal_logo_light.png' : '/assets/images/logos/universal_logo.png';
              })();
            `,
        }}
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
