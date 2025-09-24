'use client';

import { useGlossary } from '@/hooks/use-glossary';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { BookmarkPlus, Check } from 'lucide-react';

interface GlossaryTermProps {
  term: string;
  definition: string;
  context: string;
}

export default function GlossaryTerm({ term, definition, context }: GlossaryTermProps) {
  const { addTerm, isTermSaved } = useGlossary();
  const saved = isTermSaved(term);

  const handleAddTerm = () => {
    if (!saved) {
      addTerm({ term, definition, context });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className="text-primary font-semibold underline decoration-dotted underline-offset-4 cursor-pointer hover:text-primary/80 transition-colors">
          {term}
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{term}</h4>
            <p className="text-sm text-muted-foreground">{definition}</p>
          </div>
          <Button
            onClick={handleAddTerm}
            disabled={saved}
            size="sm"
            variant={saved ? 'secondary' : 'default'}
          >
            {saved ? (
                <>
                    <Check className="mr-2 h-4 w-4" />
                    ذخیره شد
                </>
            ) : (
                <>
                    <BookmarkPlus className="mr-2 h-4 w-4" />
                    افزودن به واژه‌نامه
                </>
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
