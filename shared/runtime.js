(() => {
  const slides = document.querySelectorAll('.slide');
  const progress = document.getElementById('progress');
  const floatingCta = document.getElementById('floatingCta');

  slides.forEach(() => {
    const dot = document.createElement('span');
    progress.appendChild(dot);
  });
  const dots = progress.querySelectorAll('span');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio > 0.6) {
          slides.forEach((s, i) => {
            const active = s === e.target;
            s.classList.toggle('is-active', active);
            if (active) {
              dots.forEach((d, j) => d.classList.toggle('active', j === i));
              if (!floatingCta) return;
              const hide = i < 2 || s.dataset.hideFloatingCta === 'true';
              floatingCta.classList.toggle('show', !hide);
            }
          });
        }
      });
    },
    { threshold: [0, 0.6, 1] }
  );

  slides.forEach((s) => observer.observe(s));
  setTimeout(() => slides[0].classList.add('is-active'), 100);
})();
