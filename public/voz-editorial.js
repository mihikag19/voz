const CYCLE = ["Hello","Hola","नमस्ते","Xin chào","مرحبا","Olá","Bonjour","こんにちは","Merhaba","Привет","வணக்கம்","নমস্কার","Sawubona","Habari","Shalom","Hei","Hallo","Γεια","สวัสดี","ආයුබෝවන්","Mhoro"];

const LANGS = [
  ["English","English","en"],
  ["हिन्दी","Hindi","hi"],
  ["Español","Spanish","es"],
  ["Tiếng Việt","Vietnamese","vi"],
  ["العربية","Arabic","ar"],
  ["Português","Portuguese","pt"],
  ["Français","French","fr"],
  ["Italiano","Italian","it"],
  ["日本語","Japanese","ja"],
  ["한국어","Korean","ko"],
  ["தமிழ்","Tamil","ta"],
  ["తెలుగు","Telugu","te"],
  ["বাংলা","Bengali","bn"],
  ["ਪੰਜਾਬੀ","Punjabi","pa"],
  ["isiZulu","Zulu","zu"],
  ["Kiswahili","Swahili","sw"],
  ["Yorùbá","Yoruba","yo"],
  ["Türkçe","Turkish","tr"],
  ["Русский","Russian","ru"],
  ["Deutsch","German","de"],
  ["Bahasa Indonesia","Indonesian","id"],
  ["ภาษาไทย","Thai","th"],
  ["עברית","Hebrew","he"],
  ["فارسی","Persian","fa"],
  ["አማርኛ","Amharic","am"],
];

const RTL = new Set(["ar","he","fa","ur"]);

const I18N = {
  en:{hero1:"The Art",hero2:"of Making",hero3:"Visible",hero4:"voice",
      intro:"In a world where every marketplace asks you to fill in forms in a language you don't speak, we choose to listen. Voz turns one photograph and one voice note into a storefront — translated, priced, and published in the time it takes to make a cup of tea.",
      cta:"Build your storefront",
      photoPrompt:"Photograph your craft",
      voicePrompt:"Speak about it",
      build:"Build my storefront",
      procTitle:"Four quiet agents",
      agentVoice:"Voice",agentVoiceDesc:"listening & translating",
      agentVision:"Vision",agentVisionDesc:"reading the craft",
      agentListing:"Listing",agentListingDesc:"writing the story",
      agentStorefront:"Storefront",agentStorefrontDesc:"publishing live",
      waiting:"waiting",working:"working",done:"done",
      doneTitle:"Your storefront is live.",
      doneSub:"One link, any language."},
  es:{hero1:"El arte",hero2:"de hacer",hero3:"visible",hero4:"voz",
      intro:"En un mundo donde cada mercado te pide llenar formularios en un idioma que no hablas, elegimos escuchar. Voz convierte una foto y una nota de voz en una tienda — traducida, valorada y publicada en lo que tarda un té.",
      cta:"Construye tu tienda",
      photoPrompt:"Fotografía tu obra",voicePrompt:"Cuenta su historia",build:"Crear",
      procTitle:"Cuatro agentes silenciosos",
      agentVoice:"Voz",agentVoiceDesc:"escuchando y traduciendo",
      agentVision:"Visión",agentVisionDesc:"leyendo la obra",
      agentListing:"Ficha",agentListingDesc:"escribiendo la historia",
      agentStorefront:"Tienda",agentStorefrontDesc:"publicando",
      waiting:"en espera",working:"trabajando",done:"hecho",
      doneTitle:"Tu tienda está en línea.",doneSub:"Un enlace, en cualquier idioma."},
  hi:{hero1:"बनाने की",hero2:"कला",hero3:"आवाज़ से",hero4:"दिखाओ",
      intro:"हर बाज़ार आपसे एक अनजान भाषा में फॉर्म भरने को कहता है। हम सुनना चुनते हैं। एक तस्वीर, एक आवाज़ — और आपकी दुकान तैयार है, हर भाषा में।",
      cta:"अपनी दुकान बनाएँ",
      photoPrompt:"अपनी कला की तस्वीर लें",voicePrompt:"इसके बारे में बोलें",build:"बनाएँ",
      procTitle:"चार छोटे सहायक",
      agentVoice:"आवाज़",agentVoiceDesc:"सुन रहे हैं और अनुवाद कर रहे हैं",
      agentVision:"दृष्टि",agentVisionDesc:"कला पढ़ रहे हैं",
      agentListing:"विवरण",agentListingDesc:"कहानी लिख रहे हैं",
      agentStorefront:"दुकान",agentStorefrontDesc:"प्रकाशित कर रहे हैं",
      waiting:"प्रतीक्षा",working:"चल रहा है",done:"हो गया",
      doneTitle:"आपकी दुकान लाइव है।",doneSub:"एक लिंक, हर भाषा में।"},
};

window.selectedLanguage = "en";

function applyI18n(code){
  const dict = I18N[code] || I18N.en;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    if(dict[k] != null) el.textContent = dict[k];
  });
  document.documentElement.setAttribute("dir", RTL.has(code) ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", code);
  const code2 = document.getElementById("globeCode");
  if(code2) code2.textContent = code.slice(0,2).toUpperCase();
}

function initWelcome(root, onPick){
  const cy = root.querySelector(".lang-cycle");
  const a = cy.querySelector(".cy-a");
  const b = cy.querySelector(".cy-b");
  let active = a, inactive = b, idx = 0;
  active.textContent = CYCLE[0];
  active.animate([{opacity:0,transform:"translateY(14px)"},{opacity:1,transform:"translateY(0)"}],
    {duration:500,easing:"cubic-bezier(.2,.7,.2,1)",fill:"forwards"});
  idx = 1;
  const EASE = "cubic-bezier(.2,.7,.2,1)";
  const ival = setInterval(() => {
    const next = CYCLE[idx % CYCLE.length]; idx++;
    inactive.textContent = next;
    inactive.style.direction = /[\u0600-\u06FF\u0590-\u05FF]/.test(next) ? "rtl" : "ltr";
    active.animate([{opacity:1,transform:"translateY(0)"},{opacity:0,transform:"translateY(-14px)"}],
      {duration:500,easing:EASE,fill:"forwards"});
    inactive.animate([{opacity:0,transform:"translateY(14px)"},{opacity:1,transform:"translateY(0)"}],
      {duration:500,easing:EASE,fill:"forwards"});
    [active, inactive] = [inactive, active];
  }, 1400);

  const list = root.querySelector(".lang-list");
  const search = root.querySelector(".lang-search");
  function render(q=""){
    q = q.trim().toLowerCase();
    list.innerHTML = "";
    LANGS.filter(([n,e]) => !q || n.toLowerCase().includes(q) || e.toLowerCase().includes(q))
      .forEach(([native, eng, code]) => {
        const el = document.createElement("button");
        el.className = "lang-item";
        el.innerHTML = `<span class="native">${native}</span><span class="eng">${eng}</span>`;
        el.addEventListener("click", () => finalize(code, native));
        list.appendChild(el);
      });
  }
  render();
  search.addEventListener("input", e => render(e.target.value));

  const skip = root.querySelector(".skip-en");
  if(skip) skip.addEventListener("click", () => finalize("en","English"));

  function finalize(code, native){
    clearInterval(ival);
    inactive.textContent = native;
    inactive.style.direction = RTL.has(code) ? "rtl" : "ltr";
    inactive.animate([{opacity:0,transform:"translateY(14px) scale(1)"},{opacity:1,transform:"translateY(0) scale(1.06)"}],
      {duration:550,easing:EASE,fill:"forwards"});
    active.animate([{opacity:1,transform:"translateY(0)"},{opacity:0,transform:"translateY(-14px)"}],
      {duration:350,easing:EASE,fill:"forwards"});
    setTimeout(() => onPick(code), 750);
  }

  setTimeout(() => search.focus({preventScroll:true}), 350);
}

document.addEventListener("DOMContentLoaded", () => {

  const saved = localStorage.getItem("vozLanguage");
  const welcome = document.getElementById("welcome");

  function commit(code){
    window.selectedLanguage = code;
    try { localStorage.setItem("vozLanguage", code); } catch(e){}
    applyI18n(code);
  }

  if(saved){
    welcome.remove();
    commit(saved);
  } else {
    initWelcome(welcome, code => {
      commit(code);
      welcome.classList.add("hide");
      setTimeout(() => welcome.remove(), 720);
    });
    applyI18n("en");
  }

  document.getElementById("globeBtn").addEventListener("click", () => {
    if(document.getElementById("welcome-modal")) return;
    const el = document.createElement("div");
    el.id = "welcome-modal";
    el.className = "welcome";
    el.innerHTML = `
      <div class="welc-corner"><span class="ast"></span> Voz <span class="sub">( language )</span></div>
      <div class="welc-stage">
        <div class="welc-greet">
          <div class="lang-cycle"><span class="cy cy-a"></span><span class="cy cy-b"></span></div>
          <div class="welc-dots"><span></span><span></span><span></span></div>
        </div>
        <div class="welc-picker">
          <div class="welc-label">( choose your language )</div>
          <input class="lang-search" placeholder="Search…" />
          <div class="lang-list"></div>
          <button class="skip-en">Continue in English</button>
        </div>
      </div>`;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    initWelcome(el, code => {
      commit(code);
      el.classList.remove("show");
      setTimeout(() => el.remove(), 500);
    });
  });

  document.querySelectorAll("[data-expand]").forEach(el => {
    el.addEventListener("click", () => {
      const desc = el.nextElementSibling;
      const open = el.classList.contains("open");
      document.querySelectorAll(".cat-line.open").forEach(o => o.classList.remove("open"));
      document.querySelectorAll(".cat-desc.open").forEach(o => o.classList.remove("open"));
      if(!open){
        el.classList.add("open");
        if(desc && desc.classList.contains("cat-desc")) desc.classList.add("open");
      }
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, {threshold: 0.15});
  document.querySelectorAll("[data-line], [data-reveal]").forEach(el => io.observe(el));

  window.addEventListener("load", () => {
    const heroLines = document.querySelectorAll("#hero .hero-line");
    heroLines.forEach((el, i) => setTimeout(() => el.classList.add("in"), 150 + i * 130));
  });

  document.querySelectorAll("[data-scroll-to]").forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const sel = a.getAttribute("data-scroll-to");
      const t = document.querySelector(sel);
      if(t) t.scrollIntoView({behavior:"smooth", block:"start"});
    });
  });

  /* =================== BUILD FLOW =================== */
  const photoZone = document.getElementById("photoZone");
  const photoInput = document.getElementById("photoInput");
  const voiceBtn = document.getElementById("voiceBtn");
  const voiceLive = document.getElementById("voiceLive");
  const timer = document.getElementById("timer");
  const buildBtn = document.getElementById("buildBtn");

  let hasPhoto = false, hasAudio = false;
  let recState = "idle", recStart = 0, recTick, barTick;
  let photoFile = null;
  let audioBlob = null;
  let mediaRecorder = null;
  let audioChunks = [];
  let micStream = null;

  photoZone.addEventListener("click", () => photoInput.click());
  photoInput.addEventListener("change", e => {
    const f = e.target.files[0]; if(!f) return;
    photoFile = f;
    const img = document.createElement("img");
    img.src = URL.createObjectURL(f);
    photoZone.innerHTML = "";
    photoZone.appendChild(img);
    photoZone.classList.add("has");
    hasPhoto = true; checkReady();
  });

  // double-tap demo fallback
  let dc = 0;
  photoZone.addEventListener("click", () => {
    dc++;
    if(dc === 2 && !hasPhoto){
      const img = document.createElement("img");
      img.src = "data:image/svg+xml;utf8,"+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 320'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#2B3A67'/><stop offset='1' stop-color='#8B9DC8'/></linearGradient></defs><rect width='400' height='320' fill='url(#g)'/><text x='20' y='300' font-family='monospace' font-size='10' fill='#ffffffaa' letter-spacing='2'>DEMO PIECE</text></svg>`);
      // Create a demo File object from the SVG
      fetch(img.src).then(r => r.blob()).then(blob => { photoFile = new File([blob], "demo.png", {type:"image/png"}); });
      photoZone.innerHTML = "";
      photoZone.appendChild(img);
      photoZone.classList.add("has");
      hasPhoto = true; checkReady();
    }
  });

  for(let i=0;i<32;i++){
    const b = document.createElement("span");
    b.className = "vb";
    voiceLive.appendChild(b);
  }

  voiceBtn.addEventListener("click", async () => {
    if(recState === "idle"){
      recState = "rec";
      voiceBtn.classList.add("rec");
      voiceLive.classList.add("on");
      recStart = Date.now();
      recTick = setInterval(() => {
        const s = Math.floor((Date.now() - recStart) / 1000);
        timer.textContent = `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
      }, 200);
      barTick = setInterval(() => {
        [...voiceLive.children].forEach((b,i) => {
          const h = 4 + Math.abs(Math.sin(Date.now()/200 + i*0.3)) * 28 + Math.random()*12;
          b.style.height = h + "px";
        });
      }, 60);

      try {
        micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(micStream);
        audioChunks = [];
        mediaRecorder.ondataavailable = e => { if(e.data.size > 0) audioChunks.push(e.data); };
        mediaRecorder.onstop = () => {
          audioBlob = new Blob(audioChunks, { type: mediaRecorder.mimeType || "audio/webm" });
          if(micStream){ micStream.getTracks().forEach(t => t.stop()); micStream = null; }
        };
        mediaRecorder.start();
      } catch(err){
        console.warn("Microphone unavailable, demo mode active", err);
        // audioBlob will be null; build will use empty blob
      }

    } else if(recState === "rec"){
      clearInterval(recTick); clearInterval(barTick);
      if(mediaRecorder && mediaRecorder.state === "recording"){
        mediaRecorder.stop();
      } else {
        audioBlob = new Blob([], { type: "audio/webm" });
        if(micStream){ micStream.getTracks().forEach(t => t.stop()); micStream = null; }
      }
      recState = "done";
      voiceBtn.classList.remove("rec");
      voiceBtn.classList.add("done");
      voiceLive.classList.remove("on");
      voiceLive.classList.add("done");
      hasAudio = true; checkReady();
    }
  });

  function checkReady(){
    if(hasPhoto && hasAudio) buildBtn.classList.add("ready");
  }

  buildBtn.addEventListener("click", () => {
    if(!hasPhoto || !hasAudio) return;

    const fd = new FormData();
    if(photoFile) fd.append("images", photoFile, photoFile.name || "photo.jpg");
    fd.append("audio", audioBlob || new Blob([], {type:"audio/webm"}), "voice.webm");

    const apiPromise = fetch("/api/process", { method:"POST", body:fd })
      .then(r => r.ok ? r.json() : Promise.reject(new Error(String(r.status))))
      .catch(err => {
        console.warn("API failed, falling back to demo endpoint", err);
        return fetch("/api/demo").then(r => r.json()).catch(() => ({
          slug: "priya-warli-painting",
          storefront_url: "/storefront/priya-warli-painting"
        }));
      });

    const build = document.getElementById("build");
    const proc = document.getElementById("proc");
    build.classList.add("gone");
    setTimeout(() => {
      build.style.display = "none";
      proc.style.display = "block";
      requestAnimationFrame(() => proc.classList.add("on"));
      proc.scrollIntoView({behavior:"smooth", block:"start"});
      runProcessing(apiPromise);
    }, 450);
  });

  /* ---- processing ---- */
  const LOG = [
    "voice  listening to audio",
    "voice  transcribing",
    "voice  translating to english",
    "  → blue-dyed handloom textile with traditional motif",
    "vision  analysing image",
    "vision  detected cotton-silk blend, ikat weave",
    "  → natural indigo dye, approx. 2.4m length",
    "listing  drafting title options",
    "  → \"the blue weave\"",
    "  → \"indigo ikat · handloom\"",
    "listing  price suggestion $145 — fair-trade tier",
    "listing  writing cultural note",
    "storefront  provisioning",
    "storefront  compiling assets",
    "storefront  ✓ live"
  ];

  function setAgent(name, status){
    const el = document.querySelector(`[data-agent="${name}"]`);
    if(!el) return;
    el.setAttribute("data-status", status);
    const dict = I18N[window.selectedLanguage] || I18N.en;
    el.querySelector(".status").textContent = dict[status] || status;
  }

  const term = document.getElementById("term");
  let tq = [], typing = false;
  function appendTerm(t){ tq.push(t); if(!typing) typeNext(); }
  function typeNext(){
    if(!tq.length){ typing = false; return; }
    typing = true;
    const text = tq.shift();
    const line = document.createElement("div");
    line.className = "tln";
    term.appendChild(line);
    let i = 0;
    const tick = setInterval(() => {
      line.textContent += text[i++];
      term.scrollTop = term.scrollHeight;
      if(i >= text.length){ clearInterval(tick); setTimeout(typeNext, 120); }
    }, 14);
  }

  function runProcessing(apiPromise){
    const agents = document.querySelectorAll("#proc .agent");
    agents.forEach((a,i) => setTimeout(() => a.classList.add("in"), i*180));
    setTimeout(() => { setAgent("voice","working"); appendTerm(LOG[0]); appendTerm(LOG[1]); appendTerm(LOG[2]); appendTerm(LOG[3]); }, 500);
    setTimeout(() => { setAgent("vision","working"); appendTerm(LOG[4]); appendTerm(LOG[5]); appendTerm(LOG[6]); }, 1400);
    setTimeout(() => setAgent("voice","done"), 2500);
    setTimeout(() => setAgent("vision","done"), 3500);
    setTimeout(() => { setAgent("listing","working"); appendTerm(LOG[7]); appendTerm(LOG[8]); appendTerm(LOG[9]); appendTerm(LOG[10]); appendTerm(LOG[11]); }, 3700);
    setTimeout(() => setAgent("listing","done"), 5200);
    setTimeout(() => { setAgent("storefront","working"); appendTerm(LOG[12]); appendTerm(LOG[13]); appendTerm(LOG[14]); }, 5400);
    setTimeout(() => setAgent("storefront","done"), 7000);

    let animDone = false, apiData = null;
    function maybeFinish(){
      if(animDone && apiData !== null){ populateDoneScreen(apiData); goDone(); }
    }
    setTimeout(() => { animDone = true; maybeFinish(); }, 7500);
    apiPromise
      .then(data => { apiData = data; maybeFinish(); })
      .catch(() => { apiData = {}; maybeFinish(); });
  }

  function populateDoneScreen(data){
    const slug = data.slug || "priya-warli-painting";
    const storefrontPath = data.storefront_url || ("/storefront/" + slug);
    const fullUrl = window.location.origin + storefrontPath;
    const displayUrl = "voz.shop/" + slug;

    const urlEl = document.getElementById("urlText");
    if(urlEl){ urlEl.textContent = displayUrl; urlEl.dataset.fullUrl = fullUrl; }

    const storeLink = document.getElementById("storeLink");
    if(storeLink){ storeLink.href = storefrontPath; }
  }

  function goDone(){
    const proc = document.getElementById("proc");
    const done = document.getElementById("done");
    proc.classList.add("gone");
    setTimeout(() => {
      proc.style.display = "none";
      done.style.display = "block";
      requestAnimationFrame(() => done.classList.add("on"));
      done.scrollIntoView({behavior:"smooth", block:"start"});
    }, 500);
  }

  /* ---- copy button ---- */
  const copyBtn = document.getElementById("copyBtn");
  if(copyBtn){
    copyBtn.addEventListener("click", () => {
      const urlEl = document.getElementById("urlText");
      const u = urlEl.dataset.fullUrl || urlEl.textContent;
      navigator.clipboard?.writeText(u).catch(()=>{});
      copyBtn.textContent = "copied ✓";
      setTimeout(() => copyBtn.textContent = "copy", 2000);
    });
  }

  /* ---- reset button ---- */
  const resetBtn = document.getElementById("resetBtn");
  if(resetBtn){
    resetBtn.addEventListener("click", () => {
      // Stop any active recording
      if(mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop();
      mediaRecorder = null; audioBlob = null; audioChunks = [];
      if(micStream){ micStream.getTracks().forEach(t => t.stop()); micStream = null; }
      photoFile = null;

      document.getElementById("done").style.display = "none";
      const build = document.getElementById("build");
      build.style.display = "";
      build.classList.remove("gone");
      photoZone.innerHTML = `
        <div class="pz-inner">
          <div class="pz-icon"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M3 7h3l2-3h8l2 3h3v12H3z"/><circle cx="12" cy="13" r="4"/></svg></div>
          <div class="pz-t" data-i18n="photoPrompt">Photograph your craft</div>
          <div class="pz-hint">( jpg · png · heic )</div>
        </div>`;
      photoZone.classList.remove("has");
      voiceBtn.classList.remove("done","rec");
      voiceLive.classList.remove("on","done");
      voiceLive.querySelectorAll(".vb").forEach(b => b.style.height = "");
      timer.textContent = "";
      buildBtn.classList.remove("ready");
      hasPhoto = false; hasAudio = false; recState = "idle"; dc = 0;
      term.innerHTML = ""; tq = []; typing = false;
      document.querySelectorAll("#proc .agent").forEach(a => {
        a.classList.remove("in");
        a.setAttribute("data-status","waiting");
        const s = a.querySelector(".status");
        if(s){ const dict = I18N[window.selectedLanguage] || I18N.en; s.textContent = dict.waiting || "waiting"; }
      });
      const proc = document.getElementById("proc");
      proc.style.display = "none";
      proc.classList.remove("on","gone");
      applyI18n(window.selectedLanguage);
      document.getElementById("hero").scrollIntoView({behavior:"smooth"});
    });
  }

});
