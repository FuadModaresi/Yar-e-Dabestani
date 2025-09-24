import type { LucideIcon } from "lucide-react";

export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  content: (TextElement | ImageElement | ChartElement | TableElement | GlossaryTermElement)[];
  quiz: Question[];
}

export type TextElement = {
  type: 'p' | 'h2' | 'h3';
  content: string;
}

export type ImageElement = {
  type: 'image';
  imageId: string;
  caption: string;
}

export type ChartElement = {
    type: 'chart';
    data: { name: string; value: number }[];
    config: any;
    caption: string;
}

export type TableElement = {
    type: 'table';
    headers: string[];
    rows: string[][];
    caption: string;
}

export type GlossaryTermElement = {
  type: 'glossary';
  term: string;
  definition: string;
}

export interface Question {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctAnswerId: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  context: string;
}
