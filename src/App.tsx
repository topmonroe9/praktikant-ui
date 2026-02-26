import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Clock, Layers, UserX, BellOff, Shield, Server, Lock, FileCheck,
  Mic, FileText, Send, Check, ArrowRight, Menu, X as XIcon,
  Brain, Sparkles, TrendingUp, Users, Scale, Heart,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════════
   Reusable scroll-reveal wrapper
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
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Brand dot — the "." as a distinctive design element
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
   Logo
   ════════════════════════════════════════════════════════════════ */

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#" className="flex items-baseline gap-0 select-none group">
      <span
        className={`font-display font-bold text-[22px] transition-colors ${
          light ? "text-ivory" : "text-ink"
        }`}
      >
        Зоя
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
    { label: "Продукт", href: "#product" },
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
            className="font-body text-[15px] font-medium text-ivory bg-terracotta px-5 py-2.5 rounded-[4px] hover:bg-terracotta-dark transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Попробовать
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
            className="font-body font-medium text-ivory bg-terracotta px-5 py-3 rounded-[4px] text-center"
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
  const { scrollY } = useScroll();
  const cardY = useTransform(scrollY, [0, 700], [0, -50]);
  const cardRotate = useTransform(scrollY, [0, 700], [1.5, -1]);

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-20 pb-12">
      {/* Organic background curves */}
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
        <ellipse cx="180" cy="200" rx="180" ry="160" fill="var(--color-teal)" opacity="0.012" />
        <ellipse cx="1150" cy="650" rx="220" ry="180" fill="var(--color-terracotta)" opacity="0.008" />
      </svg>

      {/* Grain texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[60] opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 w-full grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center relative z-10">
        {/* Left — text */}
        <div>
          <Reveal>
            <p className="font-mono text-[12px] text-teal tracking-[0.1em] uppercase mb-6 flex items-center gap-2.5">
              <BrandDot size={5} className="bg-teal" />
              AI-копайлот для практиков
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-display font-bold text-[40px] sm:text-[50px] lg:text-[62px] xl:text-[72px] leading-[1.08] tracking-[-0.015em] text-ink mb-7">
              Второй мозг
              <br />
              <span className="relative">
                для частных
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-teal/20"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 8 Q75 2 150 8 Q225 14 300 6"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </span>
              <br />
              практиков
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="font-body text-[17px] lg:text-[19px] text-ink-muted leading-[1.65] max-w-[500px] mb-9">
              AI-копайлот, который записывает, запоминает и&nbsp;думает за&nbsp;вас.
              Не&nbsp;CRM&nbsp;— инструмент, от&nbsp;которого мозг не&nbsp;отвыкнет.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2.5 font-body font-semibold text-[16px] text-ivory bg-terracotta px-7 py-[14px] rounded-[4px] hover:bg-terracotta-dark transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_8px_24px_rgba(194,83,58,0.25)]"
              >
                Попробовать бесплатно
                <ArrowRight size={17} strokeWidth={2} />
              </a>
              <span className="font-body text-[14px] text-warm-gray self-center leading-snug">
                14 дней полного доступа
                <br />
                <span className="text-warm-gray-light">без карты</span>
              </span>
            </div>
          </Reveal>
        </div>

        {/* Right — floating SOAP card */}
        <Reveal delay={0.5} className="hidden lg:block">
          <motion.div style={{ y: cardY, rotate: cardRotate }} className="relative">
            {/* Main SOAP note card */}
            <div className="bg-white border border-parchment rounded-[5px] overflow-hidden shadow-[0_2px_8px_rgba(26,27,47,0.04)]">
              {/* Card header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-parchment/70 bg-ivory-dark/30">
                <div className="flex items-center gap-2">
                  <div className="w-[7px] h-[7px] rounded-full bg-teal animate-pulse" />
                  <span className="font-mono text-[11px] text-teal font-medium uppercase tracking-[0.06em]">
                    SOAP-заметка
                  </span>
                </div>
                <span className="font-mono text-[11px] text-warm-gray">
                  Сессия #47 · 26 фев
                </span>
              </div>

              {/* SOAP content */}
              <div className="p-5 space-y-3.5">
                {[
                  {
                    letter: "S",
                    label: "Субъективно",
                    text: "Клиент отмечает снижение тревожности на работе после применения техники...",
                  },
                  {
                    letter: "O",
                    label: "Объективно",
                    text: "Голос спокойнее, паузы короче. Зрительный контакт стабильный",
                  },
                  {
                    letter: "A",
                    label: "Анализ",
                    text: 'Прогресс в работе с когнитивным искажением «катастрофизация»',
                  },
                  {
                    letter: "P",
                    label: "План",
                    text: "Дневник мыслей (ежедневно)\nТехника 5-4-3-2-1 при тревоге",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="font-mono text-[12px] font-semibold text-teal w-4 shrink-0 pt-[3px]">
                      {item.letter}
                    </span>
                    <div className="min-w-0">
                      <span className="font-body text-[10px] text-warm-gray uppercase tracking-[0.08em]">
                        {item.label}
                      </span>
                      <p className="font-body text-[13px] text-ink-light leading-[1.55] mt-0.5 whitespace-pre-line">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Card footer */}
              <div className="px-5 py-3 border-t border-parchment/70 flex items-center gap-2">
                <Send size={12} className="text-teal" strokeWidth={1.5} />
                <span className="font-body text-[12px] text-teal font-medium">
                  Отправить клиенту
                </span>
                <span className="font-mono text-[10px] text-warm-gray-light ml-auto">
                  сгенерировано за 47с
                </span>
              </div>
            </div>

            {/* Floating badge — summary sent */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
              className="absolute -bottom-6 -left-8 bg-teal-subtle border border-teal/15 rounded-[4px] px-4 py-2.5 z-20"
            >
              <div className="flex items-center gap-2">
                <Check size={14} className="text-teal" strokeWidth={2} />
                <span className="font-body text-[13px] text-teal-dark font-medium">
                  Саммари отправлено
                </span>
              </div>
            </motion.div>

            {/* Floating badge — time saved */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.7, duration: 0.4 }}
              className="absolute -top-5 -right-5 bg-terracotta-subtle border border-terracotta/12 rounded-[4px] px-3 py-2 z-20"
            >
              <span className="font-mono text-[13px] text-terracotta font-semibold">
                −13 мин
              </span>
            </motion.div>
          </motion.div>
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
      icon: Clock,
      text: "1.5 часа в день на заметки",
      detail: "15 минут после каждой сессии — вручную, в блокнот или Notion",
    },
    {
      icon: Layers,
      text: "5–8 инструментов",
      detail: "Telegram, Zoom, календарь, блокнот, «Мой налог», СБП...",
    },
    {
      icon: UserX,
      text: "Клиенты теряются",
      detail: "Нет follow-up между сессиями, нет реактивации спящих",
    },
    {
      icon: BellOff,
      text: "No-show без предупреждения",
      detail: "Пустой слот = потерянные деньги и сломанное расписание",
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
    "СБП",
  ];

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          {/* Left — quote */}
          <Reveal>
            <div>
              <h2 className="font-display font-semibold text-[34px] lg:text-[44px] leading-[1.12] tracking-[-0.01em] text-ink mb-8">
                Знакомо?
              </h2>
              <blockquote className="relative pl-5 border-l-[3px] border-terracotta/30">
                <p className="font-display italic text-[20px] lg:text-[24px] leading-[1.45] text-ink-light">
                  «Делаю пометки в&nbsp;бумажном блокноте, потом фотографирую
                  с&nbsp;телефона и&nbsp;сохраняю в&nbsp;заметку, или наговариваю, или
                  сразу печатаю»
                </p>
              </blockquote>
              <p className="font-body text-[14px] text-warm-gray mt-5 pl-5">
                — КПТ-терапевт, частная практика 8&nbsp;лет
              </p>
            </div>
          </Reveal>

          {/* Right — pain grid */}
          <div className="grid sm:grid-cols-2 gap-3.5">
            {pains.map((pain, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group border border-parchment bg-white/50 rounded-[4px] p-5 hover:border-terracotta/25 transition-all duration-300 hover:bg-terracotta-subtle/20">
                  <pain.icon
                    size={20}
                    className="text-terracotta mb-3 transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                  <h3 className="font-body font-semibold text-[15px] text-ink mb-1.5">
                    {pain.text}
                  </h3>
                  <p className="font-body text-[13px] text-ink-muted leading-relaxed">
                    {pain.detail}
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
   Solution — "Как работает Зоя"
   ════════════════════════════════════════════════════════════════ */

function SolutionSection() {
  const steps = [
    {
      num: "01",
      title: "Сессия записывается",
      desc: "Онлайн — через встроенный видеозвонок. Очно — телефон на столе. Аудио не хранится: обработали, создали заметки, удалили.",
      icon: Mic,
      color: "teal" as const,
    },
    {
      num: "02",
      title: "AI создаёт заметки",
      desc: "Транскрипция → структурированные заметки по шаблонам SOAP, DAP, GROW → action items для клиента. За 2 минуты вместо 15.",
      icon: FileText,
      color: "terracotta" as const,
    },
    {
      num: "03",
      title: "Клиент получает саммари",
      desc: "Через Telegram Mini App: саммари сессии, домашнее задание, дата следующей встречи. Автоматически.",
      icon: Send,
      color: "sage" as const,
    },
  ];

  const iconColors = {
    teal: "text-teal",
    terracotta: "text-terracotta",
    sage: "text-sage",
  };

  return (
    <section id="product" className="py-24 lg:py-32 bg-teal-subtle/40">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <Reveal>
          <p className="font-mono text-[12px] text-teal tracking-[0.1em] uppercase mb-4 flex items-center gap-2.5">
            <BrandDot size={5} className="bg-teal" />
            Продукт
          </p>
          <h2 className="font-display font-semibold text-[34px] lg:text-[48px] leading-[1.12] tracking-[-0.01em] text-ink mb-16 lg:mb-20">
            Как работает Зоя
          </h2>
        </Reveal>

        <div className="space-y-14 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-12">
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 0.15}>
              <div className="relative">
                <span className="font-mono text-[72px] lg:text-[88px] font-semibold leading-none select-none text-parchment/80">
                  {step.num}
                </span>
                <div className="mt-[-24px] lg:mt-[-30px] relative z-10">
                  <step.icon
                    size={22}
                    className={`mb-4 ${iconColors[step.color]}`}
                    strokeWidth={1.5}
                  />
                  <h3 className="font-display font-semibold text-[21px] text-ink mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="font-body text-[15px] text-ink-muted leading-[1.65]">
                    {step.desc}
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
   Three Products — "Три инструмента, одна платформа"
   ════════════════════════════════════════════════════════════════ */

function ProductsSection() {
  const products = [
    {
      icon: Sparkles,
      name: "Освободитель",
      phase: "MVP",
      tagline: "Убирает рутину",
      desc: "AI-заметки по сессиям, транскрипты, action items клиенту. Экономит 7+ часов в неделю.",
      entry: "«Сижу до полуночи с заметками»",
      tags: ["AI-заметки", "Транскрипт", "Action items", "SOAP / DAP / GROW"],
      border: "border-teal/20",
      bg: "bg-teal-subtle/25",
      iconBg: "bg-teal/8",
      iconColor: "text-teal",
      phaseColor: "text-teal",
      tagBg: "bg-teal/6",
      tagColor: "text-teal-dark",
    },
    {
      icon: TrendingUp,
      name: "Менеджер",
      phase: "Рост",
      tagline: "Растит доход",
      desc: "Реактивация спящих клиентов, аналитика, ROI-дашборд. «Рассылки вернули 3 клиента = ₽15\u00A0000».",
      entry: "«Ты теряешь деньги»",
      tags: ["Реактивация", "Аналитика", "Рассылки", "ROI"],
      border: "border-terracotta/15",
      bg: "bg-terracotta-subtle/25",
      iconBg: "bg-terracotta/8",
      iconColor: "text-terracotta",
      phaseColor: "text-terracotta",
      tagBg: "bg-terracotta/6",
      tagColor: "text-terracotta-dark",
    },
    {
      icon: Brain,
      name: "Копайлот",
      phase: "Масштаб",
      tagline: "Делает лучше",
      desc: "AI-супервизор, real-time контекст прошлых сессий, анализ паттернов. Как Copilot для разработчиков — только для практиков.",
      entry: "«Стань лучшим в нише»",
      tags: ["AI-супервизор", "Real-time", "Паттерны"],
      border: "border-sage/20",
      bg: "bg-white/30",
      iconBg: "bg-sage/8",
      iconColor: "text-sage",
      phaseColor: "text-sage",
      tagBg: "bg-sage/8",
      tagColor: "text-sage",
    },
  ];

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display font-semibold text-[34px] lg:text-[48px] leading-[1.12] tracking-[-0.01em] text-ink mb-3">
            Три инструмента,
            <br />
            одна платформа
          </h2>
          <p className="font-body text-[17px] text-ink-muted leading-relaxed mb-16 max-w-[520px]">
            Каждый продукт продаёт следующий. Путь от экономии времени к&nbsp;росту
            дохода и&nbsp;профессиональному развитию.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr] gap-4 lg:gap-5">
          {products.map((p, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <div
                className={`border ${i === 0 ? "border-2" : ""} ${p.border} ${p.bg} rounded-[5px] p-6 lg:p-7 h-full flex flex-col transition-all duration-300 hover:translate-y-[-2px]`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-10 h-10 rounded-[4px] ${p.iconBg} flex items-center justify-center`}
                  >
                    <p.icon size={20} className={p.iconColor} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-[19px] text-ink leading-tight">
                      {p.name}
                    </h3>
                    <span
                      className={`font-mono text-[10px] ${p.phaseColor} uppercase tracking-[0.08em]`}
                    >
                      {p.phase}
                    </span>
                  </div>
                </div>

                <p className="font-display italic text-[16px] text-ink-light mb-3">
                  {p.tagline}
                </p>
                <p className="font-body text-[14px] text-ink-muted leading-[1.6] mb-2 flex-grow">
                  {p.desc}
                </p>
                <p className="font-body text-[13px] text-warm-gray italic mb-5">
                  {p.entry}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`font-mono text-[10px] ${p.tagColor} ${p.tagBg} px-2.5 py-1 rounded-[3px] tracking-[0.02em]`}
                    >
                      {tag}
                    </span>
                  ))}
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
   For Whom — "Для кого"
   ════════════════════════════════════════════════════════════════ */

function ForWhomSection() {
  const segments = [
    {
      icon: Users,
      title: "Коучи",
      label: "Старт",
      desc: "Tech-savvy, уже используют AI. Нет барьера с записью. Позитивное отношение к автоматизации.",
      stat: "WTP от ₽1 990/мес",
      accent: "teal",
    },
    {
      icon: Heart,
      title: "Психологи",
      label: "Ядро рынка",
      desc: "60–100K специалистов в РФ. «Audio never stored» снимает 80% возражений. Заходим с доказанной ценностью.",
      stat: "47% хотят AI-фидбэк",
      accent: "terracotta",
    },
    {
      icon: Scale,
      title: "Юристы",
      label: "Параллельно",
      desc: "88% уже используют AI. Высокий чек, высокая WTP. Адвокатская тайна — compliance из коробки.",
      stat: "₽3–10K за консультацию",
      accent: "sage",
    },
  ];

  const styles: Record<string, { border: string; bg: string; icon: string; label: string; stat: string }> = {
    teal: {
      border: "border-teal/15",
      bg: "bg-teal-subtle/15",
      icon: "text-teal",
      label: "text-teal",
      stat: "text-teal",
    },
    terracotta: {
      border: "border-terracotta/12",
      bg: "bg-terracotta-subtle/15",
      icon: "text-terracotta",
      label: "text-terracotta",
      stat: "text-terracotta",
    },
    sage: {
      border: "border-sage/15",
      bg: "bg-white/30",
      icon: "text-sage",
      label: "text-sage",
      stat: "text-sage",
    },
  };

  return (
    <section className="py-24 lg:py-32 bg-ivory-dark/30">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display font-semibold text-[34px] lg:text-[48px] leading-[1.12] tracking-[-0.01em] text-ink mb-16">
            Для кого
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {segments.map((seg, i) => {
            const s = styles[seg.accent];
            return (
              <Reveal key={i} delay={i * 0.12}>
                <div
                  className={`border ${s.border} ${s.bg} rounded-[5px] p-6 lg:p-7 h-full`}
                >
                  <seg.icon size={22} className={`${s.icon} mb-5`} strokeWidth={1.5} />
                  <div className="flex items-baseline gap-3 mb-3">
                    <h3 className="font-display font-semibold text-[22px] text-ink">
                      {seg.title}
                    </h3>
                    <span
                      className={`font-mono text-[10px] ${s.label} uppercase tracking-[0.08em]`}
                    >
                      {seg.label}
                    </span>
                  </div>
                  <p className="font-body text-[14px] text-ink-muted leading-[1.6] mb-5">
                    {seg.desc}
                  </p>
                  <p className={`font-mono text-[13px] font-medium ${s.stat}`}>
                    {seg.stat}
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
   Key Metrics Strip
   ════════════════════════════════════════════════════════════════ */

function MetricsStrip() {
  const metrics = [
    { value: "₽9", label: "стоимость AI за сессию" },
    { value: "95–97%", label: "точность транскрибации" },
    { value: "2 мин", label: "вместо 15 на заметки" },
    { value: "0", label: "конкурентов с AI в РФ" },
  ];

  return (
    <section className="py-16 lg:py-20 border-y border-parchment">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((m, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div>
                <span className="font-mono text-[36px] lg:text-[48px] font-semibold text-teal leading-none tracking-[-0.02em]">
                  {m.value}
                </span>
                <p className="font-body text-[13px] text-ink-muted mt-2 leading-snug">
                  {m.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   Security — "Ваши данные — ваши"
   ════════════════════════════════════════════════════════════════ */

function SecuritySection() {
  const points = [
    {
      icon: Shield,
      title: "ФЗ-152",
      desc: "Полное соответствие закону о персональных данных с первого дня",
    },
    {
      icon: Server,
      title: "Серверы в РФ",
      desc: "Selectel / Yandex Cloud. Данные не покидают Россию",
    },
    {
      icon: Mic,
      title: "Audio never stored",
      desc: "Аудио обрабатывается и удаляется. Хранятся только текстовые заметки",
    },
    {
      icon: FileCheck,
      title: "Цифровое согласие",
      desc: "Клиент подписывает согласие до начала записи. Hard gate, не soft prompt",
    },
    {
      icon: Lock,
      title: "Шифрование",
      desc: "End-to-end шифрование данных в покое и при передаче",
    },
  ];

  return (
    <section
      id="security"
      className="py-24 lg:py-32 bg-teal-dark text-ivory relative overflow-hidden"
    >
      {/* Decorative circles */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]"
        viewBox="0 0 1440 600"
        fill="none"
      >
        <circle cx="1250" cy="80" r="280" stroke="#FAF7F2" strokeWidth="0.8" />
        <circle cx="1250" cy="80" r="220" stroke="#FAF7F2" strokeWidth="0.5" />
        <circle cx="150" cy="520" r="180" stroke="#FAF7F2" strokeWidth="0.5" />
      </svg>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
        <Reveal>
          <p className="font-mono text-[12px] text-sage-light tracking-[0.1em] uppercase mb-4 flex items-center gap-2.5">
            <BrandDot size={5} className="bg-sage-light" />
            Безопасность
          </p>
          <h2 className="font-display font-semibold text-[34px] lg:text-[48px] leading-[1.12] tracking-[-0.01em] text-ivory mb-4">
            Ваши данные — ваши
          </h2>
          <p className="font-body text-[17px] text-sage-light/70 mb-16 max-w-[540px] leading-[1.6]">
            Аудио сессий не хранится. Только российские серверы. Только российские
            AI-модели. Согласие клиента — обязательно.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {points.map((point, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="border border-ivory/8 rounded-[4px] p-5 bg-ivory/[0.02] hover:bg-ivory/[0.05] transition-colors duration-300 group">
                <point.icon
                  size={20}
                  className="text-sage-light mb-3 group-hover:scale-110 transition-transform duration-300"
                  strokeWidth={1.5}
                />
                <h3 className="font-body font-semibold text-[15px] text-ivory mb-1.5">
                  {point.title}
                </h3>
                <p className="font-body text-[13px] text-sage-light/60 leading-relaxed">
                  {point.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
   Pricing
   ════════════════════════════════════════════════════════════════ */

function PricingSection() {
  const [yearly, setYearly] = useState(false);

  const tiers = [
    {
      name: "Free",
      price: 0,
      sessions: "10 AI-сессий/мес",
      features: [
        "Бронирование и календарь",
        "Telegram-бот для записи",
        "Напоминания клиентам",
        "Базовые заметки",
      ],
      recommended: false,
    },
    {
      name: "Starter",
      price: 990,
      sessions: "30 AI-сессий/мес",
      features: [
        "Всё из Free",
        "AI-заметки по шаблонам",
        "Транскрипт клиенту",
        "Базовая аналитика",
        "Приём оплаты",
      ],
      recommended: false,
    },
    {
      name: "Professional",
      price: 1990,
      sessions: "80 AI-сессий/мес",
      features: [
        "Всё из Starter",
        "Реактивация клиентов",
        "Расширенная аналитика",
        "Рассылки и триггеры",
        "Бенчмарки по рынку",
        "ROI-дашборд",
      ],
      recommended: true,
    },
    {
      name: "Clinic",
      price: 2990,
      sessions: "Безлимит",
      features: [
        "Всё из Professional",
        "AI-супервизор",
        "Real-time фактура",
        "Команда и multi-location",
        "Приоритетная поддержка",
      ],
      recommended: false,
    },
  ];

  const formatPrice = (price: number) => {
    if (price === 0) return "0";
    const p = yearly ? Math.round(price * 0.8) : price;
    return p.toLocaleString("ru-RU");
  };

  return (
    <section id="pricing" className="py-24 lg:py-32">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <Reveal>
          <p className="font-mono text-[12px] text-teal tracking-[0.1em] uppercase mb-4 flex items-center gap-2.5">
            <BrandDot size={5} className="bg-teal" />
            Тарифы
          </p>
          <h2 className="font-display font-semibold text-[34px] lg:text-[48px] leading-[1.12] tracking-[-0.01em] text-ink mb-4">
            Выберите план
          </h2>
          <p className="font-body text-[17px] text-ink-muted leading-relaxed mb-10 max-w-[460px]">
            Начните бесплатно. 14 дней полного доступа, затем выберите подходящий тариф.
          </p>
        </Reveal>

        {/* Toggle */}
        <Reveal delay={0.1}>
          <div className="flex items-center gap-4 mb-12">
            <span
              className={`font-body text-[14px] transition-colors ${
                !yearly ? "text-ink font-medium" : "text-ink-muted"
              }`}
            >
              Месяц
            </span>
            <button
              onClick={() => setYearly(!yearly)}
              className={`relative w-11 h-[22px] rounded-full transition-colors duration-300 ${
                yearly ? "bg-teal" : "bg-parchment"
              }`}
              aria-label="Переключить период"
            >
              <motion.div
                className="absolute top-[3px] w-4 h-4 bg-white rounded-full shadow-sm"
                animate={{ left: yearly ? 24 : 3 }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            </button>
            <span
              className={`font-body text-[14px] transition-colors ${
                yearly ? "text-ink font-medium" : "text-ink-muted"
              }`}
            >
              Год{" "}
              <span className="font-mono text-[11px] text-teal font-medium ml-1">
                −20%
              </span>
            </span>
          </div>
        </Reveal>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {tiers.map((tier, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div
                className={`rounded-[5px] p-6 h-full flex flex-col relative transition-all duration-300 hover:translate-y-[-2px] ${
                  tier.recommended
                    ? "border-2 border-teal bg-teal-subtle/15"
                    : "border border-parchment bg-white/40"
                }`}
              >
                {tier.recommended && (
                  <span className="absolute -top-3 left-5 font-mono text-[10px] text-ivory bg-teal px-3 py-[3px] rounded-[3px] uppercase tracking-[0.06em] font-medium">
                    Рекомендуем
                  </span>
                )}

                <h3 className="font-body font-semibold text-[17px] text-ink mb-2">
                  {tier.name}
                </h3>

                <div className="flex items-baseline gap-1 mb-0.5">
                  <motion.span
                    key={`${tier.price}-${yearly}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-mono text-[34px] font-semibold text-ink leading-none tracking-[-0.02em]"
                  >
                    ₽{formatPrice(tier.price)}
                  </motion.span>
                  {tier.price > 0 && (
                    <span className="font-body text-[13px] text-warm-gray">/мес</span>
                  )}
                </div>

                <span className="font-mono text-[11px] text-teal font-medium mb-5 block">
                  {tier.sessions}
                </span>

                <ul className="space-y-2.5 mb-6 flex-grow">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <Check
                        size={14}
                        className="text-teal shrink-0 mt-[3px]"
                        strokeWidth={2.5}
                      />
                      <span className="font-body text-[13px] text-ink-muted leading-snug">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-[4px] font-body font-medium text-[14px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                    tier.recommended
                      ? "bg-terracotta text-ivory hover:bg-terracotta-dark"
                      : tier.price === 0
                        ? "bg-parchment text-ink hover:bg-warm-gray-light"
                        : "border border-teal text-teal hover:bg-teal-subtle"
                  }`}
                >
                  {tier.price === 0 ? "Начать бесплатно" : "Выбрать план"}
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
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-subtle/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
        <Reveal>
          <h2 className="font-display font-semibold text-[34px] sm:text-[42px] lg:text-[52px] leading-[1.1] tracking-[-0.015em] text-ink mb-6 max-w-[600px]">
            Начните экономить
            <br />
            7&nbsp;часов в&nbsp;неделю
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-body text-[17px] text-ink-muted leading-relaxed mb-9 max-w-[440px]">
            14 дней полного доступа. Без карты. Отмена в один клик.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <a
            href="#"
            className="inline-flex items-center gap-2.5 font-body font-semibold text-[16px] text-ivory bg-terracotta px-8 py-[14px] rounded-[4px] hover:bg-terracotta-dark transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_8px_24px_rgba(194,83,58,0.25)]"
          >
            Попробовать бесплатно
            <ArrowRight size={17} strokeWidth={2} />
          </a>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="font-mono text-[12px] text-warm-gray mt-8 tracking-[0.02em]">
            178 практиков до безубыточности — присоединяйтесь первыми
          </p>
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
              AI-копайлот для частных практиков.
              <br />
              Записывает, запоминает, думает за вас.
            </p>
          </div>

          <div>
            <h4 className="font-body font-semibold text-[12px] text-ink uppercase tracking-[0.08em] mb-4">
              Продукт
            </h4>
            <ul className="space-y-2.5">
              {["Как работает", "Тарифы", "Безопасность"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-body text-[13px] text-ink-muted hover:text-ink transition-colors"
                  >
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
                  <a
                    href="#"
                    className="font-body text-[13px] text-ink-muted hover:text-ink transition-colors"
                  >
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
              {["Конфиденциальность", "Пользовательское соглашение", "ФЗ-152"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="font-body text-[13px] text-ink-muted hover:text-ink transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-parchment flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <span className="font-body text-[12px] text-warm-gray">
            2026 Зоя.Практис. Все права защищены.
          </span>
          <span className="font-mono text-[10px] text-warm-gray-light tracking-[0.04em]">
            Серверы в РФ · ФЗ-152 · Данные не покидают Россию
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
      <SolutionSection />
      <ProductsSection />
      <ForWhomSection />
      <MetricsStrip />
      <SecuritySection />
      <PricingSection />
      <CTASection />
      <Footer />
    </>
  );
}
