import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/components/ui/Table';
import { MOCK_CRON_JOBS } from '@/src/data/mock';
import { formatJalali, formatNumber } from '@/src/lib/utils';
import { Play, Settings2, StopCircle } from 'lucide-react';

export default function Cron() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">سرویس‌ها و Cron</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">مانیتورینگ جاب‌های پس‌زمینه و زمان‌بندی شده</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm"><Settings2 className="w-4 h-4 ml-2" />تنظیمات Cron</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>نام سرویس</TableHead>
                <TableHead>زمان‌بندی</TableHead>
                <TableHead>آخرین اجرا</TableHead>
                <TableHead>مدت زمان</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead>عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_CRON_JOBS.map((job, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-slate-900 dark:text-white">{job.name}</TableCell>
                  <TableCell className="text-slate-500 font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded inline-flex mt-3">{job.schedule}</TableCell>
                  <TableCell>{formatJalali(job.lastRun, 'time')}</TableCell>
                  <TableCell>{formatNumber(job.duration)} ms</TableCell>
                  <TableCell>
                    <Badge variant={job.status === 'success' ? 'success' : 'error'}>
                      {job.status === 'success' ? 'موفق' : 'خطا'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8 text-emerald-600">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-600">
                        <StopCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
