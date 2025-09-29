'use client';

import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        Desmos: any;
    }
}

interface DesmosGraphProps {
  expression: string;
}

export default function DesmosGraph({ expression }: DesmosGraphProps) {
  const calculatorRef = useRef<HTMLDivElement>(null);
  const graphInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (window.Desmos && calculatorRef.current && !graphInstanceRef.current) {
        calculatorRef.current.style.direction = 'ltr';
        graphInstanceRef.current = window.Desmos.GraphingCalculator(calculatorRef.current, {
            keypad: false,
            settingsMenu: false,
            language: 'en',
        });
    }

    if (graphInstanceRef.current) {
        graphInstanceRef.current.setExpression({ id: 'graph1', latex: expression });
    }
    
    return () => {
        // Do not destroy the instance on unmount if you want to reuse it
        // or if the component re-renders frequently.
        // If you need cleanup, you can do it here.
        // if(graphInstanceRef.current) {
        //     graphInstanceRef.current.destroy();
        //     graphInstanceRef.current = null;
        // }
    }

  }, [expression]);

  return <div ref={calculatorRef} style={{ width: '100%', height: '400px' }}></div>;
}
