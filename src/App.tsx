import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/src/components/ThemeProvider';
import { AppLayout } from '@/src/components/AppLayout';
import { Login } from '@/src/pages/Login';
import { Overview } from '@/src/pages/Overview';

// Stubs for remaining pages to be filled
const AssetPage = React.lazy(() => import('@/src/pages/AssetPage'));
const AIAssistant = React.lazy(() => import('@/src/pages/AIAssistant'));
const Cron = React.lazy(() => import('@/src/pages/Cron'));
const Signals = React.lazy(() => import('@/src/pages/Signals'));
const Tests = React.lazy(() => import('@/src/pages/Tests'));

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <BrowserRouter>
        <React.Suspense fallback={<div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-emerald-500">در حال بارگذاری...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Overview />} />
              <Route path="gold" element={<AssetPage assetName="طلا" assetKey="gold" />} />
              <Route path="silver" element={<AssetPage assetName="نقره" assetKey="silver" />} />
              <Route path="coins" element={<AssetPage assetName="سکه" assetKey="coin" />} />
              <Route path="dollar" element={<AssetPage assetName="دلار" assetKey="dollar" />} />
              
              <Route path="ai-assistant" element={<AIAssistant />} />
              
              <Route path="monitoring/cron" element={<Cron />} />
              <Route path="monitoring/signals" element={<Signals />} />
              <Route path="monitoring/tests" element={<Tests />} />
              
              {/* Fallback for un-implemented monitoring routes */}
              <Route path="monitoring/*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

