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

const defaultGlossaryTerms: GlossaryTerm[] = [
    {
        term: 'سرعت',
        definition: 'نرخ تغییر موقعیت یک جسم نسبت به زمان. یک کمیت برداری است، به این معنی که هم اندازه (تندی) و هم جهت دارد.',
        context: 'فیزیک',
    },
    {
        term: 'مشتق',
        definition: 'در حساب دیفرانسیل و انتگرال، مشتق یک تابع، نرخ لحظه‌ای تغییر تابع را نسبت به یکی از متغیرهایش اندازه‌گیری می‌کند. اغلب به عنوان شیب خط مماس بر نمودار تابع در یک نقطه خاص تفسیر می‌شود.',
        context: 'ریاضی',
    },
    {
        term: 'مولکول',
        definition: 'یک گروه الکتریکی خنثی از دو یا چند اتم است که توسط پیوندهای شیمیایی در کنار هم نگه داشته شده‌اند. مولکول‌ها کوچکترین واحد یک ماده هستند که خواص شیمیایی آن ماده را حفظ می‌کنند.',
        context: 'شیمی',
    },
    {
        term: 'فتوسنتز',
        definition: 'فرآیندی است که توسط گیاهان، جلبک‌ها و برخی باکتری‌ها برای تبدیل انرژی نور به انرژی شیمیایی، از طریق یک فرآیند سلولی که دی‌اکسید کربن و آب را به ترکیبات آلی (مانند قند) تبدیل می‌کند، استفاده می‌شود.',
        context: 'زیست شناسی',
    },
    {
        term: 'فرضیه',
        definition: 'یک توضیح پیشنهادی برای یک پدیده است. برای اینکه یک فرضیه علمی باشد، باید قابل آزمایش باشد.',
        context: 'روش علمی',
    },
];


export function GlossaryProvider({ children }: { children: ReactNode }) {
  const [glossary, setGlossary] = useState<GlossaryTerm[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedGlossary = localStorage.getItem(GLOSSARY_STORAGE_KEY);
      if (savedGlossary) {
        setGlossary(JSON.parse(savedGlossary));
      } else {
        setGlossary(defaultGlossaryTerms);
      }
    } catch (error) {
      console.error('Failed to load glossary from localStorage', error);
      setGlossary(defaultGlossaryTerms);
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
