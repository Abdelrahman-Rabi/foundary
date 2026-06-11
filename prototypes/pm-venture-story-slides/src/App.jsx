import { useMemo, useState } from "react";

const slides = [
  {
    id: "customer",
    minute: "0:00",
    title: "Start With The Customer",
    plain: "A customer is the person or team with the problem.",
    story:
      "SparkCharge serves fleet managers who lose time when delivery vans cannot charge reliably during the day.",
    concept: "Customer",
    where: "You see customer focus inside the venture story, validation gate, evidence, and analyst reasoning.",
    takeaway: "A PM starts by asking who has the problem.",
    simpleExample: "Customer = fleet manager.",
    question: "Who should you understand first?",
    choices: ["The fleet manager with the charging problem", "The internal team with opinions", "Everyone in the market"],
    rightChoice: 0,
    lesson: "If you do not know the customer, every decision becomes fuzzy.",
  },
  {
    id: "problem",
    minute: "2:00",
    title: "Name The Problem",
    plain: "A problem is the pain the customer wants solved.",
    story:
      "Fleet managers lose delivery time when vans sit waiting for chargers. That lost time costs money.",
    concept: "Problem",
    where: "You see the problem in the venture description, gate assumption, issue context, and decision note.",
    takeaway: "A product is only useful if it solves a painful problem.",
    simpleExample: "Problem = vans lose time waiting to charge.",
    question: "What makes this worth solving?",
    choices: ["It costs the fleet time and money", "The idea sounds modern", "The team wants to build it"],
    rightChoice: 0,
    lesson: "Strong PMs do not start with features. They start with painful problems.",
  },
  {
    id: "segment",
    minute: "4:00",
    title: "Choose A Segment",
    plain: "A segment is the specific group you focus on first.",
    story:
      "SparkCharge could sell to many EV owners, but the first segment is commercial delivery fleets.",
    concept: "Segment",
    where: "You see segment focus in gates, roadmap bets, analyst recommendations, and PM decisions.",
    takeaway: "A narrow segment makes learning faster.",
    simpleExample: "Segment = commercial delivery fleets.",
    question: "Which focus is best for learning?",
    choices: ["Commercial delivery fleets", "Every EV owner", "Anyone who likes technology"],
    rightChoice: 0,
    lesson: "A focused segment gives clearer evidence. Too broad makes the signal noisy.",
  },
  {
    id: "value",
    minute: "6:00",
    title: "Explain The Value",
    plain: "Value is the useful outcome the customer gets.",
    story:
      "SparkCharge promises fewer charging delays, faster deliveries, and less downtime for fleets.",
    concept: "Value",
    where: "You see value in the venture story, evidence, roadmap bet, and analyst summary.",
    takeaway: "Value is not the feature. Value is the better result.",
    simpleExample: "Value = less delivery downtime.",
    question: "Which statement explains value?",
    choices: ["Fleet vans spend less time stuck charging", "The app has many screens", "The roadmap looks full"],
    rightChoice: 0,
    lesson: "Customers care about outcomes. Features matter only when they create value.",
  },
  {
    id: "venture",
    minute: "8:00",
    title: "Meet The Venture",
    plain: "A venture is one startup idea the studio is helping.",
    story:
      "SparkCharge wants to help delivery fleets charge electric vans anywhere. Your job is to decide if the studio should keep spending time on it.",
    concept: "Venture",
    where: "You see ventures in the portfolio, Command Center, and venture selector.",
    takeaway: "A venture is the startup you are judging.",
    simpleExample: "SparkCharge = one venture.",
    question: "What are you trying to understand first?",
    choices: ["Is this a real customer problem?", "Can we design a prettier dashboard?", "Can we add more tasks?"],
    rightChoice: 0,
    lesson: "Start with the problem. A venture only deserves more work if the problem is real.",
  },
  {
    id: "assumption",
    minute: "10:00",
    title: "Spot The Assumption",
    plain: "An assumption is something we believe but have not proven yet.",
    story:
      "The current gate is simple: will fleet managers pay to reduce charging downtime?",
    concept: "Assumption",
    where: "You see assumptions in validation gates, roadmap bets, evidence, and analyst reasoning.",
    takeaway: "Assumptions are the risky beliefs behind the product.",
    simpleExample: "Assumption = fleets will pay to reduce downtime.",
    question: "Which statement is an assumption?",
    choices: ["Fleets will pay for this", "The team had a meeting", "The page uses blue buttons"],
    rightChoice: 0,
    lesson: "PMs make assumptions visible so the team can test them.",
  },
  {
    id: "gate",
    minute: "12:00",
    title: "Find The Validation Gate",
    plain: "A validation gate is the main assumption we must prove before moving forward.",
    story:
      "The gate is: will commercial fleets pay for reliable mobile charging?",
    concept: "Gate",
    where: "You see gates in validation risk, issue drawers, roadmap drawers, and analyst reasoning.",
    takeaway: "A gate is the question that must be answered before the team does more work.",
    simpleExample: "Gate = will fleets pay for less downtime?",
    question: "Which proof matters most right now?",
    choices: ["A paid fleet pilot", "A long feature list", "A new logo", "More internal meetings"],
    rightChoice: 0,
    lesson: "The gate keeps the team honest. It asks: what must be true before we build more?",
  },
  {
    id: "evidence",
    minute: "14:00",
    title: "Look For Evidence",
    plain: "Evidence is proof. It is stronger than opinions, meetings, or busy work.",
    story:
      "Two fleets finished demos. One said they would pay if reliability improves. Another asked for a second trial.",
    concept: "Execution Evidence",
    where: "You see evidence on issues, roadmap bets, validation gates, and analyst recommendations.",
    takeaway: "Evidence is the proof that changes confidence.",
    simpleExample: "Evidence = a fleet asks for another trial.",
    question: "Which item is strongest evidence?",
    choices: ["A fleet asks for a second trial", "The team made a nice slide", "A task was moved to Done"],
    rightChoice: 0,
    lesson: "Done work is not always progress. Progress means confidence changed because we learned something.",
  },
  {
    id: "metric",
    minute: "16:00",
    title: "Pick The Metric",
    plain: "A metric is a number that helps you see if things are getting better.",
    story:
      "SparkCharge tracks demo-to-trial conversion, reliability during trials, and willingness to pay.",
    concept: "Metric",
    where: "You see metrics in the Command Center, evidence summaries, roadmap confidence, and analyst notes.",
    takeaway: "A metric should help answer the decision question.",
    simpleExample: "Metric = 62% demo win rate.",
    question: "Which metric helps the PM decision?",
    choices: ["Demo-to-trial conversion", "Number of internal meetings", "How many colors are in the UI"],
    rightChoice: 0,
    lesson: "Use metrics to clarify decisions, not to decorate reports.",
  },
  {
    id: "issues",
    minute: "18:00",
    title: "Connect Work To Proof",
    plain: "An issue is useful when it helps prove, unblock, or de-risk the decision.",
    story:
      "The team has three issues: fix field reliability, redesign settings, and run five fleet interviews.",
    concept: "Issues",
    where: "You see issues in the Evidence area and inside linked drawers.",
    takeaway: "An issue should help prove, unblock, or reduce risk.",
    simpleExample: "Good issue = fix reliability for the paid trial.",
    question: "Which issue should you prioritize?",
    choices: ["Fix field reliability for the trial", "Redesign settings", "Rename every status"],
    rightChoice: 0,
    lesson: "Good PMs protect the team from work that looks productive but does not answer the key question.",
  },
  {
    id: "priority",
    minute: "20:00",
    title: "Choose The Priority",
    plain: "Priority means deciding what matters most right now.",
    story:
      "The team can fix reliability, polish settings, or add more feature ideas. Only one clearly helps the next decision.",
    concept: "Priority",
    where: "You see priorities through issues, bets, decision pressure, and recommended next actions.",
    takeaway: "Priority is not what is loudest. It is what best moves the decision.",
    simpleExample: "Priority = fix reliability for the trial.",
    question: "Which priority is strongest?",
    choices: ["Fix reliability for trial proof", "Polish settings first", "Add more ideas to the backlog"],
    rightChoice: 0,
    lesson: "Good prioritization protects the team from doing low-value work.",
  },
  {
    id: "roadmap",
    minute: "22:00",
    title: "Read The Roadmap As Bets",
    plain: "A roadmap item is not just a plan. It is a bet that should produce evidence.",
    story:
      "The roadmap has one bet: prove fleet reliability in real delivery conditions before expanding features.",
    concept: "Roadmap Bet",
    where: "You see roadmap bets in the Bets area and Command Center summaries.",
    takeaway: "A roadmap bet is a larger initiative that should create evidence.",
    simpleExample: "Bet = prove reliability before adding more features.",
    question: "What should the roadmap bet do?",
    choices: ["Prove reliability in the field", "Add all requested features", "Make the board look full"],
    rightChoice: 0,
    lesson: "In Foundary, roadmap means: what bet are we making, and what evidence will tell us if it worked?",
  },
  {
    id: "scope",
    minute: "24:00",
    title: "Control The Scope",
    plain: "Scope is how much work the team agrees to do.",
    story:
      "SparkCharge should not build every fleet feature yet. It should build only what proves reliability and willingness to pay.",
    concept: "Scope",
    where: "You see scope in issues, roadmap bets, capacity pressure, and PM decisions like narrow or defer.",
    takeaway: "Smaller scope helps the team learn faster.",
    simpleExample: "Scope = one reliability trial, not every feature.",
    question: "Which scope is healthiest?",
    choices: ["One focused reliability trial", "All fleet features at once", "A bigger plan with no proof"],
    rightChoice: 0,
    lesson: "Scope control is a PM superpower. It keeps learning fast and waste low.",
  },
  {
    id: "capacity",
    minute: "26:00",
    title: "Check Capacity",
    plain: "Capacity means the people and attention the studio has available.",
    story:
      "Engineering is busy with two ventures. Design is helping three teams. Partner time is limited this week.",
    concept: "Operator Capacity",
    where: "You see capacity pressure in the Command Center, issue context, roadmap context, and analyst notes.",
    takeaway: "Capacity shows whether the studio has enough people and attention.",
    simpleExample: "Capacity risk = engineering is busy before proof is strong.",
    question: "What should you ask before adding more work?",
    choices: ["Is this worth scarce team time?", "Can everyone work late?", "Can we add more meetings?"],
    rightChoice: 0,
    lesson: "Capacity is not a calendar. It tells you when weak ideas are using strong people.",
  },
  {
    id: "tradeoff",
    minute: "28:00",
    title: "Make The Tradeoff",
    plain: "A tradeoff means choosing one good thing over another because time is limited.",
    story:
      "If engineering fixes SparkCharge reliability this week, it cannot also build a large onboarding flow for another venture.",
    concept: "Tradeoff",
    where: "You see tradeoffs in capacity pressure, analyst recommendations, and decision notes.",
    takeaway: "Every yes creates a no somewhere else.",
    simpleExample: "Tradeoff = reliability now, onboarding later.",
    question: "What should the PM make clear?",
    choices: ["What we choose and what we delay", "Only the exciting work", "Only what leadership wants to hear"],
    rightChoice: 0,
    lesson: "Tradeoffs make decisions honest. They show the real cost of focus.",
  },
  {
    id: "analyst",
    minute: "30:00",
    title: "Use Studio Analyst",
    plain: "Studio Analyst gives a recommendation, but you still make the PM call.",
    story:
      "The analyst says: narrow SparkCharge to one fleet segment and prove reliability before adding features.",
    concept: "Studio Analyst",
    where: "You see Studio Analyst recommendations in the Analyst area and Command Center.",
    takeaway: "The analyst helps connect evidence, risk, capacity, and the next move.",
    simpleExample: "Analyst says: narrow scope until reliability is proven.",
    question: "How should you use the analyst?",
    choices: ["Check if the evidence supports it", "Obey it without thinking", "Ignore it always"],
    rightChoice: 0,
    lesson: "Treat the analyst like a smart helper. It should explain the evidence behind the recommendation.",
  },
  {
    id: "decision",
    minute: "32:00",
    title: "Make The PM Decision",
    plain: "A PM decision says what the team should do next and why.",
    story:
      "SparkCharge has useful evidence, but reliability risk is still high and capacity is tight.",
    concept: "PM Decision",
    where: "You use the decision across Command Center, gates, issues, bets, and analyst recommendations.",
    takeaway: "The PM decision tells the team what to do next and why.",
    simpleExample: "Decision = narrow scope and prove reliability.",
    question: "What is the clearest decision?",
    choices: ["Narrow scope and prove reliability", "Build everything", "Pause forever"],
    rightChoice: 0,
    lesson: "A good decision is simple: what we do, why it matters, and what proof we need next.",
  },
];

const conceptCards = [
  ["Customer", "Who has the pain"],
  ["Problem", "The pain to solve"],
  ["Segment", "The first group"],
  ["Value", "The useful result"],
  ["Venture", "The startup idea"],
  ["Assumption", "The risky belief"],
  ["Gate", "The main thing to prove"],
  ["Evidence", "The proof"],
  ["Metric", "The number"],
  ["Issues", "The work"],
  ["Priority", "What matters now"],
  ["Roadmap", "The bet"],
  ["Scope", "How much work"],
  ["Capacity", "The team cost"],
  ["Tradeoff", "What you say no to"],
  ["Analyst", "The recommendation"],
  ["Decision", "The PM call"],
];

const storyRecap = [
  "Know the customer.",
  "Name the painful problem.",
  "Choose a focused segment.",
  "Explain the value.",
  "Understand the venture.",
  "Make risky assumptions visible.",
  "Find the main validation gate.",
  "Look for real evidence.",
  "Pick metrics that help the decision.",
  "Prioritize work that creates proof.",
  "Read roadmap items as bets.",
  "Keep scope small enough to learn.",
  "Check whether the team has capacity.",
  "Name the tradeoff.",
  "Use Studio Analyst to challenge your thinking.",
  "Write the PM decision and next action.",
];

const pmToolkit = [
  ["Discovery", "Learn before building"],
  ["User", "Person using it"],
  ["Buyer", "Person paying"],
  ["ICP", "Best-fit customer type"],
  ["MVP", "Smallest useful proof"],
  ["Risk", "What could go wrong"],
  ["Dependency", "What work relies on"],
  ["Stakeholder", "Person affected by the decision"],
  ["GTM", "How it reaches customers"],
  ["Pricing", "What customers will pay"],
  ["Outcome", "The result you want"],
  ["Next action", "The very next move"],
];

function getScore(answers) {
  return slides.reduce((total, slide) => {
    return total + (answers[slide.id] === slide.rightChoice ? 1 : 0);
  }, 0);
}

export function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showSimpleMap, setShowSimpleMap] = useState(true);

  const slide = slides[activeIndex];
  const selected = answers[slide.id];
  const score = getScore(answers);
  const answeredCount = Object.keys(answers).length;

  const finalNote = useMemo(
    () => ({
      decision: "Narrow SparkCharge",
      why: "There is real fleet interest, but reliability proof is still missing.",
      next: "Run one focused field reliability trial before adding more features.",
    }),
    [],
  );

  function answer(index) {
    setAnswers((current) => ({ ...current, [slide.id]: index }));
  }

  function next() {
    setActiveIndex((current) => Math.min(current + 1, slides.length - 1));
  }

  function previous() {
    setActiveIndex((current) => Math.max(current - 1, 0));
  }

  function reset() {
    setAnswers({});
    setActiveIndex(0);
  }

  return (
    <main className="story-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon" aria-hidden="true" />
          <div>
            <strong>Foundary</strong>
            <span>Venture Story Slides</span>
            <small>A simple interactive story to understand the platform.</small>
          </div>
        </div>
        <div className="top-actions">
          <button type="button" onClick={() => setShowSimpleMap((value) => !value)}>
            {showSimpleMap ? "Hide map" : "Show map"}
          </button>
          <button type="button" onClick={reset}>
            Restart story
          </button>
        </div>
      </header>

      <section className="timeline" aria-label="Venture story timeline">
        {slides.map((item, index) => (
          <button
            className={index === activeIndex ? "active" : answers[item.id] !== undefined ? "complete" : ""}
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(index)}
          >
            <span>{index + 1}</span>
            <strong>{item.concept}</strong>
            <small>{item.minute}</small>
          </button>
        ))}
      </section>

      <div className="story-workspace">
        <aside className="story-sidebar">
          <section className="progress-card">
            <p className="eyebrow">Your progress</p>
            <strong>{answeredCount} of {slides.length} slides answered</strong>
            <div className="progress-track">
              <span style={{ width: `${(answeredCount / slides.length) * 100}%` }} />
            </div>
            <p>{score} correct concept choices so far.</p>
          </section>

          <section className="venture-card">
            <p className="eyebrow">The story venture</p>
            <h2>SparkCharge</h2>
            <p>Portable EV charging for delivery fleets.</p>
            <dl>
              <div>
                <dt>Stage</dt>
                <dd>Seed</dd>
              </div>
              <div>
                <dt>Goal</dt>
                <dd>Prove fleet demand</dd>
              </div>
              <div>
                <dt>Current risk</dt>
                <dd>Reliability proof</dd>
              </div>
            </dl>
          </section>

          {showSimpleMap ? (
            <section className="map-card">
              <p className="eyebrow">Simple platform map</p>
              {conceptCards.map(([name, meaning]) => (
                <div key={name}>
                  <strong>{name}</strong>
                  <span>{meaning}</span>
                </div>
              ))}
            </section>
          ) : null}

          <section className="toolkit-card">
            <p className="eyebrow">PM toolkit</p>
            <p>Extra words you should recognize.</p>
            <div>
              {pmToolkit.map(([name, meaning]) => (
                <span key={name}>
                  <strong>{name}</strong>
                  {meaning}
                </span>
              ))}
            </div>
          </section>
        </aside>

        <section className="slide-stage">
          <article className="slide-card">
            <div className="slide-kicker">
              <span>{slide.minute}</span>
              <strong>{slide.concept}</strong>
            </div>
            <h1>{slide.title}</h1>
            <p className="plain-line">{slide.plain}</p>
            <p className="story-copy">{slide.story}</p>

            <div className="beginner-grid">
              <div>
                <span>Where in Foundary?</span>
                <strong>{slide.where}</strong>
              </div>
              <div>
                <span>Remember this</span>
                <strong>{slide.takeaway}</strong>
              </div>
              <div>
                <span>Simple example</span>
                <strong>{slide.simpleExample}</strong>
              </div>
            </div>

            <div className="concept-visual">
              <div className="bubble main">{slide.concept}</div>
              <div className="bubble">Question</div>
              <div className="bubble">Proof</div>
              <div className="bubble">Decision</div>
            </div>
          </article>

          <article className="choice-panel">
            <div>
              <p className="eyebrow">Play the story</p>
              <h2>{slide.question}</h2>
            </div>

            <div className="choices">
              {slide.choices.map((choice, index) => {
                const isSelected = selected === index;
                const isCorrect = selected !== undefined && index === slide.rightChoice;
                const isWrong = isSelected && index !== slide.rightChoice;

                return (
                  <button
                    className={`${isSelected ? "selected" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                    key={choice}
                    type="button"
                    onClick={() => answer(index)}
                  >
                    <span>{index + 1}</span>
                    {choice}
                  </button>
                );
              })}
            </div>

            <div className="lesson-box">
              <strong>{selected === undefined ? "Choose an answer to reveal the lesson." : "Simple lesson"}</strong>
              <p>{selected === undefined ? "No pressure. This is for learning, not grading." : slide.lesson}</p>
            </div>

            <div className="nav-actions">
              <button type="button" onClick={previous} disabled={activeIndex === 0}>
                Back
              </button>
              <button className="primary" type="button" onClick={next} disabled={activeIndex === slides.length - 1}>
                Next slide
              </button>
            </div>
          </article>

          <article className="journal-card">
            <div className="section-header">
              <h2>Story Journal</h2>
              <span>{score}/{slides.length}</span>
            </div>
            <div className="journal-list">
              {slides.map((item, index) => (
                <button
                  className={index === activeIndex ? "active" : answers[item.id] !== undefined ? "complete" : ""}
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                >
                  <span>{index + 1}</span>
                  <strong>{item.concept}</strong>
                  <em>{answers[item.id] === undefined ? "Not answered yet" : item.lesson}</em>
                </button>
              ))}
            </div>
          </article>

          <article className="decision-note">
            <p className="eyebrow">Final PM note</p>
            <h2>{finalNote.decision}</h2>
            <dl>
              <div>
                <dt>Why</dt>
                <dd>{finalNote.why}</dd>
              </div>
              <div>
                <dt>Next action</dt>
                <dd>{finalNote.next}</dd>
              </div>
            </dl>
            <div className="recap-box">
              <strong>The full Foundary story</strong>
              <ol>
                {storyRecap.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
