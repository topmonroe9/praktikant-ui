# Мила.Практис — Дизайн-токены и бренд-система

Справочный документ для разработчиков и дизайнеров.
Workspace-инструмент для частных практиков (психологи, коучи, нутрициологи, репетиторы, юристы).

---

## Принципы

- **Warm minimalism** — чистые интерфейсы без стерильности
- Bento-grid layouts, border-radius 8-12px
- Glassmorphism — только в модалках и floating panels
- Desktop-first, mobile-essential (отдельный мобильный UX, не responsive shrink)
- AI как «писарь», не «аналитик» — auto-draft с обязательной проверкой
- Progressive disclosure: 3 уровня сложности
- Без фиолетового в UI (культурная коннотация «мне фиолетово» = безразличие)

---

## Логотип

**Мила** (Onest Bold) **·** (Soft Coral dot, увеличенная, слегка приподнятая) **Практис** (Onest Medium)

Точка — ключевой брендовый элемент. Цвет точки: `#F4845F`.

---

## Цвета

### Primary (Warm Teal)

| Токен | Hex | Применение |
|---|---|---|
| `primary` | `#2A9D8F` | Основные кнопки, active nav, ссылки |
| `primary-dark` | `#1B7F72` | Hover-состояния |
| `primary-light` | `#A7DDD6` | Badge backgrounds, highlights |
| `primary-lightest` | `#E6F5F3` | Selected row, subtle backgrounds |

### Secondary и Accent

| Токен | Hex | Применение |
|---|---|---|
| `secondary` | `#5B6ABF` | Secondary buttons, complementary accents |
| `accent` | `#F4845F` | CTA-кнопки, важные уведомления, upgrade prompts |

### Semantic

| Токен | Hex | Light Hex | Применение |
|---|---|---|---|
| `success` | `#22C55E` | `#DCFCE7` | Подтверждения, успех |
| `warning` | `#F59E0B` | `#FEF3C7` | Предупреждения |
| `error` | `#EF4444` | `#FEE2E2` | Ошибки, деструктивные действия |
| `info` | `#3B82F6` | `#DBEAFE` | Информационные сообщения |

### Neutral Scale (Light Mode)

| Токен | Hex | Применение |
|---|---|---|
| `bg-page` | `#FFFFFF` | Фон страницы |
| `bg-card` | `#F9FAFB` | Фон карточек |
| `bg-hover` | `#F3F4F6` | Hover, alternating rows |
| `border-light` | `#E5E7EB` | Лёгкие разделители |
| `border-input` | `#D1D5DB` | Рамки полей ввода |
| `text-placeholder` | `#9CA3AF` | Placeholder |
| `text-secondary` | `#6B7280` | Вторичный текст |
| `text-body` | `#4B5563` | Основной текст |
| `text-subheading` | `#374151` | Подзаголовки |
| `text-heading` | `#1F2937` | Заголовки |

### Dark Mode (архитектурно заложен)

| Токен | Hex |
|---|---|
| `bg-page` | `#0F172A` (Slate 900) |
| `text-body` | `#F1F5F9` |
| `primary` | `#36C5B5` (lightened) |

### Цвета модулей (только иконки и индикаторы)

| Модуль | Hex |
|---|---|
| Календарь | `#3B82F6` |
| CRM / Клиенты | `#EC4899` |
| Видео-сессии | `#F59E0B` |
| AI-заметки | `#8B5CF6` |
| Аналитика | `#10B981` |

---

## Типографика

### Шрифты

| Назначение | Шрифт | Источник |
|---|---|---|
| UI (весь интерфейс) | **Onest** | Google Fonts, variable |
| Mono (код, данные) | **Geist Mono** | — |

Onest — geometric/humanist гибрид, нативная кириллица (Дмитрий Волошин), 7 начертаний (Thin-ExtraBold).

### Type Scale (dashboard)

| Роль | Размер | Weight | Line-height |
|---|---|---|---|
| H1 | 24-30px | 700 | 1.2 |
| H2 | 20-24px | 600 | 1.3 |
| H3 | 16-18px | 600 | 1.3 |
| Body | 14-16px | 400 | 1.5 |
| Secondary | 13-14px | 400 | 1.4 |
| Caption / Label | 12-13px | 500 | 1.4 |
| KPI numbers | 24-36px | 600-700 | 1.1 |
| Button text | 14px | 500 | 1 |

**Правило:** максимум 4-5 размеров шрифта в dashboard. Иерархия через weight (400 vs 600), не через размер.

---

## Spacing

Base grid: 4px. Primary step: 8px.

| Токен | Значение |
|---|---|
| `space-0.5` | 2px |
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-10` | 40px |
| `space-12` | 48px |
| `space-16` | 64px |

---

## Border Radius

| Токен | Значение | Применение |
|---|---|---|
| `radius-sm` | 4px | Badges |
| `radius-md` | 6px | Buttons, inputs |
| `radius-lg` | 8px | Cards |
| `radius-xl` | 12px | Modals |
| `radius-2xl` | 16px | Large panels |
| `radius-full` | 9999px | Avatars, pills |

**Правило:** inner radius = outer radius - padding.

---

## Layout

| Параметр | Значение |
|---|---|
| Sidebar expanded | 240px |
| Sidebar collapsed | 56px |
| Подход | Desktop-first, mobile-essential |
| Grid | Bento-grid |
| Glassmorphism | Только modals и floating panels |
