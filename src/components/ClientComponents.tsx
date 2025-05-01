// components/ClientComponents.tsx
'use client';

import dynamic from 'next/dynamic';

// Динамически импортируем клиентские компоненты
export const ParticleBackground = dynamic(() => import('./ParticleBackground'), {
  ssr: false,
});


// TODO: Fix this fucking ssr
export const GhostCanvas = dynamic(() => import('./GhostCanvas'), {
  ssr: true,
});