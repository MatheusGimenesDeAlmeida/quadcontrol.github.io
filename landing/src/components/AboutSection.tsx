import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-primary/60 mb-3">
            About the Project
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            The drone as a <span className="text-primary">laboratory</span>
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed text-lg max-w-3xl mx-auto">
            QuadControl uses the open-source{" "}
            <a
              href="https://www.bitcraze.io/products/crazyflie-2-1-brushless/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              Crazyflie 2.1 Brushless
            </a>
            {" "}— developed for education and research by the Swedish company{" "}
            <a
              href="https://www.bitcraze.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary/80"
            >
              Bitcraze
            </a>
            {" "}— as a real-world testbed. Students design the full estimation and
            control stack — from IMU sensor fusion to motor mixing — and
            validate each subsystem in flight.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
