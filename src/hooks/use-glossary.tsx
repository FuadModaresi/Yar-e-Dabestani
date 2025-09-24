'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { GlossaryTerm } from '@/lib/types';

interface GlossaryContextType {
  glossary: GlossaryTerm[];
  addTerm: (term: GlossaryTerm) => void;
  removeTerm: (term: string) => void;
  isTermSaved: (term: string) => boolean;
}

const GlossaryContext = createContext<GlossaryContextType | undefined>(undefined);

const GLOSSARY_STORAGE_KEY = 'glossary_terms';

export function GlossaryProvider({ children }: { children: ReactNode }) {
  const [glossary, setGlossary] = useState<GlossaryTerm[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedGlossary = localStorage.getItem(GLOSSARY_STORAGE_KEY);
      if (savedGlossary) {
        setGlossary(JSON.parse(savedGlossary));
      }
    } catch (error) {
      console.error('Failed to load glossary from localStorage', error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(GLOSSARY_STORAGE_KEY, JSON.stringify(glossary));
      } catch (error) {
        console.error('Failed to save glossary to localStorage', error);
      }
    }
  }, [glossary, isLoaded]);

  const addTerm = useCallback((term: GlossaryTerm) => {
    setGlossary((prev) => {
      if (!prev.some(t => t.term === term.term)) {
        return [...prev, term];
      }
      return prev;
    });
  }, []);

  const removeTerm = useCallback((termName: string) => {
    setGlossary((prev) => prev.filter(t => t.term !== termName));
  }, []);
  
  const isTermSaved = useCallback((termName: string) => {
    return glossary.some(t => t.term === termName);
  }, [glossary]);

  const value = { glossary, addTerm, removeTerm, isTermSaved };

  return (
    <GlossaryContext.Provider value={value}>
      {children}
    </GlossaryContext.Provider>
  );
}

export function useGlossary() {
  const context = useContext(GlossaryContext);
  if (context === undefined) {
    throw new Error('useGlossary must be used within a GlossaryProvider');
  }
  return context;
}
