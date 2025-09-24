'use client';

import { useGlossary } from '@/hooks/use-glossary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookCopy, Trash2 } from 'lucide-react';

export default function GlossaryPage() {
  const { glossary, removeTerm } = useGlossary();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-primary/10 p-4 text-primary">
            <BookCopy className="h-8 w-8" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">واژه‌نامه شما</h1>
            <p className="text-muted-foreground">
                اصطلاحات و تعاریفی که ذخیره کرده‌اید.
            </p>
        </div>
      </div>

      {glossary.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {glossary.map((item, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle>{item.term}</CardTitle>
                <CardDescription>ذخیره شده از: {item.context}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm">{item.definition}</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => removeTerm(item.term)}
                >
                  <Trash2 className="ml-2 h-4 w-4" />
                  حذف
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed">
            <BookCopy className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold">واژه‌نامه شما خالی است</h3>
            <p className="text-muted-foreground mt-2">
                اصطلاحات را از درس‌ها اضافه کنید تا در اینجا ظاهر شوند.
            </p>
        </div>
      )}
    </div>
  );
}
