import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/flight-markup")({
  head: () => ({
    meta: [
      { title: "Flight Markup Rules — Super Admin Panel" },
      { name: "description", content: "Configure flight markup rules for the B2B travel platform." },
    ],
  }),
  component: FlightMarkupPage,
});

// ---------------- Types & seed data ----------------

type Status = "Active" | "Inactive" | "Scheduled";
type TripType = "One-way" | "Round-trip" | "Multi-city";

interface Rule {
  id: string;
  priority: number;
  name: string;
  appliesTo: string;
  tripType: string;
  route: string;
  markupValue: string;
  status: Status;
  scheduledStart?: string;
}

const SEED_RULES: Rule[] = [
  { id: "r1", priority: 1, name: "DEL–DXB IndiGo Special", appliesTo: "All Agents", tripType: "One-way", route: "DEL → DXB", markupValue: "₹350 flat/booking", status: "Active" },
  { id: "r2", priority: 2, name: "International Long Haul", appliesTo: "All Agents", tripType: "One-way + Round-trip", route: "Any → LHR, JFK, SYD", markupValue: "4% of net fare", status: "Active" },
  { id: "r3", priority: 3, name: "Domestic Economy Peak Season", appliesTo: "All Agents", tripType: "One-way + Round-trip", route: "Any domestic", markupValue: "₹250 flat/sector", status: "Scheduled", scheduledStart: "1 Dec 2024" },
  { id: "r4", priority: 4, name: "Multi-city International", appliesTo: "Master Agent tier", tripType: "Multi-city", route: "Any international", markupValue: "₹400/sector, max ₹1,000/booking", status: "Active" },
  { id: "r5", priority: 5, name: "BOM Origin Blanket", appliesTo: "Specific Agent — Sharma Travels", tripType: "All", route: "BOM → Any", markupValue: "₹200 flat + 1.5%", status: "Active" },
  { id: "r6", priority: 6, name: "Default Domestic Fallback", appliesTo: "All Agents", tripType: "All", route: "Any domestic", markupValue: "₹180 flat/booking", status: "Active" },
];

const AGENTS = ["Sharma Travels", "Kapoor Holidays", "Delhi Star Tours", "Mehta Corporate Travel", "Gupta Air Services"];
const AIRLINES = ["All Airlines", "IndiGo (6E)", "Air India (AI)", "SpiceJet (SG)", "Vistara (UK)", "Akasa Air (QP)", "Emirates (EK)", "Qatar Airways (QR)", "Air Arabia (G9)"];
const INDIAN_CITIES = ["DEL", "BOM", "BLR", "HYD", "CCU", "MAA", "AMD", "PNQ", "COK"];
const INTL_CITIES = ["DXB", "SIN", "LHR", "JFK", "BKK", "SYD", "KUL"];
const ALL_CITIES = [...INDIAN_CITIES, ...INTL_CITIES];

// ---------------- UI helpers ----------------

function StatusBadge({ status }: { status: Status }) {
  const styles =
    status === "Active"
      ? "bg-green-100 text-green-800 ring-green-200"
      : status === "Scheduled"
      ? "bg-blue-100 text-blue-800 ring-blue-200"
      : "bg-gray-100 text-gray-700 ring-gray-200";
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${styles}`}>{status}</span>;
}

function SectionCard({ title, tip, children }: { title: string; tip: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
      <div className="mb-4 flex items-center gap-2 border-l-4 border-[#1E3A8A] pl-3">
        <h3 className="text-[15px] font-bold text-[#1E3A8A]">{title}</h3>
        <span title={tip} className="cursor-help text-xs text-gray-400 hover:text-gray-600">ⓘ</span>
      </div>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-sm font-medium text-gray-700">{children}</label>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${props.className ?? ""}`}
    />
  );
}

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${props.className ?? ""}`}
    >
      {children}
    </select>
  );
}

function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${on ? "bg-blue-600" : "bg-gray-300"}`}
      aria-label={label}
    >
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${on ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
        active ? "border-blue-600 bg-blue-600 text-white" : "border-gray-300 bg-white text-gray-700 hover:border-blue-400"
      }`}
    >
      {children}
    </button>
  );
}

// ---------------- Page ----------------

function FlightMarkupPage() {
  const [rules, setRules] = useState<Rule[]>(SEED_RULES);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterTrip, setFilterTrip] = useState("");
  const [filterApplies, setFilterApplies] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);

  // form state
  const [fName, setFName] = useState("");
  const [fPriority, setFPriority] = useState(7);
  const [fStatus, setFStatus] = useState<Status>("Active");
  const [fStart, setFStart] = useState("");
  const [fEnd, setFEnd] = useState("");
  const [appliesMode, setAppliesMode] = useState<"all" | "specific" | "tier">("all");
  const [specificAgent, setSpecificAgent] = useState(AGENTS[0]);
  const [tiers, setTiers] = useState<Record<string, boolean>>({ "Master Agent": false, "Agent": false, "Sub-Agent": false });
  const [tripTypes, setTripTypes] = useState<Record<string, boolean>>({ "One-way": true, "Round-trip": false, "Multi-city": false, "All": false });
  const [sectorType, setSectorType] = useState("Both");
  const [cabin, setCabin] = useState("All");
  const [airline, setAirline] = useState("All Airlines");
  const [routeMode, setRouteMode] = useState<"any" | "origin" | "dest" | "pair">("any");
  const [routePairs, setRoutePairs] = useState<{ o: string; d: string }[]>([{ o: "DEL", d: "BOM" }]);
  const [restrictBooking, setRestrictBooking] = useState(false);
  const [restrictTravel, setRestrictTravel] = useState(false);
  const [dows, setDows] = useState<Record<string, boolean>>({ Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false });
  const [markupType, setMarkupType] = useState<"flat" | "pct" | "pax" | "flatpct">("flat");
  const [flatAmt, setFlatAmt] = useState(300);
  const [pctAmt, setPctAmt] = useState(3);
  const [paxAdult, setPaxAdult] = useState(300);
  const [paxChild, setPaxChild] = useState(200);
  const [paxInfant, setPaxInfant] = useState(50);
  const [baseFlat, setBaseFlat] = useState(150);
  const [basePct, setBasePct] = useState(1.5);
  const [applyMode, setApplyMode] = useState<"booking" | "sector">("booking");
  const [minMarkup, setMinMarkup] = useState(0);
  const [maxMarkup, setMaxMarkup] = useState(2000);
  const [maxPerPax, setMaxPerPax] = useState(800);
  const [allowAgentAdd, setAllowAgentAdd] = useState(true);
  const [allowAgentWaive, setAllowAgentWaive] = useState(false);

  // preview
  const [pvFare, setPvFare] = useState(8500);
  const [pvTrip, setPvTrip] = useState<TripType>("One-way");
  const [pvSectors, setPvSectors] = useState(2);
  const [pvAdult, setPvAdult] = useState(1);
  const [pvChild, setPvChild] = useState(0);
  const [pvInfant, setPvInfant] = useState(0);
  const [pvAgentMarkup, setPvAgentMarkup] = useState(200);

  // conflict
  const [chOrigin, setChOrigin] = useState("DEL");
  const [chDest, setChDest] = useState("DXB");
  const [chTrip, setChTrip] = useState<TripType>("One-way");
  const [chAirline, setChAirline] = useState("IndiGo (6E)");
  const [chCabin, setChCabin] = useState("Economy");
  const [chDate, setChDate] = useState("");
  const [chAgent, setChAgent] = useState(AGENTS[0]);
  const [chResult, setChResult] = useState<null | { matches: Rule[] }>(null);

  const filtered = useMemo(() => {
    return rules
      .filter((r) => (search ? r.name.toLowerCase().includes(search.toLowerCase()) : true))
      .filter((r) => (filterStatus ? r.status === filterStatus : true))
      .filter((r) => (filterTrip ? r.tripType.includes(filterTrip) : true))
      .filter((r) => (filterApplies ? r.appliesTo.toLowerCase().includes(filterApplies.toLowerCase()) : true))
      .sort((a, b) => a.priority - b.priority);
  }, [rules, search, filterStatus, filterTrip, filterApplies]);

  function startEdit(r: Rule) {
    setEditingId(r.id);
    setFName(r.name);
    setFPriority(r.priority);
    setFStatus(r.status);
    document.getElementById("rule-form")?.scrollIntoView({ behavior: "smooth" });
  }

  function duplicate(r: Rule) {
    const copy: Rule = { ...r, id: `r${Date.now()}`, name: `${r.name} (copy)`, priority: rules.length + 1 };
    setRules([...rules, copy]);
  }

  function toggleStatus(r: Rule) {
    setRules(rules.map((x) => (x.id === r.id ? { ...x, status: x.status === "Active" ? "Inactive" : "Active" } : x)));
  }

  function onDrop(targetId: string) {
    if (!dragId || dragId === targetId) return;
    const sorted = [...rules].sort((a, b) => a.priority - b.priority);
    const from = sorted.findIndex((r) => r.id === dragId);
    const to = sorted.findIndex((r) => r.id === targetId);
    const [m] = sorted.splice(from, 1);
    sorted.splice(to, 0, m);
    setRules(sorted.map((r, i) => ({ ...r, priority: i + 1 })));
    setDragId(null);
  }

  // ---------------- Preview math ----------------
  const preview = useMemo(() => {
    const pax = pvAdult + pvChild + pvInfant;
    let perSectorMarkup = 0;
    if (markupType === "flat") perSectorMarkup = flatAmt;
    else if (markupType === "pct") perSectorMarkup = Math.round((pvFare * pctAmt) / 100);
    else if (markupType === "pax") perSectorMarkup = paxAdult * pvAdult + paxChild * pvChild + paxInfant * pvInfant;
    else perSectorMarkup = baseFlat + Math.round((pvFare * basePct) / 100);

    const sectors = pvTrip === "One-way" ? 1 : pvTrip === "Round-trip" ? 2 : pvSectors;
    const platform = applyMode === "sector" || pvTrip !== "One-way" ? perSectorMarkup * sectors : perSectorMarkup;
    const cappedPlatform = Math.min(Math.max(platform, minMarkup), maxMarkup);

    const baseFare = pvFare * sectors;
    const agentSees = baseFare + cappedPlatform;
    const agentMarkup = pvAgentMarkup;
    const customer = agentSees + agentMarkup;

    return { sectors, pax, perSectorMarkup, platform: cappedPlatform, baseFare, agentSees, agentMarkup, customer };
  }, [pvFare, pvTrip, pvSectors, pvAdult, pvChild, pvInfant, markupType, flatAmt, pctAmt, paxAdult, paxChild, paxInfant, baseFlat, basePct, applyMode, minMarkup, maxMarkup, pvAgentMarkup]);

  // ---------------- Conflict checker ----------------
  function runConflict() {
    const isIntl = !INDIAN_CITIES.includes(chDest);
    const matches = rules.filter((r) => {
      if (r.status === "Inactive") return false;
      if (r.name.includes("DEL–DXB") && chOrigin === "DEL" && chDest === "DXB" && chAirline.includes("IndiGo")) return true;
      if (r.name.includes("Long Haul") && ["LHR", "JFK", "SYD"].includes(chDest)) return true;
      if (r.name.includes("Domestic Economy") && !isIntl && chTrip !== "Multi-city") return true;
      if (r.name.includes("Multi-city International") && chTrip === "Multi-city" && isIntl) return true;
      if (r.name.includes("BOM Origin") && chOrigin === "BOM" && chAgent === "Sharma Travels") return true;
      if (r.name.includes("Default Domestic") && !isIntl) return true;
      return false;
    }).sort((a, b) => a.priority - b.priority);
    setChResult({ matches });
  }

  const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ minWidth: 1280 }}>
      {/* Top nav */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#1E3A8A] text-sm font-bold text-white">SA</div>
            <span className="text-sm font-semibold text-gray-600">Super Admin Panel</span>
          </div>
          <h1 className="text-lg font-bold text-[#1E3A8A]">Flight Markup Rules</h1>
          <div className="text-xs text-gray-500">admin@platform.in</div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] grid-cols-[65%_35%] gap-6 px-8 py-6">
        {/* ============== LEFT COLUMN ============== */}
        <div className="space-y-6">
          {/* Rules table */}
          <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2 className="text-base font-bold text-[#1E3A8A]">Active Markup Rules</h2>
                <p className="text-xs text-gray-500">{rules.length} rules configured</p>
              </div>
              <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
                + Add New Rule
              </button>
            </div>

            <div className="border-b border-amber-200 bg-amber-50 px-5 py-2.5 text-xs text-amber-900">
              ⚠ Rules are evaluated top to bottom by priority. Most specific matching rule wins. Drag rows to reorder priority.
            </div>

            <div className="grid grid-cols-4 gap-3 border-b border-gray-200 px-5 py-3">
              <Input placeholder="Search by name…" value={search} onChange={(e) => setSearch(e.target.value)} />
              <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="">All statuses</option><option>Active</option><option>Inactive</option><option>Scheduled</option>
              </Select>
              <Select value={filterTrip} onChange={(e) => setFilterTrip(e.target.value)}>
                <option value="">All trip types</option><option>One-way</option><option>Round-trip</option><option>Multi-city</option><option>All</option>
              </Select>
              <Input placeholder="Filter by applies-to…" value={filterApplies} onChange={(e) => setFilterApplies(e.target.value)} />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="w-8"></th>
                    <th className="px-3 py-3 text-left">Priority</th>
                    <th className="px-3 py-3 text-left">Rule Name</th>
                    <th className="px-3 py-3 text-left">Applies To</th>
                    <th className="px-3 py-3 text-left">Trip Type</th>
                    <th className="px-3 py-3 text-left">Route</th>
                    <th className="px-3 py-3 text-left">Markup</th>
                    <th className="px-3 py-3 text-left">Status</th>
                    <th className="px-3 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr
                      key={r.id}
                      draggable
                      onDragStart={() => setDragId(r.id)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => onDrop(r.id)}
                      className="group border-t border-gray-100 hover:bg-blue-50/30"
                    >
                      <td className="cursor-grab pl-3 text-gray-300 opacity-0 group-hover:opacity-100">⋮⋮</td>
                      <td className="px-3 py-3 font-semibold text-[#1E3A8A]">{r.priority}</td>
                      <td className="px-3 py-3 font-medium">{r.name}</td>
                      <td className="px-3 py-3 text-gray-600">{r.appliesTo}</td>
                      <td className="px-3 py-3 text-gray-600">{r.tripType}</td>
                      <td className="px-3 py-3 text-gray-600">{r.route}</td>
                      <td className="px-3 py-3 font-medium text-gray-900">{r.markupValue}</td>
                      <td className="px-3 py-3">
                        <StatusBadge status={r.status} />
                        {r.scheduledStart && <div className="mt-0.5 text-[10px] text-gray-500">starts {r.scheduledStart}</div>}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex gap-2 text-xs">
                          <button onClick={() => startEdit(r)} className="text-blue-600 hover:underline">Edit</button>
                          <span className="text-gray-300">|</span>
                          <button onClick={() => duplicate(r)} className="text-blue-600 hover:underline">Duplicate</button>
                          <span className="text-gray-300">|</span>
                          <button onClick={() => toggleStatus(r)} className="text-gray-600 hover:underline">
                            {r.status === "Active" ? "Deactivate" : "Activate"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Form */}
          <section id="rule-form" className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h2 className="text-base font-bold text-[#1E3A8A]">
                {editingId ? `Edit Rule: ${fName || "(unnamed)"}` : "Add New Rule"}
              </h2>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Last saved: 2 mins ago
              </div>
            </div>

            <div className="space-y-5 p-5">
              {/* Section 1 */}
              <SectionCard title="1. Rule Identity" tip="Name, priority, and active status for this rule">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Rule Name</Label>
                    <Input placeholder="e.g. DEL–BOM IndiGo One-way" value={fName} onChange={(e) => setFName(e.target.value)} />
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Input type="number" value={fPriority} onChange={(e) => setFPriority(Number(e.target.value))} />
                    <p className="mt-1 text-[11px] text-gray-500">Lower number = evaluated first</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <div className="inline-flex rounded-md border border-gray-300 bg-white p-0.5">
                      {(["Active", "Inactive", "Scheduled"] as Status[]).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setFStatus(s)}
                          className={`rounded px-3 py-1.5 text-xs font-medium transition ${fStatus === s ? "bg-blue-600 text-white" : "text-gray-600"}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {fStatus === "Scheduled" && (
                  <div className="mt-3 grid grid-cols-2 gap-4">
                    <div><Label>Start date</Label><Input type="datetime-local" value={fStart} onChange={(e) => setFStart(e.target.value)} /></div>
                    <div><Label>End date</Label><Input type="datetime-local" value={fEnd} onChange={(e) => setFEnd(e.target.value)} /></div>
                  </div>
                )}
              </SectionCard>

              {/* Section 2 */}
              <SectionCard title="2. Applies To" tip="Choose which agents this markup applies to">
                <p className="mb-3 text-sm text-gray-600">Which agents does this rule apply to?</p>
                <div className="space-y-2">
                  {[
                    { v: "all", label: "All agents (default)" },
                    { v: "specific", label: "Specific agent" },
                    { v: "tier", label: "Agent tier" },
                  ].map((opt) => (
                    <label key={opt.v} className="flex items-center gap-2 text-sm">
                      <input type="radio" checked={appliesMode === opt.v} onChange={() => setAppliesMode(opt.v as any)} className="text-blue-600" />
                      {opt.label}
                    </label>
                  ))}
                </div>
                {appliesMode === "specific" && (
                  <div className="mt-3"><Select value={specificAgent} onChange={(e) => setSpecificAgent(e.target.value)}>{AGENTS.map((a) => <option key={a}>{a}</option>)}</Select></div>
                )}
                {appliesMode === "tier" && (
                  <div className="mt-3 flex gap-4">
                    {Object.keys(tiers).map((t) => (
                      <label key={t} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={tiers[t]} onChange={(e) => setTiers({ ...tiers, [t]: e.target.checked })} className="text-blue-600" />
                        {t}
                      </label>
                    ))}
                  </div>
                )}
              </SectionCard>

              {/* Section 3 */}
              <SectionCard title="3. Flight Type Filters" tip="Target specific trip types, sectors, cabin and airlines">
                <p className="mb-2 text-sm text-gray-600">What type of flights does this rule target?</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {Object.keys(tripTypes).map((t) => (
                    <Pill key={t} active={tripTypes[t]} onClick={() => setTripTypes({ ...tripTypes, [t]: !tripTypes[t] })}>{t}</Pill>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div><Label>Sector type</Label><Select value={sectorType} onChange={(e) => setSectorType(e.target.value)}><option>Domestic</option><option>International</option><option>Both</option></Select></div>
                  <div><Label>Cabin class</Label><Select value={cabin} onChange={(e) => setCabin(e.target.value)}><option>Economy</option><option>Business</option><option>First Class</option><option>All</option></Select></div>
                  <div><Label>Airline</Label><Select value={airline} onChange={(e) => setAirline(e.target.value)}>{AIRLINES.map((a) => <option key={a}>{a}</option>)}</Select></div>
                </div>
              </SectionCard>

              {/* Section 4 */}
              <SectionCard title="4. Route Configuration" tip="Define which origin/destination combinations the rule covers">
                <p className="mb-3 text-sm text-gray-600">Define the route scope</p>
                <div className="space-y-2">
                  {[
                    { v: "any", label: "Any route (no route filter)" },
                    { v: "origin", label: "Origin-based" },
                    { v: "dest", label: "Destination-based" },
                    { v: "pair", label: "Specific route pair" },
                  ].map((o) => (
                    <label key={o.v} className="flex items-center gap-2 text-sm">
                      <input type="radio" checked={routeMode === o.v} onChange={() => setRouteMode(o.v as any)} className="text-blue-600" />
                      {o.label}
                    </label>
                  ))}
                </div>
                {routeMode === "origin" && (
                  <div className="mt-3 flex flex-wrap gap-2">{INDIAN_CITIES.map((c) => <Pill key={c} active={false} onClick={() => {}}>{c}</Pill>)}</div>
                )}
                {routeMode === "dest" && (
                  <div className="mt-3 flex flex-wrap gap-2">{ALL_CITIES.map((c) => <Pill key={c} active={false} onClick={() => {}}>{c}</Pill>)}</div>
                )}
                {routeMode === "pair" && (
                  <div className="mt-3 space-y-2">
                    {routePairs.map((p, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Select value={p.o} onChange={(e) => { const x = [...routePairs]; x[i].o = e.target.value; setRoutePairs(x); }}>
                          {ALL_CITIES.map((c) => <option key={c}>{c}</option>)}
                        </Select>
                        <span className="text-gray-400">→</span>
                        <Select value={p.d} onChange={(e) => { const x = [...routePairs]; x[i].d = e.target.value; setRoutePairs(x); }}>
                          {ALL_CITIES.map((c) => <option key={c}>{c}</option>)}
                        </Select>
                      </div>
                    ))}
                    {routePairs.length < 5 && (
                      <button type="button" onClick={() => setRoutePairs([...routePairs, { o: "DEL", d: "BOM" }])} className="text-xs text-blue-600 hover:underline">
                        + Add another route pair
                      </button>
                    )}
                  </div>
                )}
              </SectionCard>

              {/* Section 5 */}
              <SectionCard title="5. Date & Time Filters" tip="Restrict by booking window, travel window, or weekday">
                <p className="mb-3 text-sm text-gray-600">When is this rule active?</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3"><Toggle on={restrictBooking} onChange={setRestrictBooking} /><span className="text-sm">Restrict by booking date</span></div>
                  {restrictBooking && <div className="ml-12 grid grid-cols-2 gap-3"><Input type="date" /><Input type="date" /></div>}
                  <div className="flex items-center gap-3"><Toggle on={restrictTravel} onChange={setRestrictTravel} /><span className="text-sm">Restrict by travel date</span></div>
                  {restrictTravel && <div className="ml-12 grid grid-cols-2 gap-3"><Input type="date" /><Input type="date" /></div>}
                </div>
                <div className="mt-4">
                  <Label>Days of week</Label>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(dows).map((d) => <Pill key={d} active={dows[d]} onClick={() => setDows({ ...dows, [d]: !dows[d] })}>{d}</Pill>)}
                  </div>
                  <p className="mt-1 text-[11px] text-gray-500">Leave all unchecked to apply on all days</p>
                </div>
              </SectionCard>

              {/* Section 6 */}
              <SectionCard title="6. Markup Value" tip="Define how the markup amount is calculated">
                <p className="mb-3 text-sm text-gray-600">Define the markup amount</p>
                <div className="mb-4 inline-flex rounded-md border border-gray-300 bg-white p-0.5">
                  {([["flat", "Flat Amount"], ["pct", "Percentage"], ["pax", "Per Passenger"], ["flatpct", "Flat + Percentage"]] as const).map(([v, l]) => (
                    <button key={v} type="button" onClick={() => setMarkupType(v)} className={`rounded px-3 py-1.5 text-xs font-medium transition ${markupType === v ? "bg-blue-600 text-white" : "text-gray-600"}`}>{l}</button>
                  ))}
                </div>
                {markupType === "flat" && (
                  <div>
                    <Label>Amount</Label>
                    <div className="flex items-center gap-2"><span className="text-sm">₹</span><Input type="number" value={flatAmt} onChange={(e) => setFlatAmt(Number(e.target.value))} /></div>
                  </div>
                )}
                {markupType === "pct" && (
                  <div>
                    <Label>Percentage of net fare</Label>
                    <div className="flex items-center gap-2"><Input type="number" value={pctAmt} onChange={(e) => setPctAmt(Number(e.target.value))} /><span className="text-sm">%</span></div>
                    <p className="mt-1 text-[11px] text-gray-500">For a ₹10,000 fare at 3% = ₹300 markup</p>
                  </div>
                )}
                {markupType === "pax" && (
                  <div className="grid grid-cols-3 gap-3">
                    <div><Label>Adult ₹</Label><Input type="number" value={paxAdult} onChange={(e) => setPaxAdult(Number(e.target.value))} /></div>
                    <div><Label>Child (2–11 yrs) ₹</Label><Input type="number" value={paxChild} onChange={(e) => setPaxChild(Number(e.target.value))} /></div>
                    <div><Label>Infant (under 2) ₹</Label><Input type="number" value={paxInfant} onChange={(e) => setPaxInfant(Number(e.target.value))} /></div>
                  </div>
                )}
                {markupType === "flatpct" && (
                  <div>
                    <div className="grid grid-cols-2 gap-3">
                      <div><Label>Base flat ₹</Label><Input type="number" value={baseFlat} onChange={(e) => setBaseFlat(Number(e.target.value))} /></div>
                      <div><Label>Percentage %</Label><Input type="number" value={basePct} onChange={(e) => setBasePct(Number(e.target.value))} /></div>
                    </div>
                    <p className="mt-1 text-[11px] text-gray-500">₹150 base + 1.5% on ₹10,000 fare → ₹150 + ₹150 = ₹300 total</p>
                  </div>
                )}
                <div className="mt-4 space-y-1">
                  <Label>Apply this markup</Label>
                  <label className="flex items-center gap-2 text-sm"><input type="radio" checked={applyMode === "booking"} onChange={() => setApplyMode("booking")} />Per booking (entire booking gets one markup)</label>
                  <label className="flex items-center gap-2 text-sm"><input type="radio" checked={applyMode === "sector"} onChange={() => setApplyMode("sector")} />Per sector (each flight leg gets this markup)</label>
                  <p className="text-[11px] text-gray-500">For a DEL→BOM→CCU multi-city, per sector = ₹300 × 2 sectors = ₹600 total</p>
                </div>
                {tripTypes["Round-trip"] && (
                  <div className="mt-4 rounded border border-gray-200 bg-white p-3">
                    <p className="mb-2 text-xs font-medium text-gray-700">For round-trips, charge markup:</p>
                    <label className="flex items-center gap-2 text-sm"><input type="radio" name="rt" defaultChecked />Once per booking</label>
                    <label className="flex items-center gap-2 text-sm"><input type="radio" name="rt" />Per sector (outbound + return each get markup)</label>
                  </div>
                )}
                {tripTypes["Multi-city"] && (
                  <div className="mt-3 rounded border border-gray-200 bg-white p-3">
                    <p className="mb-2 text-xs font-medium text-gray-700">For multi-city, charge markup:</p>
                    <label className="flex items-center gap-2 text-sm"><input type="radio" name="mc" defaultChecked />Per sector (recommended)</label>
                    <label className="flex items-center gap-2 text-sm"><input type="radio" name="mc" />Flat per booking</label>
                    <label className="flex items-center gap-2 text-sm"><input type="radio" name="mc" />Per sector with max cap: <span className="ml-1">₹</span><Input type="number" defaultValue={1000} className="!w-24" /></label>
                  </div>
                )}
              </SectionCard>

              {/* Section 7 */}
              <SectionCard title="7. Caps, Limits & Agent Permissions" tip="Guard rails to keep markup within safe bounds">
                <div className="grid grid-cols-3 gap-3">
                  <div><Label>Minimum markup ₹</Label><Input type="number" value={minMarkup} onChange={(e) => setMinMarkup(Number(e.target.value))} /><p className="mt-1 text-[11px] text-gray-500">Never below this even if % calc is lower</p></div>
                  <div><Label>Maximum markup ₹</Label><Input type="number" value={maxMarkup} onChange={(e) => setMaxMarkup(Number(e.target.value))} /><p className="mt-1 text-[11px] text-gray-500">Never exceed this even if % calc is higher</p></div>
                  <div><Label>Max markup per passenger ₹</Label><Input type="number" value={maxPerPax} onChange={(e) => setMaxPerPax(Number(e.target.value))} /></div>
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3"><Toggle on={allowAgentAdd} onChange={setAllowAgentAdd} /><span className="text-sm">Allow agent to add their own markup on top</span></div>
                  <div className="flex items-center gap-3"><Toggle on={allowAgentWaive} onChange={setAllowAgentWaive} /><span className="text-sm">Allow agent to reduce or waive their markup</span></div>
                </div>
              </SectionCard>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <button className="text-sm text-gray-500 hover:text-gray-700">Reset form</button>
                <div className="flex gap-2">
                  <button onClick={() => setEditingId(null)} className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">Cancel</button>
                  <button className="rounded-md border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50">Save as Draft</button>
                  <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">Save & Activate Rule</button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ============== RIGHT COLUMN ============== */}
        <div className="space-y-6">
          <div className="sticky top-6 space-y-6">
            {/* Live preview */}
            <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="text-base font-bold text-[#1E3A8A]">Live Markup Preview</h2>
                <p className="text-xs text-gray-500">See exactly what each party pays and earns</p>
              </div>
              <div className="space-y-3 p-5">
                <div>
                  <Label>Net fare from supplier ₹</Label>
                  <Input type="number" value={pvFare} onChange={(e) => setPvFare(Number(e.target.value))} />
                </div>
                <div>
                  <Label>Trip type</Label>
                  <div className="inline-flex w-full rounded-md border border-gray-300 bg-white p-0.5">
                    {(["One-way", "Round-trip", "Multi-city"] as TripType[]).map((t) => (
                      <button key={t} type="button" onClick={() => setPvTrip(t)} className={`flex-1 rounded px-2 py-1.5 text-xs font-medium transition ${pvTrip === t ? "bg-blue-600 text-white" : "text-gray-600"}`}>{t}</button>
                    ))}
                  </div>
                </div>
                {pvTrip === "Multi-city" && (
                  <div><Label>Number of sectors</Label><Input type="number" value={pvSectors} onChange={(e) => setPvSectors(Number(e.target.value))} /></div>
                )}
                <div>
                  <Label>Passengers</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      ["Adult", pvAdult, setPvAdult],
                      ["Child", pvChild, setPvChild],
                      ["Infant", pvInfant, setPvInfant],
                    ].map(([lbl, v, setV]: any) => (
                      <div key={lbl} className="rounded border border-gray-200 p-2 text-center">
                        <div className="text-[11px] text-gray-500">{lbl}</div>
                        <div className="mt-1 flex items-center justify-between">
                          <button onClick={() => setV(Math.max(0, v - 1))} className="h-6 w-6 rounded bg-gray-100 text-sm">−</button>
                          <span className="text-sm font-semibold">{v}</span>
                          <button onClick={() => setV(v + 1)} className="h-6 w-6 rounded bg-gray-100 text-sm">+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-2 rounded-lg border border-gray-200 bg-white">
                  <div className="flex items-center justify-between bg-gray-50 px-3 py-2 text-sm"><span className="text-gray-600">Net fare (from supplier)</span><span>{fmt(preview.baseFare)}</span></div>
                  <div className="flex items-center justify-between bg-blue-50 px-3 py-2 text-sm"><span className="text-blue-700">Platform markup applied</span><span className="text-blue-700">+{fmt(preview.platform)}</span></div>
                  <div className="flex items-center justify-between bg-slate-900 px-3 py-2.5 text-sm font-bold text-white"><span>Agent sees (their cost)</span><span>{fmt(preview.agentSees)}</span></div>
                  <div className="flex items-center justify-between bg-purple-50 px-3 py-2 text-sm">
                    <span className="text-purple-700">Agent's own markup</span>
                    <div className="flex items-center gap-1 text-purple-700">+₹<input type="number" value={pvAgentMarkup} onChange={(e) => setPvAgentMarkup(Number(e.target.value))} className="w-20 rounded border border-purple-200 bg-white px-1 py-0.5 text-right text-xs" /></div>
                  </div>
                  <div className="flex items-center justify-between bg-green-100 px-3 py-3 text-base font-bold text-green-800"><span>Customer pays</span><span className="text-lg">{fmt(preview.customer)}</span></div>
                  <div className="grid grid-cols-2 gap-2 p-2">
                    <div className="rounded bg-amber-50 p-2 text-center"><div className="text-[10px] text-amber-700">Platform earns/booking</div><div className="font-bold text-amber-700">{fmt(preview.platform)}</div></div>
                    <div className="rounded bg-teal-50 p-2 text-center"><div className="text-[10px] text-teal-700">Agent earns/booking</div><div className="font-bold text-teal-700">{fmt(preview.agentMarkup)}</div></div>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500">Agent's markup is an estimate. Each agent sets their own markup separately.</p>
                {pvTrip !== "One-way" && <p className="text-[11px] text-gray-500">× {preview.sectors} sectors applied above.</p>}
              </div>
            </section>

            {/* Conflict checker */}
            <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-200 px-5 py-4">
                <h2 className="text-base font-bold text-[#1E3A8A]">Rule Conflict Checker</h2>
                <p className="text-xs text-gray-500">Check if a booking scenario matches multiple rules</p>
              </div>
              <div className="space-y-3 p-5">
                <div className="grid grid-cols-2 gap-2">
                  <div><Label>Origin</Label><Select value={chOrigin} onChange={(e) => setChOrigin(e.target.value)}>{ALL_CITIES.map((c) => <option key={c}>{c}</option>)}</Select></div>
                  <div><Label>Destination</Label><Select value={chDest} onChange={(e) => setChDest(e.target.value)}>{ALL_CITIES.map((c) => <option key={c}>{c}</option>)}</Select></div>
                  <div><Label>Trip type</Label><Select value={chTrip} onChange={(e) => setChTrip(e.target.value as TripType)}><option>One-way</option><option>Round-trip</option><option>Multi-city</option></Select></div>
                  <div><Label>Airline</Label><Select value={chAirline} onChange={(e) => setChAirline(e.target.value)}>{AIRLINES.map((a) => <option key={a}>{a}</option>)}</Select></div>
                  <div><Label>Cabin</Label><Select value={chCabin} onChange={(e) => setChCabin(e.target.value)}><option>Economy</option><option>Business</option><option>First Class</option></Select></div>
                  <div><Label>Travel date</Label><Input type="date" value={chDate} onChange={(e) => setChDate(e.target.value)} /></div>
                  <div className="col-span-2"><Label>Agent</Label><Select value={chAgent} onChange={(e) => setChAgent(e.target.value)}>{AGENTS.map((a) => <option key={a}>{a}</option>)}</Select></div>
                </div>
                <button onClick={runConflict} className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Check Rules</button>

                {chResult && chResult.matches.length === 1 && (
                  <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm">
                    <p className="font-semibold text-green-800">✓ Rule matched: {chResult.matches[0].name} (Priority {chResult.matches[0].priority})</p>
                    <p className="mt-1 text-green-700">Markup applied: {chResult.matches[0].markupValue}</p>
                  </div>
                )}
                {chResult && chResult.matches.length > 1 && (
                  <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm">
                    <p className="font-semibold text-amber-800">{chResult.matches.length} rules match this scenario:</p>
                    <ol className="mt-2 space-y-1 text-amber-900">
                      {chResult.matches.map((m, i) => (
                        <li key={m.id} className="text-xs">
                          {i + 1}. {m.name} (Priority {m.priority}) {i === 0 ? <span className="font-bold">← WILL BE APPLIED</span> : <span className="text-amber-700">— overridden</span>}
                        </li>
                      ))}
                    </ol>
                    <p className="mt-2 text-xs text-amber-700">Priority {chResult.matches[0].priority} rule wins. Lower priority rules are ignored.</p>
                  </div>
                )}
                {chResult && chResult.matches.length === 0 && (
                  <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    No rule matches. Default markup of ₹0 will be applied. Consider adding a fallback rule.
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
