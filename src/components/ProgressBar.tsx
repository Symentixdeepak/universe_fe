import { useEffect } from 'react';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { useThemeColors } from '@/hooks';

// Configure NProgress
NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

export default function ProgressBar() {
  const router = useRouter();
  const themeColors = useThemeColors();

  useEffect(() => {
    // Inject custom CSS for NProgress with pantone color
    const style = document.createElement('style');
    style.innerHTML = `
      #nprogress {
        pointer-events: none;
      }
      
      #nprogress .bar {
        background: ${themeColors.pantone.main} !important;
        position: fixed;
        z-index: 1400 !important;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
      }
      
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px ${themeColors.pantone.main}, 0 0 5px ${themeColors.pantone.main};
        opacity: 1.0;
        transform: rotate(3deg) translate(0px, -4px);
      }
      
      #nprogress .spinner {
        display: block;
        position: fixed;
        z-index: 1400 !important;
        top: 15px;
        right: 15px;
      }
      
      #nprogress .spinner-icon {
        width: 18px;
        height: 18px;
        box-sizing: border-box;
        border: solid 2px transparent;
        border-top-color: ${themeColors.pantone.main};
        border-left-color: ${themeColors.pantone.main};
        border-radius: 50%;
        animation: nprogress-spinner 400ms linear infinite;
      }
      
      .nprogress-custom {
        margin: 0;
        padding: 0;
      }
      
      @keyframes nprogress-spinner {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    
    // Remove any existing nprogress styles
    const existingStyle = document.getElementById('nprogress-custom-style');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    style.id = 'nprogress-custom-style';
    document.head.appendChild(style);

    const handleStart = () => {
      NProgress.start();
    };

    const handleComplete = () => {
      NProgress.done();
    };

    const handleError = () => {
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
    };
  }, [router, themeColors.pantone.main]);

  return null;
}