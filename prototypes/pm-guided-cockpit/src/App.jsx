import { useMemo, useState } from "react";

const routineSteps = [
  {
    id: "command",
    title: "Command Center",
    time: "1-5 min",
    question: "Which venture needs attention first?",
    lesson:
      "Scan the portfolio snapshot. Identify the venture with the highest decision risk or the greatest upside opportunity.",
    action: "Choose the venture and next studio move.",
    prompt: "What stands out right now?",
  },
  {
    id: "gates",
    title: "Validation Gates",
    time: "5-10 min",
    question: "What assumption are we trying to prove?",
    lesson:
      "Check the current gate, required evidence, confidence, missing signals, and decision pressure.",
    action: "Mark the assumption that needs proof.",
    prompt: "What would make the decision clearer?",
  },
  {
    id: "evidence",
    title: "Execution Evidence",
    time: "10-15 min",
    question: "Is the work proving something or just consuming time?",
    lesson:
      "Review issues and bets as evidence-bearing work: proves, disproves, unblocks, de-risks, or consumes capacity.",
    action: "Select the evidence signals that matter.",
    prompt: "Which work actually changes confidence?",
  },
  {
    id: "capacity",
    title: "Operator Capacity",
    time: "15-20 min",
    question: "Are scarce operators being spent on the right venture?",
    lesson:
      "Look for product, design, engineering, GTM, and partner pressure before approving more execution.",
    action: "Balance the studio load.",
    prompt: "Where is the studio stretched?",
  },
  {
    id: "analyst",
    title: "Studio Analyst",
    time: "20-25 min",
    question: "What is Foundary recommending, and do you agree?",
    lesson:
      "Compare your judgment with the analyst recommendation, then inspect the evidence and capacity reasoning.",
    action: "Accept, adjust, or challenge the recommendation.",
    prompt: "What is the analyst missing?",
  },
  {
    id: "note",
    title: "PM Decision Note",
    time: "25-30 min",
    question: "What decision will you record today?",
    lesson:
      "End the routine with one clear PM note: current decision, risk, evidence, missing proof, capacity concern, and next action.",
    action: "Write the decision note.",
    prompt: "What should the team do next?",
  },
];

const ventures = [
  {
    id: "sentra",
    name: "Sentra",
    subtitle: "AI intake for care teams",
    phase: "Validate",
    team: 6,
    age: "7 weeks",
    health: 72,
    risk: "Medium",
    riskTone: "medium",
    trend: "rising",
    gate: "Willingness to pay",
    owner: "Maya",
    decision: "Staff up",
    evidence: ["Two paid pilots", "Strong workflow fit", "Design support is tight"],
    missing: "Pricing proof across a second segment",
    capacity: "Design and GTM are near limit",
    analyst: "Protect momentum, but staff design before adding scope.",
    suggestedAction: "Add one design sprint before expanding onboarding.",
  },
  {
    id: "reson8",
    name: "Reson8",
    subtitle: "Creator revenue intelligence",
    phase: "Explore",
    team: 4,
    age: "5 weeks",
    health: 48,
    risk: "High",
    riskTone: "high",
    trend: "falling",
    gate: "Problem urgency",
    owner: "Noah",
    decision: "Narrow",
    evidence: ["Interviews show interest", "Usage is shallow", "Build work is active"],
    missing: "A repeatable urgent buyer pain",
    capacity: "Engineering is committed before proof",
    analyst: "Narrow to one buyer segment and stop non-validation build work.",
    suggestedAction: "Run five focused customer interviews this week.",
  },
  {
    id: "ops",
    name: "Internal Ops",
    subtitle: "Studio leverage workflow",
    phase: "Build",
    team: 3,
    age: "10 weeks",
    health: 81,
    risk: "Low",
    riskTone: "low",
    trend: "stable",
    gate: "Operational leverage",
    owner: "Iris",
    decision: "Continue",
    evidence: ["Weekly time saved", "Low support drag", "Clear internal owner"],
    missing: "One more reliability checkpoint",
    capacity: "Contained scope, low downstream drag",
    analyst: "Continue, but keep scope contained to protect portfolio capacity.",
    suggestedAction: "Ship the reliability pass and do not expand scope.",
  },
  {
    id: "northstar",
    name: "Northstar AI",
    subtitle: "AI copilot for field ops",
    phase: "Pre-Seed",
    team: 4,
    age: "3 weeks",
    health: 54,
    risk: "High",
    riskTone: "high",
    trend: "falling",
    gate: "Problem-market fit",
    owner: "Ari",
    decision: "Pause",
    evidence: ["Problem depth unclear", "Workflow proof is thin", "Design and engineering allocated"],
    missing: "Proof that field teams will change behavior",
    capacity: "Design and engineering over-allocated",
    analyst: "Pause broad build work and focus on workflow proof.",
    suggestedAction: "Run five customer interviews focused on workflow urgency.",
  },
];

const decisionOptions = [
  { id: "Continue", helper: "Stay the course" },
  { id: "Narrow", helper: "Focus the scope" },
  { id: "Pause", helper: "Buy time" },
  { id: "Staff up", helper: "Add capacity" },
  { id: "Defer", helper: "Revisit later" },
  { id: "Kill", helper: "Stop this effort" },
];

const evidenceOptions = [
  "Customer urgency",
  "Workflow proof",
  "Capacity drag",
  "Buyer willingness",
  "Confidence trend",
];

function clampIndex(index) {
  return Math.max(0, Math.min(routineSteps.length - 1, index));
}

function getProgress(stepIndex, completedIds) {
  return Math.round((completedIds.size / routineSteps.length) * 100 || (stepIndex / routineSteps.length) * 100);
}

export function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedVentureId, setSelectedVentureId] = useState("northstar");
  const [selectedDecision, setSelectedDecision] = useState("Pause");
  const [selectedEvidence, setSelectedEvidence] = useState(["Workflow proof", "Capacity drag"]);
  const [confidence, setConfidence] = useState(52);
  const [completedIds, setCompletedIds] = useState(new Set());
  const [showTips, setShowTips] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [rationale, setRationale] = useState(
    "Validation confidence is weak while operator capacity is already committed.",
  );

  const step = routineSteps[stepIndex];
  const venture = ventures.find((item) => item.id === selectedVentureId) ?? ventures[0];
  const progress = getProgress(stepIndex, completedIds);

  const note = useMemo(
    () => ({
      venture: venture.name,
      decision: selectedDecision,
      risk: `${venture.risk} decision risk around ${venture.gate.toLowerCase()}`,
      evidence: selectedEvidence.join(", ") || "No evidence selected yet",
      missing: venture.missing,
      capacity: venture.capacity,
      rationale,
      nextAction: venture.suggestedAction,
      owner: venture.owner,
    }),
    [rationale, selectedDecision, selectedEvidence, venture],
  );

  function completeStep(next = true) {
    setCompletedIds((current) => {
      const nextSet = new Set(current);
      nextSet.add(step.id);
      return nextSet;
    });
    if (next) {
      setStepIndex((current) => clampIndex(current + 1));
    }
  }

  function toggleEvidence(item) {
    setSelectedEvidence((current) =>
      current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item],
    );
  }

  function selectVenture(id) {
    const nextVenture = ventures.find((item) => item.id === id);
    setSelectedVentureId(id);
    if (nextVenture) {
      setSelectedDecision(nextVenture.decision);
      setRationale(
        `${nextVenture.name} needs a ${nextVenture.decision.toLowerCase()} call because ${nextVenture.missing.toLowerCase()}.`,
      );
      setConfidence(nextVenture.health);
    }
  }

  return (
    <main className="prototype-shell">
      <aside className="lesson-rail">
        <div className="brand-block">
          <div className="brand-mark">F</div>
          <div>
            <p className="eyebrow">Foundary</p>
            <h1>30-minute PM routine</h1>
          </div>
        </div>

        <div className="rail-caption">
          <span>Training prototype</span>
          <button type="button" onClick={() => setShowTips((value) => !value)}>
            {showTips ? "Hide tips" : "Show tips"}
          </button>
        </div>

        <nav className="step-list" aria-label="Routine steps">
          {routineSteps.map((item, index) => {
            const active = index === stepIndex;
            const complete = completedIds.has(item.id);
            return (
              <button
                className={`step-item ${active ? "active" : ""} ${complete ? "complete" : ""}`}
                key={item.id}
                type="button"
                onClick={() => setStepIndex(index)}
              >
                <span className="step-number">{complete ? "✓" : index + 1}</span>
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.time}</small>
                  <em>{item.action}</em>
                </span>
              </button>
            );
          })}
        </nav>

        <section className="pro-tip">
          <strong>Pro tip</strong>
          <p>Do this daily. The quality of your decisions compounds faster than task volume.</p>
        </section>
      </aside>

      <section className="lesson-stage">
        <header className="stage-header">
          <div>
            <p className="eyebrow">Step {stepIndex + 1} of 6</p>
            <h2>{step.title}</h2>
            <p>{step.question}</p>
          </div>
          <div className="timer-card">
            <button type="button" onClick={() => setTimerRunning((value) => !value)}>
              {timerRunning ? "Pause routine" : "Start routine"}
            </button>
            <span>{timerRunning ? "Running" : "30:00 total"}</span>
          </div>
        </header>

        <section className="lesson-copy">
          <p>{step.lesson}</p>
          <div className="focus-question">
            <span>PM question</span>
            <strong>{step.prompt}</strong>
          </div>
        </section>

        <section className="portfolio-table" aria-label="Portfolio snapshot">
          <div className="table-header">
            <span>Venture</span>
            <span>Health</span>
            <span>Decision risk</span>
            <span>Trend</span>
            <span>Next gate</span>
            <span>Owner</span>
          </div>
          {ventures.map((item) => (
            <button
              className={`venture-row ${item.id === selectedVentureId ? "selected" : ""}`}
              key={item.id}
              type="button"
              onClick={() => selectVenture(item.id)}
            >
              <span>
                <strong>{item.name}</strong>
                <small>{item.subtitle}</small>
              </span>
              <span className={`health-ring ${item.riskTone}`}>{item.health}</span>
              <span className={`risk-pill ${item.riskTone}`}>{item.risk}</span>
              <span className={`trend ${item.trend}`}>{item.trend}</span>
              <span>
                <strong>{item.gate}</strong>
                <small>{item.phase}</small>
              </span>
              <span className="owner-dot">{item.owner.slice(0, 2)}</span>
            </button>
          ))}
        </section>

        <section className="decision-flow">
          {["Scan", "Assess", "Diagnose", "Choose", "Note"].map((label, index) => (
            <div className={index === Math.min(stepIndex, 4) ? "active" : ""} key={label}>
              <span>{index + 1}</span>
              <strong>{label}</strong>
              <small>
                {index === 0 && "Find the signal"}
                {index === 1 && "Name the risk"}
                {index === 2 && "Find the driver"}
                {index === 3 && "Pick a move"}
                {index === 4 && "Record action"}
              </small>
            </div>
          ))}
        </section>

        <section className="practice-panel">
          <div className="practice-head">
            <div>
              <p className="eyebrow">Practice</p>
              <h3>What is your next move for {venture.name}?</h3>
            </div>
            <button type="button" onClick={() => setSelectedDecision(venture.decision)}>
              Use analyst move
            </button>
          </div>

          <div className="decision-grid">
            {decisionOptions.map((option) => (
              <button
                className={selectedDecision === option.id ? "selected" : ""}
                key={option.id}
                type="button"
                onClick={() => setSelectedDecision(option.id)}
              >
                <strong>{option.id}</strong>
                <small>{option.helper}</small>
              </button>
            ))}
          </div>

          <div className="practice-details">
            <div>
              <span className="metric-label">Evidence to consider</span>
              <div className="chip-row">
                {evidenceOptions.map((item) => (
                  <button
                    className={selectedEvidence.includes(item) ? "selected" : ""}
                    key={item}
                    type="button"
                    onClick={() => toggleEvidence(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <label className="confidence-control">
              <span>Validation confidence</span>
              <strong>{confidence}%</strong>
              <input
                max="100"
                min="0"
                onChange={(event) => setConfidence(Number(event.target.value))}
                type="range"
                value={confidence}
              />
            </label>
            <label className="rationale-field">
              <span>Rationale</span>
              <textarea onChange={(event) => setRationale(event.target.value)} value={rationale} />
            </label>
          </div>

          <div className="panel-actions">
            <button type="button" onClick={() => completeStep(false)}>
              Mark step done
            </button>
            <button className="primary" type="button" onClick={() => completeStep(true)}>
              Next step
            </button>
          </div>
        </section>
      </section>

      <aside className="scenario-panel">
        <section className="scenario-card">
          <div className="section-title">
            <span>Your scenario</span>
            <select onChange={(event) => selectVenture(event.target.value)} value={selectedVentureId}>
              {ventures.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <h3>{venture.name}</h3>
          <p>{venture.subtitle}</p>
          <div className="scenario-stats">
            <span>
              <small>Stage</small>
              <strong>{venture.phase}</strong>
            </span>
            <span>
              <small>Team</small>
              <strong>{venture.team}</strong>
            </span>
            <span>
              <small>Time in stage</small>
              <strong>{venture.age}</strong>
            </span>
          </div>
        </section>

        <section className="progress-card">
          <div className="section-title">
            <span>Routine progress</span>
            <strong>{completedIds.size} of 6</strong>
          </div>
          <div className="progress-ring" style={{ "--progress": `${progress}%` }}>
            <span>{progress}%</span>
          </div>
          <div className="mini-steps">
            {routineSteps.map((item, index) => (
              <button
                className={index === stepIndex ? "active" : completedIds.has(item.id) ? "complete" : ""}
                key={item.id}
                type="button"
                onClick={() => setStepIndex(index)}
              >
                <span>{index + 1}</span>
                <strong>{item.title}</strong>
                <small>{item.time}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="analyst-card">
          <div className="section-title">
            <span>Studio Analyst</span>
            <strong>{venture.decision}</strong>
          </div>
          <p>{venture.analyst}</p>
          <div className="evidence-stack">
            {venture.evidence.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>

        <section className="note-preview">
          <div className="section-title">
            <span>Decision note preview</span>
            <strong>{note.decision}</strong>
          </div>
          <dl>
            <div>
              <dt>Venture</dt>
              <dd>{note.venture}</dd>
            </div>
            <div>
              <dt>Main risk</dt>
              <dd>{note.risk}</dd>
            </div>
            <div>
              <dt>Evidence</dt>
              <dd>{note.evidence}</dd>
            </div>
            <div>
              <dt>Missing proof</dt>
              <dd>{note.missing}</dd>
            </div>
            <div>
              <dt>Capacity</dt>
              <dd>{note.capacity}</dd>
            </div>
            <div>
              <dt>Next action</dt>
              <dd>{note.nextAction}</dd>
            </div>
          </dl>
        </section>
      </aside>

      {showTips ? (
        <div className="tips-drawer">
          <button type="button" onClick={() => setShowTips(false)}>
            Close
          </button>
          <h3>Beginner PM cues</h3>
          <p>Start with decisions, not tasks. A task matters only when it changes evidence, confidence, or capacity.</p>
          <ul>
            <li>Motion: the team shipped something.</li>
            <li>Progress: the team proved something.</li>
            <li>Weak signal: effort keeps rising while confidence stays flat.</li>
          </ul>
        </div>
      ) : null}
    </main>
  );
}
