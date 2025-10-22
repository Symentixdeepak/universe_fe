import toast, { ToastOptions } from 'react-hot-toast';

// Default toast options
const defaultToastOptions: ToastOptions = {
  duration: 4000,
  position: 'top-right',
  style: {
    borderRadius: '8px',
    background: '#333',
    color: '#fff',
    padding: '12px 16px',
    fontSize: '14px',
    maxWidth: '500px',
  },
};

// Toast service class
class ToastService {
  // Success toast
  success(message: string, options?: ToastOptions): string {
    return toast.success(message, {
      ...defaultToastOptions,
      style: {
        ...defaultToastOptions.style,
        background: '#10b981',
        color: '#ffffff',
      },
      iconTheme: {
        primary: '#ffffff',
        secondary: '#10b981',
      },
      ...options,
    });
  }

  // Error toast
  error(message: string, options?: ToastOptions): string {
    return toast.error(message, {
      ...defaultToastOptions,
      style: {
        ...defaultToastOptions.style,
        background: '#ef4444',
        color: '#ffffff',
      },
      iconTheme: {
        primary: '#ffffff',
        secondary: '#ef4444',
      },
      ...options,
    });
  }

  // Warning toast
  warning(message: string, options?: ToastOptions): string {
    return toast(message, {
      ...defaultToastOptions,
      icon: '⚠️',
      style: {
        ...defaultToastOptions.style,
        background: '#f59e0b',
        color: '#ffffff',
      },
      ...options,
    });
  }

  // Info toast
  info(message: string, options?: ToastOptions): string {
    return toast(message, {
      ...defaultToastOptions,
      icon: 'ℹ️',
      style: {
        ...defaultToastOptions.style,
        background: '#3b82f6',
        color: '#ffffff',
      },
      ...options,
    });
  }

  // Loading toast
  loading(message: string, options?: ToastOptions): string {
    return toast.loading(message, {
      ...defaultToastOptions,
      ...options,
    });
  }

  // Custom toast
  custom(message: string, options?: ToastOptions): string {
    return toast(message, {
      ...defaultToastOptions,
      ...options,
    });
  }

  // Promise toast - for async operations
  promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: Error) => string);
    },
    options?: ToastOptions
  ): Promise<T> {
    return toast.promise(promise, messages, {
      ...defaultToastOptions,
      ...options,
    });
  }

  // Dismiss a specific toast
  dismiss(toastId?: string): void {
    toast.dismiss(toastId);
  }

  // Dismiss all toasts
  dismissAll(): void {
    toast.dismiss();
  }

  // Remove a specific toast
  remove(toastId: string): void {
    toast.remove(toastId);
  }
}

// Create and export the toast service instance
export const toastService = new ToastService();

// Export the class for creating additional instances if needed
export { ToastService };

// Export toast types for use in components
export type { Toast, ToastOptions } from 'react-hot-toast';