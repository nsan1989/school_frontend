import { motion } from "framer-motion";

export default function SlideUp({ children, threshold = 0.3 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      viewport={{ once: true, amount: threshold }}
    >
      {children}
    </motion.div>
  );
}
