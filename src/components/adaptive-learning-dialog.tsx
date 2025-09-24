'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  analyzeStudentResponses,
  AnalyzeStudentResponsesInput,
  AnalyzeStudentResponsesOutput,
} from '@/ai/flows/adaptive-learning-paths';
import { Loader2, Lightbulb } from 'lucide-react';
import { Badge } from './ui/badge';

interface AdaptiveLearningDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  input: AnalyzeStudentResponsesInput;
}

export function AdaptiveLearningDialog({ open, onOpenChange, input }: AdaptiveLearningDialogProps) {
  const [analysis, setAnalysis] = useState<AnalyzeStudentResponsesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      const getAnalysis = async () => {
        setIsLoading(true);
        setError(null);
        setAnalysis(null);
        try {
          const result = await analyzeStudentResponses(input);
          setAnalysis(result);
        } catch (err) {
          console.error(err);
          setError('خطا در تحلیل پاسخ‌ها. لطفاً دوباره تلاش کنید.');
        } finally {
          setIsLoading(false);
        }
      };
      getAnalysis();
    }
  }, [open, input]);

  const getDifficultyBadgeVariant = (difficulty: string | undefined) => {
    switch (difficulty) {
        case 'easy': return 'default';
        case 'medium': return 'secondary';
        case 'hard': return 'destructive';
        default: return 'outline';
    }
  }

  const translateDifficulty = (difficulty: string | undefined) => {
    switch (difficulty) {
        case 'easy': return 'آسان';
        case 'medium': return 'متوسط';
        case 'hard': return 'سخت';
        default: return 'نامشخص';
    }
  }


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            مسیر یادگیری شما
          </DialogTitle>
          <DialogDescription>
            بر اساس پاسخ‌های شما، این پیشنهادها برای درس بعدی شماست.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6 max-h-[60vh] overflow-y-auto px-2">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-48">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">در حال تحلیل پاسخ‌های شما...</p>
            </div>
          )}
          {error && <p className="text-destructive">{error}</p>}
          {analysis && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">توضیحات</h3>
                <p className="text-sm text-muted-foreground bg-accent/30 p-3 rounded-md">{analysis.explanation}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">سطح دشواری پیشنهادی برای درس بعد</h3>
                <Badge variant={getDifficultyBadgeVariant(analysis.suggestedDifficulty)}>
                    {translateDifficulty(analysis.suggestedDifficulty)}
                </Badge>
              </div>
              <div>
                <h3 className="font-semibold mb-2">محتوای پیشنهادی برای درس بعدی</h3>
                <div className="text-sm text-muted-foreground whitespace-pre-wrap border p-3 rounded-md bg-background">
                    {analysis.adaptedLessonContent}
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>بستن</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
