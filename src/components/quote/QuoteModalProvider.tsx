"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { QuoteModal } from "@/components/quote/QuoteModal";

type QuoteModalContextValue = Readonly<{
  isOpen: boolean;
  initialService?: string;
  openQuoteModal: (service?: string) => void;
  closeQuoteModal: () => void;
}>;

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function useQuoteModal(): QuoteModalContextValue {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) {
    throw new Error("useQuoteModal must be used within a QuoteModalProvider");
  }
  return ctx;
}

export function QuoteModalProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialService, setInitialService] = useState<string | undefined>(
    undefined,
  );

  const openQuoteModal = useCallback((service?: string) => {
    setInitialService(service);
    setIsOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo<QuoteModalContextValue>(
    () => ({ isOpen, initialService, openQuoteModal, closeQuoteModal }),
    [isOpen, initialService, openQuoteModal, closeQuoteModal],
  );

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
      <QuoteModal
        open={isOpen}
        initialService={initialService}
        onClose={closeQuoteModal}
      />
    </QuoteModalContext.Provider>
  );
}
