import { motion } from "framer-motion";
import { Layers, Target, ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategorySelect from "./CategorySelect";
import DatabaseConnection from "./DatabaseConnection";
import { businessCategories } from "../../data/businessCategories";
import { useOnboardingForm } from "../../hooks/useOnboardingForm";
import Tooltip from "../common/Tooltip/Tooltip";

export interface BusinessData {
  stack: string;
  substack: string;
  interests: string;
  database: string;
  tableName: string;
  limit: number | "All";
  motherduckToken?: string;
  groqToken?: string;
  airbyteToken?: string;
  airbyteConnectionId?: string;
}

export default function OnboardingForm() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [, setIsGroqConnected] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(true);

  const { formData, updateFormData, isSubmitting, setIsSubmitting } =
    useOnboardingForm();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setFocusedField(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateForm = () => {
    if (!formData.stack || !formData.substack) {
      setValidationError(
        "Please select a business category and specialization"
      );
      return false;
    }
    if (!formData.motherduckToken) {
      setValidationError("Please provide your MotherDuck token");
      return false;
    }
    if (!formData.database || !formData.tableName) {
      setValidationError("Please select a database and table");
      return false;
    }
    if (!formData.interests) {
      setValidationError("Please specify your areas of interest");
      return false;
    }
    if (!isConnected) {
      setValidationError("Please connect to the database first");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      if (!validateForm()) {
        setIsSubmitting(false);
        return;
      }

      const finalData = {
        ...formData,
        limit: formData.limit,
      };

      navigate("/dashboard", { state: finalData });
    } catch (error) {
      console.error("Form submission error:", error);
      setValidationError(
        error instanceof Error ? error.message : "An error occurred"
      );
      setIsSubmitting(false);
    }
  };

  const handleDatabaseSelect = (database: string, tableName: string) => {
    updateFormData({ database, tableName });
    setValidationError(null);
  };

  const handleLimitSelect = (limit: number | "All") => {
    if (limit !== undefined) {
      updateFormData({ limit });
      setValidationError(null);
    }
  };

  return (
    <motion.form
      ref={formRef}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      {showOverlay && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg text-center space-y-6 mb-40"
          >
            <h2 className="text-indigo-700 font-extrabold text-xl mb-4 underline decoration-wavy-indigo decoration-purple-500">
              One Small Thing!
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Dear Amigo, thank you for being here! 🌟 <br />
              Currently, this app provides analytics based on reviews with the
              schema: <br />
              <code className="bg-gray-100 text-sm px-2 py-1 rounded-lg">{`{ "review_text": "string", "stars": "number" }`}</code>
              <br />
              Ensure your MotherDuck tables follow this schema for proper
              functionality. <br />
              We're working on supporting additional schemas soon.
              <br />
              Thank you for your cooperation! 🦆
            </p>
            <button
              onClick={() => setShowOverlay(false)}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
            >
              Got it!
            </button>
          </motion.div>
        </motion.div>
      )}

      {validationError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
        >
          {validationError}
        </motion.div>
      )}

      <div className="space-y-8">
        <div>
          <div className="flex items-center mb-2">
            <Layers className="mr-2 text-blue-400" />
            <span className="text-lg font-medium">Business Category</span>
            <Tooltip
              content="Select your business type and specific focus area"
              icon={true}
              className="ml-2"
            />
          </div>
          <CategorySelect
            categories={businessCategories}
            onSelect={(stack, substack) => {
              updateFormData({ stack, substack });
              setValidationError(null);
            }}
            onFocusChange={(isFocused) =>
              setFocusedField(isFocused ? "category" : null)
            }
            isActive={focusedField === "category"}
          />
        </div>

        <DatabaseConnection
          token={formData.motherduckToken}
          onTokenChange={(token) => updateFormData({ motherduckToken: token })}
          groqToken={formData.groqToken}
          onGroqTokenChange={(token) => updateFormData({ groqToken: token })}
          airbyteToken={formData.airbyteToken}
          onAirbyteTokenChange={(token) =>
            updateFormData({ airbyteToken: token })
          }
          airbyteConnectionId={formData.airbyteConnectionId}
          onAirbyteConnectionIdChange={(id) =>
            updateFormData({ airbyteConnectionId: id })
          }
          onConnectionStatusChange={setIsConnected}
          onGroqStatusChange={setIsGroqConnected}
          onDatabaseSelect={handleDatabaseSelect}
          selectedLimit={formData.limit}
          onLimitSelect={handleLimitSelect}
        />

        <label className="block">
          <div className="flex items-center mb-2">
            <Target className="mr-2 text-blue-400" />
            <span className="text-lg font-medium">Areas of Interest</span>
            <Tooltip
              content="Add your topic of interest for insights, Ex: 'Customer Satisfaction', will be processed by Groq"
              icon={true}
              className="ml-2"
            />
          </div>
          <textarea
            required
            value={formData.interests}
            onChange={(e) => {
              updateFormData({ interests: e.target.value });
              setValidationError(null);
            }}
            onFocus={() => setFocusedField("interests")}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-4 py-3 rounded-lg bg-gray-800 border transition-all duration-200 ${
              focusedField === "interests"
                ? "border-blue-500 ring-1 ring-blue-500/50"
                : "border-gray-700 hover:border-gray-600"
            }`}
            rows={4}
            placeholder="What specific insights are you looking for?"
          />
        </label>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={!isConnected || isSubmitting}
        className="w-full flex items-center justify-center px-8 py-4 bg-blue-500 rounded-lg text-lg font-medium hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
      >
        {isSubmitting ? (
          <span>Loading...</span>
        ) : (
          <>
            Continue to Dashboard
            <ArrowRight className="ml-2" size={20} />
          </>
        )}
      </motion.button>
    </motion.form>
  );
}
