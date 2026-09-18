import React, { useState } from 'react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';
import { Sparkles, Send, Bot, User, BarChart2, AlertCircle } from 'lucide-react';
import { formatNumber } from '@/src/lib/utils';
import { MOCK_TELEGRAM_STATS } from '@/src/data/mock';

type Message = {
  role: 'user' | 'assistant';
  content: React.ReactNode;
};

export default function AIAssistant() {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: (
        <div className="space-y-2">
          <p>سلام! من دستیار هوشمند عملیات (Ops Assistant) شما هستم.</p>
          <p>من به تمام داده‌های سیستم مانیتورینگ دسترسی دارم و می‌توانم در تحلیل بازار، بررسی خطاهای سرور و ارائه گزارش‌های عملکرد به شما کمک کنم.</p>
        </div>
      )
    }
  ]);

  const PROMPT_CHIPS = [
    "وضعیت کلی سیستم چطوره؟",
    "امروز چند رکورد جمع کردیم؟",
    "عملکرد Telegram را بررسی کن",
    "سیگنال‌های امروز رو تحلیل کن"
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setQuery('');
    setIsTyping(true);

    // Mock AI response logic
    setTimeout(() => {
      setIsTyping(false);
      
      let response: React.ReactNode = "در حال حاضر نمی‌توانم به این درخواست پاسخ دهم.";
      
      if (text.includes("سیستم") || text.includes("وضعیت")) {
        response = (
          <div className="space-y-4">
            <p>سیستم در وضعیت کاملاً پایدار قرار دارد. بررسی‌های من نشان می‌دهد:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
              <li>کرون‌جاب‌ها بدون تاخیر در حال اجرا هستند.</li>
              <li>اتصال دیتابیس پایدار است (latency: ~12ms).</li>
              <li>موتور تولید سیگنال فعال است و آخرین سیگنال ۱۲ دقیقه پیش تولید شد.</li>
            </ul>
          </div>
        );
      } else if (text.includes("Telegram") || text.includes("تلگرام")) {
        response = (
          <div className="space-y-4">
            <p>گزارش عملکرد تلگرام در ۲۴ ساعت گذشته:</p>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-lg">
                <span className="text-xs text-slate-500 block mb-1">پیام‌های موفق</span>
                <span className="text-xl font-bold text-emerald-500">{formatNumber(MOCK_TELEGRAM_STATS.successful)}</span>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-lg">
                <span className="text-xs text-slate-500 block mb-1">پیام‌های ناموفق</span>
                <span className="text-xl font-bold text-red-500">{formatNumber(MOCK_TELEGRAM_STATS.failed)}</span>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-lg mt-3 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>۵ خطای ارسال ثبت شده است که همگی مربوط به خطای <code>CONNECTION_TIMEOUT</code> در ارتباط با پروکسی بوده‌اند. سیستم به صورت خودکار پیام‌ها را با موفقیت در تلاش مجدد ارسال کرده است.</p>
            </div>
          </div>
        );
      } else if (text.includes("رکورد")) {
         response = <p>امروز تا این لحظه <strong>{formatNumber(2841)}</strong> رکورد جدید بازار ثبت شده است. روند جمع‌آوری داده‌ها مطابق برنامه پیش می‌رود.</p>;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-emerald-500 rounded-xl text-white shadow-lg shadow-emerald-500/20">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">دستیار هوشمند عملیات</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">تحلیل داده‌ها و مانیتورینگ سیستم با کمک AI</p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200/60 dark:border-slate-800/60 shadow-sm">
        <CardContent className="flex-1 p-0 flex flex-col">
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'mr-auto flex-row-reverse' : 'ml-auto'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === 'user' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' : 'bg-slate-800 text-white dark:bg-slate-700'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-emerald-500 text-white rounded-tr-sm' : 'bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm shadow-sm'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-4 max-w-[85%] ml-auto">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white dark:bg-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-tl-sm shadow-sm flex gap-1 items-center">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex flex-wrap gap-2 mb-3">
              {PROMPT_CHIPS.map(chip => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-full transition-colors border border-slate-200 dark:border-slate-700"
                >
                  {chip}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend(query)}
                placeholder="سوال یا درخواست خود را بنویسید..."
                className="h-12 bg-slate-50 dark:bg-slate-950/50"
              />
              <Button onClick={() => handleSend(query)} disabled={!query.trim() || isTyping} className="h-12 w-12 flex-shrink-0 rounded-xl" size="icon">
                <Send className="w-5 h-5 rtl:-scale-x-100" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
