import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Clock, Layers, UserX, Wallet, Shield, Server, Lock,
  CalendarCheck, FileText, CreditCard, BarChart3, MessageCircle,
  Video, Check, ArrowRight, Menu, X as XIcon, Users, Heart, Apple,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════════
   Scroll-reveal wrapper
   ════════════════════════════════════════════════════════════════ */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Brand dot
   ════════════════════════════════════════════════════════════════ */

function BrandDot({ size = 6, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`inline-block rounded-full bg-terracotta ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/* ════════════════════════════════════════════════════════════════
   Logo — Мила.Практис
   ════════════════════════════════════════════════════════════════ */

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#" className="flex items-baseline gap-0 select-none group">
      <span
        className={`font-display font-bold text-[22px] tracking-[-0.01em] transition-colors ${
          light ? "text-ivory" : "text-ink"
        }`}
      >
        Мила
      </span>
      <span className="text-terracotta text-[28px] leading-none relative -top-[3px] mx-[1px] font-bold group-hover:scale-125 transition-transform origin-bottom">
        .
      </span>
      <span
        className={`font-body font-medium text-[17px] tracking-[-0.01em] transition-colors ${
          light ? "text-ivory/80" : "text-ink"
        }`}
      >
        Практис
      </span>
    </a>
  );
}

/* ════════════════════════════════════════════════════════════════
   Navbar
   ════════════════════════════════════════════════════════════════ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Возможности", href: "#features" },
    { label: "Тарифы", href: "#pricing" },
    { label: "Безопасность", href: "#security" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ivory/95 backdrop-blur-sm border-b border-parchment/80"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <Logo />

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-[15px] text-ink-muted hover:text-ink transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-teal after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#"
            className="font-body text-[15px] font-medium text-ink bg-terracotta px-5 py-2.5 rounded-[4px] hover:bg-terracotta-dark transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Попробовать бесплатно
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-ink p-2"
          aria-label="Меню"
        >
          {mobileOpen ? <XIcon size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-ivory border-b border-parchment px-6 pb-6 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-ink-muted py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#"
            className="font-body font-medium text-ink bg-terracotta px-5 py-3 rounded-[4px] text-center"
          >
            Попробовать бесплатно
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}

/* ════════════════════════════════════════════════════════════════
   Hero
   ════════════════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-20 pb-16">
      {/* Organic background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M-100 500Q250 280 550 430Q850 580 1150 380Q1350 260 1540 420"
          stroke="var(--color-teal)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.04"
        />
        <path
          d="M-50 600Q300 380 650 530Q900 640 1250 430Q1440 330 1540 530"
          stroke="var(--color-teal)"
          strokeWidth="1"
          fill="none"
          opacity="0.03"
        />
        <path
          d="M-100 320Q350 480 750 320Q1050 210 1350 380Q1480 430 1540 370"
          stroke="var(--color-sage)"
          strokeWidth="1"
          fill="none"
          opacity="0.03"
        />
        <ellipse cx="180" cy="220" rx="180" ry="160" fill="var(--color-teal)" opacity="0.012" />
        <ellipse cx="1150" cy="650" rx="220" ry="180" fill="var(--color-terracotta)" opacity="0.008" />
      </svg>

      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[60] opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center relative z-10">
        {/* Left — text */}
        <div>
          <Reveal>
            <p className="font-mono text-[12px] text-teal tracking-[0.1em] uppercase mb-6 flex items-center gap-2.5">
              <BrandDot size={5} className="bg-teal" />
              Рабочая среда для частного практика
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display font-bold text-[38px] sm:text-[48px] lg:text-[58px] xl:text-[66px] leading-[1.08] tracking-[-0.015em] text-ink mb-7">
              Одно приложение
              <br />
              <span className="relative">
                для всей практики
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-3 text-teal/20"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 8Q75 2 150 8Q225 14 300 6"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="font-body text-[17px] lg:text-[19px] text-ink-muted leading-[1.65] max-w-[480px] mb-9">
              Расписание, заметки, оплата, видеозвонки. Если&nbsp;вы
              устали переключаться между Telegram, Zoom
              и&nbsp;Google Calendar, вам сюда.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2.5 font-body font-semibold text-[16px] text-ink bg-terracotta px-7 py-[14px] rounded-[4px] hover:bg-terracotta-dark transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_8px_24px_rgba(244,132,95,0.25)]"
              >
                Попробовать бесплатно
                <ArrowRight size={17} strokeWidth={2} />
              </a>
              <span className="font-body text-[14px] text-warm-gray self-center">
                Бесплатно до 15 клиентов
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right — UI preview card */}
        <Reveal delay={0.45} className="hidden lg:block">
          <div className="relative">
            {/* Main card — schedule view */}
            <div className="bg-white border border-parchment rounded-[6px] overflow-hidden shadow-[0_2px_8px_rgba(26,27,47,0.04)]">
              <div className="flex items-center justify-between px-5 py-3 border-b border-parchment/70 bg-ivory-dark/30">
                <div className="flex items-center gap-2">
                  <CalendarCheck size={14} className="text-teal" strokeWidth={1.5} />
                  <span className="font-mono text-[11px] text-teal font-medium uppercase tracking-[0.06em]">
                    Сегодня
                  </span>
                </div>
                <span className="font-mono text-[11px] text-warm-gray">
                  26 фев, среда
                </span>
              </div>

              <div className="p-4 space-y-2.5">
                {[
                  { time: "10:00", name: "Анна М.", tag: "Сессия", status: "done" },
                  { time: "11:30", name: "Дмитрий К.", tag: "Первичная", status: "done" },
                  { time: "14:00", name: "Елена В.", tag: "Сессия", status: "current" },
                  { time: "16:00", name: "Михаил С.", tag: "Консультация", status: "upcoming" },
                  { time: "18:00", name: "Ольга Р.", tag: "Сессия", status: "upcoming" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[4px] ${
                      s.status === "current"
                        ? "bg-teal-subtle border border-teal/15"
                        : s.status === "done"
                          ? "bg-ivory-dark/40 opacity-60"
                          : "bg-white"
                    }`}
                  >
                    <span className="font-mono text-[12px] text-warm-gray w-10 shrink-0">
                      {s.time}
                    </span>
                    <span className="font-body text-[13px] text-ink font-medium flex-grow">
                      {s.name}
                    </span>
                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded-[3px] ${
                        s.status === "current"
                          ? "text-teal bg-teal/8"
                          : "text-warm-gray bg-parchment/60"
                      }`}
                    >
                      {s.tag}
                    </span>
                    {s.status === "current" && (
                      <div className="w-[6px] h-[6px] rounded-full bg-teal animate-pulse shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              <div className="px-5 py-3 border-t border-parchment/70 flex items-center justify-between">
                <span className="font-body text-[12px] text-ink-muted">
                  5 сессий · загрузка 83%
                </span>
                <span className="font-mono text-[12px] text-teal font-medium">
                  +₽17 500
                </span>
              </div>
            </div>

            {/* Floating card — client note */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
              className="absolute -bottom-7 -left-6 bg-white border border-parchment rounded-[5px] p-4 shadow-[0_2px_6px_rgba(26,27,47,0.05)] z-20 w-[220px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <FileText size={13} className="text-terracotta" strokeWidth={1.5} />
                <span className="font-body text-[11px] text-terracotta font-medium">
                  Заметка сохранена
                </span>
              </div>
              <p className="font-body text-[11px] text-ink-muted leading-relaxed">
                Анна М. · Заметка по сессии
                <br />
                Обсудили план на следующий месяц...
              </p>
            </motion.div>

            {/* Floating — Telegram reminder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.4 }}
              className="absolute -top-4 -right-4 bg-teal-subtle border border-teal/12 rounded-[4px] px-3 py-2 z-20"
            >
              <div className="flex items-center gap-1.5">
                <MessageCircle size={12} className="text-teal" strokeWidth={1.5} />
                <span className="font-mono text-[11px] text-teal-dark font-medium">
                  Напоминание отправлено
                </span>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   Pain Section — "Знакомо?"
   ════════════════════════════════════════════════════════════════ */

function PainSection() {
  const pains = [
    {
      icon: Layers,
      title: "Зоопарк из 5–8 приложений",
      desc: "Telegram для записи, Google Calendar для расписания, Zoom для сессий, перевод на карту для оплаты, блокнот для заметок. Ничего не связано.",
    },
    {
      icon: Clock,
      title: "1–2 часа в день на рутину",
      desc: "Заметки после каждой сессии, ручная запись клиентов, напоминания, чеки. Между сессиями вы не работаете, а заполняете.",
    },
    {
      icon: UserX,
      title: "Отмены без предупреждения",
      desc: "Арендовали кабинет, подготовились, а клиент не пришёл. Напоминание не ушло, правил отмены нет.",
    },
    {
      icon: Wallet,
      title: "Непонятно, сколько зарабатываете",
      desc: "Сколько заработали за месяц? Какая загрузка? До лимита самозанятого далеко? Приходится считать в таблице.",
    },
  ];

  const tools = [
    "Telegram",
    "Zoom",
    "Google Calendar",
    "Notion",
    "Блокнот",
    "«Мой налог»",
    "WhatsApp",
    "Перевод на Сбер",
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          {/* Left — quote */}
          <Reveal>
            <div>
              <h2 className="font-display font-semibold text-[34px] lg:text-[44px] leading-[1.12] tracking-[-0.01em] text-ink mb-8">
                Знакомо?
              </h2>
              <blockquote className="relative pl-5 border-l-[3px] border-terracotta/30">
                <p className="font-display italic text-[19px] lg:text-[23px] leading-[1.45] text-ink-light">
                  «Делаю пометки в&nbsp;бумажном блокноте, потом фотографирую
                  с&nbsp;телефона и&nbsp;сохраняю в&nbsp;заметку, или наговариваю,
                  или сразу печатаю»
                </p>
              </blockquote>
              <p className="font-body text-[14px] text-warm-gray mt-5 pl-5">
                — КПТ-терапевт, частная практика 8&nbsp;лет
              </p>

              <blockquote className="relative pl-5 border-l-[3px] border-teal/25 mt-8">
                <p className="font-display italic text-[18px] lg:text-[21px] leading-[1.45] text-ink-light">
                  «Это работа другого человека, его время. Очень многие сильно
                  обесценивают: "А&nbsp;ну&nbsp;ладно, не&nbsp;поеду"»
                </p>
              </blockquote>
              <p className="font-body text-[14px] text-warm-gray mt-5 pl-5">
                — Об отменах без предупреждения
              </p>
            </div>
          </Reveal>

          {/* Right — pain grid */}
          <div className="grid sm:grid-cols-2 gap-3.5">
            {pains.map((pain, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group border border-parchment bg-white/50 rounded-[4px] p-5 hover:border-terracotta/25 transition-all duration-300 hover:bg-terracotta-subtle/15">
                  <pain.icon
                    size={20}
                    className="text-terracotta mb-3 transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-body font-semibold text-[15px] text-ink mb-1.5">
                    {pain.title}
                  </h3>
                  <p className="font-body text-[13px] text-ink-muted leading-[1.6]">
                    {pain.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Tools strip — crossed out */}
        <Reveal delay={0.3}>
          <div className="mt-16 lg:mt-20 relative">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 py-5">
              {tools.map((tool, i) => (
                <span
                  key={i}
                  className="font-body text-[15px] text-warm-gray-light select-none"
                >
                  {tool}
                </span>
              ))}
            </div>
            <div className="absolute top-1/2 left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-transparent via-teal/35 to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   Features — "Что внутри"
   ════════════════════════════════════════════════════════════════ */

function FeaturesSection() {
  const features = [
    {
      icon: CalendarCheck,
      title: "Клиенты записываются сами",
      desc: "Публичная ссылка для записи, синхронизация с&nbsp;календарём, автонапоминания через Telegram. Без переписок «а когда вам удобно?».",
      priority: "must",
    },
    {
      icon: Video,
      title: "Видеозвонки вместо Zoom",
      desc: "Видеосвязь прямо в&nbsp;платформе: запись сессий, демонстрация экрана, HD-качество. Отдельная подписка на&nbsp;Zoom больше не&nbsp;нужна.",
      priority: "must",
    },
    {
      icon: FileText,
      title: "Одна карточка на клиента",
      desc: "История сессий, заметки, теги, контакты. Без Excel-таблиц и&nbsp;фото из&nbsp;блокнота.",
      priority: "must",
    },
    {
      icon: FileText,
      title: "Заметки по шаблонам за минуты",
      desc: "Готовые шаблоны под вашу специальность. Через год сможете открыть заметки по&nbsp;любому клиенту и&nbsp;разобраться, что было.",
      priority: "must",
    },
    {
      icon: CreditCard,
      title: "Оплата без «переведите на Сбер»",
      desc: "Клиент платит по ссылке. Чеки для самозанятых формируются сами.",
      priority: "must",
    },
    {
      icon: MessageCircle,
      title: "Telegram-бот для клиентов",
      desc: "Клиенты записываются, получают напоминания и&nbsp;платят через Telegram. Ничего не&nbsp;надо скачивать.",
      priority: "must",
    },
    {
      icon: BarChart3,
      title: "Финансы на виду",
      desc: "Доход, загрузка, количество сессий, лимит самозанятого. Вместо таблицы, которую вы всё равно не&nbsp;обновляете.",
      priority: "wow",
    },
    {
      icon: Shield,
      title: "Данные под замком",
      desc: "152-ФЗ, шифрование, серверы в&nbsp;России. Раздельные согласия на&nbsp;обработку данных.",
      priority: "trust",
    },
  ];

  // First 3 features are larger (scheduling, video, CRM), rest are regular grid
  const featured = features.slice(0, 3);
  const rest = features.slice(3);

  return (
    <section id="features" className="py-24 lg:py-32 bg-teal-subtle/30">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <Reveal>
          <p className="font-mono text-[12px] text-teal tracking-[0.1em] uppercase mb-4 flex items-center gap-2.5">
            <BrandDot size={5} className="bg-teal" />
            Возможности
          </p>
          <h2 className="font-display font-semibold text-[34px] lg:text-[48px] leading-[1.12] tracking-[-0.01em] text-ink mb-4">
            Что внутри
          </h2>
          <p className="font-body text-[17px] text-ink-muted leading-relaxed mb-16 max-w-[500px]">
            Запись клиентов, заметки, оплата, аналитика, видеозвонки.
            Одна рабочая среда вместо пяти приложений.
          </p>
        </Reveal>

        {/* Top 3 features — larger */}
        <div className="grid md:grid-cols-3 gap-5 mb-5">
          {featured.map((f, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="border border-teal/15 bg-white/60 rounded-[5px] p-7 lg:p-8 h-full group hover:border-teal/30 transition-all duration-300">
                <f.icon
                  size={24}
                  className="text-teal mb-4 group-hover:scale-110 transition-transform duration-300"
                  strokeWidth={1.5}
                />
                <h3 className="font-display font-semibold text-[20px] text-ink mb-2 leading-snug">
                  {f.title}
                </h3>
                <p
                  className="font-body text-[15px] text-ink-muted leading-[1.65]"
                  dangerouslySetInnerHTML={{ __html: f.desc }}
                />
              </div>
            </Reveal>
          ))}
        </div>

        {/* Remaining features — grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((f, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div
                className={`border rounded-[5px] p-6 h-full group transition-all duration-300 ${
                  f.priority === "trust"
                    ? "border-teal/15 bg-teal-subtle/30 hover:border-teal/25"
                    : f.priority === "wow"
                      ? "border-terracotta/12 bg-terracotta-subtle/15 hover:border-terracotta/25"
                      : "border-parchment bg-white/50 hover:border-teal/20"
                }`}
              >
                <f.icon
                  size={20}
                  className={`mb-3 transition-transform duration-300 group-hover:scale-110 ${
                    f.priority === "trust"
                      ? "text-teal"
                      : f.priority === "wow"
                        ? "text-terracotta"
                        : "text-teal"
                  }`}
                  strokeWidth={1.5}
                />
                <h3 className="font-body font-semibold text-[15px] text-ink mb-1.5">
                  {f.title}
                </h3>
                <p
                  className="font-body text-[13px] text-ink-muted leading-[1.6]"
                  dangerouslySetInnerHTML={{ __html: f.desc }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   For Whom — "Для кого"
   ════════════════════════════════════════════════════════════════ */

function ForWhomSection() {
  const segments = [
    {
      icon: Heart,
      title: "Психологи и терапевты",
      label: "",
      desc: "Карточки клиентов, шаблоны заметок, напоминания. Без сложных CRM, которые сделаны для клиник.",
      accent: "teal",
    },
    {
      icon: Users,
      title: "Коучи и консультанты",
      label: "",
      desc: "Расписание, оплата, трекинг сессий. Не надо держать десять вкладок открытыми.",
      accent: "terracotta",
    },
    {
      icon: Apple,
      title: "Нутрициологи, репетиторы и другие",
      label: "",
      desc: "Шаблоны заметок настраиваются под вашу специальность. Подходит для любой работы один на один с клиентом.",
      accent: "sage",
    },
  ];

  const accentStyles: Record<string, { border: string; bg: string; icon: string; label: string }> = {
    teal: {
      border: "border-teal/15",
      bg: "bg-teal-subtle/15",
      icon: "text-teal",
      label: "text-teal",
    },
    terracotta: {
      border: "border-terracotta/12",
      bg: "bg-terracotta-subtle/15",
      icon: "text-terracotta",
      label: "text-terracotta",
    },
    sage: {
      border: "border-sage/15",
      bg: "bg-white/30",
      icon: "text-sage",
      label: "text-sage",
    },
  };

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display font-semibold text-[34px] lg:text-[48px] leading-[1.12] tracking-[-0.01em] text-ink mb-4">
            Для кого
          </h2>
          <p className="font-body text-[17px] text-ink-muted leading-relaxed mb-16 max-w-[480px]">
            Если вы работаете с&nbsp;клиентами один на&nbsp;один
            и&nbsp;ведёте практику самостоятельно.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {segments.map((seg, i) => {
            const s = accentStyles[seg.accent];
            return (
              <Reveal key={i} delay={i * 0.12}>
                <div className={`border ${s.border} ${s.bg} rounded-[5px] p-6 lg:p-7 h-full`}>
                  <seg.icon size={22} className={`${s.icon} mb-5`} strokeWidth={1.5} />
                  <h3 className="font-display font-semibold text-[22px] text-ink mb-3">
                    {seg.title}
                  </h3>
                  <p className="font-body text-[14px] text-ink-muted leading-[1.65]">
                    {seg.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   Comparison — "Чем отличаемся"
   ════════════════════════════════════════════════════════════════ */

function ComparisonSection() {
  const rows = [
    {
      label: "Агрегаторы",
      them: "Ясно, Alter, B17",
      weak: "30% комиссия, нет контроля, чужие клиенты",
      us: "0% комиссия, клиенты остаются у вас",
    },
    {
      label: "Зоопарк",
      them: "Telegram + Calendar + Zoom + Сбер",
      weak: "Ничего не связано, ручная работа",
      us: "Одно приложение, всё связано",
    },
    {
      label: "Zoom / Meet",
      them: "Видеозвонки отдельно",
      weak: "Отдельная подписка, отдельная ссылка, нет записи сессий",
      us: "Видеозвонки уже внутри: запись, шаринг экрана, бесплатно",
    },
    {
      label: "Планёрка",
      them: "Scheduling tool",
      weak: "Только расписание, нет CRM, нет оплаты",
      us: "Расписание + заметки + оплата + аналитика",
    },
    {
      label: "YClients",
      them: "Для салонов",
      weak: "Избыточно для одного специалиста",
      us: "Сделана для соло-практика",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-ivory-dark/30">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display font-semibold text-[34px] lg:text-[44px] leading-[1.12] tracking-[-0.01em] text-ink mb-14">
            Чем отличаемся
          </h2>
        </Reveal>

        <div className="space-y-3">
          {rows.map((row, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="grid grid-cols-1 md:grid-cols-[140px_1fr_1fr] gap-3 md:gap-6 border border-parchment rounded-[5px] p-5 bg-white/40 hover:border-teal/20 transition-colors">
                <div>
                  <span className="font-body font-semibold text-[14px] text-ink">
                    {row.label}
                  </span>
                  <p className="font-body text-[12px] text-warm-gray mt-0.5">{row.them}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-terracotta/60 text-[14px] mt-0.5 shrink-0">✕</span>
                  <p className="font-body text-[13px] text-ink-muted leading-relaxed">
                    {row.weak}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={15} className="text-teal shrink-0 mt-0.5" strokeWidth={2} />
                  <p className="font-body text-[13px] text-teal-dark leading-relaxed font-medium">
                    {row.us}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   Security — "Ваши данные"
   ════════════════════════════════════════════════════════════════ */

function SecuritySection() {
  const points = [
    { icon: Shield, title: "152-ФЗ", desc: "Соответствие закону о персональных данных" },
    { icon: Server, title: "Серверы в России", desc: "Данные не покидают Россию" },
    { icon: Lock, title: "Шифрование", desc: "Данные шифруются при хранении и передаче" },
  ];

  return (
    <section id="security" className="py-24 lg:py-32 bg-teal-dark text-ivory relative overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]"
        viewBox="0 0 1440 500"
        fill="none"
      >
        <circle cx="1250" cy="80" r="250" stroke="#FAF7F2" strokeWidth="0.8" />
        <circle cx="150" cy="420" r="180" stroke="#FAF7F2" strokeWidth="0.5" />
      </svg>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
          <Reveal>
            <div>
              <p className="font-mono text-[12px] text-sage-light tracking-[0.1em] uppercase mb-4 flex items-center gap-2.5">
                <BrandDot size={5} className="bg-sage-light" />
                Безопасность
              </p>
              <h2 className="font-display font-semibold text-[34px] lg:text-[44px] leading-[1.12] tracking-[-0.01em] text-ivory mb-4">
                Данные клиентов<br />в безопасности
              </h2>
              <p className="font-body text-[16px] text-sage-light/70 leading-[1.65] max-w-[420px]">
                Клиентские данные хранятся на&nbsp;российских серверах.
                Шифрование при хранении и&nbsp;передаче. Раздельные согласия
                на&nbsp;обработку для каждого клиента.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {points.map((point, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="border border-ivory/8 rounded-[4px] p-5 bg-ivory/[0.02] hover:bg-ivory/[0.05] transition-colors duration-300 flex items-start gap-4 group">
                  <point.icon
                    size={20}
                    className="text-sage-light shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="font-body font-semibold text-[15px] text-ivory mb-1">
                      {point.title}
                    </h3>
                    <p className="font-body text-[13px] text-sage-light/60 leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   Pricing — Free + Pro
   ════════════════════════════════════════════════════════════════ */

function PricingSection() {
  const tiers = [
    {
      name: "Free",
      price: "0",
      period: "",
      tagline: "Для начинающих практиков",
      features: [
        "До 15 клиентов",
        "Расписание и публичная ссылка",
        "Telegram-бот для записи",
        "Напоминания клиентам",
        "Базовые шаблоны заметок",
        "Карточки клиентов",
      ],
      cta: "Начать бесплатно",
      recommended: false,
    },
    {
      name: "Pro",
      price: "990",
      period: "/мес",
      tagline: "Для практиков с 15+ клиентами",
      features: [
        "Безлимит клиентов",
        "Все шаблоны заметок (SOAP, DAP, GROW)",
        "Приём оплаты онлайн",
        "Автоматические чеки",
        "Аналитика и P&L",
        "Мониторинг лимита самозанятого",
        "Расширенные фильтры и теги",
        "Приоритетная поддержка",
      ],
      cta: "Попробовать бесплатно",
      recommended: true,
    },
  ];

  return (
    <section id="pricing" className="py-24 lg:py-32">
      <div className="max-w-[900px] mx-auto px-6 lg:px-8">
        <Reveal>
          <p className="font-mono text-[12px] text-teal tracking-[0.1em] uppercase mb-4 flex items-center gap-2.5">
            <BrandDot size={5} className="bg-teal" />
            Тарифы
          </p>
          <h2 className="font-display font-semibold text-[34px] lg:text-[48px] leading-[1.12] tracking-[-0.01em] text-ink mb-3">
            Два тарифа
          </h2>
          <p className="font-body text-[17px] text-ink-muted leading-relaxed mb-14 max-w-[420px]">
            Бесплатный тариф без ограничения по&nbsp;времени.
            Pro стоит дешевле одной сессии.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-5">
          {tiers.map((tier, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                className={`rounded-[6px] p-7 lg:p-8 h-full flex flex-col relative transition-all duration-300 hover:translate-y-[-2px] ${
                  tier.recommended
                    ? "border-2 border-teal bg-teal-subtle/15"
                    : "border border-parchment bg-white/40"
                }`}
              >
                {tier.recommended && (
                  <span className="absolute -top-3 left-6 font-mono text-[10px] text-ivory bg-teal px-3 py-[3px] rounded-[3px] uppercase tracking-[0.06em] font-medium">
                    Рекомендуем
                  </span>
                )}

                <h3 className="font-display font-semibold text-[24px] text-ink mb-1">
                  {tier.name}
                </h3>
                <p className="font-body text-[14px] text-ink-muted mb-5">
                  {tier.tagline}
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-mono text-[42px] font-semibold text-ink leading-none tracking-[-0.02em]">
                    ₽{tier.price}
                  </span>
                  {tier.period && (
                    <span className="font-body text-[15px] text-warm-gray">
                      {tier.period}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <Check
                        size={15}
                        className="text-teal shrink-0 mt-[3px]"
                        strokeWidth={2.5}
                      />
                      <span className="font-body text-[14px] text-ink-muted leading-snug">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3.5 rounded-[4px] font-body font-medium text-[15px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                    tier.recommended
                      ? "bg-terracotta text-ink hover:bg-terracotta-dark hover:shadow-[0_6px_20px_rgba(244,132,95,0.25)]"
                      : "bg-parchment text-ink hover:bg-warm-gray-light"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   Final CTA
   ════════════════════════════════════════════════════════════════ */

function CTASection() {
  return (
    <section className="py-24 lg:py-32 border-t border-parchment relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-subtle/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
        <Reveal>
          <h2 className="font-display font-semibold text-[34px] sm:text-[42px] lg:text-[52px] leading-[1.1] tracking-[-0.015em] text-ink mb-6 max-w-[580px]">
            Закройте лишние вкладки
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-body text-[17px] text-ink-muted leading-relaxed mb-9 max-w-[440px]">
            Бесплатно до 15 клиентов, без ограничения по&nbsp;времени.
            Регистрация за 2&nbsp;минуты.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <a
            href="#"
            className="inline-flex items-center gap-2.5 font-body font-semibold text-[16px] text-ink bg-terracotta px-8 py-[14px] rounded-[4px] hover:bg-terracotta-dark transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_8px_24px_rgba(244,132,95,0.25)]"
          >
            Попробовать бесплатно
            <ArrowRight size={17} strokeWidth={2} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   Footer
   ════════════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="py-12 lg:py-16 border-t border-parchment">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr] gap-8 lg:gap-12">
          <div>
            <Logo />
            <p className="font-body text-[13px] text-warm-gray mt-4 max-w-[260px] leading-relaxed">
              Рабочая среда для частного практика.
              <br />
              Расписание, заметки, оплата, аналитика.
            </p>
          </div>

          <div>
            <h4 className="font-body font-semibold text-[12px] text-ink uppercase tracking-[0.08em] mb-4">
              Продукт
            </h4>
            <ul className="space-y-2.5">
              {["Возможности", "Тарифы", "Безопасность"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-body text-[13px] text-ink-muted hover:text-ink transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body font-semibold text-[12px] text-ink uppercase tracking-[0.08em] mb-4">
              Ресурсы
            </h4>
            <ul className="space-y-2.5">
              {["Блог", "Telegram-канал", "Поддержка"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-body text-[13px] text-ink-muted hover:text-ink transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body font-semibold text-[12px] text-ink uppercase tracking-[0.08em] mb-4">
              Правовое
            </h4>
            <ul className="space-y-2.5">
              {["Конфиденциальность", "Соглашение", "152-ФЗ"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-body text-[13px] text-ink-muted hover:text-ink transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-parchment flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <span className="font-body text-[12px] text-warm-gray">
            2026 Мила.Практис. Все права защищены.
          </span>
          <span className="font-mono text-[10px] text-warm-gray-light tracking-[0.04em]">
            Серверы в РФ · 152-ФЗ · Данные не покидают Россию
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════════════════════════
   App
   ════════════════════════════════════════════════════════════════ */

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <PainSection />
      <FeaturesSection />
      <ForWhomSection />
      <ComparisonSection />
      <SecuritySection />
      <PricingSection />
      <CTASection />
      <Footer />
    </>
  );
}
