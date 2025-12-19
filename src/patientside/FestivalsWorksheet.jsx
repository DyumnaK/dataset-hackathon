import React, { useEffect, useRef } from "react";

export default function FestivalsWorksheet() {
  const ref = useRef(null);

  // markup and script are created inside useEffect to avoid stale dependency warnings

  const script = `
  (function(){
    const correctMap = {
      "label-diwali":           "img-diwali",
      "label-holi":             "img-holi",
      "label-pongal":           "img-pongal",
      "label-eid":              "img-eid",
      "label-christmas":        "img-christmas",
      "label-navratri":         "img-navratri",
      "label-durga-puja":       "img-durga-puja",
      "label-ganesh-chaturthi": "img-ganesh-chaturthi",
      "label-onam":             "img-onam",
      "label-raksha-bandhan":   "img-raksha-bandhan",
    };

    function allowDrop(ev) {
      ev.preventDefault();
      handleAutoScroll(ev);
    }

    function drag(ev) {
      ev.dataTransfer.setData("text/plain", ev.target.id);
    }

    function drop(ev) {
      ev.preventDefault();
      const imgId = ev.dataTransfer.getData("text/plain");
      const label = ev.currentTarget;

      label.innerHTML = label.getAttribute("data-label") || label.textContent.trim();
      label.setAttribute("data-label", label.textContent.trim());
      const img = document.getElementById(imgId);
      label.appendChild(document.createTextNode(" "));
      label.appendChild(img);

      if (correctMap[label.id] === imgId) {
        label.classList.add("correct");
        label.classList.remove("wrong");
      } else {
        label.classList.add("wrong");
        label.classList.remove("correct");
      }
    }

    function checkScore() {
      let score = 0;
      const total = Object.keys(correctMap).length;
      for (const [labelId, imgId] of Object.entries(correctMap)) {
        const label = document.getElementById(labelId);
        const placedImg = label.querySelector("img");
        if (placedImg && placedImg.id === imgId) score++;
      }
      document.getElementById("score").textContent = 'Score: ' + score + ' / ' + total;
    }

    const SCROLL_ZONE = 80;
    const SCROLL_SPEED = 15;

    function handleAutoScroll(ev) {
      const y = ev.clientY;
      const height = window.innerHeight;

      if (y < SCROLL_ZONE) {
        window.scrollBy(0, -SCROLL_SPEED);
      } else if (y > height - SCROLL_ZONE) {
        window.scrollBy(0, SCROLL_SPEED);
      }
    }

    (function attach() {
      const imgs = Array.from(document.querySelectorAll('.images img'));
      imgs.forEach(img => img.addEventListener('dragstart', drag));

      const zones = Array.from(document.querySelectorAll('.drop-zone'));
      zones.forEach(z => {
        z.addEventListener('dragover', allowDrop);
        z.addEventListener('drop', drop);
      });

      const btn = document.getElementById('check-btn');
      if (btn) btn.addEventListener('click', checkScore);
    })();
  })();
  `;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const markup = `
      <h1>Match the Indian festivals to their names</h1>
      <p>Drag each picture to the correct festival name. Scroll will move automatically when you reach the top or bottom.</p>

      <button id="check-btn">Check score</button>
      <p id="score"></p>

      <div class="container">
        <div class="images">
          <div class="img-item"><img src="/uploads/diwali.webp"           id="img-diwali"           draggable="true"></div>
          <div class="img-item"><img src="/uploads/holi.webp"             id="img-holi"             draggable="true"></div>
          <div class="img-item"><img src="/uploads/pongal_f.webp"           id="img-pongal"           draggable="true"></div>
          <div class="img-item"><img src="/uploads/eid.webp"              id="img-eid"              draggable="true"></div>
          <div class="img-item"><img src="/uploads/christmas.webp"        id="img-christmas"        draggable="true"></div>
          <div class="img-item"><img src="/uploads/navratri.webp"         id="img-navratri"         draggable="true"></div>
          <div class="img-item"><img src="/uploads/durga-puja.webp"       id="img-durga-puja"       draggable="true"></div>
          <div class="img-item"><img src="/uploads/ganesh-chaturthi.webp" id="img-ganesh-chaturthi" draggable="true"></div>
          <div class="img-item"><img src="/uploads/onam.webp"             id="img-onam"             draggable="true"></div>
          <div class="img-item"><img src="/uploads/raksha-bandan.webp"   id="img-raksha-bandhan"   draggable="true"></div>
        </div>

        <div class="labels">
          <div id="label-diwali"           class="drop-zone">Diwali</div>
          <div id="label-holi"             class="drop-zone">Holi</div>
          <div id="label-pongal"           class="drop-zone">Pongal</div>
          <div id="label-eid"              class="drop-zone">Eid</div>
          <div id="label-christmas"        class="drop-zone">Christmas</div>
          <div id="label-navratri"         class="drop-zone">Navratri</div>
          <div id="label-durga-puja"       class="drop-zone">Durga Puja</div>
          <div id="label-ganesh-chaturthi" class="drop-zone">Ganesh Chaturthi</div>
          <div id="label-onam"             class="drop-zone">Onam</div>
          <div id="label-raksha-bandhan"   class="drop-zone">Raksha Bandhan</div>
        </div>
      </div>
    `;

    const script = `
      const correctMap = {
        "label-diwali":           "img-diwali",
        "label-holi":             "img-holi",
        "label-pongal":           "img-pongal",
        "label-eid":              "img-eid",
        "label-christmas":        "img-christmas",
        "label-navratri":         "img-navratri",
        "label-durga-puja":       "img-durga-puja",
        "label-ganesh-chaturthi": "img-ganesh-chaturthi",
        "label-onam":             "img-onam",
        "label-raksha-bandhan":   "img-raksha-bandhan",
      };

      function allowDrop(ev) {
        ev.preventDefault();
        handleAutoScroll(ev);
      }

      function drag(ev) {
        ev.dataTransfer.setData("text/plain", ev.target.id);
      }

      function drop(ev) {
        ev.preventDefault();
        const imgId = ev.dataTransfer.getData("text/plain");
        const label = ev.currentTarget;

        label.innerHTML = label.getAttribute("data-label") || label.textContent.trim();
        label.setAttribute("data-label", label.textContent.trim());
        const img = document.getElementById(imgId);
        label.appendChild(document.createTextNode(" "));
        label.appendChild(img);

        if (correctMap[label.id] === imgId) {
          label.classList.add("correct");
          label.classList.remove("wrong");
        } else {
          label.classList.add("wrong");
          label.classList.remove("correct");
        }
      }

      function checkScore() {
        let score = 0;
        const total = Object.keys(correctMap).length;
        for (const [labelId, imgId] of Object.entries(correctMap)) {
          const label = document.getElementById(labelId);
          const placedImg = label.querySelector("img");
          if (placedImg && placedImg.id === imgId) score++;
        }
        document.getElementById("score").textContent = 'Score: ' + score + ' / ' + total;
      }

      const SCROLL_ZONE = 80;
      const SCROLL_SPEED = 15;

      function handleAutoScroll(ev) {
        const y = ev.clientY;
        const height = window.innerHeight;

        if (y < SCROLL_ZONE) {
          window.scrollBy(0, -SCROLL_SPEED);
        } else if (y > height - SCROLL_ZONE) {
          window.scrollBy(0, SCROLL_SPEED);
        }
      }

      (function attach() {
        const imgs = Array.from(document.querySelectorAll('.images img'));
        imgs.forEach(img => img.addEventListener('dragstart', drag));

        const zones = Array.from(document.querySelectorAll('.drop-zone'));
        zones.forEach(z => {
          z.addEventListener('dragover', allowDrop);
          z.addEventListener('drop', drop);
        });

        const btn = document.getElementById('check-btn');
        if (btn) btn.addEventListener('click', checkScore);
      })();
    `;

    el.innerHTML = `
      <style>
        body { font-family: sans-serif; padding: 20px; }
        .container { display: flex; gap: 40px; }
        .images, .labels { width: 50%; }
        .img-item { margin: 8px 0; }
        img { width: 80px; height: 80px; object-fit: cover; border: 1px solid #ccc; }
        .drop-zone { border: 2px dashed #aaa; padding: 8px; margin: 8px 0; min-height: 40px; }
        .correct { border-color: green; background: #e6ffe6; }
        .wrong   { border-color: red;   background: #ffe6e6; }
      </style>
    ` + markup;

    const s = document.createElement("script");
    s.type = "text/javascript";
    s.textContent = script;
    el.appendChild(s);

    return () => {
      // cleanup injected HTML and script to avoid duplicate handlers on hot reload
      if (el) el.innerHTML = '';
    };
  }, []);

  return <div ref={ref} />;
}
