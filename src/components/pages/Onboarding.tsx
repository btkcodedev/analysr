import { motion } from "framer-motion";
import OnboardingForm from "../onboarding/OnboardingForm";

export default function Onboarding() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen onboarding-gradient text-white flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800"
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80')] opacity-[0.02] bg-cover bg-center" />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 max-w-2xl w-full backdrop-blur-3xl bg-white/[0.02] rounded-2xl border border-white/[0.05] shadow-2xl p-8"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            Tell us about you
          </h2>
          <p className="text-gray-300 text-lg">
            Help us customize your analytics experience
          </p>
        </motion.div>

        <OnboardingForm />
      </motion.div>
    </motion.div>
  );
}
