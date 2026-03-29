"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Database, Plane, Bot, Radio, Info } from "lucide-react";
import { getSystemStatus } from "@/lib/data";

export function SystemStatus() {
  const [isExpanded, setIsExpanded] = useState(false);
  const status = getSystemStatus();

  return (
    <div className="border-b border-white/[0.06]" style={{ background: '#0D0E13' }}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-6 py-2 text-xs cursor-pointer hover:bg-white/[0.03] transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${status.supabase.connected ? 'bg-[#10B981]' : 'bg-[#EF4444]'}`} />
            <span className="text-[#64748B]">Supabase: <span className={status.supabase.connected ? 'text-[#10B981]' : 'text-[#EF4444]'}>{status.supabase.label}</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${status.amadeus.connected ? 'bg-[#10B981]' : 'bg-[#EF4444]'}`} />
            <span className="text-[#64748B]">Amadeus: <span className={status.amadeus.connected ? 'text-[#10B981]' : 'text-[#EF4444]'}>{status.amadeus.label}</span></span>
          </div>
          <span className="text-[#64748B]">|</span>
          <span className="text-[#94A3B8]">{status.dataMode}</span>
        </div>
        <div className="flex items-center gap-2 text-[#64748B]">
          <Info className="w-3 h-3" />
          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </div>
      </button>

      {isExpanded && (
        <div className="px-6 pb-3 grid grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-[#64748B]" />
            <div>
              <div className="text-[10px] text-[#64748B] uppercase tracking-wider">Database</div>
              <div className={`text-xs font-mono ${status.supabase.connected ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                {status.supabase.label}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Plane className="w-3.5 h-3.5 text-[#64748B]" />
            <div>
              <div className="text-[10px] text-[#64748B] uppercase tracking-wider">Flight API</div>
              <div className={`text-xs font-mono ${status.amadeus.connected ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                {status.amadeus.label}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Bot className="w-3.5 h-3.5 text-[#64748B]" />
            <div>
              <div className="text-[10px] text-[#64748B] uppercase tracking-wider">Agent Last Run</div>
              <div className="text-xs font-mono text-[#94A3B8]">{status.agentLastRun}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-[#64748B]" />
            <div>
              <div className="text-[10px] text-[#64748B] uppercase tracking-wider">Live Data</div>
              <div className={`text-xs font-mono ${status.liveData === 'Online' ? 'text-[#10B981]' : 'text-[#94A3B8]'}`}>
                {status.liveData}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
