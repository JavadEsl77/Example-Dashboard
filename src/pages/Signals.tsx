import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { MOCK_SIGNALS } from '@/src/data/mock';
import { formatCurrency, formatJalali } from '@/src/lib/utils';
import { Target, TrendingUp, TrendingDown } from 'lucide-react';

export default function Signals() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">سیگنال‌ها</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">مانیتورینگ و تاریخچه سیگنال‌های تولید شده</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {MOCK_SIGNALS.map((sig) => (
          <Card key={sig.id} className={sig.status === 'ACTIVE' ? 'border-emerald-500/50 shadow-emerald-500/10' : ''}>
            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${sig.type === 'BUY' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 'bg-red-100 text-red-600 dark:bg-red-900/30'}`}>
                    {sig.type === 'BUY' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{sig.type === 'BUY' ? 'خرید' : 'فروش'} {sig.asset}</CardTitle>
                    <span className="text-xs text-slate-500">{formatJalali(sig.time, 'time')} - {formatJalali(sig.time, 'short')}</span>
                  </div>
                </div>
                <Badge variant={
                  sig.status === 'ACTIVE' ? 'default' : 
                  sig.status === 'TARGET_HIT' ? 'success' : 'error'
                }>
                  {sig.status === 'ACTIVE' ? 'فعال' : sig.status === 'TARGET_HIT' ? 'هدف تاچ شد' : 'لغو شده'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3 text-sm">
              <div className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-900">
                <span className="text-slate-500">امتیاز هوش مصنوعی:</span>
                <span className="font-bold text-emerald-600">{sig.score} / ۱۰۰</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">نقطه ورود:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatCurrency(sig.entry)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 flex items-center gap-1"><Target className="w-3 h-3"/> هدف:</span>
                <span className="font-semibold text-emerald-500">{formatCurrency(sig.target)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">حد ضرر:</span>
                <span className="font-semibold text-red-500">{formatCurrency(sig.exit)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
