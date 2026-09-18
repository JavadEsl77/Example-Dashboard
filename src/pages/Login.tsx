import React from 'react';
import { Card, CardContent } from '@/src/components/ui/Card';
import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-emerald-500/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">ورود به سیستم</h1>
          <p className="text-slate-500 dark:text-slate-400">داشبورد مانیتورینگ و عملیات Gold Bot</p>
        </div>

        <Card className="shadow-xl shadow-slate-200/50 dark:shadow-none border-slate-200/60 dark:border-slate-800/60 backdrop-blur-sm bg-white/90 dark:bg-slate-900/90">
          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  نام کاربری یا ایمیل
                </label>
                <Input 
                  type="text" 
                  placeholder="admin" 
                  className="h-11"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    رمز عبور
                  </label>
                </div>
                <div className="relative">
                  <Input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="••••••••" 
                    className="h-11 pl-10"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:checked:bg-emerald-500" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">مرا به خاطر بسپار</span>
                </label>
                <a href="#" className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline">
                  فراموشی رمز؟
                </a>
              </div>

              <Button type="submit" className="w-full h-11 text-base">
                ورود به داشبورد
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
