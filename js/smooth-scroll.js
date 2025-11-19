// Smooth Scroll functionality
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    // Add smooth scroll to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', this.handleAnchorClick.bind(this));
    });
  }

  handleAnchorClick(event) {
    event.preventDefault();
    
    const targetId = event.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
}

// Initialize smooth scroll when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SmoothScroll();
});