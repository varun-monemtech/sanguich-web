'use client';

import { ParallaxProvider } from 'react-scroll-parallax'

export default function ExternalContextProvider({ children }) {
  return (
      <ParallaxProvider>{children}</ParallaxProvider>
  );
}