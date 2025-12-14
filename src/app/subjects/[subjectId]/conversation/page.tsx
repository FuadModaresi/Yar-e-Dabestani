import { subjects } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export async function generateStaticParams() {
  return subjects.map((subject) => ({
    subjectId: subject.id,
  }));
}

export default function ConversationPage({ params }: { params: { subjectId: string } }) {
  const subject = subjects.find((s) => s.id === params.subjectId);

  if (!subject) {
    notFound();
  }

  return (
    <Card className="h-[75vh] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Bot />
            معلم خصوصی هوش مصنوعی - {subject.name}
        </CardTitle>
        <CardDescription>ویژگی معلم خصوصی هوش مصنوعی در حال حاضر در دست ساخت است. لطفاً بعداً دوباره بررسی کنید.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center">
        <div className="text-center text-muted-foreground">
            <p>این ویژگی به زودی در دسترس خواهد بود.</p>
        </div>
      </CardContent>
    </Card>
  );
}
