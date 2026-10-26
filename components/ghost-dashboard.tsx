'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Archive,
  Bell,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Coffee,
  Cpu,
  FileText,
  Gamepad2,
  LayoutDashboard,
  Menu,
  Moon,
  MoreHorizontal,
  Package,
  Search,
  Settings,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Users,
  WalletCards,
  Wifi,
  X,
  Zap,
} from 'lucide-react'

const navItems = [
  { label: 'نظرة عامة', icon: LayoutDashboard },
  { label: 'الجلسات المباشرة', icon: Gamepad2 },
  { label: 'الأجهزة والغرف', icon: Cpu },
  { label: 'الفواتير والمبيعات', icon: WalletCards },
  { label: 'المنتجات والمخزون', icon: ShoppingBag },
  { label: 'التحليلات والتقارير', icon: FileText },
  { label: 'الشيفتات والموظفون', icon: Users },
  { label: 'الخزينة والتسويات', icon: CircleDollarSign },
  { label: 'الرسائل والتسليم', icon: Bell },
  { label: 'سجل العمليات', icon: Archive },
]

const sessions = [
  { room: 'Ultra VIP · Phantom', customer: 'جلسة مفتوحة', device: 'PS5 · Multiplayer', time: '01:42:18', amount: '180 ج.م', status: 'مفتوحة' },
  { room: 'VIP · Haunt', customer: 'جلسة ثابتة · 02:00', device: 'PS5 · FC 25', time: '00:56:42', amount: '90 ج.م', status: 'نشطة' },
  { room: 'PS4 · 05', customer: 'جلسة مفتوحة', device: 'Tekken 8 · Single', time: '00:31:09', amount: '45 ج.م', status: 'مفتوحة' },
]

const transactions = [
  { name: 'أحمد محمد', detail: 'جلسة VIP 01', amount: '+180 ج.م', time: 'منذ 4 دقائق', type: 'session' },
  { name: 'سارة حسن', detail: 'مشروبات ووجبات', amount: '+75 ج.م', time: 'منذ 12 دقيقة', type: 'cafe' },
  { name: 'عمر خالد', detail: 'جلسة غرفة 03', amount: '+90 ج.م', time: 'منذ 25 دقيقة', type: 'session' },
  { name: 'محمود علي', detail: 'جلسة كونسول 08', amount: '+45 ج.م', time: 'منذ 31 دقيقة', type: 'session' },
]

function GhostMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand-mark" aria-label="GHOST">
      <img className="ghost-logo" src="/ghost-mark.svg" alt="" aria-hidden="true" />
      {!compact && <span className="brand-name">GHOST</span>}
    </div>
  )
}

function StatCard({ icon: Icon, label, value, detail, tone = 'gold' }: { icon: typeof Zap; label: string; value: string; detail: string; tone?: 'gold' | 'sage' | 'neutral' }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}><Icon size={19} strokeWidth={1.8} /></div>
      <div className="stat-copy"><p>{label}</p><strong>{value}</strong><span>{detail}</span></div>
      <MoreHorizontal className="stat-menu" size={18} />
    </article>
  )
}

function RevenueChart({ range }: { range: string }) {
  const points = range === 'اليوم' ? '0,70 55,56 110,62 165,37 220,47 275,28 330,40 385,16 440,27 495,11 550,22 605,5' : '0,61 55,44 110,53 165,29 220,48 275,22 330,33 385,14 440,31 495,10 550,20 605,3'
  return (
    <div className="chart-wrap">
      <svg viewBox="0 0 605 100" role="img" aria-label={`مخطط الإيرادات - ${range}`} preserveAspectRatio="none">
        <defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="var(--gold)" stopOpacity=".25" /><stop offset="1" stopColor="var(--gold)" stopOpacity="0" /></linearGradient></defs>
        {[20, 50, 80].map((y) => <line key={y} x1="0" x2="605" y1={y} y2={y} stroke="var(--border)" strokeDasharray="3 4" />)}
        <polygon points={`0,100 ${points} 605,100`} fill="url(#area)" />
        <polyline points={points} fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="495" cy="10" r="4" fill="var(--surface)" stroke="var(--gold)" strokeWidth="2" />
      </svg>
      <div className="chart-labels"><span>10 ص</span><span>12 م</span><span>2 م</span><span>4 م</span><span>6 م</span><span>8 م</span><span>الآن</span></div>
    </div>
  )
}

export default function GhostDashboard() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [range, setRange] = useState('اليوم')
  const [mobileNav, setMobileNav] = useState(false)
  const [activeNav, setActiveNav] = useState('نظرة عامة')
  const [now, setNow] = useState('')

  useEffect(() => {
    const saved = window.localStorage.getItem('ghost-theme') as 'light' | 'dark' | null
    const preferred = saved ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setTheme(preferred)
    document.documentElement.dataset.theme = preferred
    setNow(new Intl.DateTimeFormat('ar-EG', { hour: '2-digit', minute: '2-digit' }).format(new Date()))
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    window.localStorage.setItem('ghost-theme', next)
  }

  const date = useMemo(() => new Intl.DateTimeFormat('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date()), [])

  return (
    <div className="app-shell" dir="rtl">
      <aside className={`sidebar ${mobileNav ? 'open' : ''}`}>
        <div className="sidebar-head"><GhostMark /><button className="icon-btn close-mobile" onClick={() => setMobileNav(false)} aria-label="إغلاق القائمة"><X size={20} /></button></div>
        <div className="branch-switch"><span className="branch-dot" /><span><small>الفرع الحالي</small><b>GHOST · أبشواي</b></span><ChevronDown size={15} /></div>
        <nav aria-label="التنقل الرئيسي">
          <p className="nav-label">القائمة الرئيسية</p>
          {navItems.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => { setActiveNav(label); setMobileNav(false) }}><Icon size={18} /><span>{label}</span>{label === 'الأجهزة والجلسات' && <i>3</i>}</button>)}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-item"><Settings size={18} /><span>الإعدادات</span></button>
          <div className="user-card"><div className="avatar">م</div><div><b>محمد أحمد</b><small>مدير الفرع</small></div><MoreHorizontal size={17} /></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="topbar-start"><button className="icon-btn mobile-menu" onClick={() => setMobileNav(true)} aria-label="فتح القائمة"><Menu size={21} /></button><div><p className="eyebrow">{date}</p><h1>صباح الخير، محمد <span>✦</span></h1></div></div><div className="topbar-actions"><div className="time"><Clock3 size={16} /><span>{now || '08:45 م'}</span></div><button className="icon-btn" aria-label="البحث"><Search size={18} /></button><button className="icon-btn notification" aria-label="الإشعارات"><Bell size={18} /><i /></button><button className="theme-toggle" onClick={toggleTheme} aria-label="تبديل المظهر">{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button></div></header>

        <div className="content-wrap">
          <div className="page-heading"><div><h2>نظرة عامة</h2><p>مراقبة مباشرة لأداء GHOST · أبشواي اليوم</p></div><button className="primary-btn"><CalendarDays size={17} /> اليوم <ChevronDown size={14} /></button></div>
          <section className="stats-grid"><StatCard icon={CircleDollarSign} label="إجمالي الإيرادات اليوم" value="2,840 ج.م" detail="↑ 12.5% مقارنة بالأمس" /><StatCard icon={Gamepad2} label="الجلسات النشطة" value="06" detail="من أصل 24 جهاز" tone="sage" /><StatCard icon={Cpu} label="الأجهزة المتاحة" value="18" detail="جاهزة للحجز" tone="neutral" /><StatCard icon={Zap} label="المبيعات اليومية" value="620 ج.م" detail="23 طلب اليوم" tone="gold" /></section>

          <div className="main-grid"><section className="panel revenue-panel"><div className="panel-head"><div><h3>تحليل الإيرادات</h3><p>إجمالي الدخل خلال الفترة المحددة</p></div><div className="range-tabs">{['اليوم', 'هذا الأسبوع', 'هذا الشهر'].map((item) => <button key={item} className={range === item ? 'selected' : ''} onClick={() => setRange(item)}>{item}</button>)}</div></div><div className="revenue-total"><strong>2,840 <small>ج.م</small></strong><span className="positive">+12.5%</span></div><RevenueChart range={range} /></section><section className="panel shift-panel"><div className="panel-head"><div><h3>الشيفت الحالي</h3><p>وردية المساء · بدأت 04:00 م</p></div><span className="status-pill live"><span /> نشط الآن</span></div><div className="shift-user"><div className="avatar large">م</div><div><b>محمد أحمد</b><span>مسؤول الشيفت</span></div><MoreHorizontal size={18} /></div><div className="shift-stats"><div><span>إجمالي المبيعات</span><b>2,840 ج.م</b></div><div><span>عدد المعاملات</span><b>42</b></div><div><span>النقدية بالخزينة</span><b>8,450 ج.م</b></div></div><button className="outline-btn">عرض تفاصيل الشيفت <span>←</span></button></section></div>

          <div className="lower-grid"><section className="panel sessions-panel"><div className="panel-head"><div><h3>الجلسات النشطة <span className="count-badge">06</span></h3><p>تحديث مباشر</p></div><button className="text-btn">عرض الكل <span>←</span></button></div><div className="sessions-list">{sessions.map((session) => <div className="session-row" key={session.room}><div className="device-icon"><Gamepad2 size={19} /></div><div className="session-info"><b>{session.room}</b><span>{session.customer} · {session.device}</span></div><div className="session-time"><b>{session.time}</b><span>الوقت المنقضي</span></div><strong className="session-amount">{session.amount}</strong><span className="status-pill live">نشطة</span></div>)}</div></section><section className="panel availability-panel"><div className="panel-head"><div><h3>حالة الأجهزة</h3><p>آخر تحديث منذ لحظات</p></div><button className="filter-btn"><SlidersHorizontal size={15} /> تصفية</button></div><div className="availability-ring"><div className="ring"><strong>24</strong><span>جهاز</span></div><div className="availability-legend"><span><i className="sage-dot" /> متاحة <b>18</b></span><span><i className="gold-dot" /> مشغولة <b>06</b></span><span><i className="muted-dot" /> صيانة <b>00</b></span></div></div><div className="device-tags">{['PS5 · 01', 'PS5 · 02', 'PS5 · 03', 'VIP · 01', 'VIP · 02', 'PS4 · 08'].map((tag, index) => <span key={tag} className={index === 3 || index === 5 ? 'busy' : ''}><Wifi size={12} />{tag}</span>)}</div></section></div>

          <section className="panel transactions-panel"><div className="panel-head"><div><h3>آخر المعاملات</h3><p>جميع الحركات المالية اليوم</p></div><button className="text-btn">عرض السجل الكامل <span>←</span></button></div><div className="transaction-table"><div className="table-row table-head"><span>العميل</span><span>التفاصيل</span><span>المبلغ</span><span>الوقت</span></div>{transactions.map((transaction) => <div className="table-row" key={transaction.name}><span className="customer-cell"><span className={`transaction-icon ${transaction.type}`}><>{transaction.type === 'cafe' ? <Coffee size={15} /> : <Gamepad2 size={15} />}</></span><b>{transaction.name}</b></span><span>{transaction.detail}</span><strong className="amount-positive">{transaction.amount}</strong><span>{transaction.time}</span></div>)}</div></section>
        </div>
      </main>
    </div>
  )
}
