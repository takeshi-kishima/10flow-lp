// Main JavaScript functionality
class LandingPage {
  constructor() {
    this.header = document.querySelector('.header');
    this.init();
  }

  init() {
    this.setupScrollEffects();
    this.setupAnimations();
    this.setupCTAButtons();
    this.setupFormHandling();
  }

  // Header scroll effects
  setupScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Add/remove header background based on scroll position
      if (scrollTop > 50) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }
      
      // Hide/show header on scroll (optional enhancement)
      // if (scrollTop > lastScrollTop && scrollTop > 100) {
      //   this.header.style.transform = 'translateY(-100%)';
      // } else {
      //   this.header.style.transform = 'translateY(0)';
      // }
      
      lastScrollTop = scrollTop;
    });
  }

  // Setup intersection observer for animations
  setupAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animationElements = document.querySelectorAll(
      '.feature-card, .product-feature, .pricing-card, .section__header'
    );
    
    animationElements.forEach(el => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });
  }

  // Setup CTA button interactions
  setupCTAButtons() {
    const ctaButtons = document.querySelectorAll('.btn');
    
    ctaButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
          button.style.transform = '';
        }, 150);
        
        // Handle specific CTA actions
        const buttonText = button.textContent.trim();
        
        if (buttonText.includes('資料請求') || buttonText.includes('無料相談')) {
          this.handleContactCTA(event);
        } else if (buttonText.includes('始める') || buttonText.includes('デモ')) {
          this.handleDemoCTA(event);
        } else if (buttonText.includes('選択') || buttonText.includes('お問い合わせ')) {
          this.handlePricingCTA(event);
        }
      });
    });
  }

  // Handle contact CTA
  handleContactCTA(event) {
    event.preventDefault();
    console.log('Contact CTA clicked');
    // Here you would typically open a modal or redirect to a contact form
    alert('資料請求フォームを開きます。\n実際の実装ではモーダルや別ページに遷移します。');
  }

  // Handle demo CTA
  handleDemoCTA(event) {
    event.preventDefault();
    console.log('Demo CTA clicked');
    alert('デモンストレーションを開始します。\n実際の実装ではデモページや動画を表示します。');
  }

  // Handle pricing CTA
  handlePricingCTA(event) {
    event.preventDefault();
    const button = event.target;
    const card = button.closest('.pricing-card');
    const planName = card?.querySelector('.pricing-card__title')?.textContent;
    
    console.log(`Pricing CTA clicked for plan: ${planName}`);
    alert(`${planName}プランの申し込みを開始します。\n実際の実装では申し込みフォームや決済ページに遷移します。`);
  }

  // Setup form handling (if forms are added later)
  setupFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        this.handleFormSubmit(form);
      });
    });
  }

  handleFormSubmit(form) {
    // Basic form validation and submission handling
    const formData = new FormData(form);
    console.log('Form submitted:', Object.fromEntries(formData));
    
    // Show success message
    this.showNotification('送信いたしました。担当者からの連絡をお待ちください。', 'success');
  }

  // Utility function to show notifications
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Add styles for notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: type === 'success' ? '#10b981' : '#3b82f6',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      zIndex: '9999',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease-in-out'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

// Utility functions
class Utils {
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new LandingPage();
});

// Add CSS for animations
const animationStyles = `
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  
  .animate-on-scroll.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .header.scrolled {
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
  }
  
  @media (prefers-reduced-motion: reduce) {
    .animate-on-scroll {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);