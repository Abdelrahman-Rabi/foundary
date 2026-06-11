import { useMemo, useState } from "react";

const steps = [
  {
    id: "command",
    color: "#1769d8",
    title: "Command Center",
    time: "0-5 min",
    question: "What's the most important signal today?",
    guidance: "Get oriented. Decide what is true, what changed, and what matters today.",
    answers: [
      "Fleet demo results came in higher than expected",
      "Sign-ups slowed this week",
      "A competitor launched a similar product",
      "Team bandwidth is stretched",
    ],
    practice: ["Fleet demo outcomes", "Weekly active fleet trials", "Unit reliability in the field"],
  },
  {
    id: "gates",
    color: "#e77b22",
    title: "Validation Gates",
    time: "5-10 min",
    question: "What assumption is being tested?",
    guidance: "Name the gate before reviewing work. If the gate is vague, the team will confuse activity with proof.",
    answers: [
      "Fleets will pay to reduce charging downtime",
      "The dashboard is visually polished enough",
      "More features will increase confidence",
      "A bigger roadmap will clarify the pitch",
    ],
    practice: ["Required evidence", "Current proof", "Missing signal"],
  },
  {
    id: "evidence",
    color: "#67a34b",
    title: "Execution Evidence",
    time: "10-15 min",
    question: "Does this work prove anything?",
    guidance: "Sort work by evidence value. Strong PMs protect the team from tasks that consume capacity without changing confidence.",
    answers: [
      "Demo data from two fleet pilots",
      "Polishing the settings menu",
      "Adding a generic export button",
      "Writing a broader feature wishlist",
    ],
    practice: ["Proof points", "De-risking work", "Capacity-only work"],
  },
  {
    id: "capacity",
    color: "#7a4db3",
    title: "Operator Capacity",
    time: "15-20 min",
    question: "Where is capacity tight?",
    guidance: "Look for shared operators being pulled into low-confidence work before approving more execution.",
    answers: [
      "Engineering is split across demo reliability and onboarding",
      "Marketing wants a launch page",
      "The team wants more meeting time",
      "Design has a new icon set to explore",
    ],
    practice: ["Engineering load", "Design support", "Partner attention"],
  },
  {
    id: "analyst",
    color: "#e7ad17",
    title: "Studio Analyst",
    time: "20-25 min",
    question: "What is the pattern telling us?",
    guidance: "Use the analyst as a structured challenge. Agree only when the evidence and capacity reasoning hold up.",
    answers: [
      "Narrow to commercial fleets and prove repeat urgency",
      "Continue all roadmap items",
      "Pause customer calls and ship more product",
      "Ignore capacity until the next review",
    ],
    practice: ["Recommendation", "Why it matters", "What to challenge"],
  },
  {
    id: "note",
    color: "#0d98a8",
    title: "PM Decision Note",
    time: "25-30 min",
    question: "What move will you make today?",
    guidance: "End with a decision note that someone else could act on without another meeting.",
    answers: ["Narrow", "Continue", "Pause", "Staff up"],
    practice: ["Decision", "Rationale", "Next action"],
  },
];

const scenarios = [
  {
    id: "sparkcharge",
    name: "SparkCharge",
    description: "Portable EV charging devices that deliver fast EV charging anywhere.",
    stage: "Seed",
    focus: "Early traction",
    goal: "Find PMF in commercial fleets",
    metrics: ["23 active fleet trials", "14% WoW trial growth", "62% demo win rate", "3.8 NPS"],
    signals: [
      "Large logistics fleet completed a successful 2-week trial",
      "Conversion from demo to trial improved",
      "Support tickets flat week over week",
      "New competitor announced funding and product launch",
    ],
    risks: [
      "Hardware reliability at high temps",
      "Sales cycle lengthening with larger fleets",
      "Limited field service capacity in west region",
    ],
  },
  {
    id: "northstar",
    name: "Northstar AI",
    description: "Field operations copilot for distributed service teams.",
    stage: "Pre-Seed",
    focus: "Problem depth",
    goal: "Prove workflow urgency",
    metrics: ["12 interviews", "4 workflow repeats", "38% confidence", "2 design sprints used"],
    signals: [
      "Operators describe the pain, but buying urgency is uneven",
      "Pilot users want more integrations before adoption",
      "Engineering has already started broad build work",
    ],
    risks: ["Weak willingness to pay", "Overbuilt before proof", "Design and engineering contention"],
  },
];

function nextIndex(current) {
  return Math.min(current + 1, steps.length - 1);
}

export function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [scenarioId, setScenarioId] = useState("sparkcharge");
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [confidence, setConfidence] = useState(70);
  const [boardTab, setBoardTab] = useState("snapshot");
  const [running, setRunning] = useState(true);
  const [journal, setJournal] = useState({
    command: "Fleet demo results came in higher than expected.",
  });

  const step = steps[activeStep];
  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0];

  const completedCount = Object.keys(journal).length;
  const journalRows = useMemo(
    () =>
      steps.map((item) => ({
        ...item,
        entry: journal[item.id] || "",
      })),
    [journal],
  );

  function completeStep() {
    const practiceText = step.practice.join(", ");
    setJournal((current) => ({
      ...current,
      [step.id]: `${step.answers[selectedAnswer]}. Watching: ${practiceText}. Confidence ${confidence}%.`,
    }));
    setActiveStep((current) => nextIndex(current));
    setSelectedAnswer(0);
  }

  function clearJournal() {
    setJournal({});
    setActiveStep(0);
  }

  return (
    <main className="workshop-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon" aria-hidden="true" />
          <div>
            <strong>Foundary</strong>
            <span>PM Routine: 30-Minute Daily Workshop</span>
            <small>Learn by doing. Practice the daily rhythm that drives better decisions.</small>
          </div>
        </div>
        <div className="timer">
          <button aria-label="Play routine" type="button" onClick={() => setRunning((value) => !value)}>
            {running ? "Pause" : "Play"}
          </button>
          <strong>{running ? "07:42" : "Paused"}</strong>
          <span>of 30:00</span>
          <button type="button">Exit Workshop</button>
        </div>
      </header>

      <section className="timeline" aria-label="30-minute workshop timeline">
        <span className="timeline-edge">0:00</span>
        {steps.map((item, index) => (
          <button
            className={index === activeStep ? "active" : journal[item.id] ? "complete" : ""}
            key={item.id}
            style={{ "--step-color": item.color }}
            type="button"
            onClick={() => {
              setActiveStep(index);
              setSelectedAnswer(0);
            }}
          >
            <span>{index + 1}</span>
            <strong>{item.title}</strong>
            <small>{item.time}</small>
          </button>
        ))}
        <span className="timeline-edge end">30:00</span>
      </section>

      <div className="workspace">
        <aside className="scenario-sidebar">
          <section className="progress">
            <h2>Workshop Progress</h2>
            <div className="dot-progress">
              {steps.map((item, index) => (
                <button
                  className={index === activeStep ? "active" : journal[item.id] ? "complete" : ""}
                  key={item.id}
                  type="button"
                  onClick={() => setActiveStep(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </section>

          <label className="scenario-picker">
            <span>Scenario</span>
            <select
              value={scenarioId}
              onChange={(event) => {
                setScenarioId(event.target.value);
                setJournal({});
              }}
            >
              {scenarios.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <section className="scenario-detail">
            <h3>{scenario.name}</h3>
            <p>{scenario.description}</p>
            <dl>
              <div>
                <dt>Stage</dt>
                <dd>{scenario.stage}</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>{scenario.focus}</dd>
              </div>
              <div>
                <dt>Goal</dt>
                <dd>{scenario.goal}</dd>
              </div>
            </dl>
          </section>

          <section className="how-it-works">
            <h3>How this works</h3>
            <p>Work each step in order. Answer the prompt, complete the practice, then mark the step complete.</p>
          </section>
        </aside>

        <section className="lesson-panel">
          <div className="lesson-grid">
            <article className="lesson-main">
              <p className="eyebrow">Step {activeStep + 1} of 6</p>
              <h1>{step.title}</h1>
              <p>{step.guidance}</p>

              <div className="question-block">
                <span>PM Question</span>
                <h2>{step.question}</h2>
                <p>Choose one answer that should shape your focus.</p>
              </div>

              <div className="answer-grid">
                {step.answers.map((answer, index) => (
                  <button
                    className={selectedAnswer === index ? "selected" : ""}
                    key={answer}
                    type="button"
                    onClick={() => setSelectedAnswer(index)}
                  >
                    <span>{selectedAnswer === index ? "Selected" : "Option"}</span>
                    {answer}
                  </button>
                ))}
              </div>
            </article>

            <article className="map-card">
              <p>Start with the big picture</p>
              <div className="map-lines">
                <span>Venture snapshot</span>
                <span>Key signals</span>
                <span>Today's focus</span>
                <strong>{step.title}</strong>
                <span>What changed?</span>
                <span>What matters?</span>
                <span>What's the risk?</span>
              </div>
            </article>

            <article className="practice-card">
              <h2>Practice</h2>
              <p>List the top 3 things you're watching today.</p>
              <div className="practice-list">
                {step.practice.map((item, index) => (
                  <label key={item}>
                    <span>{index + 1}</span>
                    <input defaultValue={item} />
                  </label>
                ))}
              </div>
              <label className="confidence">
                <span>Confidence</span>
                <strong>{confidence}%</strong>
                <input
                  max="100"
                  min="0"
                  onChange={(event) => setConfidence(Number(event.target.value))}
                  type="range"
                  value={confidence}
                />
              </label>
              <button className="primary" type="button" onClick={completeStep}>
                Complete Step
              </button>
            </article>
          </div>

          <div className="lower-grid">
            <section className="scenario-board">
              <div className="section-header">
                <h2>Scenario Board</h2>
                <div>
                  {["snapshot", "signals", "metrics", "risks"].map((item) => (
                    <button
                      className={boardTab === item ? "active" : ""}
                      key={item}
                      type="button"
                      onClick={() => setBoardTab(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <article className="board-content">
                <h3>{scenario.name} at a Glance</h3>
                {boardTab === "metrics" ? (
                  <div className="metric-row">
                    {scenario.metrics.map((metric) => (
                      <span key={metric}>{metric}</span>
                    ))}
                  </div>
                ) : null}
                {boardTab === "risks" ? (
                  <ul className="risk-list">
                    {scenario.risks.map((risk) => (
                      <li key={risk}>{risk}</li>
                    ))}
                  </ul>
                ) : (
                  <ul>
                    {scenario.signals.map((signal) => (
                      <li key={signal}>{signal}</li>
                    ))}
                  </ul>
                )}
              </article>
            </section>

            <section className="journal">
              <div className="section-header">
                <h2>Decision Journal</h2>
                <button type="button" onClick={clearJournal}>
                  Clear Journal
                </button>
              </div>

              <div className="journal-list">
                {journalRows.map((item, index) => (
                  <button
                    className={index === activeStep ? "active" : item.entry ? "complete" : ""}
                    key={item.id}
                    style={{ "--step-color": item.color }}
                    type="button"
                    onClick={() => setActiveStep(index)}
                  >
                    <span>{index + 1}</span>
                    <strong>{item.title}</strong>
                    <small>{item.question}</small>
                    <em>{item.entry || "-"}</em>
                  </button>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>

      <footer className="footer-strip">
        <span>{completedCount} of 6 steps complete</span>
        <strong>Motion is shipping. Progress is proving.</strong>
        <span>End with one decision note.</span>
      </footer>
    </main>
  );
}
