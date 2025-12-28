const colors = [
    "#ff4d6d", 
    "#ff6b6b", 
    "#ffb703", 
    "#8ecae6",
    "#c77dff", 
    "#4ade80"  
];

document.addEventListener("click", (e) => {
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";

        const color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.background = color;

        heart.style.left = e.clientX + "px";
        heart.style.top = e.clientY + "px";

      
        const x = (Math.random() - 0.5) * 120 + "px";
        const y = -Math.random() * 140 + "px";

        heart.style.setProperty("--x", x);
        heart.style.setProperty("--y", y);

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1200);
    }
});
