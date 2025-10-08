import React from "react";

const About = () => {
  return (
    <div id="about-page">
      <h1 id="about-title">About Husky Lecture Log</h1>

      <section id="future-of-learning">
        <h2>The Future of Video Learning Starts Now</h2>
        <p>
          In the age of information, hours of essential learning content are trapped inside long videos.
          Husky Lecture Log is designed to break down those barriers, transforming any video—whether a large
          file upload or a YouTube link—into actionable, searchable, and concise knowledge.
        </p>
        <p>
          We built this platform for students, lifelong learners, and professionals who need to absorb
          complex material quickly and efficiently. Stop scrubbing the timeline; start asking questions.
        </p>
      </section>

      <section id="instant-content-deconstruction">
        <h3>1. Instant Content Deconstruction</h3>
        <p>
          Simply upload any video file or paste a YouTube URL. Our AI immediately goes to work to process
          the content, providing you with everything you need to know without having to watch the entire thing:
        </p>
        <ul>
          <li className="feature-item">
            <strong>AI-Generated Summaries:</strong> Get a concise, high-level overview of the video's main points,
            perfect for quick review or deciding if the content is relevant.
          </li>
          <li className="feature-item">
            <strong>Full Transcripts & Timestamps:</strong> Access a complete, time-synced transcript of every word
            spoken. Click on any line in the transcript to instantly jump to that exact moment in the video.
          </li>
        </ul>
      </section>

      <section id="personal-video-chatbot">
        <h3>2. Your Personal Video Chatbot</h3>
        <p>
          Turn every video into a personalized, interactive study session. Our specialized chatbot allows you to
          dialogue directly with the content you've uploaded.
        </p>
        <ul>
          <li className="feature-item">
            <strong>Discuss Video Information:</strong> Ask follow-up questions, query specific concepts, request
            clarification on complex topics, or test your retention—all based only on the information contained in
            that specific video.
          </li>
          <li className="feature-item">
            <strong>Contextual Q&A:</strong> Treat the AI like a subject matter expert who has watched the video for
            you, offering instant answers and references.
          </li>
        </ul>
      </section>

      <section id="dedicated-space">
        <h3>A Dedicated Space for Your Learning</h3>
        <p>
          We understand that studying is personal and requires continuity. That's why Husky Lecture Log is
          designed to be a persistent, secure digital notebook:
        </p>
        <ul>
          <li className="feature-item">
            <strong>Secure Student Data & Login:</strong> We use a secure sign-in process to ensure your information
            is protected and always available to you.
          </li>
          <li className="feature-item">
            <strong>Dedicated Learning Sessions:</strong> Every video you upload creates its own private workspace.
            Your summaries, transcripts, and the entire chat history for that specific video are automatically saved,
            creating an organized library of your knowledge assets.
          </li>
        </ul>
      </section>

      <section id="closing">
        <p>
          Husky Lecture Log isn't just a summary tool; it's an end-to-end learning partner built to maximize your
          time and optimize your understanding. Join us and transform the way you interact with video content.
        </p>
        <button id="cta-button">Try it out today!</button>
      </section>
    </div>
  );
};

export default About;
