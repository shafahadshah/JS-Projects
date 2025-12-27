const trailCount = 12;
const trails = [];
let mouseX = 0, mouseY = 0;

for (let i = 0; i < trailCount; i++) {
    const t = document.createElement("div");
    t.className = "trail";
    document.body.appendChild(t);
    trails.push({ el: t, x: 0, y: 0 });
}

document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
function animateTrail() {
    let x = mouseX;
    let y = mouseY;
    trails.forEach((t, i) => {
        t.x += (x - t.x) * 0.35;
        t.y += (y - t.y) * 0.35;
        t.el.style.transform =
            `translate(${t.x}px, ${t.y}px) scale(${1 - i / trailCount})`;
        x = t.x;
        y = t.y;
    });
    requestAnimationFrame(animateTrail);
}
animateTrail();
document.addEventListener("click", e => {
    for (let i = 0; i < 4; i++) {
        const b = document.createElement("div");
        b.className = "bubble";
        b.style.left = e.clientX + "px";
        b.style.top = e.clientY + "px";
        b.style.animationDelay = `${i * 0.12}s`;

        document.body.appendChild(b);
        setTimeout(() => b.remove(), 1500);
    }
});
