"use client";
import {
  QueryClient,
  QueryClientProvider as TSQueryClientProvider,
} from "@tanstack/react-query";
import React from "react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TSQueryClientProvider client={queryClient}>
      {children}
    </TSQueryClientProvider>
  );
}
