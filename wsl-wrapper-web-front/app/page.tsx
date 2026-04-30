"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SRRProductSite() {
  const REPO_URL = "https://github.com/ramexec/wsl_wrapper_public";
  const [githubData, setGithubData] = useState({ 
    version: "v1.0.0", 
    updated: "2026-04-30" 
  });

  // 1. Mouse Tracking Logic
  useEffect(() => {
    let frameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      frameId = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  // 2. GitHub Version Fetching
  useEffect(() => {
    async function fetchStats() {
      try {
        const [repoRes, relRes] = await Promise.all([
          fetch("https://api.github.com/repos/ramexec/wsl_wrapper_public"),
          fetch("https://api.github.com/repos/ramexec/wsl_wrapper_public/releases/latest")
        ]);
        const repo = await repoRes.json();
        const rel = await relRes.json();
        setGithubData({
          version: rel.tag_name || "v1.0.0",
          updated: repo.updated_at ? new Date(repo.updated_at).toISOString().split('T')[0] : "2026-04-30"
        });
      } catch (e) { console.error("GitHub sync failed", e); }
    }
    fetchStats();
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-yellow-400 selection:text-black overflow-x-hidden">
      {/* Background FX */}
      <div className="bg-grid-animated" />
      <div className="bg-industrial" />

      {/* FIXED FLAVOUR TEXT OVERLAYS */}
      <div className="fixed top-24 left-6 hidden lg:block flavour-text origin-left -rotate-90 opacity-20">
        SRR_STUDIOS // KERNEL_SYNC // {githubData.version}
      </div>

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-black/40 border-b border-yellow-400/10 backdrop-blur-xl px-6 md:px-10 py-5 flex justify-between items-center">
        <div className="font-black italic bg-yellow-400 text-black px-3 py-1 text-sm">SRR STUDIOS</div>
        <div className="flex gap-6 items-center">
          <span className="flavour-text hidden md:block opacity-40">OS_COMPAT: WIN_NT</span>
          <a href={`${REPO_URL}/releases`} className="bg-white text-black px-5 py-1.5 font-black hover:bg-yellow-400 transition-all uppercase text-xs">
            GET_{githubData.version}
          </a>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 md:px-12 pt-40 md:pt-52 relative z-10">
        
        {/* HERO SECTION */}
        <section className="grid lg:grid-cols-2 gap-16 items-center mb-40">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="mb-6 inline-block bg-blue-500/10 text-blue-400 border border-blue-400/20 px-4 py-1.5 text-[11px] font-black tracking-widest uppercase">
              Windows_Exclusive_Build // {githubData.version}
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8 uppercase italic text-white">
              WSL <br />
              <span className="text-yellow-400">REMASTERED.</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg max-w-lg mb-10 border-l-2 border-yellow-400/30 pl-6 uppercase tracking-tighter leading-relaxed">
              Complete native graphical control for Windows Subsystem for Linux. No configuration. No syntax. Just the kernel.
            </p>
            <a href={`${REPO_URL}/releases`} className="inline-block bg-yellow-400 text-black px-10 py-5 font-black text-center text-base hover:scale-105 transition-all shadow-xl">
              DOWNLOAD NOW
            </a>
          </motion.div>

          <div className="relative">
             <div className="absolute -top-10 left-0 flavour-text text-[11px] font-bold">BOOT_SEQUENCE: {githubData.version}</div>
             <AnimatedTerminal version={githubData.version} />
             <div className="absolute -bottom-10 right-0 flavour-text text-[11px] opacity-30 italic">LATEST_SYNC: {githubData.updated}</div>
          </div>
        </section>

        {/* UI SCREENSHOT WITH OVERLAYS */}
        <section className="py-20 mb-40 relative">
          <div className="text-center mb-12">
            <span className="flavour-text bg-yellow-400/5 px-6 py-2 border border-yellow-400/10">UI_VISUAL_TELEMETRY</span>
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="bg-black/60 border border-yellow-400/20 rounded-2xl p-2 md:p-3 relative group terminal-glow">
             {/* Dynamic Flavour Text on Image */}
             <div className="absolute top-8 left-8 hidden md:block flavour-text bg-black/80 p-4 border-l border-yellow-400 backdrop-blur-md z-20">
                RESOURCE: UI_PREVIEW.PNG <br /> 
                VERSION: {githubData.version} <br />
                STATUS: ENCRYPTED_STABLE
             </div>

            <div className="bg-[#0a0a0a] border border-yellow-400/10 rounded-xl overflow-hidden relative aspect-video">
              <img src="/wsl_manager.png" alt="UI" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/5 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </section>

        {/* FEATURE GRID */}
        <section className="grid md:grid-cols-3 gap-12 py-20 border-t border-white/5">
           <Feature title="CLICK_DEPLOY" desc="Deploy Windows-based WSL distributions with a single interaction." />
           <Feature title="DRIVE_BRIDGE" desc="Mount Linux partitions directly to the Windows Explorer sidebar." />
           <Feature title="TELEMETRY" desc="Live tracking of CPU/RAM allocation within the WSL2 utility bus." />
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-yellow-400/10 bg-black/80 backdrop-blur-2xl pt-24 pb-12 px-10 relative">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-6 py-1.5 font-black italic text-[11px] tracking-widest uppercase">
           STATION_AUTH_VERIFIED_{githubData.version}
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <div className="text-4xl text-white mb-2 italic font-black">SRR STUDIOS</div>
            <div className="flavour-text font-bold">BUILD_DATE: {githubData.updated} // WINDOWS_X64</div>
          </div>

          <div className="flex gap-8 text-[12px] font-bold tracking-widest text-yellow-400/40 uppercase">
            <a href={REPO_URL} className="hover:text-yellow-400 transition-colors">[ SOURCE ]</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">[ DOCS ]</a>
          </div>

          <div className="border border-yellow-400/20 px-8 py-4 rounded-sm flex items-center gap-8 bg-yellow-400/5">
             <div className="flex flex-col text-right">
                <span className="flavour-text">OS_LOCK</span>
                <span className="text-blue-400 font-bold text-xs uppercase">WINDOWS</span>
             </div>
             <div className="w-[1px] h-10 bg-yellow-400/20" />
             <div className="flex flex-col">
                <span className="flavour-text">STABLE</span>
                <span className="text-green-500 font-bold text-xs uppercase">{githubData.version}</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AnimatedTerminal({ version }: { version: string }) {
  return (
    <div className="bg-black/90 border border-yellow-400/20 p-1.5 rounded-xl shadow-2xl backdrop-blur-md overflow-hidden relative">
      <div className="bg-yellow-400/5 border-b border-yellow-400/10 px-5 py-3 flex justify-between items-center">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500/30" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
        </div>
        <span className="text-[11px] uppercase font-bold opacity-30">BRIDGE_v{version}</span>
      </div>
      <div className="p-8 text-[13px] md:text-[14px] font-mono leading-relaxed min-h-[240px]">
        <div className="mb-2"><span className="text-yellow-400/50">$</span> wsl --init --force</div>
        <div className="mb-4 text-white/30 italic">Checking distribution compatibility...</div>
        <div className="mb-2"><span className="text-yellow-400/50">$</span> srr-bridge --launch</div>
        <div className="text-green-400 font-black tracking-tight animate-pulse underline decoration-green-400/30 underline-offset-4">GUI_CONNECTION_SUCCESSFUL_v{version}</div>
        <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-4 bg-yellow-400 mt-4" />
      </div>
    </div>
  );
}

function Feature({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="space-y-4 border-l border-yellow-400/10 pl-8 hover:border-yellow-400 transition-all group">
      <h3 className="text-xl md:text-2xl font-black italic tracking-tighter uppercase group-hover:text-white transition-colors">{title}</h3>
      <p className="text-white/40 text-[13px] leading-relaxed uppercase font-medium">{desc}</p>
      <div className="flavour-text font-bold text-yellow-400/20">MODULE_LOADED: TRUE</div>
    </div>
  );
}