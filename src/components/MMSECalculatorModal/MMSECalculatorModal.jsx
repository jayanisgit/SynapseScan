import React, { useMemo, useState } from "react";
import "./MMSECalculatorModal.css";

const SECTIONS = [
  {
    title: "Orientation to Time",
    maxScore: 5,
    questions: [
      { id: "time_year", label: "Year correct?", points: 1 },
      { id: "time_season", label: "Season correct?", points: 1 },
      { id: "time_date", label: "Date correct?", points: 1 },
      { id: "time_day", label: "Day of week correct?", points: 1 },
      { id: "time_month", label: "Month correct?", points: 1 },
    ],
  },
  {
    title: "Orientation to Place",
    maxScore: 5,
    questions: [
      { id: "place_state", label: "State/Province correct?", points: 1 },
      { id: "place_county", label: "County/District correct?", points: 1 },
      { id: "place_city", label: "City correct?", points: 1 },
      { id: "place_building", label: "Building correct?", points: 1 },
      { id: "place_floor", label: "Floor correct?", points: 1 },
    ],
  },
  {
    title: "Registration",
    maxScore: 3,
    description: "Name 3 objects (e.g., apple, table, penny). Patient repeats them.",
    questions: [
      { id: "reg_1", label: "Object 1 recalled?", points: 1 },
      { id: "reg_2", label: "Object 2 recalled?", points: 1 },
      { id: "reg_3", label: "Object 3 recalled?", points: 1 },
    ],
  },
  {
    title: "Attention & Calculation",
    maxScore: 5,
    description: "Serial 7s: 100→93→86→79→72→65. Give 1 point per correct answer.",
    questions: [
      { id: "calc_1", label: "93 correct?", points: 1 },
      { id: "calc_2", label: "86 correct?", points: 1 },
      { id: "calc_3", label: "79 correct?", points: 1 },
      { id: "calc_4", label: "72 correct?", points: 1 },
      { id: "calc_5", label: "65 correct?", points: 1 },
    ],
  },
  {
    title: "Recall",
    maxScore: 3,
    description: "Ask patient to recall the 3 objects from Registration.",
    questions: [
      { id: "recall_1", label: "Object 1 recalled?", points: 1 },
      { id: "recall_2", label: "Object 2 recalled?", points: 1 },
      { id: "recall_3", label: "Object 3 recalled?", points: 1 },
    ],
  },
  {
    title: "Language",
    maxScore: 8,
    questions: [
      { id: "lang_1", label: "Name a pencil", points: 1 },
      { id: "lang_2", label: "Name a watch", points: 1 },
      { id: "lang_3", label: "Repeat phrase correctly", points: 1 },
      { id: "lang_4", label: "3-stage command part 1", points: 1 },
      { id: "lang_5", label: "3-stage command part 2", points: 1 },
      { id: "lang_6", label: "3-stage command part 3", points: 1 },
      { id: "lang_7", label: "Read & obey (Close your eyes)", points: 1 },
      { id: "lang_8", label: "Write a complete sentence", points: 1 },
    ],
  },
  {
    title: "Visual Construction",
    maxScore: 1,
    description: "Copy intersecting pentagons",
    questions: [{ id: "vis_1", label: "Copied correctly?", points: 1 }],
  },
];

export default function MMSECalculatorModal({ open, onClose, onApplyScore }) {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // id -> 0/1
  const [showResults, setShowResults] = useState(false);
  const [copied, setCopied] = useState(false);

  const totalScore = useMemo(() => {
    return Object.values(answers).reduce((sum, v) => sum + (Number(v) || 0), 0);
  }, [answers]);

  const currentSection = SECTIONS[sectionIndex];

  const isSectionComplete = useMemo(() => {
    if (!currentSection) return false;
    return currentSection.questions.every((q) => Object.prototype.hasOwnProperty.call(answers, q.id));
  }, [answers, currentSection]);

  function setAnswer(id, value) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function handleNext() {
    if (sectionIndex < SECTIONS.length - 1) setSectionIndex((p) => p + 1);
    else setShowResults(true);
  }

  function handlePrev() {
    if (sectionIndex > 0) setSectionIndex((p) => p - 1);
  }

  function handleReset() {
    setSectionIndex(0);
    setAnswers({});
    setShowResults(false);
    setCopied(false);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(String(totalScore));
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }

  function closeAll() {
    onClose?.();
  }

  if (!open) return null;

  return (
    <div className="mmseOverlay" onClick={closeAll}>
      <div className="mmseModal" onClick={(e) => e.stopPropagation()}>
        <div className="mmseHeader">
          <div>
            <h3 className="mmseTitle">MMSE Calculator</h3>
            <p className="mmseSub">Answer the checklist and generate MMSE score (0–30).</p>
          </div>

          <button type="button" className="mmseClose" onClick={closeAll}>
            ✕
          </button>
        </div>

        {!showResults ? (
          <>
            <div className="mmseProgress">
              <div className="mmseProgressText">
                Section {sectionIndex + 1} / {SECTIONS.length} • Max {currentSection.maxScore} pts
              </div>
              <div className="mmseBar">
                <div
                  className="mmseBarFill"
                  style={{ width: `${((sectionIndex + 1) / SECTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="mmseBody">
              <h4 className="mmseSectionTitle">{currentSection.title}</h4>
              {currentSection.description && <p className="mmseDesc">{currentSection.description}</p>}

              <div className="mmseQList">
                {currentSection.questions.map((q) => (
                  <div key={q.id} className="mmseQ">
                    <div className="mmseQLeft">
                      <div className="mmseQLabel">{q.label}</div>
                      <div className="mmseQPoints">{q.points} pt</div>
                    </div>

                    <div className="mmseBtns">
                      <button
                        type="button"
                        className={`mmseBtn ${answers[q.id] === 1 ? "isYes" : ""}`}
                        onClick={() => setAnswer(q.id, 1)}
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        className={`mmseBtn ${answers[q.id] === 0 ? "isNo" : ""}`}
                        onClick={() => setAnswer(q.id, 0)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mmseFooter">
              <button type="button" className="mmseGhost" onClick={handleReset}>
                Reset
              </button>

              <div className="mmseNav">
                <button type="button" className="mmseGhost" onClick={handlePrev} disabled={sectionIndex === 0}>
                  Back
                </button>

                <button
                  type="button"
                  className="mmsePrimary"
                  onClick={handleNext}
                  disabled={!isSectionComplete}
                  title={!isSectionComplete ? "Answer all questions in this section" : ""}
                >
                  {sectionIndex === SECTIONS.length - 1 ? "View Score" : "Next"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mmseBody">
              <div className="mmseScoreCard">
                <div className="mmseScoreTop">
                  <div>
                    <div className="mmseScoreLabel">Total MMSE Score</div>
                    <div className="mmseScoreValue">{totalScore}</div>
                    <div className="mmseScoreHint">out of 30</div>
                  </div>

                  <div className="mmseActions">
                    <button type="button" className="mmseGhost" onClick={handleCopy}>
                      {copied ? "Copied!" : "Copy"}
                    </button>
                    <button
                      type="button"
                      className="mmsePrimary"
                      onClick={() => onApplyScore?.(totalScore)}
                    >
                      Use Score
                    </button>
                  </div>
                </div>

                <div className="mmseBreakdown">
                  {SECTIONS.map((sec) => {
                    const secScore = sec.questions.reduce((s, q) => s + (answers[q.id] || 0), 0);
                    return (
                      <div key={sec.title} className="mmseRow">
                        <span>{sec.title}</span>
                        <b>
                          {secScore}/{sec.maxScore}
                        </b>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="mmseDisclaimer">
                Research prototype — MMSE is a screening tool. Clinical interpretation should be done by qualified professionals.
              </p>
            </div>

            <div className="mmseFooter">
              <button type="button" className="mmseGhost" onClick={() => setShowResults(false)}>
                Back to questions
              </button>
              <button type="button" className="mmseGhost" onClick={handleReset}>
                Start over
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
