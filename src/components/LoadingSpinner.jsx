import React from "react";

function LoadingSpinner({ size = "medium", className = "" }) {
  const sizeClasses = {
    small: "h-5 w-5 border-2",
    medium: "h-8 w-8 border-3",
    large: "h-12 w-12 border-4",
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-slate-800 border-t-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]`}
      />
      <span className="text-sm font-medium tracking-widest text-slate-400 uppercase animate-pulse">
        Loading
      </span>
    </div>
  );
}

export default LoadingSpinner;
