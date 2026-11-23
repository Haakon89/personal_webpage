"use strict";

(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Language toggle (EN / NO) ---------- */
  const getStoredLang = () => {
    try { return localStorage.getItem("lang"); } catch { return null; }
  };
  const setLang = (lang) => {
    root.dataset.lang = lang;
    root.lang = lang === "no" ? "nb" : "en";
    try { localStorage.setItem("lang", lang); } catch { /* storage unavailable */ }
    runTerminal();
  };
  const initialLang = getStoredLang() ||
    ((navigator.language || "").toLowerCase().match(/^(nb|nn|no)/) ? "no" : "en");
  root.dataset.lang = initialLang;
  root.lang = initialLang === "no" ? "nb" : "en";

  document.getElementById("lang-toggle")
    .addEventListener("click", () => setLang(root.dataset.lang === "en" ? "no" : "en"));

  /* ---------- Mobile nav ---------- */
  const toggle = document.querySelector(".nav__toggle");
  const links = document.getElementById("nav-links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Terminal animation ---------- */
  // Built with DOM nodes (textContent), never innerHTML.
  const scripts = {
    en: [
      ["cmd", "whoami"],
      ["out", "håkon sørensen — security & software"],
      ["cmd", "cat focus.txt"],
      ["out", "- application & network security\n- penetration testing\n- tooling in Go, Python, JS"],
      ["cmd", "ls projects/"],
      ["out", "cnet-sim/  ctf-writeups/  personal_webpage/"],
      ["cmd", "nmap -sV opportunities.no"],
      ["out", "PORT    STATE  SERVICE\n443/tcp open   hiring?  ← let's talk"],
    ],
    no: [
      ["cmd", "whoami"],
      ["out", "håkon sørensen — sikkerhet & programvare"],
      ["cmd", "cat fokus.txt"],
      ["out", "- applikasjons- og nettverkssikkerhet\n- penetrasjonstesting\n- verktøy i Go, Python, JS"],
      ["cmd", "ls prosjekter/"],
      ["out", "cnet-sim/  ctf-writeups/  personal_webpage/"],
      ["cmd", "nmap -sV muligheter.no"],
      ["out", "PORT    STATE  SERVICE\n443/tcp open   ansetter?  ← ta kontakt"],
    ],
  };

  const term = document.getElementById("terminal");
  let runId = 0;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const span = (cls, text) => {
    const s = document.createElement("span");
    s.className = cls;
    s.textContent = text;
    return s;
  };

  async function runTerminal() {
    if (!term) return;
    const id = ++runId;
    term.textContent = "";
    const lines = scripts[root.dataset.lang] || scripts.en;

    for (const [type, text] of lines) {
      if (id !== runId) return;
      if (type === "cmd") {
        term.append(span("p", "$ "));
        const c = span("c", "");
        term.append(c);
        if (reducedMotion) {
          c.textContent = text;
        } else {
          for (const ch of text) {
            if (id !== runId) return;
            c.textContent += ch;
            await sleep(45);
          }
          await sleep(250);
        }
        term.append("\n");
      } else {
        term.append(span("m", text + "\n"));
        if (!reducedMotion) await sleep(450);
      }
    }
    if (id === runId) term.append(span("p", "$ "), span("cursor", "_"));
  }
  runTerminal();

  /* ---------- Reveal on scroll ---------- */
  const targets = document.querySelectorAll(".section, .project, .timeline li");
  if ("IntersectionObserver" in window && !reducedMotion) {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.12 });
    targets.forEach((t) => { t.classList.add("reveal"); io.observe(t); });
  }

  /* ---------- Hide icons whose image file is missing ---------- */
  // (Inline onerror handlers would be blocked by the CSP, so this is done here.)
  document.querySelectorAll("img.icon").forEach((img) => {
    const hide = () => { img.hidden = true; };
    if (img.complete && img.naturalWidth === 0) hide();
    else img.addEventListener("error", hide);
  });

  /* ---------- Footer year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
