import type { Subject } from './types';
import { Atom, Calculator, FlaskConical, Dna as BiologyIcon } from 'lucide-react';

export const subjects: Subject[] = [
  {
    id: 'physics',
    name: 'فیزیک',
    description: 'کاوش در قوانین حرکت، انرژی و جهان.',
    icon: Atom,
    lessons: [
      {
        id: 'newtons-laws',
        title: 'قوانین حرکت نیوتن',
        content: [
            { type: 'p', content: 'قوانین حرکت نیوتن سه قانون فیزیکی هستند که اساس مکانیک کلاسیک را تشکیل می‌دهند. این قوانین رابطه بین نیروی وارد بر یک جسم و حرکت آن را توصیف می‌کنند.' },
            { type: 'h2', content: 'قانون اول نیوتن' },
            { type: 'p', content: 'هر جسمی که در حالت سکون یا حرکت یکنواخت در یک خط مستقیم باشد، به همان حالت باقی می‌ماند مگر آنکه تحت تأثیر یک نیروی خارجی خالص قرار گیرد.' },
            { type: 'image', imageId: 'physics-apple', caption: 'تصویر شماتیک سقوط سیب که الهام‌بخش نیوتن بود.' },
            { type: 'h2', content: 'قانون دوم نیوتن' },
            { type: 'p', content: 'شتاب یک جسم متناسب با نیروی خالص وارد بر آن و در جهت آن نیرو است و با جرم جسم نسبت عکس دارد. فرمول آن F=ma است.' },
            { type: 'glossary', term: 'شتاب', definition: 'نرخ تغییر سرعت یک جسم نسبت به زمان.' },
            { type: 'h2', content: 'قانون سوم نیوتن' },
            { type: 'p', content: 'برای هر عملی، عکس‌العملی مساوی و در جهت مخالف وجود دارد.' },
            { type: 'chart', data: [
                { name: 'جسم ۱', value: 10 },
                { name: 'جسم ۲', value: 20 },
                { name: 'جسم ۳', value: 5 },
                { name: 'جسم ۴', value: 15 },
            ], config: { value: { label: "نیرو (N)" } }, caption: 'نمودار مقایسه نیروهای وارد بر اجسام مختلف.' },
        ],
        quiz: [
          {
            id: 'q1',
            text: 'کدام قانون بیان می‌کند که "برای هر عملی، عکس‌العملی مساوی و در جهت مخالف وجود دارد"؟',
            options: [
              { id: 'a', text: 'قانون اول نیوتن' },
              { id: 'b', text: 'قانون دوم نیوتن' },
              { id: 'c', text: 'قانون سوم نیوتن' },
              { id: 'd', text: 'قانون جاذبه عمومی' },
            ],
            correctAnswerId: 'c',
          },
          {
            id: 'q2',
            text: 'فرمول قانون دوم نیوتن کدام است؟',
            options: [
              { id: 'a', text: 'E=mc^2' },
              { id: 'b', text: 'F=ma' },
              { id: 'c', text: 'P=V/I' },
              { id: 'd', text: 'a^2+b^2=c^2' },
            ],
            correctAnswerId: 'b',
          },
        ],
      },
    ],
  },
  {
    id: 'math',
    name: 'ریاضی',
    description: 'یادگیری اصول حساب، جبر و هندسه.',
    icon: Calculator,
    lessons: [
        {
            id: 'pythagorean-theorem',
            title: 'قضیه فیثاغورس',
            content: [
                { type: 'p', content: 'قضیه فیثاغورس یک رابطه اساسی در هندسه اقلیدسی بین سه ضلع یک مثلث قائم‌الزاویه است.' },
                { type: 'h2', content: 'فرمول قضیه' },
                { type: 'p', content: 'در یک مثلث قائم‌الزاویه، مربع وتر (ضلع مقابل به زاویه قائمه) برابر است با مجموع مربعات دو ضلع دیگر. این به صورت جبری به شکل a² + b² = c² نوشته می‌شود.' },
                { type: 'image', imageId: 'math-triangle', caption: 'نمایش گرافیکی قضیه فیثاغورس.' },
                { type: 'glossary', term: 'وتر', definition: 'بلندترین ضلع یک مثلث قائم‌الزاویه که همیشه روبروی زاویه قائمه قرار دارد.' },
                { type: 'table', 
                  headers: ['ضلع a', 'ضلع b', 'وتر c'],
                  rows: [
                    ['3', '4', '5'],
                    ['5', '12', '13'],
                    ['8', '15', '17']
                  ],
                  caption: 'چند مثال از سه‌گانه‌های فیثاغورسی.'
                },
            ],
            quiz: [
                {
                    id: 'q1',
                    text: 'در یک مثلث قائم‌الزاویه با اضلاع 3 و 4، طول وتر چقدر است؟',
                    options: [
                      { id: 'a', text: '5' },
                      { id: 'b', text: '6' },
                      { id: 'c', text: '7' },
                      { id: 'd', text: '25' },
                    ],
                    correctAnswerId: 'a',
                },
            ],
        }
    ],
  },
  {
    id: 'chemistry',
    name: 'شیمی',
    description: 'مطالعه مواد، خواص و واکنش‌های آنها.',
    icon: FlaskConical,
    lessons: [],
  },
  {
    id: 'biology',
    name: 'زیست شناسی',
    description: 'آشنایی با موجودات زنده و فرآیندهای حیاتی.',
    icon: BiologyIcon,
    lessons: [],
  },
];
