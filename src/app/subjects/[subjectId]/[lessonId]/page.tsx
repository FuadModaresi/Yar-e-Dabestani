import { subjects } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import Quiz from '@/components/quiz';
import LessonContent from '@/components/lesson-content';


export async function generateStaticParams() {
  const params: { subjectId: string, lessonId: string }[] = [];
  subjects.forEach(subject => {
    subject.lessons.forEach(lesson => {
      params.push({ subjectId: subject.id, lessonId: lesson.id });
    });
  });
  return params;
}

export default function LessonPage({ params }: { params: { subjectId: string; lessonId: string }}) {
    const subject = subjects.find((s) => s.id === params.subjectId);
    const lesson = subject?.lessons.find((l) => l.id === params.lessonId);

    if (!subject || !lesson) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto">
            <article className="space-y-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-extrabold tracking-tight font-headline lg:text-5xl">{lesson.title}</h1>
                    <div className="flex justify-between items-center">
                        <p className="text-muted-foreground">{subject.name}</p>
                        <Button variant="outline" size="sm">
                            <Download className="ml-2 h-4 w-4" />
                            دانلود درس
                        </Button>
                    </div>
                </div>
                
                <div className="prose prose-lg dark:prose-invert max-w-none space-y-4">
                    <LessonContent lesson={lesson} />
                </div>
            </article>

            {lesson.quiz && lesson.quiz.length > 0 && (
                <section className="mt-12">
                    <Quiz lesson={lesson} subject={subject} />
                </section>
            )}
        </div>
    );
}
