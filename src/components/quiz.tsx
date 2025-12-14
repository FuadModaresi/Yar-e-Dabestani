'use client';

import { useState } from 'react';
import type { Lesson, Question, Subject } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

interface QuizProps {
  lesson: Lesson;
  subject: Subject;
}

type AnswersState = { [key: string]: string };
type ResultsState = { [key: string]: boolean };

export default function Quiz({ lesson, subject }: QuizProps) {
  const [answers, setAnswers] = useState<AnswersState>({});
  const [results, setResults] = useState<ResultsState | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleValueChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(answers).length !== lesson.quiz.length) {
      alert('لطفاً به تمام سوالات پاسخ دهید.');
      return;
    }

    const newResults: ResultsState = {};
    lesson.quiz.forEach((q) => {
      newResults[q.id] = answers[q.id] === q.correctAnswerId;
    });

    setResults(newResults);
    setShowResults(true);
  };
  
  const resetQuiz = () => {
    setAnswers({});
    setResults(null);
    setShowResults(false);
  };

  const getOptionBorderColor = (question: Question, optionId: string) => {
      if (!showResults) return 'border-border';
      if (optionId === question.correctAnswerId) return 'border-green-500';
      if (optionId === answers[question.id] && answers[question.id] !== question.correctAnswerId) return 'border-red-500';
      return 'border-border';
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>آزمون سریع</CardTitle>
          <CardDescription>دانش خود را از این درس بسنجید.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-8">
            {lesson.quiz.map((question, index) => (
              <div key={question.id}>
                <p className="font-semibold mb-4">{`${index + 1}. ${question.text}`}</p>
                <RadioGroup
                  onValueChange={(value) => handleValueChange(question.id, value)}
                  value={answers[question.id]}
                  disabled={showResults}
                >
                  {question.options.map((option) => (
                    <Label
                      key={option.id}
                      htmlFor={`${question.id}-${option.id}`}
                      className={`flex items-center space-x-2 space-x-reverse rounded-md border p-4 transition-all ${getOptionBorderColor(question, option.id)}`}
                    >
                      <RadioGroupItem value={option.id} id={`${question.id}-${option.id}`} />
                      <span>{option.text}</span>
                      {showResults && option.id === question.correctAnswerId && <CheckCircle className="h-5 w-5 text-green-500 mr-auto" />}
                      {showResults && option.id === answers[question.id] && answers[question.id] !== question.correctAnswerId && <XCircle className="h-5 w-5 text-red-500 mr-auto" />}
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            {!showResults ? (
              <Button type="submit">
                ارسال پاسخ‌ها
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="button" onClick={resetQuiz} variant="outline">
                امتحان مجدد
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>

      {showResults && (
        <div className="mt-4 p-4 border rounded-md">
            <h3 className="font-bold">نتایج آزمون</h3>
            <p>ویژگی یادگیری تطبیقی به زودی اضافه خواهد شد.</p>
        </div>
      )}
    </>
  );
}
