/* RNVS – gemeinsames Verhalten für alle Seiten */
(function () {
  "use strict";

  /* ---- Theme (Hell/Dunkel) ---- */
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem("rnvs-theme"); } catch (e) {}
  if (saved) root.setAttribute("data-theme", saved);
  else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.setAttribute("data-theme", "dark");
  }

  function updateToggle() {
    var isDark = root.getAttribute("data-theme") === "dark";
    document.querySelectorAll(".theme-toggle").forEach(function (b) {
      b.textContent = isDark ? "☀️" : "🌙";
      b.setAttribute("aria-label", isDark ? "Zu hellem Design wechseln" : "Zu dunklem Design wechseln");
    });
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest(".theme-toggle");
    if (!t) return;
    var isDark = root.getAttribute("data-theme") === "dark";
    var next = isDark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("rnvs-theme", next); } catch (err) {}
    updateToggle();
  });
  updateToggle();

  /* ---- Scroll-Fortschrittsbalken ---- */
  var bar = document.getElementById("progress-bar");
  function onScroll() {
    if (bar) {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    }
    highlightTOC();
  }

  /* ---- Aktives Inhaltsverzeichnis ---- */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".toc a[href^='#']"));
  var sections = tocLinks
    .map(function (a) { return document.getElementById(a.getAttribute("href").slice(1)); })
    .filter(Boolean);

  function highlightTOC() {
    if (!sections.length) return;
    var pos = window.scrollY + 120;
    var current = sections[0];
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= pos) current = sections[i];
    }
    tocLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current.id);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Reveal-Animation beim Scrollen ---- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Wissenscheck / Quiz ---- */
  function normText(s) {
    return (s || "").toLowerCase().trim().replace(/\s+/g, " ").replace(/[.,;:!?]+$/, "");
  }
  function normNum(s) {
    s = (s || "").replace(/ /g, "").replace(/\s+/g, "");
    s = s.replace(",", ".").replace(/[^0-9.eE+\-]/g, "");
    return parseFloat(s);
  }
  function setFeedback(q, ok, msg) {
    var fb = q.querySelector(".quiz-feedback");
    if (fb) { fb.textContent = msg; fb.className = "quiz-feedback " + (ok ? "ok" : "bad"); }
    if (ok) {
      var ex = q.querySelector(".quiz-explain");
      if (ex) ex.hidden = false;
      q.classList.add("solved");
    }
  }
  function checkInput(q) {
    if (!q) return;
    var input = q.querySelector(".quiz-input");
    if (!input) return;
    var val = input.value;
    if (val.trim() === "") { setFeedback(q, false, "Bitte gib zuerst eine Antwort ein."); return; }
    var type = q.getAttribute("data-type");
    var answers = (q.getAttribute("data-answer") || "").split("|");
    var ok = false;
    if (type === "number") {
      var u = normNum(val);
      for (var i = 0; i < answers.length; i++) {
        var c = normNum(answers[i]);
        if (isNaN(c)) continue;
        var rawTol = q.getAttribute("data-tol");
        var tol = (rawTol !== null && rawTol !== "") ? parseFloat(rawTol) : Math.abs(c) * 0.01 + 1e-9;
        if (!isNaN(u) && Math.abs(u - c) <= tol) { ok = true; break; }
      }
    } else {
      var nu = normText(val);
      for (var j = 0; j < answers.length; j++) {
        if (normText(answers[j]) === nu) { ok = true; break; }
      }
    }
    input.classList.toggle("ok", ok);
    input.classList.toggle("bad", !ok);
    setFeedback(q, ok, ok ? "✅ Richtig!" : "❌ Noch nicht — probier es nochmal oder sieh dir die Lösung an.");
  }

  document.addEventListener("click", function (e) {
    var chk = e.target.closest(".quiz-check");
    if (chk) { checkInput(chk.closest(".quiz-q")); return; }

    var rev = e.target.closest(".quiz-reveal");
    if (rev) {
      var qr = rev.closest(".quiz-q");
      var ex = qr.querySelector(".quiz-explain");
      if (ex) ex.hidden = !ex.hidden;
      return;
    }

    var ch = e.target.closest(".quiz-choice");
    if (ch) {
      var q = ch.closest(".quiz-q");
      var correct = ch.hasAttribute("data-correct");
      q.querySelectorAll(".quiz-choice").forEach(function (b) {
        b.classList.remove("picked");
      });
      ch.classList.add("picked");
      ch.classList.add(correct ? "correct" : "wrong");
      if (!correct) {
        var cc = q.querySelector(".quiz-choice[data-correct]");
        if (cc) cc.classList.add("correct");
      }
      setFeedback(q, correct, correct ? "✅ Richtig!" : "❌ Leider falsch — die richtige Antwort ist grün markiert.");
      return;
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      var inp = e.target.closest(".quiz-input");
      if (inp) { e.preventDefault(); checkInput(inp.closest(".quiz-q")); }
    }
  });

  /* ---- Jahr im Footer ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
