import { motion } from "framer-motion";

const stages = [
  {
    label: "Reference",
    detail: "Setpoint / Trajectory",
    sub: "Position & Attitude",
  },
  {
    label: "Sensors",
    detail: "IMU, Flow Deck, ToF",
    sub: "I²C / SPI",
  },
  {
    label: "Estimators",
    detail: "Complementary & Kalman filter",
    sub: "Attitude + Position",
  },
  {
    label: "Controllers",
    detail: "PID / LQR",
    sub: "Horizontal → Vertical → Attitude",
  },
  {
    label: "Mixer",
    detail: "Control allocation",
    sub: "Torque → Motor speeds",
  },
  {
    label: "Actuators",
    detail: "PWM → BLDC motors",
    sub: "4 brushless ESCs",
  },
];

const StageBlock = ({ stage, index }: { stage: typeof stages[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
    className="rounded-xl border border-primary/20 bg-primary/[0.04] px-5 py-4 text-center backdrop-blur-sm"
  >
    <p className="text-xs font-bold text-primary uppercase tracking-wider">
      {stage.label}
    </p>
    <p className="mt-1.5 text-[11px] text-foreground/80 leading-snug">
      {stage.detail}
    </p>
    <p className="mt-1 text-[10px] text-muted-foreground leading-snug">
      {stage.sub}
    </p>
  </motion.div>
);

const HArrow = ({ flip = false }: { flip?: boolean }) => (
  <div className="hidden md:flex items-center justify-center">
    <svg className={`h-4 w-6 text-primary/40 ${flip ? "rotate-180" : ""}`} viewBox="0 0 24 16" fill="none">
      <path d="M0 8h20M16 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  </div>
);

const VArrow = () => (
  <div className="flex md:hidden items-center justify-center py-1">
    <svg className="h-5 w-4 text-primary/40" viewBox="0 0 16 20" fill="none">
      <path d="M8 0v16M2 12l6 6 6-6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  </div>
);

const ArchitectureSection = () => {
  return (
    <section id="architecture" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-primary/60 mb-3">
            System Overview
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Control <span className="text-primary">Architecture</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The closed-loop pipeline running on an ARM Cortex-M4 under FreeRTOS at 200 Hz.
          </p>
        </motion.div>

        {/* Desktop: two rows of 3 with arrows */}
        <div className="hidden md:block space-y-4">
          {/* Row 1: Reference → Sensors → Estimators */}
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
            <StageBlock stage={stages[0]} index={0} />
            <HArrow />
            <StageBlock stage={stages[1]} index={1} />
            <HArrow />
            <StageBlock stage={stages[2]} index={2} />
          </div>

          {/* Connecting arrow from row 1 to row 2 */}
          <div className="flex justify-end pr-[calc(50%/3+16px)]">
            <motion.svg
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="h-6 w-8 text-primary/40"
              viewBox="0 0 32 24"
              fill="none"
            >
              <path d="M16 0v18M10 14l6 6 6-6" stroke="currentColor" strokeWidth="1.5" />
            </motion.svg>
          </div>

          {/* Row 2: Actuators ← Mixer ← Controllers (reversed visually) */}
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
            <StageBlock stage={stages[5]} index={5} />
            <HArrow flip />
            <StageBlock stage={stages[4]} index={4} />
            <HArrow flip />
            <StageBlock stage={stages[3]} index={3} />
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="md:hidden space-y-0">
          {stages.map((stage, i) => (
            <div key={stage.label}>
              <StageBlock stage={stage} index={i} />
              {i < stages.length - 1 && <VArrow />}
            </div>
          ))}
        </div>

        {/* Feedback loop */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-px w-8 bg-primary/20" />
            <span className="border border-border rounded-md px-3 py-1.5 bg-card/50 text-muted-foreground">
              Feedback loop — sensor data closes the loop at each control cycle
            </span>
            <div className="h-px w-8 bg-primary/20" />
          </div>
        </motion.div>

        {/* Key specs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { value: "200 Hz", label: "Control rate" },
            { value: "ARM M4", label: "MCU core" },
            { value: "FreeRTOS", label: "RTOS" },
            { value: "6 DOF", label: "State space" },
          ].map((spec) => (
            <div
              key={spec.label}
              className="text-center py-4 rounded-lg border border-border bg-card/30"
            >
              <p className="text-lg font-bold text-primary">{spec.value}</p>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1">
                {spec.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ArchitectureSection;
