import React, { useEffect, useRef } from "react";

export default function FoodWorksheet() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const markup = `
      <h1>Match the Indian foods to their names</h1>
      <p>Drag each food picture to the correct label. Then click "Check score".</p>
      <button id="check-btn">Check score</button>
      <p id="score"></p>

      <div class="container">
        <div class="images">
          <div class="img-item"><img src="/uploads/dosa.webp" id="img-dosa" draggable="true"></div>
          <div class="img-item"><img src="/uploads/idli.webp" id="img-idli" draggable="true"></div>
          <div class="img-item"><img src="/uploads/poha.webp" id="img-poha" draggable="true"></div>
          <div class="img-item"><img src="/uploads/puri.webp" id="img-puri" draggable="true"></div>
          <div class="img-item"><img src="/uploads/chapati.webp" id="img-chapati" draggable="true"></div>
          <div class="img-item"><img src="/uploads/sambar.webp" id="img-sambar" draggable="true"></div>
          <div class="img-item"><img src="/uploads/rasam.webp" id="img-rasam" draggable="true"></div>
          <div class="img-item"><img src="/uploads/upma.webp" id="img-upma" draggable="true"></div>
          <div class="img-item"><img src="/uploads/vada.webp" id="img-vada" draggable="true"></div>
          <div class="img-item"><img src="/uploads/aloo-paratha.webp" id="img-aloo-paratha" draggable="true"></div>
          <div class="img-item"><img src="/uploads/chole-bhature.webp" id="img-chole-bhature" draggable="true"></div>
          <div class="img-item"><img src="/uploads/biryani.webp" id="img-biryani" draggable="true"></div>
          <div class="img-item"><img src="/uploads/idiyappam.webp" id="img-idiyappam" draggable="true"></div>
          <div class="img-item"><img src="/uploads/pongal.webp" id="img-pongal" draggable="true"></div>
          <div class="img-item"><img src="/uploads/dhokla.webp" id="img-dhokla" draggable="true"></div>
        </div>

        <div class="labels">
          <div id="label-dosa" class="drop-zone">Dosa</div>
          <div id="label-idli" class="drop-zone">Idli</div>
          <div id="label-poha" class="drop-zone">Poha</div>
          <div id="label-puri" class="drop-zone">Puri</div>
          <div id="label-chapati" class="drop-zone">Chapati (Roti)</div>
          <div id="label-sambar" class="drop-zone">Sambar</div>
          <div id="label-rasam" class="drop-zone">Rasam</div>
          <div id="label-upma" class="drop-zone">Upma</div>
          <div id="label-vada" class="drop-zone">Vada</div>
          <div id="label-aloo-paratha" class="drop-zone">Aloo Paratha</div>
          <div id="label-chole-bhature" class="drop-zone">Chole Bhature</div>
          <div id="label-biryani" class="drop-zone">Biryani</div>
          <div id="label-idiyappam" class="drop-zone">Idiyappam</div>
          <div id="label-pongal" class="drop-zone">Pongal</div>
          <div id="label-dhokla" class="drop-zone">Dhokla</div>
        </div>
      </div>
    `;

    const script = `
    (function(){
      const correctMap = {
        "label-dosa":          "img-dosa",
        "label-idli":          "img-idli",
        "label-poha":          "img-poha",
        "label-puri":          "img-puri",
        "label-chapati":       "img-chapati",
        "label-sambar":        "img-sambar",
        "label-rasam":         "img-rasam",
        "label-upma":          "img-upma",
        "label-vada":          "img-vada",
        "label-aloo-paratha":  "img-aloo-paratha",
        "label-chole-bhature": "img-chole-bhature",
        "label-biryani":       "img-biryani",
        "label-idiyappam":     "img-idiyappam",
        "label-pongal":        "img-pongal",
        "label-dhokla":        "img-dhokla"
      };

      const SCROLL_ZONE = 80;
      const SCROLL_SPEED = 15;

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

      function handleAutoScroll(ev) {
        const y = ev.clientY;
        const height = window.innerHeight;
        if (y < SCROLL_ZONE) window.scrollBy(0, -SCROLL_SPEED);
        else if (y > height - SCROLL_ZONE) window.scrollBy(0, SCROLL_SPEED);
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
      if (el) el.innerHTML = '';
    };
  }, []);

  return <div ref={ref} />;
}
