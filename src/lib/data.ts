import type { Subject } from './types';
import { Atom, Calculator, FlaskConical, Dna } from 'lucide-react';

export const subjects: Subject[] = [
    {
        id: 'math',
        name: 'ریاضی',
        description: 'مفاهیم ریاضی را با معلم خصوصی هوش مصنوعی خود کاوش کنید.',
        icon: Calculator,
        lessons: [],
    },
    {
        id: 'physics',
        name: 'فیزیک',
        description: 'دنیای فیزیک را با معلم خصوصی هوش مصنوعی خود کشف کنید.',
        icon: Atom,
        lessons: [],
    },
    {
        id: 'chemistry',
        name: 'شیمی',
        description: 'اسرار شیمی را با معلم خصوصی هوش مصنوعی خود باز کنید.',
        icon: FlaskConical,
        lessons: [],
    },
    {
        id: 'biology',
        name: 'زیست شناسی',
        description: 'در شگفتی های زیست شناسی با معلم خصوصی هوش مصنوعی خود غرق شوید.',
        icon: Dna,
        lessons: [],
    },
];
