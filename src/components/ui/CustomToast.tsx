"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { MdCheckCircle, MdError, MdWarning, MdInfo } from 'react-icons/md';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
}

interface ToastContextType {
  showToast: (type: Toast['type'], title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((type: Toast['type'], title: string, description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    const toast: Toast = { id, type, title, description };

    setToasts(prev => [...prev, toast]);

    // Auto remove after 4 seconds with animation
    setTimeout(() => {
      const toastElement = document.querySelector(`[data-toast-id="${id}"]`) as HTMLElement;
      if (toastElement) {
        gsap.to(toastElement, {
          x: 300,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => setToasts(prev => prev.filter(t => t.id !== id)),
        });
      } else {
        setToasts(prev => prev.filter(t => t.id !== id));
      }
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    const toastElement = document.querySelector(`[data-toast-id="${id}"]`) as HTMLElement;
    if (toastElement) {
      gsap.to(toastElement, {
        x: 300,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => setToasts(prev => prev.filter(t => t.id !== id)),
      });
    } else {
      setToasts(prev => prev.filter(t => t.id !== id));
    }
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div key={toast.id} data-toast-id={toast.id}>
            <ToastItem
              toast={toast}
              onRemove={() => removeToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

interface ToastItemProps {
  toast: Toast;
  onRemove: () => void;
}

const ToastItem = ({ toast, onRemove }: ToastItemProps) => {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (toastRef.current) {
      // Slide in animation
      gsap.fromTo(
        toastRef.current,
        { x: 300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  const handleRemove = () => {
    if (toastRef.current) {
      // Fade out animation
      gsap.to(toastRef.current, {
        x: 300,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: onRemove,
      });
    } else {
      onRemove();
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <MdCheckCircle className="text-green-500" />;
      case 'error':
        return <MdError className="text-red-500" />;
      case 'warning':
        return <MdWarning className="text-yellow-500" />;
      case 'info':
        return <MdInfo className="text-blue-500" />;
      default:
        return null;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-l-green-500';
      case 'error':
        return 'border-l-red-500';
      case 'warning':
        return 'border-l-yellow-500';
      case 'info':
        return 'border-l-blue-500';
      default:
        return 'border-l-gray-500';
    }
  };

  return (
    <div
      ref={toastRef}
      className={`max-w-sm w-full bg-white dark:bg-surface-dark border-l-4 ${getBorderColor()} shadow-lg rounded-lg p-4`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {toast.title}
          </p>
          {toast.description && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {toast.description}
            </p>
          )}
        </div>
        <div className="ml-auto pl-3">
          <button
            onClick={handleRemove}
            className="inline-flex rounded-md p-1.5 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            <span className="sr-only">Dismiss</span>
            <MdError className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};