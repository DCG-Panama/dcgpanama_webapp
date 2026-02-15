/* ============================================
   DCG PANAMA — MANIFESTO JS
   Retro TV scroll & power on effect
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const scroller = document.querySelector('.manifesto-scroller');
  const container = document.querySelector('.manifesto-content');
  const toggleBtn = document.querySelector('.toggle-btn');
  const led = document.querySelector('.tv-led');
  const tvScreen = document.querySelector('.tv-screen-wrapper');
  let isPaused = false;

  // Power on effect
  if (tvScreen) {
    tvScreen.classList.add('tv-power-on');
  }

  // --- Create dynamic scroll animation based on actual content height ---
  function initScroll() {
    if (!scroller || !container) return;

    const contentHeight = scroller.scrollHeight;
    const containerHeight = container.clientHeight;

    // Speed: ~40px per second for comfortable reading
    const duration = (contentHeight + containerHeight) / 65;

    // Create a dynamic keyframe animation
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes scrollManifesto {
        0% {
          transform: translateY(${containerHeight}px);
        }
        100% {
          transform: translateY(-${contentHeight}px);
        }
      }
    `;
    document.head.appendChild(styleEl);

    // Apply the animation
    scroller.style.animation = `scrollManifesto ${duration}s linear infinite`;
  }

  // Small delay to ensure fonts are loaded and layout is stable
  setTimeout(initScroll, 300);

  // Toggle scroll/pause
  if (toggleBtn && scroller) {
    toggleBtn.addEventListener('click', () => {
      isPaused = !isPaused;

      if (isPaused) {
        scroller.classList.add('paused');
        toggleBtn.textContent = '\u25B6 Resume';
        toggleBtn.classList.add('active');
        if (led) led.classList.add('off');

        // Allow manual scroll when paused
        container.style.overflowY = 'auto';
      } else {
        scroller.classList.remove('paused');
        toggleBtn.textContent = '\u23F8 Pause';
        toggleBtn.classList.remove('active');
        if (led) led.classList.remove('off');

        container.style.overflowY = 'hidden';
      }
    });
  }

  // Knob hover effect (decorative)
  document.querySelectorAll('.tv-knob').forEach(knob => {
    let rotation = 0;
    knob.addEventListener('click', () => {
      rotation += 30;
      knob.style.transform = `rotate(${rotation}deg)`;
    });
  });
});