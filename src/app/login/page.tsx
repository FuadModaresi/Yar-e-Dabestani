'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // In a real app, you'd call Firebase here.
    // For this mock, we'll just simulate a successful login.
    if (email && password) {
       localStorage.setItem('mock-session', 'true');
       router.push('/');
       router.refresh(); // This will trigger the UserProvider to re-check auth state
    } else {
       toast({
        title: 'خطای ورود',
        description: 'لطفا ایمیل و رمز عبور را وارد کنید.',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">ورود</TabsTrigger>
          <TabsTrigger value="signup">ثبت نام</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form onSubmit={handleAuth}>
            <Card>
              <CardHeader>
                <CardTitle>ورود</CardTitle>
                <CardDescription>برای دسترسی به حساب کاربری خود وارد شوید. (از اطلاعات پیش‌فرض استفاده کنید)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">ایمیل</Label>
                  <Input id="login-email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">رمز عبور</Label>
                  <Input id="login-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'در حال ورود...' : 'ورود'}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
        <TabsContent value="signup">
          <form onSubmit={handleAuth}>
            <Card>
              <CardHeader>
                <CardTitle>ثبت نام</CardTitle>
                <CardDescription>یک حساب کاربری جدید برای شروع یادگیری ایجاد کنید.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">ایمیل</Label>
                  <Input id="signup-email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">رمز عبور</Label>
                  <Input id="signup-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'در حال ایجاد حساب...' : 'ثبت نام'}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
