import { motion } from "framer-motion";
import { Wind, Cpu, SlidersHorizontal, Layers, FlaskConical, ScanSearch } from "lucide-react";

import flightCoefficients from "@/assets/flight-coefficients.png";
import flightQuadcopter from "@/assets/flight-quadcopter.png";
import flightRotations from "@/assets/flight-rotations.png";
import embeddedDrone from "@/assets/embedded-drone.png";
import embeddedRadio from "@/assets/embedded-radio.png";
import embeddedFlowdeck from "@/assets/embedded-flowdeck.png";
import controlMixer from "@/assets/control-mixer.png";
import controlQuadcopter from "@/assets/control-quadcopter.png";
import controlArchitecture from "@/assets/control-architecture.png";
import layeredArchitecture from "@/assets/layered-architecture.png";

interface TopicImage {
  src: string;
  caption?: string;
}

const topics: {
  step: number;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  desc: string;
  keywords: string[];
  images: TopicImage[];
  video?: string;
}[] = [
  {
    step: 1,
    icon: Wind,
    title: "Flight Fundamentals",
    subtitle: "Rigid-Body Dynamics & Aerodynamics",
    desc: "Derive the equations of motion for a quadrotor as a 6-DOF rigid body. Understand thrust, drag, and torque coefficients that govern flight behavior.",
    keywords: ["Newton-Euler equations", "body-frame kinematics", "thrust & drag coefficients", "Euler angles", "2D/3D modeling"],
    images: [
      { src: flightCoefficients },
      { src: flightQuadcopter },
      { src: flightRotations },
    ],
  },
  {
    step: 2,
    icon: Cpu,
    title: "Embedded Programming",
    subtitle: "ARM Cortex-M4 & FreeRTOS",
    desc: "Program the STM32 microcontroller in C under FreeRTOS. Interface with IMU, optical flow, and ToF sensors via I²C/SPI, and drive brushless motors via PWM.",
    keywords: ["ARM Cortex-M4", "FreeRTOS tasks", "I²C / SPI protocols", "BLDC motor control"],
    images: [
      { src: embeddedDrone, caption: "Crazyflie 2.1 Brushless (Drone)" },
      { src: embeddedRadio, caption: "Crazyradio 2.0 (wireless communication)" },
      { src: embeddedFlowdeck, caption: "Flow Deck v2 (optical flow + ToF sensor)" },
    ],
  },
  {
    step: 3,
    icon: SlidersHorizontal,
    title: "Applied Control",
    subtitle: "PID, LQR & Kalman Filtering",
    desc: "Design and tune PID controllers for attitude stabilization. Progress to LQR for optimal state feedback and Kalman filters for state estimation under noise.",
    keywords: ["PID tuning", "LQR optimal control", "complementary filter", "Kalman filter"],
    images: [
      { src: controlMixer },
      { src: controlQuadcopter },
      { src: controlArchitecture },
    ],
  },
  {
    step: 4,
    icon: Layers,
    title: "Layered Architecture",
    subtitle: "Cascaded Control Loops",
    desc: "Implement three cascaded control levels — attitude (inner), vertical, and horizontal (outer) — each operating at different rates with distinct strategies.",
    keywords: ["cascaded loops", "inner/outer loop", "rate vs attitude control", "control allocation"],
    images: [
      { src: layeredArchitecture },
    ],
  },
  {
    step: 5,
    icon: FlaskConical,
    title: "Real-Time Experiments",
    subtitle: "Live Flight Testing",
    desc: "No simulations — observe in real time how each gain shapes stability, overshoot, and settling time. Capture telemetry and analyze transient response on live hardware.",
    keywords: ["step response", "gain tuning", "overshoot analysis", "settling time"],
    images: [],
    video: `${import.meta.env.BASE_URL}practical-demo.mp4`,
  },
  {
    step: 6,
    icon: ScanSearch,
    title: "System Identification",
    subtitle: "Parameter Estimation from Test Rigs",
    desc: "Use custom mechanical test rigs to constrain single-axis motion. Identify inertia, drag, and thrust coefficients through controlled experiments and curve fitting.",
    keywords: ["constrained-axis rigs", "parameter estimation", "curve fitting", "model validation"],
    images: [],
    video: `${import.meta.env.BASE_URL}sysid-demo.mp4`,
  },
];

const LearnSection = () => {
  return (
    <section id="learn" className="py-24 px-6 bg-card/30">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-primary/60 mb-3">
            Course Progression
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Curriculum <span className="text-primary">Overview</span>
          </h2>
        </motion.div>

        {/* Timeline layout */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-primary/15 hidden sm:block" />

          <div className="space-y-8">
            {topics.map((topic, i) => {
              const hasImages = topic.images.length > 0;

              return (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="relative sm:pl-16"
                >
                  {/* Step number on timeline */}
                  <div className="hidden sm:flex absolute left-0 top-6 w-12 h-12 items-center justify-center rounded-full border border-primary/30 bg-background text-primary font-bold text-sm z-10">
                    {topic.step}
                  </div>

                  <div className="rounded-2xl border border-border bg-card/40 p-8 backdrop-blur-sm">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <topic.icon className="h-7 w-7 text-primary shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="sm:hidden text-xs font-bold text-primary bg-primary/10 rounded px-2 py-0.5">
                            {topic.step}
                          </span>
                          <h3 className="text-lg font-bold text-foreground">
                            {topic.title}
                          </h3>
                        </div>
                        <p className="text-sm text-primary/70 font-medium">
                          {topic.subtitle}
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                          {topic.desc}
                        </p>

                        {/* Keywords */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {topic.keywords.map((kw) => (
                            <span
                              key={kw}
                              className="text-[10px] px-2 py-0.5 rounded-full border border-primary/15 text-primary/60 bg-primary/[0.04] uppercase tracking-wider"
                            >
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Images grid */}
                    {hasImages && (
                      <div
                        className={
                          topic.images.length === 1
                            ? "flex justify-center mt-4"
                            : "grid grid-cols-3 gap-4 mt-4"
                        }
                      >
                        {topic.images.map((img, j) => (
                          <div
                            key={j}
                            className={`flex flex-col ${
                              topic.images.length === 1
                                ? "w-full max-w-3xl"
                                : ""
                            }`}
                          >
                            <div className="rounded-lg overflow-hidden border border-border bg-card">
                              <img
                                src={img.src}
                                alt={
                                  img.caption || `${topic.title} ${j + 1}`
                                }
                                className="w-full h-full object-contain"
                              />
                            </div>
                            {img.caption && (
                              <p className="mt-2 text-xs text-muted-foreground text-center leading-snug">
                                {img.caption}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Video */}
                    {topic.video && (
                      <div className="flex justify-center mt-4">
                        <div className="w-full max-w-2xl rounded-lg overflow-hidden border border-border bg-card">
                          <video
                            src={topic.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnSection;
