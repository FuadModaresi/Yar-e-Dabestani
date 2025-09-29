'use client';

import type { Lesson } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { BarChart, Bar } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import GlossaryTerm from '@/components/glossary-term';

interface LessonContentProps {
    lesson: Lesson;
}

export default function LessonContent({ lesson }: LessonContentProps) {
    return lesson.content.map((element, index) => {
        switch (element.type) {
            case 'p':
                return <p key={index} className="leading-relaxed">{element.content}</p>;
            case 'h2':
                return <h2 key={index} className="font-headline text-2xl font-bold mt-8 mb-4">{element.content}</h2>;
            case 'h3':
                return <h3 key={index} className="font-headline text-xl font-bold mt-6 mb-3">{element.content}</h3>;
            case 'image':
                const imageData = PlaceHolderImages.find(img => img.id === element.imageId);
                if (!imageData) return null;
                return (
                    <figure key={index} className="my-6">
                        <Image
                            src={imageData.imageUrl}
                            alt={element.caption}
                            width={600}
                            height={400}
                            className="w-full h-auto rounded-lg shadow-md"
                            data-ai-hint={imageData.imageHint}
                        />
                        <figcaption className="text-center text-sm text-muted-foreground mt-2">{element.caption}</figcaption>
                    </figure>
                );
            case 'chart':
                const chartConfig: ChartConfig = element.config;
                return (
                    <Card key={index} className="my-6">
                        <CardHeader>
                            <CardTitle>نمودار</CardTitle>
                            <CardDescription>{element.caption}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig} className="h-[200px] w-full">
                                <BarChart accessibilityLayer data={element.data}>
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="value" fill="var(--color-primary)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                );
            case 'table':
                return (
                    <Table key={index} className="my-6">
                        <TableCaption>{element.caption}</TableCaption>
                        <TableHeader>
                            <TableRow>
                                {element.headers.map((header, hIndex) => <TableHead key={hIndex}>{header}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {element.rows.map((row, rIndex) => (
                                <TableRow key={rIndex}>
                                    {row.map((cell, cIndex) => <TableCell key={cIndex}>{cell}</TableCell>)}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                );
             case 'glossary':
                return (
                    <GlossaryTerm
                        key={index}
                        term={element.term}
                        definition={element.definition}
                        context={lesson.title}
                    />
                );
            default:
                return null;
        }
    });
};
