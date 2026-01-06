import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Scan,
  FileText,
  Layers,
  Brain,
  Activity,
  ShieldCheck
} from "lucide-react";
import "./Home.css";
import HeroImage from "../../assets/Hero.svg";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="home">
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="heroContent">
          <div className="badge">Multimodal AI • Clinical + MRI</div>

          <h1 className="heroTitle">
            SynapseScan
            <span className="heroSub">
              Alzheimer’s prediction using clinical data and MRI imaging
            </span>
          </h1>

          <p className="heroDesc">
            Upload MRI and enter clinical inputs to generate a combined prediction
            with probabilities. Built as a research prototype — not a clinical
            diagnosis tool.
          </p>

          <div className="heroActions">
            <button className="btnPrimary" onClick={() => nav("/predict")}>
              Start Prediction
            </button>
            <button className="btnGhost" onClick={() => nav("/about")}>
              Learn More
            </button>
          </div>

          <div className="heroStats">
            <div className="stat">
              <div className="statNum">3</div>
              <div className="statLabel">Classes</div>
            </div>
            <div className="stat">
              <div className="statNum">2</div>
              <div className="statLabel">Modalities</div>
            </div>
            <div className="stat">
              <div className="statNum">0–30</div>
              <div className="statLabel">MMSE Range</div>
            </div>
          </div>
        </div>

        <div className="heroVisual">
          <img className="heroImage" src={HeroImage} alt="Hero" />
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="section">
        <div className="cardGrid">
            <div className="infoCard">
                <div className="iconWrap purple">
                <Scan size={22} />
                </div>
                <h4>MRI evidence</h4>
                <span>Structural brain patterns</span>
                <p>
                Uses MRI images to learn spatial features linked to
                neurodegeneration and cognitive decline.
                </p>
            </div>

            <div className="infoCard">
                <div className="iconWrap blue">
                <FileText size={22} />
                </div>
                <h4>Clinical context</h4>
                <span>Demographics & scores</span>
                <p>
                Supports structured inputs such as age, education, SES,
                and MMSE that complement imaging signals.
                </p>
            </div>

            <div className="infoCard">
                <div className="iconWrap green">
                <Layers size={22} />
                </div>
                <h4>Fusion output</h4>
                <span>Combined probabilities</span>
                <p>
                Produces class probabilities across clinical-only,
                image-only, and combined predictions.
                </p>
            </div>
        </div>

      </section>

      {/* ================= OVERVIEW ================= */}
      <section className="section">
        <h2 className="sectionTitle">Alzheimer’s Disease Overview</h2>
        <p className="sectionDesc">
          This homepage summarises how SynapseScan combines clinical data
          and MRI imaging to support Alzheimer’s prediction.
        </p>

        <div className="cardGrid">
            <div className="infoCard">
                <div className="iconWrap purple">
                <Brain size={20} />
                </div>
                <h4>What is Alzheimer’s?</h4>
                <p>
                A progressive neurodegenerative disease affecting memory
                and thinking, and a leading cause of dementia.
                </p>
            </div>

            <div className="infoCard">
                <div className="iconWrap blue">
                <Activity size={20} />
                </div>
                <h4>Disease progression</h4>
                <p>
                Typically progresses from normal cognition to very mild
                and mild dementia stages.
                </p>
            </div>

            <div className="infoCard">
                <div className="iconWrap green">
                <ShieldCheck size={20} />
                </div>
                <h4>Why combine data?</h4>
                <p>
                Clinical assessments capture symptoms while MRI provides
                structural evidence — together improving robustness.
                </p>
            </div>
        </div>

      </section>

      {/* ================= WHY COMBINED ================= */}
      <section className="wideCard">
        <h3>Why a combined approach matters</h3>
        <p>
          Alzheimer’s disease is complex. Clinical assessments capture
          cognitive and functional symptoms, while MRI imaging provides
          objective evidence of structural brain changes. Combining both
          supports a more holistic and reliable prediction framework.
        </p>
      </section>

      {/* ================= CTA ================= */}
      <section className="ctaSection">
        <div>
          <h3>Ready to run a prediction?</h3>
          <p>
            Enter clinical fields, upload an MRI image, and view a result
            preview with class probabilities.
          </p>
        </div>

        <div className="ctaActions">
          <button className="btnPrimary" onClick={() => nav("/predict")}>
            Open Predict →
          </button>
          <button className="btnGhost" onClick={() => nav("/about")}>
            Read overview
          </button>
        </div>
      </section>
    </div>
  );
}
