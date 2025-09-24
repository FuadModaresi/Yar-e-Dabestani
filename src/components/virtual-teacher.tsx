'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Loader2, Send, User } from 'lucide-react';
import { chatWithVirtualTeacher } from '@/ai/flows/virtual-teacher';

type Message = {
  role: 'user' | 'bot';
  content: string;
};

export default function VirtualTeacher({ subject }: { subject: { id: string; name: string } }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chatWithVirtualTeacher({
        subject: subject.name,
        message: input,
      });
      const botMessage: Message = { role: 'bot', content: result.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error chatting with virtual teacher:', error);
      const errorMessage: Message = {
        role: 'bot',
        content: 'متاسفانه مشکلی پیش آمد. لطفاً دوباره تلاش کنید.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-[75vh] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Bot />
            معلم خصوصی هوش مصنوعی - {subject.name}
        </CardTitle>
        <CardDescription>هر سوالی در مورد {subject.name} دارید بپرسید.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto space-y-4 pr-2">
        {messages.length === 0 && (
            <div className="flex h-full items-center justify-center text-muted-foreground">
                گفتگو را با پرسیدن یک سوال شروع کنید.
            </div>
        )}
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
             {message.role === 'bot' && (
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Bot className="h-6 w-6" />
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-lg p-3 text-sm ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
            {message.role === 'user' && (
                <div className="p-2 bg-accent/20 rounded-full text-accent-foreground">
                    <User className="h-6 w-6" />
                </div>
            )}
          </div>
        ))}
         {isLoading && (
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <Bot className="h-6 w-6" />
            </div>
            <div className="bg-muted rounded-lg p-3 text-sm">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <div className="p-4 border-t">
        <div className="relative">
          <Textarea
            placeholder="پیام خود را اینجا تایپ کنید..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="pr-20"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
