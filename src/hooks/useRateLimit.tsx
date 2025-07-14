import { useState, useCallback, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  message?: string;
}

interface RateLimitState {
  requests: number[];
  isLimited: boolean;
}

export const useRateLimit = (config: RateLimitConfig) => {
  const [state, setState] = useState<RateLimitState>({
    requests: [],
    isLimited: false,
  });
  const { toast } = useToast();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const checkRateLimit = useCallback(() => {
    const now = Date.now();
    const windowStart = now - config.windowMs;

    // Filter out requests outside the window
    const recentRequests = state.requests.filter(
      (timestamp) => timestamp > windowStart
    );

    if (recentRequests.length >= config.maxRequests) {
      setState((prev) => ({ ...prev, isLimited: true }));

      toast({
        title: "Rate Limited",
        description:
          config.message ||
          `Too many requests. Please wait before trying again.`,
        variant: "destructive",
      });

      // Clear rate limit after window expires
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setState((prev) => ({ ...prev, isLimited: false }));
      }, config.windowMs);

      return false;
    }

    // Add current request timestamp
    setState((prev) => ({
      requests: [...recentRequests, now],
      isLimited: false,
    }));

    return true;
  }, [config, state.requests, toast]);

  const executeWithRateLimit = useCallback(
    async (fn: () => Promise<void> | void) => {
      if (state.isLimited) {
        toast({
          title: "Rate Limited",
          description: "Please wait before making another request",
          variant: "destructive",
        });
        return false;
      }

      if (checkRateLimit()) {
        await fn();
        return true;
      }
      return false;
    },
    [checkRateLimit, state.isLimited, toast]
  );

  return {
    isLimited: state.isLimited,
    executeWithRateLimit,
    checkRateLimit,
  };
};
