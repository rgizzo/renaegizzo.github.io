//------------------------------
// INDEXING BAR
//-----------------------------

const bar = document.getElementById("index-bar");
const percent = document.getElementById("index-percent");
const state = document.getElementById("index-state");

if (bar && percent && state) {

  const barLength = 12;
  let progress = 0;

  function updateBar() {
    const filled = "=".repeat(progress);
    const empty = "-".repeat(barLength - progress);

    bar.textContent = `[${filled}${empty}]`;

    const pct = Math.round((progress / barLength) * 100);
    percent.textContent = `${pct}%`;
  }

  function runIndexing() {
    progress = 0;
    state.textContent = "";
    updateBar();

    const failurePoint =
      Math.floor(Math.random() * 4) + 8;

    const timer = setInterval(() => {
      progress++;
      updateBar();

      if (progress >= failurePoint) {
        clearInterval(timer);

        setTimeout(() => {
          state.textContent = "FAILED";
        }, 500);

        setTimeout(() => {
          runIndexing();
        }, 3000);
      }
    }, 350);
  }

  runIndexing();
}

//----------------------
// ROTATING META DATA
//----------------------

const rotatingMeta =
  document.getElementById("rotating-meta");

if (rotatingMeta) {

  const rotatingMeta = document.getElementById("rotating-meta");

  const metadataMessages = [
    `SCENE_ID: Brtlet_2207.... <br>
      acquisition_mode: PolSAR <br>
      pulse_length (micro sec): 40.0 <br>
      bandwidth (Mhz): 80.0 <br>
      timestamp: 21-Jul-2022 17:12:21 UTC`,

    `UTC: 2026-06-16T13:33:29.597Z <br>     
      latitude(deg): 37.375039134 <br>
      longitude(deg): -80.521239308 <br>
      height(m): 1128.5295 <br>
      sdn(m): 6.0757 <br>
      ratio: -8.2517 <br>`,

    `release: RELEASE-2024 <br>
      productCode: DP1.30003.001 <br>
      domainCode: D07 <br>
      siteCode: GRSM <br>
      month: 2021-06`,

    `instrument: PS2 <br>
      item_type: PSScene <br>
      light_haze_percent: 0 <br>
      pixel_resolution: 3 <br>
      provider: planetscope`,

    `satellite_azimuth: 168.6 <br>
      satellite_id: 0e20 <br>
      strip_id: 230723 <br>
      sun_azimuth: 127 <br>
      sun_elevation: 50.1`,

  `-----Base Data Details:----- <br>
    Using reference from base: <br>
    Name: CORS, GUNSTOCKMRNH2008, <br>
    NEW HAMPSHIRE  <br>
    Position: 43°32'35.76000"N, <br>
    71°22'42.81000"W <br>
  `,

  `Rover file: HARV20170813.SSF <br>
    Local time: 8/13/2017 6:56:56 AM  <br>
    100% total coverage <br>
    100% coverage by p77622517109.zip`
  ];

  let metadataIndex = 0;

  function rotateMetadata() {

    // screen cuts out
    rotatingMeta.style.opacity = "0";

    // weak flash
    setTimeout(() => {
      rotatingMeta.style.opacity = "0.2";
    }, 50);

    // cuts out again
    setTimeout(() => {
      rotatingMeta.style.opacity = "0";
    }, 100);

    // second little flash
    setTimeout(() => {
      rotatingMeta.style.opacity = "0.4";
    }, 140);

    // dead again
    setTimeout(() => {
      rotatingMeta.style.opacity = "0";
    }, 180);

    // load next telemetry block
    setTimeout(() => {
      metadataIndex =
        (metadataIndex + 1) % metadataMessages.length;

      rotatingMeta.innerHTML =
        metadataMessages[metadataIndex];

      rotatingMeta.style.opacity = "0.7";
    }, 230);
  }

  setInterval(rotateMetadata, 3000);
}
// -------------------------------
// SATELLITE ORBIT
//---------------------------------

const satellite = document.querySelector(".about-satellite-wrapper");

if (satellite) {

  let currentX = 0;
  let currentY = 0;

  let targetX = 0;
  let targetY = 0;

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function animateSatellite(time) {

    // -------------------------
    // slow autonomous floating
    // -------------------------

    const floatX = Math.sin(time * 0.0005) * 40;
    const floatY = Math.cos(time * 0.0007) * 40;
    const rotation = Math.sin(time * 0.0003) * 10;


    // -------------------------
    // satellite position
    // -------------------------

    const rect = satellite.getBoundingClientRect();

    const satX = rect.left + rect.width / 2;
    const satY = rect.top + rect.height / 2;

    // -------------------------
    // smooth movement
    // -------------------------

    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;


    // -------------------------
    // combine everything
    // -------------------------

    satellite.style.transform = `
      translate(
        ${floatX + currentX}px,
        ${floatY + currentY}px
      )
      rotate(${rotation}deg)
    `;

    requestAnimationFrame(animateSatellite);
  }

  requestAnimationFrame(animateSatellite);
}