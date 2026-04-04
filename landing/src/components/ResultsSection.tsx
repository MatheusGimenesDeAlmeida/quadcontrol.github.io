import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/** Animated SVG of a step response curve */
const StepResponseCurve = ({
  label,
  overshoot,
  settlingTime,
  color,
}: {
  label: string;
  overshoot: number;
  settlingTime: number;
  color: string;
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 2000;

    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setProgress(t);
      if (t < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Generate step response path points
  const points: string[] = [];
  const w = 280;
  const h = 120;
  const margin = 30;
  const plotW = w - margin * 2;
  const plotH = h - margin * 1.5;
  const setpoint = margin + plotH * 0.3;
  const baseline = margin + plotH;

  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    if (t * 100 > progress * 100) break;

    const x = margin + t * plotW;
    // Damped oscillation
    const decay = Math.exp(-t * settlingTime);
    const oscillation = Math.sin(t * 12) * overshoot * decay;
    const steadyState = 1 - Math.exp(-t * 4);
    const normalized = steadyState + oscillation * steadyState;
    const y = baseline - normalized * (baseline - setpoint);

    points.push(`${x},${y}`);
  }

  return (
    <div className="flex flex-col items-center">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[280px]">
        {/* Grid lines */}
        <line x1={margin} y1={setpoint} x2={margin + plotW} y2={setpoint} stroke="hsl(174 97% 43% / 0.15)" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1={margin} y1={baseline} x2={margin + plotW} y2={baseline} stroke="hsl(0 0% 40%)" strokeWidth="0.5" />
        <line x1={margin} y1={margin} x2={margin} y2={baseline} stroke="hsl(0 0% 40%)" strokeWidth="0.5" />

        {/* Setpoint label */}
        <text x={margin - 4} y={setpoint + 3} textAnchor="end" fill="hsl(174 97% 43% / 0.4)" fontSize="7">ref</text>

        {/* Response curve */}
        {points.length > 1 && (
          <polyline
            points={points.join(" ")}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Axes labels */}
        <text x={margin + plotW / 2} y={h - 4} textAnchor="middle" fill="hsl(0 0% 55%)" fontSize="7">time</text>
        <text x={8} y={margin + plotH / 2} textAnchor="middle" fill="hsl(0 0% 55%)" fontSize="7" transform={`rotate(-90, 8, ${margin + plotH / 2})`}>output</text>
      </svg>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
};

const ResultsSection = () => {
  return (
    <section id="results" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-primary/60 mb-3">
            Experimental Validation
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            System <span className="text-primary">Response</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Each controller is validated on hardware. Below are characteristic
            step responses showing the trade-offs between speed, overshoot, and
            stability.
          </p>
        </motion.div>

        {/* Response curves */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-3 gap-6"
        >
          <div className="rounded-xl border border-border bg-card/40 p-6">
            <StepResponseCurve
              label="Underdamped (high Kp)"
              overshoot={0.6}
              settlingTime={2}
              color="hsl(174 97% 43%)"
            />
            <p className="mt-3 text-xs text-muted-foreground text-center leading-relaxed">
              Fast response with significant overshoot. Oscillations decay over ~0.5 s.
            </p>
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/[0.03] p-6">
            <StepResponseCurve
              label="Critically damped (tuned PID)"
              overshoot={0.15}
              settlingTime={5}
              color="hsl(174 97% 55%)"
            />
            <p className="mt-3 text-xs text-muted-foreground text-center leading-relaxed">
              Optimal trade-off — minimal overshoot with fast settling time. Target for flight.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/40 p-6">
            <StepResponseCurve
              label="Overdamped (high Kd)"
              overshoot={0.02}
              settlingTime={8}
              color="hsl(174 97% 35%)"
            />
            <p className="mt-3 text-xs text-muted-foreground text-center leading-relaxed">
              No overshoot but slow response. Settling time &gt; 1 s — sluggish in flight.
            </p>
          </div>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { metric: "ζ = 0.86 - Damping ratio", value: "0.86", desc: "Near critically damped" },
            { metric: "Overshoot", value: "< 0.5%", desc: "Design spec target" },
            { metric: "Settling time", value: "~300 ms", desc: "Within 2% band" },
            { metric: "Steady-state error", value: "→ 0", desc: "Integral action" },
          ].map((item) => (
            <div key={item.metric} className="text-center py-4 rounded-lg border border-border bg-card/30">
              <p className="text-lg font-bold text-primary">{item.value}</p>
              <p className="text-xs font-semibold text-foreground/80 mt-1">{item.metric}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ResultsSection;
