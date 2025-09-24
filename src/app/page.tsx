import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { subjects } from '@/lib/data';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { BarChart3, BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">سلام، دانش آموز!</h1>
        <p className="text-muted-foreground">
          به یار دبستانی من خوش آمدید. آماده برای یادگیری امروز هستید؟
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">پیشرفت کلی</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
            <p className="text-xs text-muted-foreground">
              شروع به یادگیری کنید!
            </p>
            <Progress value={0} className="mt-4 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">درس های تکمیل شده</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0 از 0</div>
            <p className="text-xs text-muted-foreground">
              هنوز درسی تکمیل نشده است.
            </p>
             <Progress value={0} className="mt-4 h-2" />
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight">موضوعات</h2>
        <div className="mt-4">
          {subjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {subjects.map((subject) => (
                    <Link href={`/subjects/${subject.id}`} key={subject.id}>
                    <Card className="group h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <CardHeader className="flex flex-row items-center gap-4">
                        <div className="rounded-lg bg-primary/10 p-3 text-primary">
                            <subject.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle>{subject.name}</CardTitle>
                            <CardDescription>
                            {subject.lessons.length} درس
                            </CardDescription>
                        </div>
                        </CardHeader>
                        <CardContent>
                        <p className="text-sm text-muted-foreground">
                            {subject.description}
                        </p>
                        </CardContent>
                    </Card>
                    </Link>
                ))}
            </div>
            ) : (
            <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed">
                <p className="text-muted-foreground">
                در حال حاضر موضوعی برای نمایش وجود ندارد.
                </p>
            </div>
            )}
        </div>
      </div>
    </div>
  );
}
