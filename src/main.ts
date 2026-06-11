import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("#app not found");
}

app.innerHTML = `
  <main class="shell">
    <section class="hero">
      <p class="eyebrow">Tauri Game Starter</p>
      <h1>chat-de-choco-tto</h1>
      <p class="lead">
        このフォルダは Tauri プロジェクトになりました。ここからゲーム画面を育てていけます。
      </p>
    </section>
    <section class="playfield">
      <div class="panel">
        <div class="panel-label">Canvas Placeholder</div>
        <canvas id="game" width="960" height="540"></canvas>
      </div>
    </section>
  </main>
`;

const canvas = document.querySelector<HTMLCanvasElement>("#game");

if (!canvas) {
  throw new Error("#game not found");
}

const context = canvas.getContext("2d");

if (!context) {
  throw new Error("2d context not supported");
}

let frame = 0;

const render = () => {
  frame += 1;

  context.clearRect(0, 0, canvas.width, canvas.height);

  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#2a5b4b");
  gradient.addColorStop(1, "#12202f");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const wave = Math.sin(frame / 30) * 60;
  context.fillStyle = "#f5df8f";
  context.beginPath();
  context.arc(canvas.width / 2 + wave, canvas.height / 2, 56, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "#fff8dc";
  context.font = "700 34px sans-serif";
  context.textAlign = "center";
  context.fillText("Game Start Point", canvas.width / 2, 80);

  context.font = "500 20px sans-serif";
  context.fillText("src/main.ts から自由に差し替えできます", canvas.width / 2, canvas.height - 48);

  requestAnimationFrame(render);
};

render();
