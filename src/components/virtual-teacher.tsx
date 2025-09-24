'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, Loader2, Send, User, Paperclip, X, Image as ImageIcon } from 'lucide-react';
import { chatWithVirtualTeacher } from '@/ai/flows/virtual-teacher';
import Image from 'next/image';

type Message = {
  role: 'user' | 'bot';
  content: string;
  image?: string;
};

export default function VirtualTeacher({ subject }: { subject: { id: string; name: string } }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() && !imageFile) return;

    const userMessage: Message = { role: 'user', content: input, image: imagePreview || undefined };
    setMessages((prev) => [...prev, userMessage]);
    
    const messageToSend = input;
    const imageToSend = imagePreview;

    setInput('');
    setImageFile(null);
    setImagePreview(null);
    if(fileInputRef.current) fileInputRef.current.value = '';
    
    setIsLoading(true);

    try {
      const result = await chatWithVirtualTeacher({
        subject: subject.name,
        message: messageToSend,
        imageDataUri: imageToSend || undefined,
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
        <CardDescription>هر سوالی در مورد {subject.name} دارید بپرسید. می‌توانید تصویر هم ارسال کنید.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto space-y-4 pr-2">
        {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className="h-16 w-16 mb-4" />
                <span>گفتگو را با پرسیدن یک سوال شروع کنید.</span>
            </div>
        )}
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
             {message.role === 'bot' && (
              <div className="p-2 bg-primary/10 rounded-full text-primary flex-shrink-0">
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
              {message.image && (
                <Image src={message.image} alt="Uploaded content" width={300} height={200} className="rounded-md mb-2" />
              )}
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
            {message.role === 'user' && (
                <div className="p-2 bg-accent/20 rounded-full text-accent-foreground flex-shrink-0">
                    <User className="h-6 w-6" />
                </div>
            )}
          </div>
        ))}
         {isLoading && (
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-full text-primary flex-shrink-0">
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
        {imagePreview && (
          <div className="relative mb-2 w-fit">
            <Image src={imagePreview} alt="Image preview" width={80} height={80} className="rounded-md" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-muted-foreground/50 text-white"
              onClick={() => {
                setImagePreview(null);
                setImageFile(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
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
            className="pr-28"
            disabled={isLoading}
          />
          <div className="absolute left-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
                disabled={isLoading}
            />
            <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
            >
                <Paperclip className="h-5 w-5" />
            </Button>
            <Button
              type="submit"
              size="icon"
              onClick={handleSendMessage}
              disabled={isLoading || (!input.trim() && !imageFile)}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
