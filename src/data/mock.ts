export const MOCK_MARKET_DATA = {
  gold: {
    price: 10850000,
    change: 1.82,
    updatedAt: Date.now() - 1000 * 60 * 2,
    status: 'به‌روز',
  },
  silver: {
    price: 125000,
    change: -0.45,
    updatedAt: Date.now() - 1000 * 60 * 5,
    status: 'به‌روز',
  },
  coin: {
    price: 42500000,
    change: 2.1,
    updatedAt: Date.now() - 1000 * 60 * 1,
    status: 'به‌روز',
  },
  dollar: {
    price: 61200,
    change: 0.1,
    updatedAt: Date.now() - 1000 * 60 * 10,
    status: 'با تاخیر',
  }
};

export const MOCK_SYSTEM_HEALTH = [
  { id: 'db', name: 'پایگاه داده', status: 'healthy', label: 'سالم', lastActive: Date.now() },
  { id: 'collection', name: 'جمع‌آوری داده', status: 'healthy', label: 'فعال', lastActive: Date.now() - 20000 },
  { id: 'signals', name: 'موتور سیگنال', status: 'healthy', label: 'فعال', lastActive: Date.now() - 50000 },
  { id: 'cron', name: 'زمان‌بند (Cron)', status: 'warning', label: 'تاخیر جزئی', lastActive: Date.now() - 300000 },
  { id: 'telegram', name: 'تلگرام', status: 'healthy', label: 'متصل', lastActive: Date.now() - 10000 },
];

export const generatePriceHistory = (points = 50, startPrice = 10000000, volatility = 50000) => {
  const data = [];
  let currentPrice = startPrice;
  const now = Date.now();
  for (let i = points; i >= 0; i--) {
    const timestamp = now - i * 1000 * 60 * 30; // 30 min intervals
    currentPrice = currentPrice + (Math.random() - 0.45) * volatility;
    data.push({
      timestamp,
      price: Math.round(currentPrice),
    });
  }
  return data;
};

export const MOCK_GOLD_HISTORY = generatePriceHistory(100, 10500000, 80000);

export const MOCK_TIMELINE = [
  { id: 1, time: Date.now() - 1000 * 60 * 5, message: 'داده طلا با موفقیت دریافت شد', type: 'success' },
  { id: 2, time: Date.now() - 1000 * 60 * 12, message: 'سیگنال خرید تولید شد', type: 'info' },
  { id: 3, time: Date.now() - 1000 * 60 * 12, message: 'سیگنال برای کاربران ارسال شد', type: 'success' },
  { id: 4, time: Date.now() - 1000 * 60 * 25, message: 'Cron جمع‌آوری طلا اجرا شد', type: 'info' },
  { id: 5, time: Date.now() - 1000 * 60 * 45, message: 'اجرای Signal Job با موفقیت انجام شد', type: 'success' },
  { id: 6, time: Date.now() - 1000 * 60 * 80, message: 'خطای ارسال Telegram', type: 'error' },
];

export const MOCK_COLLECTION_DATA = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  expected: 60,
  actual: Math.floor(Math.random() * 10) > 8 ? Math.floor(Math.random() * 20) + 40 : 60,
}));

export const MOCK_SIGNALS = [
  { id: 'sig_1', asset: 'طلا', type: 'BUY', score: 87, entry: 10780000, target: 11050000, exit: 10650000, status: 'ACTIVE', time: Date.now() - 1000 * 60 * 12 },
  { id: 'sig_2', asset: 'سکه', type: 'SELL', score: 92, entry: 42100000, target: 41000000, exit: 42500000, status: 'TARGET_HIT', time: Date.now() - 1000 * 60 * 60 * 5 },
  { id: 'sig_3', asset: 'دلار', type: 'BUY', score: 65, entry: 60500, target: 61500, exit: 60000, status: 'FAILED', time: Date.now() - 1000 * 60 * 60 * 24 },
];

export const MOCK_CRON_JOBS = [
  { name: 'جمع‌آوری قیمت طلا', schedule: 'هر ۵ دقیقه', lastRun: Date.now() - 1000 * 60 * 2, duration: 423, status: 'success' },
  { name: 'محاسبه اندیکاتورها', schedule: 'هر ۱۵ دقیقه', lastRun: Date.now() - 1000 * 60 * 5, duration: 1250, status: 'success' },
  { name: 'ارسال هشدارهای تلگرام', schedule: 'هر ۱ دقیقه', lastRun: Date.now() - 1000 * 30, duration: 85, status: 'success' },
  { name: 'پشتیبان‌گیری پایگاه داده', schedule: 'هر ۲۴ ساعت', lastRun: Date.now() - 1000 * 60 * 60 * 12, duration: 15400, status: 'success' },
  { name: 'پاکسازی کش سیستم', schedule: 'هر ۶ ساعت', lastRun: Date.now() - 1000 * 60 * 60 * 2, duration: 520, status: 'error' },
];

export const MOCK_TELEGRAM_STATS = {
  sentToday: 1284,
  successful: 1279,
  failed: 5,
  signalsSent: 45,
  successRate: 99.6
};
