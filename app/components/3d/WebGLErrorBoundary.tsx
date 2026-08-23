"use client";

import React, { Component, ReactNode } from "react";
import { Sparkles, ShieldAlert } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("WebGL 3D Canvas error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full py-16 px-4 text-center space-y-4 glass-card rounded-3xl border border-gold-500/20 max-w-xl mx-auto my-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-gold-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-100 gold-gradient-text uppercase tracking-widest">
            IICT FRESHER PARTY 2026
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed max-w-md mx-auto">
            Interactive 3D mode fell back to performance mode for your device capability. All features, directories, and portals remain 100% active.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
