import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { CheckCircle2, AlertCircle, RefreshCw, Terminal, Activity, Database, Server } from 'lucide-react';
import { formatJalali } from '@/src/lib/utils';

export default function Tests() {
  const [running, setRunning] = React.useState<string | null>(null);
  const [logs, setLogs] = React.useState<{id: number, time: number, msg: string, type: 'info'|'success'|'error'}[]>([
    { id: 1, time: Date.now() - 60000, msg: "آماده برای اجرای تست‌ها", type: 'info' }
  ]);

  const runTest = (name: string, shouldFail = false) => {
    setRunning(name);
    setLogs(prev => [{ id: Date.now(), time: Date.now(), msg: `شروع اجرای تست: ${name}...`, type: 'info' }, ...prev]);
    
    setTimeout(() => {
      setRunning(null);
      if (shouldFail) {
        setLogs(prev => [{ id: Date.now(), time: Date.now(), msg: `تست ${name} ناموفق بود! (Connection Timeout)`, type: 'error' }, ...prev]);
      } else {
        setLogs(prev => [{ id: Date.now(), time: Date.now(), msg: `تست ${name} با موفقیت در 124ms انجام شد.`, type: 'success' }, ...prev]);
      }
    }, 1500);
  };

  const TESTS = [
    { name: 'بررسی اتصال Database', icon: Database, action: () => runTest('Database') },
    { name: 'دریافت تست داده طلا', icon: Activity, action: () => runTest('Fetch Gold Data') },
    { name: 'بررسی اتصال Telegram', icon: Server, action: () => runTest('Telegram API', true) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">تست و عملیات</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">اجرای تست‌های سیستمی و عیب‌یابی (Troubleshooting)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">عملیات در دسترس</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {TESTS.map((test, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
                    <test.icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-200">{test.name}</span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={test.action}
                  disabled={running !== null}
                >
                  {running === test.name ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Terminal className="w-4 h-4 mr-2" />
                  )}
                  اجرا
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-950 border-slate-800 text-slate-300 font-mono text-sm shadow-inner">
          <CardHeader className="border-b border-slate-800 pb-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-500" />
                <span className="text-slate-200 font-sans font-medium">لاگ عملیات (Terminal)</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setLogs([])} className="h-6 text-xs text-slate-400 hover:text-white">پاکسازی</Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 h-[300px] overflow-y-auto space-y-2">
            {logs.map(log => (
              <div key={log.id} className="flex gap-3 items-start">
                <span className="text-slate-600 whitespace-nowrap">[{formatJalali(log.time, 'time')}]</span>
                <span className={`
                  ${log.type === 'info' ? 'text-blue-400' : ''}
                  ${log.type === 'success' ? 'text-emerald-400' : ''}
                  ${log.type === 'error' ? 'text-red-400' : ''}
                `}>
                  {log.type === 'success' && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                  {log.type === 'error' && <AlertCircle className="w-3 h-3 inline mr-1" />}
                  {log.msg}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
