// script.js
const pendulumContainer = document.getElementById('pendulum-container');
const pendulumBob = document.getElementById('pendulum-bob');
const graphContainer = document.getElementById('graph-container');
const graph = document.getElementById('graph');

// Simulation parameters
let L = 1.0; // length of pendulum
let g = 9.8; // acceleration due to gravity
let m = 0.1; // mass of pendulum bob
let theta = 30; // initial angle of displacement

// Simulate simple harmonic motion
function simulate() {
  // Calculate the period of oscillation
  const T = 2 * Math.PI * Math.sqrt(L / g);

  // Update the position of the pendulum bob
  pendulumBob.style.transform = `rotate(${theta}deg)`;

  // Update the graph
  const ctx = graph.getContext('2d');
  ctx.clearRect(0, 0, graph.width, graph.height);
  ctx.beginPath();
  ctx.moveTo(0, graph.height / 2);
  ctx.lineTo(theta * Math.PI / 180, graph.height / 2);
  ctx.stroke();

  // Update the angle of displacement
  theta += 0.1;
  if (theta > 360) {
    theta = 0;
  }
}

// Run the simulation
setInterval(simulate, 16); // 16ms = 60fps