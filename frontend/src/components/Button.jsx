import { cva } from "class-variance-authority";
import { cn } from "../util/cn.js";

export default function Button({
                                 children,
                                 variant,
                                 size,
                                 className,
                                 ...props
                               }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}

const buttonVariants = cva(
  // Base styles: added smooth transition-all, active scaling, and ring offsets
  "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none",
  {
    variants: {
      variant: {
        // Modern solid dark
        default:
          "bg-slate-900 text-white hover:bg-slate-800 shadow-sm active:bg-slate-950 focus:ring-slate-900",
        // Modern primary indigo (Matches your login screen theme)
        indigo:
          "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow active:bg-indigo-800 focus:ring-indigo-600",
        // Soft secondary neutral
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300 focus:ring-slate-400",
        // Soft outlined style
        outline:
          "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 active:bg-slate-100 focus:ring-slate-400 shadow-xs",
        warning:
          "bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 focus:ring-amber-500 shadow-sm",
        danger:
          "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-600 shadow-sm",
      },
      size: {
        sm: "px-3 py-1.5 text-xs rounded-lg",
        md: "px-4 py-2 text-sm rounded-xl",
        lg: "px-5 py-2.5 text-base rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);