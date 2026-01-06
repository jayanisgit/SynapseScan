import React from "react";
import {
  Brain,
  Activity,
  Layers,
  FileBarChart,
  ScanEye,
  Database,
  Info
} from "lucide-react";
import "./About.css";

export default function About() {
  return (
    <div className="aboutPage">
      <div className="aboutHeader">
        <div className="aboutHeaderIcon">
          <Info size={22} />
        </div>
        <div>
          <h1>Alzheimer’s Disease Overview</h1>
          <p>
            This page gives a simple overview of Alzheimer’s disease and explains how
            clinical data and MRI imaging are used together in this application to support prediction.
          </p>
        </div>
      </div>

      <div className="aboutGrid">
        <InfoCard
          icon={<Brain size={22} />}
          color="blue"
          title="What is Alzheimer’s Disease?"
          text="Alzheimer’s disease is a progressive neurological disorder that affects memory, thinking, and behavior. It is the most common cause of dementia and results from gradual damage to brain cells over time."
        />

        <InfoCard
          icon={<Activity size={22} />}
          color="purple"
          title="Disease Progression"
          text="The disease progresses through stages such as normal cognition, very mild impairment, mild dementia and beyond. Symptoms typically worsen gradually as brain function declines."
        />

        <InfoCard
          icon={<FileBarChart size={22} />}
          color="green"
          title="Clinical Data Analysis"
          text="Clinical features like age, education, SES, and MMSE provide structured information. Machine learning models learn patterns from this data to estimate disease stage."
        />

        <InfoCard
          icon={<ScanEye size={22} />}
          color="red"
          title="MRI-Based Brain Analysis"
          text="MRI scans can show brain structural changes. Deep learning models detect subtle patterns in images that may relate to Alzheimer’s progression."
        />

        <InfoCard
          icon={<Database size={22} />}
          color="teal"
          title="Multimodal Data Fusion"
          text="By combining clinical data with MRI image features, the system gets a more complete view. This often improves robustness and prediction reliability."
        />

        <InfoCard
          icon={<Layers size={22} />}
          color="indigo"
          title="How This Application Works"
          text="The application sends clinical inputs and MRI image to the backend, receives class probabilities, and displays the predicted label with confidence for easier interpretation."
        />
      </div>

      <div className="aboutBottom">
        <h2>Why a Combined Approach Matters</h2>
        <p>
          Alzheimer’s is complex. Clinical assessments capture cognitive and functional symptoms,
          while MRI imaging provides objective evidence of brain structure changes. Combining both
          helps a more holistic and reliable prediction framework.
        </p>

        <div className="aboutDisclaimer">
          <strong>Note:</strong> This is a research prototype and not a clinical diagnosis tool.
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, text, color = "blue" }) {
  return (
    <div className="infoCard">
      <div className="infoCardTop">
        <div className={`infoIcon infoIcon--${color}`}>{icon}</div>
        <h3>{title}</h3>
      </div>
      <p>{text}</p>
    </div>
  );
}
