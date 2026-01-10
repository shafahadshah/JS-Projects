// =======================
// Quote Generator
// =======================
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const newBtn = document.getElementById("newQuoteBtn");

const localQuotes = [
  { content: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
  { content: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { content: "Don’t watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { content: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
];

async function getQuote() {
  quoteEl.textContent = "Loading...";
  authorEl.textContent = "";

  try {
    // Fetch random quote from DummyJSON
    const res = await fetch("https://dummyjson.com/quotes/random");
    if (!res.ok) throw new Error(`API failed: ${res.status}`);

    const data = await res.json();
    quoteEl.textContent = `"${data.quote}"`;
    authorEl.textContent = `— ${data.author || "Unknown"}`;

  } catch (error) {
    console.error("API failed, using local quote:", error);

    const random = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    quoteEl.textContent = `"${random.content}"`;
    authorEl.textContent = `— ${random.author}`;
  }

  // GSAP fade animation
  if (typeof gsap !== "undefined") {
    gsap.fromTo(".quote-box", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" });
  }
}

// Button click
newBtn.addEventListener("click", getQuote);

// Initial quote
getQuote();

// =======================
// THREE.JS Animated Particle Background
// =======================
const canvas = document.getElementById("bg");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({canvas, antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);

// Particles
const particlesCount = 6000;
const positions = new Float32Array(particlesCount * 3);
const colors = new Float32Array(particlesCount * 3);

for(let i=0;i<particlesCount*3;i+=3){
  positions[i] = (Math.random()-0.5)*50;
  positions[i+1] = (Math.random()-0.5)*50;
  positions[i+2] = (Math.random()-0.5)*50;

  colors[i] = Math.random();
  colors[i+1] = Math.random();
  colors[i+2] = Math.random();
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions,3));
geometry.setAttribute("color", new THREE.BufferAttribute(colors,3));

const material = new THREE.PointsMaterial({ size:0.08, vertexColors:true });
const particles = new THREE.Points(geometry, material);
scene.add(particles);

// Animate particles
function animate(){
  requestAnimationFrame(animate);
  particles.rotation.y += 0.002;
  particles.rotation.x += 0.001;

  // subtle color shift
  const colors = geometry.attributes.color.array;
  for(let i=0;i<colors.length;i++){
    colors[i] += 0.001 * (Math.random()-0.5);
    if(colors[i] > 1) colors[i]=0;
    if(colors[i] < 0) colors[i]=1;
  }
  geometry.attributes.color.needsUpdate = true;

  renderer.render(scene,camera);
}
animate();

// Responsive
window.addEventListener("resize",()=>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
