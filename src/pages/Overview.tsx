import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { MOCK_MARKET_DATA, MOCK_SYSTEM_HEALTH, MOCK_TIMELINE, MOCK_TELEGRAM_STATS } from '@/src/data/mock';
import { formatCurrency, formatPercent, formatJalali, formatNumber } from '@/src/lib/utils';
import { Activity, AlertCircle, CheckCircle2, Clock, MessageSquare, TrendingUp, Sparkles, Database } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export function Overview() {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">نمای کلی سیستم</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            وضعیت فعلی بات، مانیتورینگ بازار و سلامت سرویس‌ها
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {formatJalali(Date.now(), 'datetime')}
          </span>
          <Button variant="outline" size="sm">دریافت گزارش</Button>
        </div>
      </div>

      {/* AI Summary */}
      <Card className="border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-900">
        <CardContent className="p-4 flex items-start gap-4">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg text-emerald-600 dark:text-emerald-400 mt-1">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-300 mb-1">تحلیل هوشمند سیستم</h3>
            <div className="text-sm text-emerald-800/80 dark:text-emerald-200/80 space-y-1">
              <p>🟢 سیستم در وضعیت پایدار قرار دارد. تمامی سرویس‌های اصلی آنلاین هستند.</p>
              <p>📊 ۲٬۸۴۱ رکورد در ۲۴ ساعت گذشته با موفقیت جمع‌آوری شده است.</p>
              <p>⚠️ یک افزایش جزئی در خطای ارسال Telegram (۵ خطا) در ساعت گذشته مشاهده شده است. نیاز به بررسی اتصال پراکسی.</p>
            </div>
            <div className="mt-3 flex gap-2">
              <Button variant="outline" size="sm" className="h-7 text-xs border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900" onClick={() => navigate('/ai-assistant')}>
                گفتگو با دستیار
              </Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-emerald-700 dark:text-emerald-400">
                بررسی خطاهای تلگرام
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">سلامت سرویس‌ها</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {MOCK_SYSTEM_HEALTH.map(service => (
            <Card key={service.id} className="bg-white dark:bg-slate-900/50">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className="mb-2">
                  {service.status === 'healthy' ? (
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-500 rounded-full blur-sm opacity-50 dark:opacity-40 animate-pulse"></div>
                      <CheckCircle2 className="w-8 h-8 text-emerald-500 relative z-10" />
                    </div>
                  ) : (
                    <AlertCircle className="w-8 h-8 text-amber-500" />
                  )}
                </div>
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">{service.name}</h4>
                <div className="mt-2 flex flex-col items-center gap-1">
                  <Badge variant={service.status === 'healthy' ? 'success' : 'warning'}>{service.label}</Badge>
                  <span className="text-[10px] text-slate-400">آخرین: {formatJalali(service.lastActive, 'time')}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">رکوردهای امروز</p>
                <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{formatNumber(2841)}</h3>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
                <Database className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-emerald-500 flex items-center gap-1 font-medium">
                <TrendingUp className="w-3 h-3" /> +۱۲٪
              </span>
              <span className="text-slate-400 mr-2">نسبت به دیروز</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">سیگنال‌های تولید شده</p>
                <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{formatNumber(45)}</h3>
              </div>
              <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600 dark:text-purple-400">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-emerald-500 flex items-center gap-1 font-medium">
                <TrendingUp className="w-3 h-3" /> +۳
              </span>
              <span className="text-slate-400 mr-2">در ساعت گذشته</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">پیام‌های تلگرام (موفق)</p>
                <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{formatNumber(MOCK_TELEGRAM_STATS.successful)}</h3>
              </div>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600 dark:text-emerald-400">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-emerald-500 flex items-center gap-1 font-medium">
                {formatNumber(MOCK_TELEGRAM_STATS.successRate, 1)}٪
              </span>
              <span className="text-slate-400 mr-2">نرخ موفقیت ارسال</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">خطاهای سیستم</p>
                <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{formatNumber(12)}</h3>
              </div>
              <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                <AlertCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-red-500 flex items-center gap-1 font-medium">
                <TrendingUp className="w-3 h-3" /> +۲
              </span>
              <span className="text-slate-400 mr-2">نسبت به دیروز</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Snapshot & Timeline */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">وضعیت بازار</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(MOCK_MARKET_DATA).map(([key, data]) => {
              const names: Record<string, string> = { gold: 'طلا', silver: 'نقره', coin: 'سکه', dollar: 'دلار' };
              const isPositive = data.change > 0;
              return (
                <Card key={key} className="cursor-pointer hover:border-emerald-500/50 transition-colors" onClick={() => navigate(`/${key}`)}>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-lg">{names[key]}</h3>
                      <Badge variant={data.status === 'به‌روز' ? 'success' : 'warning'}>{data.status}</Badge>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(data.price)}</span>
                      <span className={cn("text-sm font-medium", isPositive ? "text-emerald-500" : "text-red-500")}>
                        {formatPercent(data.change)}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center text-xs text-slate-400 gap-1">
                      <Clock className="w-3 h-3" />
                      آخرین بروزرسانی: {formatJalali(data.updatedAt, 'time')}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">فعالیت‌های اخیر</h2>
          <Card className="h-[320px] overflow-hidden flex flex-col">
            <CardContent className="p-0 flex-1 overflow-y-auto">
              <div className="p-5 space-y-6">
                {MOCK_TIMELINE.map((item, i) => (
                  <div key={item.id} className="flex gap-4 relative">
                    {i !== MOCK_TIMELINE.length - 1 && (
                      <div className="absolute top-6 right-3 w-px h-full bg-slate-200 dark:bg-slate-800 -z-10" />
                    )}
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 flex-shrink-0 z-10",
                      item.type === 'success' ? 'bg-emerald-500' :
                      item.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                    )}>
                      {item.type === 'success' ? <CheckCircle2 className="w-3 h-3 text-white" /> :
                       item.type === 'error' ? <AlertCircle className="w-3 h-3 text-white" /> :
                       <Activity className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1 pb-1">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{item.message}</p>
                      <span className="text-xs text-slate-400 mt-1 block">{formatJalali(item.time, 'time')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
