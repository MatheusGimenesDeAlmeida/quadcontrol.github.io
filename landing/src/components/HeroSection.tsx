import { motion } from "framer-motion";

const HeroSection = () => {
  const baseUrl = import.meta.env.BASE_URL;
  const normalizedBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const courseSectionUrl = `${normalizedBaseUrl}course/`;
  const heroVideoSrc = `${normalizedBaseUrl}videos/hero-drone.mp4`;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={heroVideoSrc} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-sm uppercase tracking-[0.3em] text-primary/70 font-medium mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Insper — Engineering Elective
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl md:text-8xl"
        >
          Quad<span className="text-primary text-glow">Control</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed"
        >
          Quadrotor flight control: from rigid-body dynamics and sensor fusion
          to PID/LQR design and real-time embedded implementation on the{" "}
          <span className="text-foreground/90">Crazyflie 2.1 platform</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex gap-4"
        >
          <a
            href={courseSectionUrl}
            className="rounded-lg border border-primary/50 bg-primary/20 px-6 py-3 font-medium text-primary transition-all hover:bg-primary/30"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Course Website
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="h-8 w-5 rounded-full border-2 border-primary/50 flex items-start justify-center pt-1"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
