// styles.ts — Injects all CSS into the document programmatically

export function injectStyles(): void {
  const css = `
    :root {
      --red: #ff2020;
      --amber: #ffaa00;
      --blue: #00c8ff;
      --glow-red: rgba(255,32,32,0.6);
      --glow-amber: rgba(255,170,0,0.6);
      --glow-blue: rgba(0,200,255,0.5);
      --bg: #050709;
      --surface: rgba(12,16,26,0.72);
      --border: rgba(255,170,0,0.18);
      --text: #f0f4ff;
      --muted: rgba(200,210,240,0.5);
    }

    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; -webkit-tap-highlight-color:transparent; }

    html { cursor:none; scroll-behavior:smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Rajdhani', sans-serif;
      overflow-x: hidden;
      position: relative;
    }

    /* ─ SCROLLBAR ─ */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #0a0c12; }
    ::-webkit-scrollbar-thumb { background: var(--amber); border-radius: 4px; }

    /* ─ CURSOR ─ */
    #cursor {
      position:fixed; width:12px; height:12px;
      background:var(--amber); border-radius:50%;
      pointer-events:none; z-index:9999;
      transform:translate(-50%,-50%);
      transition:transform .1s,width .2s,height .2s,background .2s;
      mix-blend-mode:difference;
    }
    #cursor-trail {
      position:fixed; width:36px; height:36px;
      border:1.5px solid var(--amber); border-radius:50%;
      pointer-events:none; z-index:9998;
      transform:translate(-50%,-50%);
      opacity:.5;
      transition:left .12s ease,top .12s ease,width .2s,height .2s;
    }
    body:has(a:hover) #cursor,
    body:has(button:hover) #cursor { width:24px; height:24px; background:var(--red); }

    /* ─ CANVAS ─ */
    #starfield { position:fixed; inset:0; z-index:0; pointer-events:none; }

    /* ─ SCANLINES ─ */
    #scanlines {
      position:fixed; inset:0; z-index:1; pointer-events:none;
      background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.04) 2px,rgba(0,0,0,.04) 4px);
      animation:scanMove 8s linear infinite;
    }
    @keyframes scanMove { from{background-position:0 0} to{background-position:0 100vh} }

    /* ─ GRID BG ─ */
    #grid-bg {
      position:fixed; inset:0; z-index:0; pointer-events:none;
      background-image:
        linear-gradient(rgba(255,170,0,.03) 1px,transparent 1px),
        linear-gradient(90deg,rgba(255,170,0,.03) 1px,transparent 1px);
      background-size:60px 60px;
      mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,black,transparent);
    }

    /* ─ ORBS ─ */
    .orb { position:fixed; border-radius:50%; filter:blur(100px); z-index:0; pointer-events:none; will-change:transform; }
    .orb-1 { width:50vw; height:50vw; background:radial-gradient(circle,#ff200066,transparent 70%); top:-15%; left:-15%; animation:orb1 20s infinite alternate ease-in-out; }
    .orb-2 { width:40vw; height:40vw; background:radial-gradient(circle,#ffaa0044,transparent 70%); bottom:-10%; right:-10%; animation:orb2 25s infinite alternate ease-in-out; }
    .orb-3 { width:30vw; height:30vw; background:radial-gradient(circle,#00c8ff33,transparent 70%); top:40%; left:55%; animation:orb3 18s infinite alternate ease-in-out; }
    @keyframes orb1 { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(60px,80px) scale(1.3)} }
    @keyframes orb2 { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(-50px,-60px) scale(1.2)} }
    @keyframes orb3 { 0%{transform:translate(0,0)} 100%{transform:translate(-80px,40px)} }

    /* ─ LOADER ─ */
    #loader {
      position:fixed; inset:0; background:var(--bg); z-index:9999;
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      transition:opacity .6s,visibility .6s;
    }
    #loader.done { opacity:0; visibility:hidden; }
    .loader-logo { font-family:'Syne',sans-serif; font-size:2.5rem; font-weight:800; color:var(--amber); animation:loadPulse 1s ease-in-out infinite alternate; }
    .loader-text { font-family:'JetBrains Mono',monospace; font-size:.8rem; color:var(--amber); letter-spacing:4px; margin-top:20px; animation:loadPulse 1s ease-in-out infinite alternate; }
    .loader-bar-wrap { width:200px; height:2px; background:rgba(255,255,255,.1); border-radius:99px; overflow:hidden; margin-top:10px; }
    .loader-bar { height:100%; background:linear-gradient(90deg,var(--red),var(--amber)); border-radius:99px; animation:loadBar 1.8s ease-in-out forwards; }
    @keyframes loadPulse { to{opacity:.3} }
    @keyframes loadBar { from{width:0} to{width:100%} }

    /* ─ CONTAINER ─ */
    .container { max-width:1100px; margin:0 auto; padding:2rem 1.5rem 4rem; position:relative; z-index:4; }

    /* ─ HERO ─ */
    .hero-section { display:flex; flex-direction:column; align-items:center; padding-top:3rem; margin-bottom:3.5rem; }

    /* AVATAR */
    .avatar-wrapper { position:relative; width:148px; height:148px; margin-bottom:1.5rem; }
    .avatar-spin-ring {
      position:absolute; inset:-8px; border-radius:50%;
      background:conic-gradient(var(--red),var(--amber),var(--blue),var(--red));
      animation:spinRing 3s linear infinite;
    }
    @keyframes spinRing { to{transform:rotate(360deg)} }
    .avatar-spin-ring::before {
      content:''; position:absolute; inset:3px;
      border-radius:50%; background:var(--bg);
    }
    .avatar-spin-ring::after {
      content:''; position:absolute; inset:-4px; border-radius:50%;
      background:conic-gradient(var(--red),var(--amber),var(--blue),var(--red));
      filter:blur(12px); opacity:.7;
      animation:spinRing 3s linear infinite;
    }
    .avatar-inner {
      position:absolute; inset:6px; border-radius:50%; overflow:hidden;
      z-index:2; border:2px solid rgba(0,0,0,.6);
      animation:avatarFloat 4s ease-in-out infinite;
    }
    @keyframes avatarFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    .avatar-inner img { width:100%; height:100%; object-fit:cover; }

    .orbit-dot { position:absolute; inset:-18px; border-radius:50%; animation:orbitDot 3s linear infinite; }
    .orbit-dot::after {
      content:''; position:absolute; width:10px; height:10px; border-radius:50%;
      background:var(--blue); box-shadow:0 0 12px var(--blue),0 0 20px var(--blue);
      top:50%; left:0; transform:translateY(-50%);
    }
    @keyframes orbitDot { to{transform:rotate(360deg)} }

    /* NAME */
    .name-block { text-align:center; position:relative; }
    .name-glow {
      font-family:'Syne',sans-serif; font-size:clamp(2.4rem,7vw,3.8rem); font-weight:800;
      letter-spacing:-1px; position:relative; display:inline-block;
      background:linear-gradient(135deg,#fff 0%,#ffcc44 40%,#ff5555 100%);
      background-clip:text; -webkit-background-clip:text; color:transparent;
      animation:glitch 4s infinite;
    }
    .name-glow::before,.name-glow::after {
      content:attr(data-text); position:absolute; top:0; left:0; width:100%; height:100%;
      background:linear-gradient(135deg,#fff,#ffcc44,#ff5555);
      background-clip:text; -webkit-background-clip:text; color:transparent;
    }
    .name-glow::before { animation:glitch-r 4s infinite; clip-path:polygon(0 30%,100% 30%,100% 50%,0 50%); }
    .name-glow::after  { animation:glitch-b 4s infinite; clip-path:polygon(0 65%,100% 65%,100% 80%,0 80%); }
    @keyframes glitch { 0%,96%,100%{transform:none} 97%{transform:skew(-1deg)} 98%{transform:skew(1deg)} }
    @keyframes glitch-r {
      0%,96%,100%{transform:none;opacity:0}
      97%{transform:translate(3px,-1px);opacity:.8;filter:hue-rotate(60deg)}
      98%{transform:translate(-2px,1px);opacity:.6} 99%{opacity:0}
    }
    @keyframes glitch-b {
      0%,96%,100%{transform:none;opacity:0}
      97%{transform:translate(-3px,1px);opacity:.7;filter:hue-rotate(-60deg)}
      98%{transform:translate(2px,-1px);opacity:.5} 99%{opacity:0}
    }

    /* TYPEWRITER */
    .subtitle-type { font-family:'JetBrains Mono',monospace; font-size:.85rem; color:var(--blue); letter-spacing:2px; margin-top:8px; min-height:1.4em; }
    .cursor-blink { animation:blink 1s step-end infinite; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

    /* VERIFY / TAGLINE */
    .verify-line {
      display:flex; align-items:center; gap:8px;
      background:rgba(0,149,246,.12); padding:5px 18px; border-radius:60px;
      backdrop-filter:blur(6px); margin:12px 0 8px;
      border:1px solid rgba(0,149,246,.2);
    }
    .verify-badge { color:#0095f6; font-size:1rem; filter:drop-shadow(0 0 5px #0095f6); }
    .tagline {
      font-size:.72rem; letter-spacing:2px; color:var(--amber);
      background:rgba(0,0,0,.4); padding:5px 16px; border-radius:30px;
      font-weight:600; backdrop-filter:blur(4px);
      border:1px solid rgba(255,170,0,.15);
    }

    /* STATS */
    .stats-row { display:flex; gap:20px; justify-content:center; margin:2rem 0 1rem; flex-wrap:wrap; }
    .stat-pill {
      background:var(--surface); border:1px solid var(--border); border-radius:60px;
      padding:10px 22px; display:flex; align-items:center; gap:10px;
      backdrop-filter:blur(12px); cursor:default; transition:all .3s;
      animation:fadeSlideUp .6s ease backwards;
    }
    .stat-pill:hover { border-color:var(--amber); box-shadow:0 0 20px rgba(255,170,0,.2); transform:translateY(-2px); }
    .stat-number {
      font-family:'Syne',sans-serif; font-size:1.4rem; font-weight:800;
      background:linear-gradient(135deg,var(--amber),var(--red));
      background-clip:text; -webkit-background-clip:text; color:transparent;
    }
    .stat-label { font-size:.72rem; letter-spacing:1px; color:var(--muted); font-family:'JetBrains Mono',monospace; }

    /* SECTION HEADERS */
    .section-title { display:flex; align-items:center; gap:14px; margin:2.5rem 0 1.4rem; overflow:hidden; }
    .section-title h2 {
      font-family:'JetBrains Mono',monospace; font-size:.95rem; font-weight:600;
      letter-spacing:3px; color:var(--amber); white-space:nowrap; position:relative;
    }
    .section-title h2::before {
      content:''; position:absolute; bottom:-4px; left:0; height:1px; background:var(--amber);
      animation:lineGrow 2s ease-in-out infinite;
    }
    @keyframes lineGrow { 0%,100%{width:0;opacity:0} 50%{width:100%;opacity:1} }
    .section-line { flex:1; height:1px; background:linear-gradient(90deg,rgba(255,170,0,.4),transparent); }
    .section-num { font-family:'JetBrains Mono',monospace; font-size:.65rem; color:var(--red); opacity:.7; }

    /* SKILL GRID */
    .skill-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(120px,1fr)); gap:14px; }
    .skill-card {
      background:var(--surface); border:1px solid var(--border); border-radius:20px;
      padding:18px 10px; text-align:center; cursor:pointer;
      position:relative; overflow:hidden;
      animation:fadeSlideUp .5s ease backwards;
      transition:all .3s cubic-bezier(.34,1.56,.64,1);
      backdrop-filter:blur(10px);
    }
    .skill-card::before {
      content:''; position:absolute; inset:0;
      background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(255,170,0,.15),transparent 60%);
      opacity:0; transition:opacity .3s;
    }
    .skill-card:hover::before { opacity:1; }
    .skill-card:hover { border-color:var(--amber); transform:translateY(-6px) scale(1.04); box-shadow:0 12px 30px rgba(255,170,0,.15),0 0 0 1px rgba(255,170,0,.3); }
    .skill-card:active { transform:scale(.96); }
    .skill-card i { font-size:2rem; color:var(--amber); margin-bottom:10px; display:block; transition:.3s; }
    .skill-card:hover i { color:var(--red); filter:drop-shadow(0 0 8px var(--red)); }
    .skill-card span { font-weight:600; font-size:.75rem; letter-spacing:1px; color:var(--text); }
    .skill-bar-wrap { margin-top:8px; height:3px; background:rgba(255,255,255,.1); border-radius:99px; overflow:hidden; }
    .skill-bar { height:100%; border-radius:99px; background:linear-gradient(90deg,var(--red),var(--amber)); animation:growBar 1s ease backwards; }
    @keyframes growBar { from{width:0} }

    /* PROJECT / SOCIAL CARDS */
    .card-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:18px; }
    .neo-card {
      background:var(--surface); backdrop-filter:blur(14px);
      border:1px solid var(--border); border-radius:24px; padding:1.8rem 1.2rem;
      text-align:center; text-decoration:none; color:var(--text);
      display:flex; flex-direction:column; align-items:center; gap:12px;
      position:relative; overflow:hidden;
      transition:all .35s cubic-bezier(.34,1.56,.64,1);
      animation:fadeSlideUp .6s ease backwards;
    }
    .neo-card::before {
      content:''; position:absolute; inset:0;
      background:linear-gradient(135deg,rgba(255,32,32,.08),rgba(255,170,0,.08));
      opacity:0; transition:.3s;
    }
    .neo-card::after {
      content:''; position:absolute; width:120%; height:120%; top:-10%; left:-10%;
      background:conic-gradient(transparent 0deg,var(--amber) 10deg,transparent 20deg);
      animation:rotateBorder 4s linear infinite;
      opacity:0; transition:opacity .3s;
    }
    @keyframes rotateBorder { to{transform:rotate(360deg)} }
    .neo-card:hover::after { opacity:.4; }
    .neo-card:hover::before { opacity:1; }
    .neo-card:hover { border-color:rgba(255,170,0,.5); transform:translateY(-8px) scale(1.02); box-shadow:0 20px 40px rgba(0,0,0,.4),0 0 30px rgba(255,170,0,.1); }
    .neo-card i { font-size:2.4rem; color:var(--amber); transition:.3s; position:relative; z-index:1; }
    .neo-card:hover i { transform:scale(1.2) rotate(-5deg); filter:drop-shadow(0 0 12px var(--amber)); }
    .neo-card h3 { font-size:1rem; font-weight:700; letter-spacing:1.5px; position:relative; z-index:1; }
    .neo-card .card-sub { font-size:.65rem; opacity:.6; font-family:'JetBrains Mono',monospace; position:relative; z-index:1; }
    .card-badge { position:absolute; top:14px; right:14px; background:var(--red); color:white; font-size:.55rem; font-weight:700; letter-spacing:1px; padding:3px 8px; border-radius:20px; font-family:'JetBrains Mono',monospace; }

    /* CHAT */
    .chat-glass {
      background:rgba(8,12,20,.8); backdrop-filter:blur(20px);
      border:1px solid var(--border); border-radius:28px; overflow:hidden;
      display:flex; flex-direction:column; height:500px;
      box-shadow:0 0 0 1px rgba(255,170,0,.05),inset 0 0 60px rgba(0,0,0,.3);
      position:relative;
    }
    .chat-glass::before {
      content:''; position:absolute; top:0; left:0; right:0; height:2px;
      background:linear-gradient(90deg,transparent,var(--amber),var(--red),var(--blue),transparent);
      animation:chatTopLine 3s linear infinite;
    }
    @keyframes chatTopLine { 0%{background-position:0} 100%{background-position:400%} }
    .chat-header { padding:14px 20px; display:flex; align-items:center; gap:12px; border-bottom:1px solid var(--border); background:rgba(0,0,0,.3); }
    .chat-dot { width:8px; height:8px; border-radius:50%; }
    .d1{background:#ff5f57} .d2{background:#febc2e} .d3{background:#28c840}
    .chat-title { font-family:'JetBrains Mono',monospace; font-size:.8rem; color:var(--amber); margin-left:4px; }
    .chat-status { margin-left:auto; display:flex; align-items:center; gap:6px; font-size:.7rem; color:#28c840; font-family:'JetBrains Mono',monospace; }
    .status-pulse { width:7px; height:7px; background:#28c840; border-radius:50%; animation:statusPulse 1.5s ease-in-out infinite; }
    @keyframes statusPulse { 0%,100%{box-shadow:0 0 0 0 rgba(40,200,64,.6)} 50%{box-shadow:0 0 0 5px rgba(40,200,64,0)} }
    .chat-messages-area { flex:1; padding:18px; overflow-y:auto; display:flex; flex-direction:column; gap:14px; }
    .bubble { max-width:80%; padding:12px 18px; border-radius:20px; font-size:.88rem; line-height:1.5; word-break:break-word; animation:bubblePop .3s cubic-bezier(.34,1.56,.64,1); }
    @keyframes bubblePop { from{transform:scale(.85);opacity:0} to{transform:scale(1);opacity:1} }
    .ai-bubble { background:linear-gradient(135deg,rgba(20,30,50,.9),rgba(12,18,30,.9)); border:1px solid rgba(255,200,100,.2); align-self:flex-start; border-bottom-left-radius:4px; }
    .user-bubble { background:linear-gradient(135deg,#ff4020,#ff2020); align-self:flex-end; border-bottom-right-radius:4px; color:white; font-weight:500; }
    .typing-dots span { display:inline-block; width:6px; height:6px; background:var(--amber); border-radius:50%; margin:0 2px; animation:typingBounce 1s ease-in-out infinite; }
    .typing-dots span:nth-child(2){animation-delay:.15s} .typing-dots span:nth-child(3){animation-delay:.3s}
    @keyframes typingBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
    .chat-input-area { padding:14px 18px; display:flex; gap:12px; align-items:center; border-top:1px solid var(--border); background:rgba(0,0,0,.4); }
    .chat-input-area input { flex:1; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); padding:12px 18px; border-radius:60px; color:var(--text); font-size:.9rem; font-family:'Rajdhani',sans-serif; outline:none; transition:all .2s; }
    .chat-input-area input:focus { background:rgba(255,255,255,.09); border-color:var(--amber); box-shadow:0 0 0 3px rgba(255,170,0,.1); }
    .send-btn { background:linear-gradient(135deg,var(--amber),var(--red)); border:none; width:44px; height:44px; border-radius:50%; color:white; font-size:1rem; cursor:pointer; transition:.2s; box-shadow:0 4px 15px rgba(255,100,0,.4); }
    .send-btn:hover { transform:scale(1.1); box-shadow:0 6px 20px rgba(255,100,0,.6); }
    .send-btn:active { transform:scale(.93); }

    /* MUSIC WIDGET */
    .music-widget {
      position:fixed; bottom:610px; right:20px;
      background:rgba(5,7,12,.9); backdrop-filter:blur(20px);
      padding:10px 20px 10px 14px; border-radius:60px;
      display:flex; align-items:center; gap:12px;
      z-index:100; border:1px solid rgba(255,170,0,.4);
      box-shadow:0 8px 32px rgba(0,0,0,.5); transition:all .3s;
    }
    .music-widget:hover { border-color:var(--amber); box-shadow:0 0 25px rgba(255,170,0,.2); }
    .music-visualizer { display:flex; align-items:flex-end; gap:2px; height:18px; }
    .viz-bar { width:3px; border-radius:99px; background:linear-gradient(180deg,var(--amber),var(--red)); animation:vizAnim .8s ease-in-out infinite alternate; }
    .viz-bar:nth-child(1){height:6px;animation-delay:0s}
    .viz-bar:nth-child(2){height:14px;animation-delay:.1s}
    .viz-bar:nth-child(3){height:10px;animation-delay:.2s}
    .viz-bar:nth-child(4){height:18px;animation-delay:.05s}
    .viz-bar:nth-child(5){height:8px;animation-delay:.15s}
    @keyframes vizAnim { to{transform:scaleY(.3)} }
    .music-widget.paused .viz-bar { animation-play-state:paused; }
    .track-name { font-size:.68rem; font-weight:600; letter-spacing:1.5px; color:#ffdd99; font-family:'JetBrains Mono',monospace; }
    .music-btn { background:none; border:none; color:var(--amber); font-size:1.1rem; cursor:pointer; transition:.2s; padding:2px 4px; }
    .music-btn:hover { color:white; }

    /* HAMBURGER */
    .hamburger { position:fixed; top:20px; left:20px; z-index:200; cursor:pointer; }
    .hamburger span { display:block; width:25px; height:3px; background:white; margin:5px 0; transition:.3s; }
    .menu-panel { position:fixed; top:0; left:-260px; width:250px; height:100%; background:rgba(8,12,20,.95); backdrop-filter:blur(20px); padding:60px 20px; transition:.3s; z-index:199; border-right:1px solid var(--border); }
    .menu-panel.open { left:0; }
    .menu-panel a { display:block; color:var(--text); margin:15px 0; text-decoration:none; font-family:'JetBrains Mono',monospace; font-size:.85rem; letter-spacing:2px; padding:8px 12px; border-radius:8px; transition:.2s; }
    .menu-panel a:hover { background:rgba(255,170,0,.1); color:var(--amber); }

    /* WHATSAPP */
    .whatsapp-btn { position:fixed; bottom:20px; right:20px; background:#25D366; width:55px; height:55px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:26px; z-index:200; text-decoration:none; box-shadow:0 4px 20px rgba(37,211,102,.4); transition:.2s; }
    .whatsapp-btn:hover { transform:scale(1.1); }

    /* SUPPORT */
    .support-btn { position:fixed; bottom:90px; right:20px; background:#0084ff; width:55px; height:55px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-size:22px; cursor:pointer; z-index:200; box-shadow:0 4px 20px rgba(0,132,255,.4); transition:.2s; }
    .support-btn:hover { transform:scale(1.1); }
    .support-box { position:fixed; bottom:160px; right:20px; width:300px; height:380px; background:rgba(8,12,20,.95); backdrop-filter:blur(20px); border:1px solid var(--border); border-radius:15px; display:none; flex-direction:column; overflow:hidden; z-index:200; }
    .support-box.open { display:flex; }
    .support-header { background:#0084ff; padding:10px 14px; color:white; font-weight:bold; font-family:'JetBrains Mono',monospace; font-size:.8rem; }
    .support-messages { flex:1; padding:10px; overflow-y:auto; color:var(--text); display:flex; flex-direction:column; gap:6px; }
    .support-input { display:flex; border-top:1px solid var(--border); }
    .support-input input { flex:1; padding:10px; border:none; outline:none; background:rgba(255,255,255,.06); color:var(--text); font-family:'Rajdhani',sans-serif; }
    .support-input button { background:#0084ff; border:none; color:white; padding:10px 14px; cursor:pointer; transition:.2s; }
    .support-input button:hover { background:#0066cc; }

    /* SCROLL TOP */
    #scrollTop { position:fixed; bottom:20px; left:20px; width:42px; height:42px; border-radius:50%; background:var(--surface); border:1px solid var(--border); color:var(--amber); font-size:1rem; cursor:pointer; display:flex; align-items:center; justify-content:center; z-index:100; opacity:0; pointer-events:none; transition:all .3s; backdrop-filter:blur(10px); }
    #scrollTop.visible { opacity:1; pointer-events:all; }
    #scrollTop:hover { background:var(--amber); color:black; transform:translateY(-3px); }

    /* TOAST */
    .toast { position:fixed; top:20px; left:50%; transform:translateX(-50%) translateY(-80px); background:rgba(255,170,0,.9); color:black; padding:10px 24px; border-radius:60px; font-family:'JetBrains Mono',monospace; font-size:.75rem; font-weight:700; z-index:9999; transition:transform .4s cubic-bezier(.34,1.56,.64,1); pointer-events:none; }
    .toast.show { transform:translateX(-50%) translateY(0); }

    /* REVEAL ANIMATION */
    @keyframes fadeSlideUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
    .reveal { animation:fadeSlideUp .7s ease backwards; }

    footer { text-align:center; opacity:.4; font-size:.7rem; margin-top:4rem; padding-top:1.5rem; border-top:1px solid var(--border); font-family:'JetBrains Mono',monospace; letter-spacing:2px; }

    @media(max-width:640px) {
      .name-glow { font-size:2.2rem; }
      .stats-row { gap:10px; }
      .stat-pill { padding:8px 14px; }
      .music-widget { bottom:160px; }
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
}
