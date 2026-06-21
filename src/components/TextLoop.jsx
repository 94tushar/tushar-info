import { useState, useEffect } from "react";

const WORDS = [
  "Full Stack Developer",
  "Laravel & PHP Architect",
  "Backend Systems Engineer",
  "Database Optimizer",
  "Problem Solver"
];

function TextLoop() {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setBlink((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  // Typing logic
  useEffect(() => {
    if (subIndex === WORDS[index].length + 1 && !reverse) {
      const waitTimer = setTimeout(() => setReverse(true), 1800);
      return () => clearTimeout(waitTimer);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % WORDS.length);
      return;
    }

    const typeTimer = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      reverse ? 30 : 65
    );

    return () => clearTimeout(typeTimer);
  }, [subIndex, reverse, index]);

  return (
    <span className="typing-text-wrapper">
      <span className="typing-text">{WORDS[index].substring(0, subIndex)}</span>
      <span className={`typing-cursor ${blink ? "visible" : "hidden"}`}>|</span>
    </span>
  );
}

export default TextLoop;
