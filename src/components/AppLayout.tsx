import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  Activity, 
  BarChart2, 
  Coins, 
  Database, 
  LineChart, 
  Menu, 
  MessageSquare, 
  Moon, 
  Settings, 
  Sparkles, 
  Sun, 
  Terminal, 
  TrendingUp,
  X,
  LogOut,
  Bell
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useTheme } from '@/src/components/ThemeProvider';
import { Button } from '@/src/components/ui/Button';

const NAV_ITEMS = [
  {
    title: 'اصلی',
    items: [
      { name: 'نمای کلی', path: '/', icon: Activity },
      { name: 'طلا', path: '/gold', icon: TrendingUp },
      { name: 'نقره', path: '/silver', icon: LineChart },
      { name: 'سکه', path: '/coins', icon: Coins },
      { name: 'دلار', path: '/dollar', icon: BarChart2 },
    ]
  },
  {
    title: 'مانیتورینگ',
    items: [
      { name: 'داده‌ها', path: '/monitoring/data', icon: Database },
      { name: 'سرویس‌ها و Cron', path: '/monitoring/cron', icon: Settings },
      { name: 'سیگنال‌ها', path: '/monitoring/signals', icon: Activity },
      { name: 'پیام‌ها و Telegram', path: '/monitoring/telegram', icon: MessageSquare },
      { name: 'تست و عملیات', path: '/monitoring/tests', icon: Terminal },
    ]
  },
  {
    title: 'هوش مصنوعی',
    items: [
      { name: 'دستیار هوشمند', path: '/ai-assistant', icon: Sparkles },
    ]
  }
];

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800">
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
            G
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-white">Gold Bot Monitor</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 px-4">
        {NAV_ITEMS.map((section, idx) => (
          <div key={idx} className="mb-8">
            <h4 className="px-3 mb-3 text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
              {section.title}
            </h4>
            <nav className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                      isActive 
                        ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium" 
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                    )
                  }
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => window.location.href='/login'}
          className="flex w-full items-center gap-3 px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          خروج از سیستم
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 flex-shrink-0 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 -mr-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-950"></span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">AD</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
