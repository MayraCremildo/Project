# PRD — Orçamento Pessoal (Personal Finance Dashboard)

## Original Problem Statement
"eu quero criar um site, onde eu ao abrir coloco o meu nome, tera uma recepcao em cima no canto superior esquerdo, comum Ola (nome) depois um lugar para adicionar o meu salario, um lugar para descrever quantos porcentos daquele salario quero depositar para as categorias, investimentos, necessidades, e despesas fixas, tambem tera um lugar apara adicionar nova despesa, depois o site deve mostrar quanto sobrou depois de colocar essas despesas, quero tambem que a pessoa adicione moeda, e tambem no final da pagina relatorio de todos os meses, a pessoa escolhe o mes e ve o relatorio"

## User Choices (2026-02)
- Storage: localStorage (no backend, no login)
- Currencies: Multiple international (BRL, USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR, MXN, ARS)
- Categories: Investimentos, Necessidades, Despesas Fixas, **Lazer**
- Reports: charts + month comparison
- Style: Modern minimalist (light) — "Organic & Earthy" theme
- Onboarding asks for name + currency together

## Architecture
- React 19 + Tailwind + recharts + lucide-react
- State entirely in `localStorage` under key `finance_app_state_v1`
- Structure: `{ userName, currency, months: { "YYYY-MM": { salary, allocations, expenses[] } } }`

## Implemented (2026-02)
- Onboarding screen (name + currency)
- Sticky header with greeting and currency selector
- Salary input with month picker
- Allocation card (4 categories, sliders + % inputs, 100% validation)
- 4 budget cards (allocated / spent / remaining per category, progress bars, over-budget warning)
- Add expense form (description, value, category)
- Expenses list (delete on hover)
- Remaining balance hero card
- Monthly report (pie chart per category + bar chart comparing last 6 months)
- Reset button to clear all data

## Backlog
- P1: Export report to CSV/PDF
- P1: Recurring expenses (auto-create each month)
- P2: Goals (savings target per category)
- P2: Multi-user (cloud sync via login)
- P2: Dark theme toggle
