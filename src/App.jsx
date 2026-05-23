import React, { useState, useMemo } from 'react';
import { Filter, User, Briefcase, Clock, Search, ChevronDown, X, Plus, Calendar } from 'lucide-react';

const BRAND = {
  navy: '#1B3A5C',
  cornflower: '#3D7ABF',
  powder: '#B8D4E8',
  amber: '#C8912E',
  ink: '#1F2937',
  surface: '#F8FAFC',
  surfaceAlt: '#F1F5F9',
  border: '#E2E8F0',
  borderDark: '#CBD5E1',
  subtle: '#64748B',
  faint: '#94A3B8',
};

const DISC = {
  legal: { label: 'Legal & Regulatory', color: '#1B3A5C' },
  strategy: { label: 'Strategy & Operations', color: '#3D7ABF' },
  sustainability: { label: 'Sustainability', color: '#4A8B7F' },
  analytics: { label: 'Data & Analytics', color: '#C8912E' },
  policy: { label: 'Public Sector Policy', color: '#7E6BA8' },
  bizdev: { label: 'Business Development', color: '#94A3B8' },
};

const FONT = { fontFamily: 'Calibri, Candara, "Segoe UI", Optima, sans-serif' };

const initialPeople = [
  { id: 1, name: 'Sarah Mitchell', title: 'Senior Consultant', primary: 'legal', expertises: ['Regulatory Affairs', 'Administrative Law'], contractMin: 32, contractMax: 32, flex: false, bereikbaar: 'Mon-Thu', adhoc: true },
  { id: 2, name: 'Michael Thompson', title: 'Engagement Manager', primary: 'strategy', expertises: ['Energy Transition', 'Stakeholder Mgmt'], contractMin: 24, contractMax: 32, flex: true, bereikbaar: 'Mon-Fri', adhoc: true },
  { id: 3, name: 'Jennifer Davis', title: 'Senior Consultant', primary: 'sustainability', expertises: ['Permitting', 'Noise Standards'], contractMin: 36, contractMax: 36, flex: false, bereikbaar: 'Mon-Fri', adhoc: false },
  { id: 4, name: 'Daniel Roberts', title: 'Associate', primary: 'analytics', expertises: ['GIS', 'Power BI / R'], contractMin: 32, contractMax: 32, flex: false, bereikbaar: 'Mon-Thu', adhoc: false },
  { id: 5, name: 'Emily Chen', title: 'Consultant', primary: 'policy', expertises: ['Housing Policy', 'Circular Economy'], contractMin: 24, contractMax: 32, flex: true, bereikbaar: 'Tue-Fri', adhoc: true },
  { id: 6, name: 'Christopher Anderson', title: 'Senior Consultant', primary: 'legal', expertises: ['Privacy Law', 'GDPR Compliance'], contractMin: 32, contractMax: 32, flex: false, bereikbaar: 'Mon-Fri', adhoc: false },
  { id: 7, name: 'Lauren Williams', title: 'Principal', primary: 'strategy', expertises: ['Program Management', 'Operating Model'], contractMin: 36, contractMax: 36, flex: false, bereikbaar: 'Mon-Fri', adhoc: true },
  { id: 8, name: 'David Martinez', title: 'Engagement Manager', primary: 'sustainability', expertises: ['Air Quality', 'Best Available Tech'], contractMin: 32, contractMax: 40, flex: true, bereikbaar: 'Mon-Fri', adhoc: true },
  { id: 9, name: 'Olivia Parker', title: 'Business Analyst', primary: 'analytics', expertises: ['Energy Data', 'GIS Modeling'], contractMin: 24, contractMax: 24, flex: false, bereikbaar: 'Mon-Wed', adhoc: false },
  { id: 10, name: 'James Bennett', title: 'Senior Consultant', primary: 'policy', expertises: ['Mobility Strategy', 'Regional Energy'], contractMin: 32, contractMax: 32, flex: false, bereikbaar: 'Mon-Fri', adhoc: false },
];

const initialAssignments = [
  { id: 1, personId: 1, klant: 'City of Riverside', rol: 'Regulatory Compliance Advisor', discipline: 'legal', soort: 'detachering', uren: 24, eindDatum: '2026-12-31' },
  { id: 2, personId: 1, klant: 'Westgate Regional Authority', rol: 'Compliance Framework Review', discipline: 'legal', soort: 'opdracht', uren: 8, eindDatum: '2026-09-30' },
  { id: 3, personId: 2, klant: 'State of Cascadia', rol: 'Program Lead, Energy Transition', discipline: 'strategy', soort: 'detachering', uren: 24, eindDatum: '2026-12-31' },
  { id: 4, personId: 3, klant: 'Westgate Regional Authority', rol: 'Senior Permitting Specialist', discipline: 'sustainability', soort: 'detachering', uren: 28, eindDatum: '2027-03-31' },
  { id: 5, personId: 3, klant: 'Metro Regional Council', rol: 'Circular Economy Advisory', discipline: 'sustainability', soort: 'opdracht', uren: 8, eindDatum: '2026-11-30' },
  { id: 6, personId: 4, klant: 'Northern Water District', rol: 'Data Analyst, Monitoring Systems', discipline: 'analytics', soort: 'opdracht', uren: 16, eindDatum: '2026-08-31' },
  { id: 7, personId: 4, klant: 'City of Brookhaven', rol: 'Performance Dashboards, Energy', discipline: 'analytics', soort: 'opdracht', uren: 16, eindDatum: '2026-10-31' },
  { id: 8, personId: 5, klant: 'Metro Regional Council', rol: 'Policy Advisor, Energy Efficiency', discipline: 'policy', soort: 'opdracht', uren: 28, eindDatum: '2026-12-31' },
  { id: 9, personId: 6, klant: 'City of Maplewood', rol: 'Privacy Compliance Advisor', discipline: 'legal', soort: 'detachering', uren: 32, eindDatum: '2027-06-30' },
  { id: 10, personId: 7, klant: 'Westgate Regional Authority', rol: 'Program Manager, Energy Practice', discipline: 'strategy', soort: 'detachering', uren: 28, eindDatum: '2026-12-31' },
  { id: 11, personId: 7, klant: 'Internal Practice Development', rol: 'Business Development & Acquisition', discipline: 'bizdev', soort: 'opdracht', uren: 8, eindDatum: '2026-12-31' },
  { id: 12, personId: 8, klant: 'State of Northbrook', rol: 'Senior Air Quality Advisor', discipline: 'sustainability', soort: 'detachering', uren: 36, eindDatum: '2027-01-31' },
  { id: 13, personId: 9, klant: 'Westgate Regional Authority', rol: 'Energy Data Analyst', discipline: 'analytics', soort: 'opdracht', uren: 16, eindDatum: '2026-12-31' },
  { id: 14, personId: 9, klant: 'City of Fairview', rol: 'GIS Analyst, Heat Mapping', discipline: 'analytics', soort: 'opdracht', uren: 8, eindDatum: '2026-09-30' },
  { id: 15, personId: 10, klant: 'Metro Regional Council', rol: 'Regional Strategy Advisor', discipline: 'policy', soort: 'detachering', uren: 32, eindDatum: '2027-03-31' },
];

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('nl-NL', { day: '2-digit', month: 'short', year: 'numeric' });
}

function StackedBar({ person, assignments, scale, height = 30, showMarkers = true, idSuffix = '' }) {
  const personAssignments = assignments.filter(a => a.personId === person.id);
  const actualScale = scale || person.contractMax;
  const VW = 1000;
  const px = (h) => (h / actualScale) * VW;

  const patternId = `hatch-${person.id}-${idSuffix}`;

  let offset = 0;
  const segments = personAssignments.map(a => {
    const seg = { ...a, xStart: px(offset), xWidth: px(a.uren) };
    offset += a.uren;
    return seg;
  });

  const minX = px(person.contractMin);
  const maxX = px(person.contractMax);

  return (
    <svg viewBox={`0 0 ${VW} ${height + 6}`} preserveAspectRatio="none" style={{ width: '100%', height: height + 6 }}>
      <defs>
        <pattern id={patternId} patternUnits="userSpaceOnUse" width="10" height="10" patternTransform="rotate(45)">
          <rect width="10" height="10" fill="transparent" />
          <line x1="0" y1="0" x2="0" y2="10" stroke={BRAND.ink} strokeWidth="2.5" opacity="0.55" />
        </pattern>
      </defs>

      <rect x="0" y="3" width={VW} height={height} fill={BRAND.surfaceAlt} rx="2" />

      {segments.map((s) => (
        <rect
          key={s.id}
          x={s.xStart}
          y="3"
          width={Math.max(s.xWidth - 1.5, 0)}
          height={height}
          fill={DISC[s.discipline].color}
        />
      ))}

      {person.flex && (
        <rect
          x={minX}
          y="3"
          width={maxX - minX}
          height={height}
          fill={`url(#${patternId})`}
        />
      )}

      {showMarkers && person.flex && (
        <line x1={minX} y1="0" x2={minX} y2={height + 6} stroke={BRAND.ink} strokeWidth="1.2" strokeDasharray="3,2" />
      )}
      {showMarkers && (
        <line x1={maxX} y1="0" x2={maxX} y2={height + 6} stroke={BRAND.ink} strokeWidth="1.5" />
      )}
    </svg>
  );
}

function Pill({ label, color, dot = true }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '2px 10px',
      borderRadius: 999,
      backgroundColor: BRAND.surfaceAlt,
      border: `1px solid ${BRAND.border}`,
      fontSize: 12,
      color: BRAND.ink,
    }}>
      {dot && <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color }} />}
      {label}
    </span>
  );
}

function TabBar({ active, onChange }) {
  const tabs = [
    { id: 'mijn', label: 'Mijn inzet', icon: User },
    { id: 'capaciteit', label: 'Capaciteit overzicht', icon: Clock },
    { id: 'opdrachten', label: 'Opdrachten overzicht', icon: Briefcase },
  ];
  return (
    <div style={{ display: 'flex', gap: 4, borderBottom: `1px solid ${BRAND.border}`, marginBottom: 24 }}>
      {tabs.map(t => {
        const Icon = t.icon;
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 18px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: isActive ? 600 : 500,
              color: isActive ? BRAND.navy : BRAND.subtle,
              borderBottom: isActive ? `2.5px solid ${BRAND.navy}` : '2.5px solid transparent',
              marginBottom: -1,
              ...FONT,
            }}
          >
            <Icon size={16} />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '7px 10px', fontSize: 12, border: `1px solid ${BRAND.borderDark}`,
  borderRadius: 4, backgroundColor: 'white', color: BRAND.ink, ...FONT, boxSizing: 'border-box',
};

function Field({ label, children }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: BRAND.subtle, fontWeight: 600, textTransform: 'uppercase', marginBottom: 3, letterSpacing: 0.3 }}>{label}</div>
      {children}
    </div>
  );
}

function StatTile({ label, value, sub, accent }) {
  return (
    <div style={{
      flex: 1, padding: '10px 14px', backgroundColor: accent ? BRAND.navy : 'white',
      border: accent ? 'none' : `1px solid ${BRAND.border}`, borderRadius: 6,
    }}>
      <div style={{ fontSize: 10, color: accent ? BRAND.powder : BRAND.subtle, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.3 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: accent ? 'white' : BRAND.navy, marginTop: 2, lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 11, color: accent ? BRAND.powder : BRAND.subtle, marginTop: 2 }}>{sub}</div>
    </div>
  );
}

function MijnInzetView({ people, assignments, setAssignments, selectedId, setSelectedId }) {
  const person = people.find(p => p.id === selectedId);
  const personAssignments = assignments.filter(a => a.personId === selectedId);
  const currentTotal = personAssignments.reduce((s, a) => s + a.uren, 0);
  const ruimteVrij = Math.max(0, person.contractMax - currentTotal);
  const ruimteAfschalen = person.flex ? Math.max(0, currentTotal - person.contractMin) : 0;

  const [showAdd, setShowAdd] = useState(false);
  const [newAssignment, setNewAssignment] = useState({ klant: '', rol: '', discipline: 'legal', soort: 'opdracht', uren: 8, eindDatum: '' });

  const handleAdd = () => {
    if (!newAssignment.klant || !newAssignment.rol) return;
    setAssignments([...assignments, { ...newAssignment, id: Math.max(...assignments.map(a => a.id)) + 1, personId: selectedId, uren: Number(newAssignment.uren) }]);
    setNewAssignment({ klant: '', rol: '', discipline: 'legal', soort: 'opdracht', uren: 8, eindDatum: '' });
    setShowAdd(false);
  };

  const handleRemove = (id) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 320px' }}>
          <label style={{ fontSize: 12, color: BRAND.subtle, fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Medewerker</label>
          <div style={{ position: 'relative' }}>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: 16,
                fontWeight: 500,
                color: BRAND.navy,
                border: `1px solid ${BRAND.borderDark}`,
                borderRadius: 6,
                backgroundColor: 'white',
                cursor: 'pointer',
                appearance: 'none',
                ...FONT,
              }}
            >
              {people.map(p => <option key={p.id} value={p.id}>{p.name} · {p.title}</option>)}
            </select>
            <ChevronDown size={18} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: BRAND.subtle, pointerEvents: 'none' }} />
          </div>
          <div style={{ fontSize: 12, color: BRAND.subtle, marginTop: 6, lineHeight: 1.45 }}>
            <span style={{ fontWeight: 600, color: BRAND.navy }}>{DISC[person.primary].label}</span> · {person.expertises.join(' · ')}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, flex: '2 1 480px' }}>
          <StatTile label="Contract" value={person.flex ? `${person.contractMin}–${person.contractMax} u` : `${person.contractMax} u`} sub={person.flex ? 'flexibel' : 'vast'} />
          <StatTile label="Huidige inzet" value={`${currentTotal} u`} sub={`${personAssignments.length} opdracht${personAssignments.length === 1 ? '' : 'en'}`} />
          <StatTile label="Flexibele ruimte" value={`${ruimteVrij + ruimteAfschalen} u`} sub={person.flex ? `${ruimteAfschalen}u afschalen + ${ruimteVrij}u openstaand` : `${ruimteVrij}u openstaand`} accent />
        </div>
      </div>

      <div style={{ backgroundColor: 'white', border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: '20px 24px 16px', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: BRAND.navy }}>Verdeling huidige inzet</div>
            <div style={{ fontSize: 12, color: BRAND.subtle, marginTop: 2 }}>Gekleurd: actieve opdrachten. Gearceerd: flexibele zone tussen min en max.</div>
          </div>
          <div style={{ fontSize: 11, color: BRAND.subtle }}>schaal 0 — {person.contractMax} u</div>
        </div>

        <div style={{ position: 'relative', paddingBottom: 18 }}>
          <StackedBar person={person} assignments={assignments} height={40} />
          <div style={{ position: 'relative', height: 16, marginTop: 2 }}>
            {Array.from({ length: Math.floor(person.contractMax / 8) + 1 }).map((_, i) => {
              const h = i * 8;
              const left = (h / person.contractMax) * 100;
              return (
                <div key={i} style={{ position: 'absolute', left: `${left}%`, transform: 'translateX(-50%)', fontSize: 10, color: BRAND.faint }}>{h}u</div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
          {personAssignments.map(a => (
            <Pill key={a.id} label={`${a.klant} · ${a.uren}u`} color={DISC[a.discipline].color} />
          ))}
          {person.flex && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '2px 10px', borderRadius: 999,
              backgroundColor: BRAND.surfaceAlt, border: `1px solid ${BRAND.border}`, fontSize: 12, color: BRAND.ink,
            }}>
              <svg width="14" height="14" style={{ borderRadius: 2 }}>
                <defs>
                  <pattern id="leghatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="6" stroke={BRAND.ink} strokeWidth="2" opacity="0.55" />
                  </pattern>
                </defs>
                <rect width="14" height="14" fill="url(#leghatch)" />
              </svg>
              Flexzone {person.contractMin}–{person.contractMax}u
            </span>
          )}
        </div>
      </div>

      <div style={{ backgroundColor: 'white', border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: '16px 0', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px 12px' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: BRAND.navy }}>Lopende opdrachten</div>
          <button
            onClick={() => setShowAdd(!showAdd)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', border: `1px solid ${BRAND.cornflower}`,
              borderRadius: 6, backgroundColor: showAdd ? BRAND.cornflower : 'white', color: showAdd ? 'white' : BRAND.cornflower,
              fontSize: 12, fontWeight: 600, cursor: 'pointer', ...FONT,
            }}
          >
            {showAdd ? <X size={14} /> : <Plus size={14} />}
            {showAdd ? 'Annuleren' : 'Opdracht toevoegen'}
          </button>
        </div>

        {showAdd && (
          <div style={{ padding: '12px 24px', backgroundColor: BRAND.surface, borderTop: `1px solid ${BRAND.border}`, borderBottom: `1px solid ${BRAND.border}` }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.2fr 1fr 0.7fr 1fr auto', gap: 8, alignItems: 'end' }}>
              <Field label="Klant"><input value={newAssignment.klant} onChange={(e) => setNewAssignment({ ...newAssignment, klant: e.target.value })} style={inputStyle} placeholder="e.g. City of X" /></Field>
              <Field label="Rol / omschrijving"><input value={newAssignment.rol} onChange={(e) => setNewAssignment({ ...newAssignment, rol: e.target.value })} style={inputStyle} placeholder="e.g. Compliance Advisor" /></Field>
              <Field label="Discipline">
                <select value={newAssignment.discipline} onChange={(e) => setNewAssignment({ ...newAssignment, discipline: e.target.value })} style={inputStyle}>
                  {Object.entries(DISC).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </Field>
              <Field label="Soort">
                <select value={newAssignment.soort} onChange={(e) => setNewAssignment({ ...newAssignment, soort: e.target.value })} style={inputStyle}>
                  <option value="detachering">detachering</option>
                  <option value="opdracht">opdracht</option>
                </select>
              </Field>
              <Field label="Uren/wk"><input type="number" min="1" value={newAssignment.uren} onChange={(e) => setNewAssignment({ ...newAssignment, uren: e.target.value })} style={inputStyle} /></Field>
              <Field label="Einddatum"><input type="date" value={newAssignment.eindDatum} onChange={(e) => setNewAssignment({ ...newAssignment, eindDatum: e.target.value })} style={inputStyle} /></Field>
              <button onClick={handleAdd} style={{ padding: '8px 14px', backgroundColor: BRAND.navy, color: 'white', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer', ...FONT }}>Opslaan</button>
            </div>
          </div>
        )}

        <div>
          {personAssignments.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: BRAND.subtle, fontSize: 13 }}>Geen opdrachten geregistreerd.</div>
          )}
          {personAssignments.map((a, i) => (
            <div key={a.id} style={{
              display: 'grid', gridTemplateColumns: '12px 2.2fr 2.2fr 1.4fr 1.1fr 0.8fr 1.2fr 30px',
              alignItems: 'center', gap: 12, padding: '12px 24px',
              borderTop: i === 0 ? 'none' : `1px solid ${BRAND.border}`,
            }}>
              <div style={{ width: 8, height: 28, backgroundColor: DISC[a.discipline].color, borderRadius: 2 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: BRAND.ink }}>{a.klant}</div>
                <div style={{ fontSize: 11, color: BRAND.subtle }}>{a.soort}</div>
              </div>
              <div style={{ fontSize: 13, color: BRAND.ink }}>{a.rol}</div>
              <div style={{ fontSize: 12, color: BRAND.subtle }}>{DISC[a.discipline].label}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: BRAND.navy, textAlign: 'right' }}>{a.uren} u/wk</div>
              <div></div>
              <div style={{ fontSize: 12, color: BRAND.subtle, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Calendar size={12} /> tot {formatDate(a.eindDatum)}
              </div>
              <button onClick={() => handleRemove(a.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: BRAND.faint, padding: 4 }}>
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CapaciteitView({ people, assignments }) {
  const [sortBy, setSortBy] = useState('ruimte');
  const globalMax = Math.max(...people.map(p => p.contractMax));

  const rows = useMemo(() => {
    return people.map(p => {
      const personAssignments = assignments.filter(a => a.personId === p.id);
      const currentTotal = personAssignments.reduce((s, a) => s + a.uren, 0);
      const ruimteAfschalen = p.flex ? Math.max(0, currentTotal - p.contractMin) : 0;
      const ruimteVrij = Math.max(0, p.contractMax - currentTotal);
      const ruimteTotaal = ruimteAfschalen + ruimteVrij;
      return { ...p, currentTotal, ruimteAfschalen, ruimteVrij, ruimteTotaal };
    }).sort((a, b) => {
      if (sortBy === 'ruimte') return b.ruimteTotaal - a.ruimteTotaal;
      if (sortBy === 'naam') return a.name.localeCompare(b.name);
      if (sortBy === 'inzet') return b.currentTotal - a.currentTotal;
      if (sortBy === 'contract') return b.contractMax - a.contractMax;
      return 0;
    });
  }, [people, assignments, sortBy]);

  const totalContract = rows.reduce((s, r) => s + r.contractMax, 0);
  const totalInzet = rows.reduce((s, r) => s + r.currentTotal, 0);
  const totalRuimte = rows.reduce((s, r) => s + r.ruimteTotaal, 0);

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
        <StatTile label="Medewerkers" value={rows.length} sub="in het kantoor" />
        <StatTile label="Contract-uren totaal" value={`${totalContract} u`} sub="per week (max)" />
        <StatTile label="Huidige inzet totaal" value={`${totalInzet} u`} sub={`${Math.round(totalInzet / totalContract * 100)}% van contract`} />
        <StatTile label="Flexibele ruimte" value={`${totalRuimte} u`} sub="potentieel beschikbaar" accent />
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: BRAND.subtle, fontWeight: 600 }}>Sorteer op:</span>
        {[
          { id: 'ruimte', label: 'Meeste ruimte' },
          { id: 'naam', label: 'Naam' },
          { id: 'inzet', label: 'Inzet' },
          { id: 'contract', label: 'Contract' },
        ].map(opt => (
          <button key={opt.id} onClick={() => setSortBy(opt.id)} style={{
            padding: '4px 10px', fontSize: 12, fontWeight: 500, border: `1px solid ${sortBy === opt.id ? BRAND.navy : BRAND.border}`,
            backgroundColor: sortBy === opt.id ? BRAND.navy : 'white', color: sortBy === opt.id ? 'white' : BRAND.ink,
            borderRadius: 4, cursor: 'pointer', ...FONT,
          }}>{opt.label}</button>
        ))}
      </div>

      <div style={{ backgroundColor: 'white', border: `1px solid ${BRAND.border}`, borderRadius: 8, overflow: 'hidden' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.8fr 1.2fr 0.9fr 0.8fr 0.9fr 3fr',
          gap: 12, padding: '12px 20px', backgroundColor: BRAND.surface,
          borderBottom: `1px solid ${BRAND.border}`, fontSize: 11, color: BRAND.subtle,
          fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4,
        }}>
          <div>Medewerker</div>
          <div>Discipline</div>
          <div style={{ textAlign: 'right' }}>Contract</div>
          <div style={{ textAlign: 'right' }}>Inzet</div>
          <div style={{ textAlign: 'right' }}>Ruimte</div>
          <div>Visualisatie (schaal 0–{globalMax}u)</div>
        </div>

        {rows.map((r, i) => (
          <div key={r.id} style={{
            display: 'grid', gridTemplateColumns: '1.8fr 1.2fr 0.9fr 0.8fr 0.9fr 3fr',
            gap: 12, padding: '14px 20px', alignItems: 'center',
            borderTop: i === 0 ? 'none' : `1px solid ${BRAND.border}`,
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: BRAND.ink }}>{r.name}</div>
              <div style={{ fontSize: 11, color: BRAND.subtle }}>{r.title} · {r.bereikbaar}{r.adhoc ? ' · ad-hoc' : ''}</div>
            </div>
            <div>
              <Pill label={DISC[r.primary].label} color={DISC[r.primary].color} />
            </div>
            <div style={{ textAlign: 'right', fontSize: 13, color: BRAND.ink, fontVariantNumeric: 'tabular-nums' }}>
              {r.flex ? `${r.contractMin}–${r.contractMax}u` : `${r.contractMax}u`}
              <div style={{ fontSize: 10, color: BRAND.subtle }}>{r.flex ? 'flex' : 'vast'}</div>
            </div>
            <div style={{ textAlign: 'right', fontSize: 14, fontWeight: 600, color: BRAND.navy, fontVariantNumeric: 'tabular-nums' }}>{r.currentTotal}u</div>
            <div style={{ textAlign: 'right' }}>
              {r.ruimteTotaal > 0 ? (
                <span style={{
                  display: 'inline-block', padding: '3px 10px', backgroundColor: BRAND.amber + '20',
                  color: '#8B6420', border: `1px solid ${BRAND.amber}40`, borderRadius: 4,
                  fontSize: 13, fontWeight: 600, fontVariantNumeric: 'tabular-nums',
                }}>+{r.ruimteTotaal}u</span>
              ) : (
                <span style={{ fontSize: 12, color: BRAND.faint }}>vol</span>
              )}
            </div>
            <div>
              <StackedBar person={r} assignments={assignments} scale={globalMax} height={24} idSuffix="dash" />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14, padding: '12px 16px', backgroundColor: BRAND.surface, borderRadius: 6, border: `1px solid ${BRAND.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: BRAND.subtle, textTransform: 'uppercase', letterSpacing: 0.4, marginRight: 4 }}>Disciplines:</span>
        {Object.entries(DISC).map(([k, v]) => (
          <Pill key={k} label={v.label} color={v.color} />
        ))}
      </div>
    </div>
  );
}

function OpdrachtenView({ people, assignments }) {
  const [filterPerson, setFilterPerson] = useState('all');
  const [filterDisciplines, setFilterDisciplines] = useState(Object.keys(DISC));
  const [filterSoort, setFilterSoort] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return assignments.filter(a => {
      if (filterPerson !== 'all' && a.personId !== Number(filterPerson)) return false;
      if (!filterDisciplines.includes(a.discipline)) return false;
      if (filterSoort !== 'all' && a.soort !== filterSoort) return false;
      if (search) {
        const s = search.toLowerCase();
        if (!a.klant.toLowerCase().includes(s) && !a.rol.toLowerCase().includes(s)) return false;
      }
      return true;
    });
  }, [assignments, filterPerson, filterDisciplines, filterSoort, search]);

  const toggleDiscipline = (d) => {
    if (filterDisciplines.includes(d)) {
      setFilterDisciplines(filterDisciplines.filter(x => x !== d));
    } else {
      setFilterDisciplines([...filterDisciplines, d]);
    }
  };

  const totalUren = filtered.reduce((s, a) => s + a.uren, 0);

  return (
    <div>
      <div style={{ backgroundColor: 'white', border: `1px solid ${BRAND.border}`, borderRadius: 8, padding: 16, marginBottom: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.2fr 1fr', gap: 16, marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: BRAND.subtle, fontWeight: 600, textTransform: 'uppercase', marginBottom: 4, letterSpacing: 0.3 }}>Zoek in klant of rol</div>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: BRAND.faint }} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="e.g. Riverside, compliance..." style={{ ...inputStyle, paddingLeft: 30, fontSize: 13 }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: BRAND.subtle, fontWeight: 600, textTransform: 'uppercase', marginBottom: 4, letterSpacing: 0.3 }}>Persoon</div>
            <select value={filterPerson} onChange={(e) => setFilterPerson(e.target.value)} style={{ ...inputStyle, fontSize: 13 }}>
              <option value="all">Alle medewerkers</option>
              {people.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <div style={{ fontSize: 10, color: BRAND.subtle, fontWeight: 600, textTransform: 'uppercase', marginBottom: 4, letterSpacing: 0.3 }}>Soort</div>
            <select value={filterSoort} onChange={(e) => setFilterSoort(e.target.value)} style={{ ...inputStyle, fontSize: 13 }}>
              <option value="all">Alle soorten</option>
              <option value="detachering">Detachering</option>
              <option value="opdracht">Opdracht</option>
            </select>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 10, color: BRAND.subtle, fontWeight: 600, textTransform: 'uppercase', marginBottom: 6, letterSpacing: 0.3 }}>Discipline (klik om te filteren)</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {Object.entries(DISC).map(([k, v]) => {
              const active = filterDisciplines.includes(k);
              return (
                <button key={k} onClick={() => toggleDiscipline(k)} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px',
                  borderRadius: 999, fontSize: 12, cursor: 'pointer', ...FONT,
                  backgroundColor: active ? v.color : 'transparent',
                  color: active ? 'white' : BRAND.subtle,
                  border: `1.5px solid ${active ? v.color : BRAND.border}`,
                  fontWeight: active ? 600 : 500,
                }}>
                  {!active && <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: v.color }} />}
                  {v.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8, padding: '0 4px' }}>
        <div style={{ fontSize: 13, color: BRAND.subtle }}>
          <span style={{ fontWeight: 700, color: BRAND.navy, fontSize: 16 }}>{filtered.length}</span> opdracht{filtered.length === 1 ? '' : 'en'} · <span style={{ fontWeight: 600, color: BRAND.ink }}>{totalUren}u</span> per week totaal
        </div>
      </div>

      <div style={{ backgroundColor: 'white', border: `1px solid ${BRAND.border}`, borderRadius: 8, overflow: 'hidden' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '12px 1.6fr 2fr 1.4fr 1.3fr 1.2fr 0.7fr 1.2fr',
          gap: 12, padding: '10px 20px', backgroundColor: BRAND.surface, borderBottom: `1px solid ${BRAND.border}`,
          fontSize: 11, color: BRAND.subtle, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.4,
        }}>
          <div></div>
          <div>Klant</div>
          <div>Rol / omschrijving</div>
          <div>Persoon</div>
          <div>Discipline</div>
          <div>Soort</div>
          <div style={{ textAlign: 'right' }}>Uren/wk</div>
          <div>Einddatum</div>
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: 32, textAlign: 'center', color: BRAND.subtle, fontSize: 13 }}>Geen opdrachten gevonden met deze filters.</div>
        )}

        {filtered.map((a, i) => {
          const person = people.find(p => p.id === a.personId);
          return (
            <div key={a.id} style={{
              display: 'grid', gridTemplateColumns: '12px 1.6fr 2fr 1.4fr 1.3fr 1.2fr 0.7fr 1.2fr',
              gap: 12, padding: '14px 20px', alignItems: 'center',
              borderTop: i === 0 ? 'none' : `1px solid ${BRAND.border}`,
            }}>
              <div style={{ width: 4, height: 32, backgroundColor: DISC[a.discipline].color, borderRadius: 2 }} />
              <div style={{ fontSize: 13, fontWeight: 600, color: BRAND.ink }}>{a.klant}</div>
              <div style={{ fontSize: 13, color: BRAND.ink }}>{a.rol}</div>
              <div style={{ fontSize: 13, color: BRAND.ink }}>
                {person.name}
                <div style={{ fontSize: 11, color: BRAND.subtle }}>{person.title}</div>
              </div>
              <div style={{ fontSize: 12, color: BRAND.subtle }}>{DISC[a.discipline].label}</div>
              <div style={{ fontSize: 12, color: BRAND.subtle, textTransform: 'capitalize' }}>{a.soort}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: BRAND.navy, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{a.uren}u</div>
              <div style={{ fontSize: 12, color: BRAND.subtle, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Calendar size={12} /> {formatDate(a.eindDatum)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('mijn');
  const [people] = useState(initialPeople);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [selectedPersonId, setSelectedPersonId] = useState(5);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: BRAND.surface, ...FONT }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '28px 32px' }}>
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: BRAND.navy, letterSpacing: -0.3 }}>Inzet &amp; Capaciteit</div>
            <div style={{ fontSize: 13, color: BRAND.subtle }}>prototype voor het kantooroverzicht</div>
          </div>
          <div style={{ fontSize: 13, color: BRAND.subtle, maxWidth: 760 }}>
            Wie werkt waaraan, voor hoeveel uur per week, en wie heeft ruimte voor een ad-hoc vraag of nieuwe opdracht. Gegevens worden ingevuld door medewerkers zelf en zijn aanvullend op de urenregistratie.
          </div>
        </div>

        <TabBar active={activeTab} onChange={setActiveTab} />

        {activeTab === 'mijn' && (
          <MijnInzetView
            people={people}
            assignments={assignments}
            setAssignments={setAssignments}
            selectedId={selectedPersonId}
            setSelectedId={setSelectedPersonId}
          />
        )}
        {activeTab === 'capaciteit' && <CapaciteitView people={people} assignments={assignments} />}
        {activeTab === 'opdrachten' && <OpdrachtenView people={people} assignments={assignments} />}
      </div>
    </div>
  );
}
