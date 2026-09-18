import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/components/ui/Table';
import { MOCK_MARKET_DATA, MOCK_GOLD_HISTORY, MOCK_COLLECTION_DATA } from '@/src/data/mock';
import { formatCurrency, formatPercent, formatJalali, formatNumber, getChartTimeLabel, getChartDateLabel } from '@/src/lib/utils';
import { Clock, Download, RefreshCcw } from 'lucide-react';
import { 
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, 
  Tooltip, XAxis, YAxis, ReferenceLine, Cell
} from 'recharts';

export default function AssetPage({ assetName, assetKey }: { assetName: string, assetKey: string }) {
  const [timeRange, setTimeRange] = useState('1W');
  const data = MOCK_MARKET_DATA[assetKey as keyof typeof MOCK_MARKET_DATA] || MOCK_MARKET_DATA.gold;
  const isPositive = data.change > 0;
  
  // Custom tooltip for price chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-lg shadow-lg rtl text-right">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            {formatJalali(label, 'datetime')}
          </p>
          <div className="space-y-1">
            <div className="flex justify-between gap-4">
              <span className="text-slate-600 dark:text-slate-300">قیمت:</span>
              <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(payload[0].value)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const RANGES = ['۱ ساعت', '۱ روز', '۱ هفته', '۱ ماه', '۳ ماه', '۶ ماه', '۱ سال', 'همه'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{assetName}</h1>
            <Badge variant={data.status === 'به‌روز' ? 'success' : 'warning'}>{data.status}</Badge>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">{formatCurrency(data.price)}</span>
            <span className={`text-lg font-medium ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
              {formatPercent(data.change)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>آخرین بروزرسانی: {formatJalali(data.updatedAt, 'time')}</span>
          </div>
          <Button variant="outline" size="sm" className="h-9">
            <RefreshCcw className="w-4 h-4 ml-2" />
            بروزرسانی دستی
          </Button>
        </div>
      </div>

      {/* Main Price Chart */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>روند قیمت {assetName}</CardTitle>
            <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg">
              {RANGES.map((r, i) => (
                <button 
                  key={r}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${i === 2 ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[400px] w-full p-4" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_GOLD_HISTORY} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={getChartTimeLabel} 
                  stroke="#64748b"
                  fontSize={12}
                  tickMargin={10}
                  minTickGap={30}
                />
                <YAxis 
                  domain={['auto', 'auto']} 
                  tickFormatter={(val) => formatNumber(val)}
                  stroke="#64748b"
                  fontSize={12}
                  tickMargin={10}
                  orientation="right"
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                  activeDot={{ r: 6, fill: "#10b981", stroke: "#fff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Data Collection Health */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">روند جمع‌آوری داده</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_COLLECTION_DATA} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickMargin={8} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <ReferenceLine y={60} stroke="#f59e0b" strokeDasharray="3 3" opacity={0.5} />
                <Bar dataKey="actual" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40}>
                  {
                    MOCK_COLLECTION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.actual < entry.expected - 5 ? '#ef4444' : '#3b82f6'} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">تاریخچه قیمت‌ها</CardTitle>
          <Button variant="outline" size="sm"><Download className="w-4 h-4 ml-2" /> خروجی Excel</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>تاریخ</TableHead>
                <TableHead>زمان</TableHead>
                <TableHead>قیمت</TableHead>
                <TableHead>منبع</TableHead>
                <TableHead>وضعیت</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_GOLD_HISTORY.slice(MOCK_GOLD_HISTORY.length - 10).reverse().map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{formatJalali(row.timestamp, 'short')}</TableCell>
                  <TableCell>{formatJalali(row.timestamp, 'time')}</TableCell>
                  <TableCell className="font-medium text-slate-900 dark:text-white">
                    {formatCurrency(row.price)}
                  </TableCell>
                  <TableCell className="text-slate-500">TG_Gold_Source</TableCell>
                  <TableCell>
                    <Badge variant="success">موفق</Badge>
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
