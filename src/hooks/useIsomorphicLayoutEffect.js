'use client';
import { useEffect, useLayoutEffect } from 'react';
// Avoids the SSR warning while keeping layout timing on the client.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
export default useIsomorphicLayoutEffect;
