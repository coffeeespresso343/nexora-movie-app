import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Info,
  MessageCircleWarning,
  X,
  XCircle,
} from "lucide-react";

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warning: MessageCircleWarning,
  info: Info,
};

const STYLES = {
  success: {
    container: "border-green-500/30 bg-green-500/10",
    icon: "text-green-400",
    bar: "bg-green-400",
  },

  error: {
    container: "border-red-500/30 bg-red-500/10",
    icon: "text-red-400",
    bar: "bg-red-400",
  },

  warning: {
    container: "border-amber-500/30 bg-amber-500/10",
    icon: "text-amber-400",
    bar: "bg-amber-400",
  },

  info: {
    container: "border-blue-500/30 bg-blue-500/10",
    icon: "text-blue-400",
    bar: "bg-blue-400",
  },
};

const DEFAULT_DURATION = 5000;
const EXIT_DURATION = 300;

const Toast = ({ toast, onDismiss }) => {
  const style = STYLES[toast.type] || STYLES.info;
  const Icon = ICONS[toast.type] || Info;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const animationClass =
    toast.exiting || !mounted
      ? "translate-x-full opacity-0"
      : "translate-x-0 opacity-100";

  return (
    <div
      className={`relative flex w-80 max-w-[calc(100vw-2rem)] items-start gap-3 overflow-hidden rounded-xl border backdrop-blur-md px-4 py-3.5 shadow-xl 
        transition-all ease-in-out ${animationClass} ${style.container}`}
      style={{ transitionDuration: `${EXIT_DURATION}` }}
    >
      <div
        className={`absolute bottom-0 left-0 h-0.5 ${style.bar}`}
        style={{
          animation: `toast-shrink ${toast.duration}ms linear forwards`,
        }}
      ></div>

      <span className={`mt-0.5 shrink-0 ${style.icon}`}>
        <Icon size={20} />
      </span>

      <div className="min-w-0 flex-1">
        {toast.title && (
          <p className="text-sm font-semibold text-white">{toast.title}</p>
        )}
        <p
          className={`text-sm ${toast.title ? "mt-0.5 text-gray-300" : "text-white"}`}
        >
          {toast.message}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss"
        className="shrink-0 text-gray-500 transition hover:text-white"
      >
        <X size={14} strokeWidth={2} />
      </button>
    </div>
  );
};

const ToastContainer = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed right-0 top-20 z-9999 flex flex-col gap-3 pr-4 max-w-full">
      {toasts.map((toast) => (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: -80, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            x: 0,
            scale: 0.9,
            transition: { duration: 0.25 },
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 24,
            mass: 0.8,
          }}
        >
          <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
        </motion.div>
      ))}
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)),
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, EXIT_DURATION);
  }, []);

  const toast = useCallback(
    (type, message, options = {}) => {
      const id = ++idRef.current;
      const duration = options.duration ?? DEFAULT_DURATION;

      setToasts((prev) => [
        ...prev,
        { id, type, message, title: options.title, duration, exiting: false },
      ]);

      setTimeout(() => dismiss(id), duration);
    },
    [dismiss],
  );

  const success = useCallback(
    (message, options) => toast("success", message, options),
    [toast],
  );

  const error = useCallback(
    (message, options) => toast("error", message, options),
    [toast],
  );

  const warning = useCallback(
    (message, options) => toast("warning", message, options),
    [toast],
  );

  const info = useCallback(
    (message, options) => toast("info", message, options),
    [toast],
  );
  return (
    <ToastContext.Provider
      value={{ toast, success, error, warning, info, dismiss }}
    >
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return ctx;
};
