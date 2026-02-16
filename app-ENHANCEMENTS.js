// Add this code at the VERY END of app.js file (after all existing code)

// ===================================
// CUSTOM CURSOR WITH RGB TRAIL
// ===================================

// Create cursor elements
function initCustomCursor() {
    if (window.innerWidth <= 768) return; // Skip on mobile
    
    // Create cursor dot
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    // Create cursor outline
    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorOutline);
    
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update dot immediately
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        
        // Create trail particle
        createTrailParticle(mouseX, mouseY);
    });
    
    // Smooth outline follow
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        cursorOutline.style.left = (outlineX - 20) + 'px';
        cursorOutline.style.top = (outlineY - 20) + 'px';
        
        requestAnimationFrame(animateOutline);
    }
    animateOutline();
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });
}

// Create rainbow trail particles
let lastTrailTime = 0;
function createTrailParticle(x, y) {
    const now = Date.now();
    if (now - lastTrailTime < 50) return; // Limit particle creation
    lastTrailTime = now;
    
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    
    // Random RGB color
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    trail.style.background = `rgb(${r}, ${g}, ${b})`;
    
    document.body.appendChild(trail);
    
    // Remove after animation
    setTimeout(() => {
        trail.remove();
    }, 500);
}

// Initialize cursor on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomCursor);
} else {
    initCustomCursor();
}

console.log('✨ Custom RGB cursor initialized!');
