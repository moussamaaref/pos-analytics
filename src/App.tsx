import { useState, ReactNode } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { Component as BackgroundComponent } from "@/components/ui/background-components";

// ─── Types ───────────────────────────────────────────────────────────────────

type NavId =
  | "dashboard"
  | "performance-pos"
  | "produits"
  | "ventes"
  | "stock"
  | "commercial"
  | "previsions";

type Period = "today" | "yesterday" | "week" | "month" | "quarter" | "year" | "custom";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const wilayas = ["Toutes les wilayas", "Alger", "Oran", "Constantine", "Annaba", "Sétif", "Blida", "Tlemcen"];
const pointsDeVente = ["Tous les PDV", "POS Alger Centre", "POS Bab Ezzouar", "POS Oran Bir El Djir", "POS Constantine Centre", "POS Annaba Est", "POS Sétif Ville"];
const marques = ["Toutes les marques", "Samsung", "Huawei", "Apple", "Oppo", "Xiaomi", "Nokia", "Sony"];
const categories = ["Toutes les catégories", "Smartphones", "Tablettes", "Accessoires", "Audio", "Informatique", "TV & Vidéo"];

const monthlyVentes = [
  { mois: "Jan", ca: 4200000, ventes: 312, commandes: 89 },
  { mois: "Fév", ca: 3800000, ventes: 287, commandes: 74 },
  { mois: "Mar", ca: 5100000, ventes: 398, commandes: 102 },
  { mois: "Avr", ca: 4700000, ventes: 356, commandes: 91 },
  { mois: "Mai", ca: 6300000, ventes: 487, commandes: 118 },
  { mois: "Jun", ca: 5800000, ventes: 442, commandes: 109 },
  { mois: "Jul", ca: 6100000, ventes: 463, commandes: 121 },
  { mois: "Aoû", ca: 5400000, ventes: 411, commandes: 98 },
  { mois: "Sep", ca: 7200000, ventes: 554, commandes: 143 },
  { mois: "Oct", ca: 6800000, ventes: 521, commandes: 135 },
  { mois: "Nov", ca: 8100000, ventes: 623, commandes: 162 },
  { mois: "Déc", ca: 9400000, ventes: 724, commandes: 189 },
];

const categorieData = [
  { name: "Smartphones", value: 42 },
  { name: "Tablettes", value: 18 },
  { name: "Accessoires", value: 15 },
  { name: "Audio", value: 12 },
  { name: "Informatique", value: 8 },
  { name: "TV & Vidéo", value: 5 },
];

const marqueData = [
  { marque: "Samsung", ca: 12400000, parts: 34 },
  { marque: "Huawei", ca: 8700000, parts: 24 },
  { marque: "Apple", ca: 7200000, parts: 20 },
  { marque: "Oppo", ca: 3600000, parts: 10 },
  { marque: "Xiaomi", ca: 2900000, parts: 8 },
  { marque: "Autres", ca: 1500000, parts: 4 },
];

const posPerf = [
  { pos: "Alger Centre", ca: 9800000, ventes: 734, commandes: 189, produits: 1823, trend: 12.4 },
  { pos: "Bab Ezzouar", ca: 7200000, ventes: 541, commandes: 138, produits: 1342, trend: 8.7 },
  { pos: "Oran Bir El Djir", ca: 6100000, ventes: 462, commandes: 118, produits: 1148, trend: -3.2 },
  { pos: "Constantine Centre", ca: 5400000, ventes: 408, commandes: 104, produits: 1012, trend: 15.6 },
  { pos: "Annaba Est", ca: 3900000, ventes: 294, commandes: 75, produits: 731, trend: 6.1 },
  { pos: "Sétif Ville", ca: 3100000, ventes: 234, commandes: 60, produits: 582, trend: -1.4 },
];

const stockData = [
  { ref: "SM-S925B/256", produit: "Samsung S25 Ultra 256Go", disponible: 12, entrees: 40, sorties: 28, rotation: 2.3, statut: "ok" },
  { ref: "HW-P60-PRO", produit: "Huawei P60 Pro", disponible: 3, entrees: 15, sorties: 12, rotation: 4.0, statut: "low" },
  { ref: "IP-16-PRO-256", produit: "iPhone 16 Pro 256Go", disponible: 7, entrees: 20, sorties: 13, rotation: 1.9, statut: "ok" },
  { ref: "OP-RENO12-256", produit: "Oppo Reno12 256Go", disponible: 1, entrees: 10, sorties: 9, rotation: 9.0, statut: "critical" },
  { ref: "XM-14-128", produit: "Xiaomi 14 128Go", disponible: 18, entrees: 30, sorties: 12, rotation: 0.7, statut: "ok" },
  { ref: "SM-TAB-S9", produit: "Samsung Galaxy Tab S9", disponible: 0, entrees: 8, sorties: 8, rotation: 0, statut: "rupture" },
  { ref: "HW-WATCH4-PRO", produit: "Huawei Watch 4 Pro", disponible: 24, entrees: 30, sorties: 6, rotation: 0.3, statut: "ok" },
  { ref: "AP-AW-S10", produit: "Apple Watch Series 10", disponible: 2, entrees: 12, sorties: 10, rotation: 5.0, statut: "low" },
];

const objectifData = [
  { pos: "Alger Centre", objectif: 10000000, realise: 9800000, prog: 98, points: 4900 },
  { pos: "Bab Ezzouar", objectif: 8000000, realise: 7200000, prog: 90, points: 3600 },
  { pos: "Oran Bir El Djir", objectif: 7000000, realise: 6100000, prog: 87, points: 3050 },
  { pos: "Constantine Centre", objectif: 5000000, realise: 5400000, prog: 108, points: 5400 },
  { pos: "Annaba Est", objectif: 4500000, realise: 3900000, prog: 87, points: 1950 },
  { pos: "Sétif Ville", objectif: 3500000, realise: 3100000, prog: 89, points: 1550 },
];

const previsionData = [
  { mois: "Oct", reel: 6800000, prevision: null },
  { mois: "Nov", reel: 8100000, prevision: null },
  { mois: "Déc", reel: 9400000, prevision: null },
  { mois: "Jan", reel: null, prevision: 7800000 },
  { mois: "Fév", reel: null, prevision: 8200000 },
  { mois: "Mar", reel: null, prevision: 9100000 },
];

const produitsArbre = [
  {
    marque: "Samsung",
    categories: [
      {
        nom: "Smartphones",
        produits: [
          { ref: "SM-S925B/256", nom: "Galaxy S25 Ultra 256Go", vendus: 142, commandes: 35, recus: 40, dispo: 12, nonDispo: 0 },
          { ref: "SM-A556B", nom: "Galaxy A55 5G", vendus: 98, commandes: 28, recus: 30, dispo: 18, nonDispo: 0 },
        ]
      },
      {
        nom: "Tablettes",
        produits: [
          { ref: "SM-X910", nom: "Galaxy Tab S9 Ultra", vendus: 34, commandes: 12, recus: 8, dispo: 0, nonDispo: 1 },
        ]
      }
    ]
  },
  {
    marque: "Apple",
    categories: [
      {
        nom: "Smartphones",
        produits: [
          { ref: "IP-16-PRO-256", nom: "iPhone 16 Pro 256Go", vendus: 87, commandes: 22, recus: 20, dispo: 7, nonDispo: 0 },
          { ref: "IP-16-512", nom: "iPhone 16 512Go", vendus: 41, commandes: 10, recus: 12, dispo: 8, nonDispo: 0 },
        ]
      }
    ]
  },
];

const dailyVentes = [
  { jour: "Lun", ca: 284000, qte: 21, panier: 13524 },
  { jour: "Mar", ca: 312000, qte: 24, panier: 13000 },
  { jour: "Mer", ca: 198000, qte: 15, panier: 13200 },
  { jour: "Jeu", ca: 421000, qte: 31, panier: 13581 },
  { jour: "Ven", ca: 387000, qte: 29, panier: 13345 },
  { jour: "Sam", ca: 542000, qte: 41, panier: 13220 },
  { jour: "Dim", ca: 234000, qte: 18, panier: 13000 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat("fr-DZ", { notation: "compact", compactDisplay: "short" }).format(n);

const fmtCurrency = (n: number) =>
  new Intl.NumberFormat("fr-DZ", { style: "decimal", maximumFractionDigits: 0 }).format(n) + " DA";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4"];

// ─── UI Primitives ────────────────────────────────────────────────────────────

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-gray-100 bg-white p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ children, sub }: { children: ReactNode; sub?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold tracking-[0.08em] uppercase text-gray-700">{children}</h2>
      {sub && <p className="mt-1 text-xs text-gray-500">{sub}</p>}
    </div>
  );
}

function KpiCard({
  label, value, sub, delta, accent = false,
}: {
  label: string; value: string; sub?: string; delta?: number; accent?: boolean;
}) {
  return (
    <Card className="flex flex-col gap-3">
      <span className="text-[11px] tracking-[0.12em] uppercase text-gray-700 font-medium">{label}</span>
      <span className={`text-2xl font-semibold mono ${accent ? "text-indigo-500" : "text-gray-900"}`}>
        {value}
      </span>
      {(sub || delta !== undefined) && (
        <div className="flex items-center gap-2">
          {delta !== undefined && (
            <span className={`text-xs font-medium mono ${delta >= 0 ? "stat-up" : "stat-down"}`}>
              {delta >= 0 ? "+" : ""}{delta}%
            </span>
          )}
          {sub && <span className="text-xs text-gray-500">{sub}</span>}
        </div>
      )}
    </Card>
  );
}

function Badge({ label, color }: { label: string; color: "blue" | "green" | "amber" | "red" | "gray" }) {
  const cls = {
    blue: "bg-indigo-50 text-indigo-600",
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    red: "bg-red-50 text-red-600",
    gray: "bg-gray-100 text-gray-600",
  }[color];
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-medium mono tracking-wide ${cls}`}>
      {label}
    </span>
  );
}

// ─── Filters Bar ──────────────────────────────────────────────────────────────

function FiltersBar({
  period, setPeriod,
  wilaya, setWilaya,
  pos, setPos,
  marque, setMarque,
  categorie, setCategorie,
}: {
  period: Period; setPeriod: (p: Period) => void;
  wilaya: string; setWilaya: (v: string) => void;
  pos: string; setPos: (v: string) => void;
  marque: string; setMarque: (v: string) => void;
  categorie: string; setCategorie: (v: string) => void;
}) {
  const periods: { id: Period; label: string }[] = [
    { id: "today", label: "Aujourd'hui" },
    { id: "yesterday", label: "Hier" },
    { id: "week", label: "Semaine" },
    { id: "month", label: "Mois" },
    { id: "quarter", label: "Trimestre" },
    { id: "year", label: "Année" },
    { id: "custom", label: "Personnalisé" },
  ];

  return (
    <div className="border-b border-gray-100 bg-white px-8 py-4 flex flex-wrap items-center gap-4">
      {/* Period tabs */}
      <div className="flex items-center gap-0.5 bg-gray-50 border border-gray-100 rounded-lg p-0.5">
        {periods.map((p) => (
          <button
            key={p.id}
            onClick={() => setPeriod(p.id)}
            className={`px-4 py-2 text-[12px] font-medium rounded-lg transition-colors ${
              period === p.id
                ? "bg-indigo-500 text-white"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="w-px h-5 bg-gray-200" />

      {[
        { value: wilaya, set: setWilaya, opts: wilayas },
        { value: pos, set: setPos, opts: pointsDeVente },
        { value: marque, set: setMarque, opts: marques },
        { value: categorie, set: setCategorie, opts: categories },
      ].map(({ value, set, opts }, i) => (
        <select
          key={i}
          value={value}
          onChange={(e) => set(e.target.value)}
          className="bg-white border border-gray-200 text-[12px] text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          {opts.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ))}

      <div className="ml-auto flex items-center gap-2">
        {["Excel", "CSV", "PDF"].map((fmt) => (
          <button
            key={fmt}
            className="px-4 py-2 text-[12px] font-medium text-gray-600 border border-gray-200 rounded-lg hover:text-gray-900 hover:border-indigo-500 hover:bg-gray-50 transition-colors"
          >
            ↓ {fmt}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Chart: Custom Tooltip ────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 text-xs shadow-sm">
      <p className="text-gray-700 mb-2 font-medium">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="mono" style={{ color: p.color }}>
          {p.name}: {typeof p.value === "number" && p.value > 100000
            ? fmtCurrency(p.value)
            : p.value}
        </p>
      ))}
    </div>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function DashboardGeneral() {
  return (
    <div className="space-y-8">
      <SectionTitle sub="Vue consolidée — données actualisées">Dashboard Général</SectionTitle>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <KpiCard label="CA Total" value="36,5M DA" delta={14.2} sub="vs période préc." />
        <KpiCard label="Nb Ventes" value="2 674" delta={9.8} sub="transactions" />
        <KpiCard label="Commandes" value="689" delta={6.3} sub="en cours + livrées" />
        <KpiCard label="Produits vendus" value="4 128" delta={11.5} sub="unités" />
        <KpiCard label="Points de vente" value="6" sub="actifs ce mois" accent />
        <KpiCard label="Panier moyen" value="13 651 DA" delta={3.1} sub="par transaction" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-gray-700">Évolution des ventes — CA mensuel</h3>
            <Badge label="Année en cours" color="blue" />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyVentes}>
              <defs>
                <linearGradient id="caGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="indigo-500" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="indigo-500" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="#e5e7eb" />
              <XAxis dataKey="mois" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => fmt(v)} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="ca" stroke="#6366f1" strokeWidth={2} fill="url(#caGrad)" name="CA" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-gray-700 mb-5">Ventes par catégorie</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={categorieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {categorieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Legend
                iconSize={6}
                iconType="square"
                formatter={(v) => <span style={{ color: "#6b7280", fontSize: 10 }}>{v}</span>}
              />
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-gray-700">Ventes par marque</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={marqueData} layout="vertical">
              <CartesianGrid strokeDasharray="2 4" stroke="#e5e7eb" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => fmt(v)} />
              <YAxis type="category" dataKey="marque" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} width={60} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="ca" name="CA" fill="#6366f1" radius={[0, 2, 2, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-gray-700 mb-5">Comparaison Période sur Période</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyVentes.slice(6)}>
              <CartesianGrid strokeDasharray="2 4" stroke="#e5e7eb" />
              <XAxis dataKey="mois" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => fmt(v)} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="ventes" name="Ventes N" fill="#6366f1" />
              <Bar dataKey="commandes" name="Commandes N" fill="#e0e7ff" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function PerformancePOS() {
  return (
    <div className="space-y-8">
      <SectionTitle sub="Analyse par point de vente selon périmètre d'accès">Performance des Points de Vente</SectionTitle>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <KpiCard label="CA consolidé" value="35,5M DA" delta={8.3} />
        <KpiCard label="Total ventes" value="2 674" delta={9.8} />
        <KpiCard label="Commandes" value="684" delta={5.1} />
        <KpiCard label="Produits vendus" value="4 638" delta={11.2} />
      </div>

      {/* Bar chart par POS */}
      <Card>
        <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-gray-700 mb-5">CA par point de vente</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={posPerf}>
            <CartesianGrid strokeDasharray="2 4" stroke="#e5e7eb" />
            <XAxis dataKey="pos" tick={{ fill: "#9ca3af", fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => fmt(v)} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="ca" name="CA" fill="#6366f1" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Table */}
      <Card>
        <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-gray-700 mb-4">Détail performances</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                {["Point de vente", "CA", "Ventes", "Commandes", "Produits vendus", "Évolution"].map((h) => (
                  <th key={h} className="pb-2 pr-4 text-left text-gray-700 font-medium tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posPerf.map((r) => (
                <tr key={r.pos} className="border-b border-[gray-100] hover:bg-[gray-100] transition-colors">
                  <td className="py-2.5 pr-4 text-gray-900 font-medium">{r.pos}</td>
                  <td className="py-2.5 pr-4 mono text-gray-900">{fmtCurrency(r.ca)}</td>
                  <td className="py-2.5 pr-4 mono">{r.ventes.toLocaleString("fr")}</td>
                  <td className="py-2.5 pr-4 mono">{r.commandes}</td>
                  <td className="py-2.5 pr-4 mono">{r.produits.toLocaleString("fr")}</td>
                  <td className="py-2.5">
                    <span className={`mono font-medium ${r.trend >= 0 ? "stat-up" : "stat-down"}`}>
                      {r.trend >= 0 ? "+" : ""}{r.trend}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function AnalyseProduits() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ Samsung: true });

  return (
    <div className="space-y-8">
      <SectionTitle sub="Arborescence Marque → Catégorie → Produit → Référence">Analyse Produits</SectionTitle>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-3">
        <KpiCard label="Produits vendus" value="4 128" delta={11.5} />
        <KpiCard label="Produits commandés" value="689" delta={6.3} />
        <KpiCard label="Produits réceptionnés" value="623" delta={4.8} />
        <KpiCard label="Disponibles" value="2 341" sub="références en stock" accent />
        <KpiCard label="Non disponibles" value="47" sub="ruptures" />
      </div>

      {/* Tree */}
      <Card>
        <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-gray-700 mb-4">Arborescence produits</h3>
        <div className="space-y-1">
          {produitsArbre.map((marqueNode) => (
            <div key={marqueNode.marque}>
              {/* Marque level */}
              <button
                onClick={() => setExpanded((e) => ({ ...e, [marqueNode.marque]: !e[marqueNode.marque] }))}
                className="w-full flex items-center gap-3 py-2 px-3 rounded-sm hover:bg-[gray-100] transition-colors text-left"
              >
                <span className="text-indigo-500 text-xs mono w-3">{expanded[marqueNode.marque] ? "▾" : "▸"}</span>
                <span className="text-sm font-semibold text-gray-900">{marqueNode.marque}</span>
                <Badge label={`${marqueNode.categories.length} catégories`} color="blue" />
              </button>

              {expanded[marqueNode.marque] && (
                <div className="ml-6 border-l border-gray-100 pl-4 space-y-1">
                  {marqueNode.categories.map((cat) => (
                    <div key={cat.nom}>
                      <div className="flex items-center gap-2 py-1.5 px-2">
                        <span className="text-xs font-medium text-gray-700">◆</span>
                        <span className="text-xs font-semibold text-gray-700">{cat.nom}</span>
                        <Badge label={`${cat.produits.length} produits`} color="gray" />
                      </div>

                      <div className="ml-5 border-l border-[gray-100] pl-4">
                        <table className="w-full text-xs mb-2">
                          <thead>
                            <tr className="text-gray-500 uppercase tracking-wide">
                              <th className="pb-1 pr-4 text-left font-medium">Référence</th>
                              <th className="pb-1 pr-4 text-left font-medium">Produit</th>
                              <th className="pb-1 pr-4 text-right font-medium mono">Vendus</th>
                              <th className="pb-1 pr-4 text-right font-medium mono">Commandés</th>
                              <th className="pb-1 pr-4 text-right font-medium mono">Reçus</th>
                              <th className="pb-1 pr-4 text-right font-medium mono">Dispo</th>
                              <th className="pb-1 text-right font-medium mono">Non dispo</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cat.produits.map((p) => (
                              <tr key={p.ref} className="border-b border-gray-50 hover:bg-[gray-100]">
                                <td className="py-2 pr-4 mono text-indigo-500">{p.ref}</td>
                                <td className="py-2 pr-4 text-gray-700">{p.nom}</td>
                                <td className="py-2 pr-4 mono text-right text-gray-900">{p.vendus}</td>
                                <td className="py-2 pr-4 mono text-right">{p.commandes}</td>
                                <td className="py-2 pr-4 mono text-right">{p.recus}</td>
                                <td className="py-2 pr-4 mono text-right stat-up">{p.dispo}</td>
                                <td className="py-2 mono text-right stat-down">{p.nonDispo}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function AnalyseVentes() {
  const [granularity, setGranularity] = useState<"day" | "week" | "month">("day");

  const data = granularity === "day" ? dailyVentes : granularity === "week"
    ? [
      { jour: "S.38", ca: 2178000, qte: 164, panier: 13280 },
      { jour: "S.39", ca: 2534000, qte: 191, panier: 13267 },
      { jour: "S.40", ca: 1987000, qte: 150, panier: 13247 },
      { jour: "S.41", ca: 2841000, qte: 214, panier: 13276 },
    ]
    : monthlyVentes.slice(0, 9).map((m) => ({ jour: m.mois, ca: m.ca, qte: m.ventes, panier: Math.round(m.ca / m.ventes) }));

  return (
    <div className="space-y-8">
      <SectionTitle sub="Analyse quotidienne, hebdomadaire et mensuelle">Analyse des Ventes</SectionTitle>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <KpiCard label="CA période" value="15,2M DA" delta={12.7} />
        <KpiCard label="Qté vendue" value="1 148" delta={9.4} />
        <KpiCard label="Panier moyen" value="13 245 DA" delta={3.0} />
        <KpiCard label="Évolution" value="+12,7%" sub="vs période préc." accent />
      </div>

      <Card>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-gray-700">Évolution CA</h3>
          <div className="flex gap-1 bg-white border border-gray-100 rounded-sm p-0.5">
            {(["day", "week", "month"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGranularity(g)}
                className={`px-3 py-1 text-[10px] font-medium rounded-sm transition-colors ${
                  granularity === g ? "bg-indigo-500 text-white" : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {g === "day" ? "Quotidien" : g === "week" ? "Hebdo" : "Mensuel"}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="ventesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="green-600" stopOpacity={0.2} />
                <stop offset="95%" stopColor="green-600" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 4" stroke="#e5e7eb" />
            <XAxis dataKey="jour" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => fmt(v)} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="ca" stroke="green-600" strokeWidth={2} fill="url(#ventesGrad)" name="CA" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-gray-700 mb-4">Panier moyen</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="2 4" stroke="#e5e7eb" />
              <XAxis dataKey="jour" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => fmt(v)} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="panier" stroke="#f59e0b" strokeWidth={2} dot={false} name="Panier" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-gray-700 mb-4">Quantité vendue</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="2 4" stroke="#e5e7eb" />
              <XAxis dataKey="jour" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="qte" name="Quantité" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function AnalyseStock() {
  const statutConfig: Record<string, { label: string; color: "green" | "amber" | "red" | "gray" }> = {
    ok: { label: "OK", color: "green" },
    low: { label: "Faible", color: "amber" },
    critical: { label: "Critique", color: "red" },
    rupture: { label: "Rupture", color: "red" },
  };

  return (
    <div className="space-y-8">
      <SectionTitle sub="Stock actuel, mouvements et rotation">Analyse du Stock</SectionTitle>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <KpiCard label="Stock actuel" value="4 892 u." sub="toutes références" />
        <KpiCard label="Entrées (mois)" value="+ 1 243" delta={8.2} />
        <KpiCard label="Sorties (mois)" value="− 987" sub="ventes + transferts" />
        <KpiCard label="Rotation moy." value="2,4×" sub="ce mois" accent />
      </div>

      {/* Entrées / Sorties chart */}
      <Card>
        <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-gray-700 mb-5">Mouvements de stock — 12 mois</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlyVentes}>
            <CartesianGrid strokeDasharray="2 4" stroke="#e5e7eb" />
            <XAxis dataKey="mois" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="ventes" name="Sorties" fill="#ef4444" radius={[2, 2, 0, 0]} />
            <Bar dataKey="commandes" name="Entrées" fill="#10b981" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Stock table */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-gray-700">Références — disponibilité</h3>
          <Badge label="Alertes : 4 références" color="amber" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                {["Référence", "Produit", "Disponible", "Entrées", "Sorties", "Rotation", "Statut"].map((h) => (
                  <th key={h} className="pb-2 pr-4 text-left text-gray-700 font-medium tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stockData.map((r) => {
                const s = statutConfig[r.statut];
                return (
                  <tr key={r.ref} className="border-b border-[gray-100] hover:bg-[gray-100] transition-colors">
                    <td className="py-2.5 pr-4 mono text-indigo-500">{r.ref}</td>
                    <td className="py-2.5 pr-4 text-gray-700">{r.produit}</td>
                    <td className="py-2.5 pr-4 mono text-gray-900 font-semibold">{r.disponible}</td>
                    <td className="py-2.5 pr-4 mono stat-up">+{r.entrees}</td>
                    <td className="py-2.5 pr-4 mono stat-down">−{r.sorties}</td>
                    <td className="py-2.5 pr-4 mono">{r.rotation}×</td>
                    <td className="py-2.5"><Badge label={s.label} color={s.color} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function PerformanceCommerciale() {
  return (
    <div className="space-y-8">
      <SectionTitle sub="Objectifs vs réalisé — suivi des incitations et points">Performance Commerciale</SectionTitle>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <KpiCard label="Obj. global" value="38M DA" sub="cible mois" />
        <KpiCard label="Réalisé" value="35,5M DA" delta={93.4} sub="taux atteinte" />
        <KpiCard label="Points cumulés" value="20 450" sub="tous PDV" accent />
        <KpiCard label="Incitations" value="4" sub="PDV éligibles" />
      </div>

      {/* Progress bars */}
      <Card>
        <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-gray-700 mb-6">Objectif vs Réalisé par point de vente</h3>
        <div className="space-y-5">
          {objectifData.map((r) => {
            const pct = Math.min(r.prog, 100);
            const over = r.prog > 100;
            return (
              <div key={r.pos}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-gray-700">{r.pos}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] mono text-gray-700">
                      {fmtCurrency(r.realise)} / {fmtCurrency(r.objectif)}
                    </span>
                    <span className={`text-xs font-semibold mono ${over ? "stat-up" : r.prog >= 90 ? "stat-neutral" : "stat-down"}`}>
                      {r.prog}%
                    </span>
                    {over && <Badge label="Objectif atteint" color="green" />}
                  </div>
                </div>
                <div className="h-1.5 bg-[gray-100] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${over ? "bg-green-600" : r.prog >= 90 ? "bg-amber-600" : "bg-indigo-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-gray-500">Points: <span className="mono text-gray-700">{r.points.toLocaleString("fr")}</span></span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Radar-like table */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-gray-700 mb-4">Classement PDV — Points</h3>
          <div className="space-y-3">
            {[...objectifData].sort((a, b) => b.points - a.points).map((r, i) => (
              <div key={r.pos} className="flex items-center gap-3">
                <span className={`w-6 h-6 flex items-center justify-center rounded-sm text-[10px] font-bold mono ${
                  i === 0 ? "bg-amber-600 text-black" : i === 1 ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-700"
                }`}>{i + 1}</span>
                <span className="flex-1 text-xs text-gray-700">{r.pos}</span>
                <span className="mono text-xs text-gray-900 font-medium">{r.points.toLocaleString("fr")} pts</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-gray-700 mb-4">Réalisé vs Objectif global</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={objectifData}>
              <CartesianGrid strokeDasharray="2 4" stroke="#e5e7eb" />
              <XAxis dataKey="pos" tick={{ fill: "#9ca3af", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => fmt(v)} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="objectif" name="Objectif" fill="#e0e7ff" radius={[2, 2, 0, 0]} />
              <Bar dataKey="realise" name="Réalisé" fill="#6366f1" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function Previsions() {
  return (
    <div className="space-y-8">
      <SectionTitle sub="Prévision de vente — moyenne mobile sur 3 mois glissants">Prévisions</SectionTitle>

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
        <KpiCard label="Prév. Janvier" value="7,8M DA" sub="estimation MM3" accent />
        <KpiCard label="Prév. Février" value="8,2M DA" sub="estimation MM3" accent />
        <KpiCard label="Prév. Mars" value="9,1M DA" sub="estimation MM3" accent />
      </div>

      <Card>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-gray-700">Historique & Prévisions — CA mensuel</h3>
          <Badge label="Moyenne mobile 3 mois" color="blue" />
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={previsionData}>
            <defs>
              <linearGradient id="realGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="indigo-500" stopOpacity={0.2} />
                <stop offset="95%" stopColor="indigo-500" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="prevGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="amber-600" stopOpacity={0.15} />
                <stop offset="95%" stopColor="amber-600" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 4" stroke="#e5e7eb" />
            <XAxis dataKey="mois" tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#9ca3af", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => fmt(v)} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="reel" stroke="#6366f1" strokeWidth={2} fill="url(#realGrad)" name="Réel" connectNulls={false} />
            <Area type="monotone" dataKey="prevision" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 3" fill="url(#prevGrad)" name="Prévision" connectNulls={false} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center gap-6 text-[10px] text-gray-700">
          <span className="flex items-center gap-2"><span className="w-6 h-0.5 bg-indigo-500 inline-block" />Réel</span>
          <span className="flex items-center gap-2"><span className="w-6 border-t border-dashed border-amber-600 inline-block" />Prévision MM3</span>
        </div>
      </Card>

      <Card>
        <h3 className="text-xs font-semibold tracking-[0.08em] uppercase text-gray-700 mb-4">Hypothèses de planification</h3>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 text-xs text-gray-700">
          <div className="border border-gray-100 rounded-sm p-4">
            <p className="text-gray-900 font-medium mb-2">Méthode</p>
            <p>Moyenne mobile sur les 3 derniers mois glissants. Les prévisions sont révisées à chaque rafraîchissement des données.</p>
          </div>
          <div className="border border-gray-100 rounded-sm p-4">
            <p className="text-gray-900 font-medium mb-2">Utilisation</p>
            <p>Aide à la planification des commandes. Les seuils de réapprovisionnement sont calculés à partir du niveau de ventes prévu.</p>
          </div>
          <div className="border border-gray-100 rounded-sm p-4">
            <p className="text-gray-900 font-medium mb-2">Rafraîchissement</p>
            <p>La fréquence de mise à jour (temps réel / horaire / quotidien) doit être définie avant déploiement et conditionne l'architecture ETL.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────

const navItems: { id: NavId; label: string; icon: string; sub: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "◈", sub: "Vue générale" },
  { id: "performance-pos", label: "Points de vente", icon: "◉", sub: "Performance PDV" },
  { id: "produits", label: "Produits", icon: "◧", sub: "Analyse produits" },
  { id: "ventes", label: "Ventes", icon: "◎", sub: "Analyse ventes" },
  { id: "stock", label: "Stock", icon: "▣", sub: "Analyse stock" },
  { id: "commercial", label: "Commercial", icon: "◆", sub: "Objectifs" },
  { id: "previsions", label: "Prévisions", icon: "◈", sub: "Forecasting" },
];

// ─── App Shell ────────────────────────────────────────────────────────────────

export default function App() {
  const [activeNav, setActiveNav] = useState<NavId>("dashboard");
  const [period, setPeriod] = useState<Period>("month");
  const [wilaya, setWilaya] = useState(wilayas[0]);
  const [pos, setPos] = useState(pointsDeVente[0]);
  const [marque, setMarque] = useState(marques[0]);
  const [categorie, setCategorie] = useState(categories[0]);

  const pages: Record<NavId, ReactNode> = {
    dashboard: <DashboardGeneral />,
    "performance-pos": <PerformancePOS />,
    produits: <AnalyseProduits />,
    ventes: <AnalyseVentes />,
    stock: <AnalyseStock />,
    commercial: <PerformanceCommerciale />,
    previsions: <Previsions />,
  };

  return (
    <div className="flex h-screen overflow-hidden text-gray-900 relative">
      <BackgroundComponent />
      <div className="absolute inset-0 flex z-10">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 flex flex-col border-r border-gray-100 bg-white">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-indigo-500 rounded-sm flex items-center justify-center">
              <span className="text-white text-xs font-bold mono">BI</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900 leading-none">POS Analytics</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Direction Générale</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors group ${
                activeNav === item.id
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className={`text-sm mono ${activeNav === item.id ? "text-indigo-500" : "text-gray-500"}`}>{item.icon}</span>
              <div>
                <p className="text-xs font-medium leading-none">{item.label}</p>
                <p className="text-[9px] mt-0.5 opacity-60">{item.sub}</p>
              </div>
              {activeNav === item.id && (
                <span className="ml-auto w-1 h-4 bg-indigo-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-sm bg-gray-200 flex items-center justify-center text-[10px] mono text-gray-700 font-bold">DG</div>
            <div>
              <p className="text-[11px] font-medium text-gray-700 leading-none">Directeur Général</p>
              <p className="text-[9px] text-gray-500 mt-0.5">Accès complet</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
            <span className="text-[9px] text-gray-500 mono">Données actualisées 09:42</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header */}
        <header className="flex-shrink-0 border-b border-gray-100 bg-white px-8 py-4 flex items-center gap-4">
          <div>
            <h1 className="text-sm font-semibold text-gray-900">{navItems.find((n) => n.id === activeNav)?.label}</h1>
            <p className="text-[10px] text-gray-500 mono mt-0.5">
              {period === "today" ? "Aujourd'hui" : period === "month" ? "Mois en cours — Sept. 2026" : "Période sélectionnée"}
              {wilaya !== wilayas[0] ? ` · ${wilaya}` : ""}
              {pos !== pointsDeVente[0] ? ` · ${pos}` : ""}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2 text-[10px] text-gray-500">
            <span className="px-2 py-1 bg-gray-50 border border-gray-100 rounded-sm mono">
              Architecture : PostgreSQL → ETL → DW
            </span>
          </div>
        </header>

        {/* Filters */}
        <FiltersBar
          period={period} setPeriod={setPeriod}
          wilaya={wilaya} setWilaya={setWilaya}
          pos={pos} setPos={setPos}
          marque={marque} setMarque={setMarque}
          categorie={categorie} setCategorie={setCategorie}
        />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-8">
          {pages[activeNav]}
        </main>
      </div>
      </div>
    </div>
  );
}
