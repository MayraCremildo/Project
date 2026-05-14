import { useMemo, useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, Legend } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { CATEGORIES, formatMonthLabel, getMonthKey } from '../../lib/storage';
import { formatMoney } from '../../lib/currency';
import MonthPicker from './MonthPicker';

function CustomTooltip({ active, payload, currency }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-earth-border px-4 py-3 shadow-md">
      {payload.map((p, i) => (
        <div key={i} className="text-xs">
          <span className="text-earth-muted">{p.name}: </span>
          <span className="font-semibold text-earth-text">{formatMoney(p.value, currency)}</span>
        </div>
      ))}
    </div>
  );
}

export default function MonthlyReport({ months, currency }) {
  const [selected, setSelected] = useState(getMonthKey());

  useEffect(() => {
    if (!months[selected]) {
      const keys = Object.keys(months).sort();
      if (keys.length > 0) setSelected(keys[keys.length - 1]);
    }
  }, []); // eslint-disable-line

  const monthData = months[selected];

  const pieData = useMemo(() => {
    if (!monthData) return [];
    const byCat = {};
    (monthData.expenses || []).forEach((e) => {
      byCat[e.category] = (byCat[e.category] || 0) + Number(e.value || 0);
    });
    return CATEGORIES
      .map((c) => ({ name: c.label, value: byCat[c.id] || 0, color: c.color }))
      .filter((d) => d.value > 0);
  }, [monthData]);

  const totalSpent = pieData.reduce((s, d) => s + d.value, 0);

  const compareData = useMemo(() => {
    const keys = Object.keys(months).sort();
    const last6 = keys.slice(-6);
    return last6.map((k) => {
      const m = months[k];
      const spent = (m?.expenses || []).reduce((s, e) => s + Number(e.value || 0), 0);
      return {
        month: formatMonthLabel(k).split(' ')[0].slice(0, 3),
        Salário: Number(m?.salary || 0),
        Despesas: spent,
        fullKey: k,
      };
    });
  }, [months]);

  return (
    <section className="bg-earth-surface rounded-3xl border border-earth-border p-7 md:p-10 shadow-sm" data-testid="monthly-report">
      <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-earth-primary/10 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-earth-primary" strokeWidth={1.6} />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-earth-muted">Relatório</p>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-earth-text">Análise por mês</h2>
          </div>
        </div>
        <MonthPicker value={selected} onChange={setSelected} testIdPrefix="report-month" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie */}
        <div className="bg-earth-bg/60 rounded-2xl p-6 border border-earth-border/60" data-testid="report-pie-section">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-earth-muted mb-1">
            {formatMonthLabel(selected)}
          </p>
          <p className="font-heading text-xl text-earth-text mb-1">Despesas por categoria</p>
          <p className="text-sm text-earth-muted mb-5">
            Total gasto: <span className="text-earth-text font-medium">{formatMoney(totalSpent, currency)}</span>
          </p>

          {pieData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-sm text-earth-muted">
              Sem despesas registradas neste mês.
            </div>
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {pieData.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip currency={currency} />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {pieData.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2" data-testid="report-pie-legend">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-earth-muted">{d.name}</span>
                  <span className="ml-auto text-earth-text font-medium">{formatMoney(d.value, currency)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bar */}
        <div className="bg-earth-bg/60 rounded-2xl p-6 border border-earth-border/60" data-testid="report-bar-section">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-earth-muted mb-1">
            Últimos meses
          </p>
          <p className="font-heading text-xl text-earth-text mb-1">Salário vs. Despesas</p>
          <p className="text-sm text-earth-muted mb-5">Comparação dos últimos 6 meses registrados.</p>

          {compareData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-sm text-earth-muted">
              Sem histórico para comparar ainda.
            </div>
          ) : (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={compareData} barGap={6}>
                  <CartesianGrid stroke="#E5E4E2" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" stroke="#6B6A68" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6B6A68" fontSize={12} tickLine={false} axisLine={false} width={50} />
                  <Tooltip content={<CustomTooltip currency={currency} />} cursor={{ fill: '#F0EFEB' }} />
                  <Legend wrapperStyle={{ fontSize: 12, color: '#6B6A68' }} />
                  <Bar dataKey="Salário" fill="#4A7C59" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="Despesas" fill="#D49A89" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
