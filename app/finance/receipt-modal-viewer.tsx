"use client";

import React, { useState } from "react";
import { Receipt, X, ExternalLink } from "lucide-react";

export default function ReceiptModalViewer({ receiptUrl, title }: { receiptUrl: string; title: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1.5 rounded-full bg-[#050914] border border-[#D8B56A]/40 text-[#D8B56A] hover:bg-[#D8B56A] hover:text-[#050914] text-[10px] font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5 cursor-pointer"
      >
        <Receipt className="w-3.5 h-3.5" />
        <span>VIEW RECEIPT</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[150] w-full h-full bg-[#050914]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#081221] border border-[#D8B56A]/40 rounded-3xl p-6 max-w-2xl w-full space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-[#F4F1EA] uppercase tracking-wider">
                RECEIPT FOR: {title}
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-full bg-[#050914] text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full max-h-[60vh] overflow-hidden rounded-xl bg-[#050914] border border-slate-800 flex items-center justify-center">
              <img src={receiptUrl} alt={`Receipt for ${title}`} className="max-w-full max-h-[60vh] object-contain" />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <a
                href={receiptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full gold-gradient-btn text-xs font-bold flex items-center gap-2 uppercase tracking-wider"
              >
                <span>OPEN FULL IMAGE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
