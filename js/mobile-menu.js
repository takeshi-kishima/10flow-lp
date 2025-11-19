// Mobile Menu functionality
class MobileMenu {
  constructor() {
    this.menuToggle = document.getElementById('mobileMenuToggle');
    this.nav = document.getElementById('nav');
    this.navList = this.nav?.querySelector('.nav__list');
    this.isOpen = false;
    
    this.init();
  }

  init() {
    if (this.menuToggle && this.navList) {
      this.menuToggle.addEventListener('click', this.toggleMenu.bind(this));
      
      // Close menu when clicking on nav links
      const navLinks = this.navList.querySelectorAll('.nav__link');
      navLinks.forEach(link => {
        link.addEventListener('click', this.closeMenu.bind(this));
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', this.handleOutsideClick.bind(this));
      
      // Close menu on escape key
      document.addEventListener('keydown', this.handleEscapeKey.bind(this));
      
      // Handle window resize
      window.addEventListener('resize', this.handleResize.bind(this));
    }
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.updateMenuState();
  }

  openMenu() {
    this.isOpen = true;
    this.updateMenuState();
  }

  closeMenu() {
    this.isOpen = false;
    this.updateMenuState();
  }

  updateMenuState() {
    if (this.isOpen) {
      this.menuToggle.classList.add('active');
      this.navList.classList.add('active');
      this.menuToggle.setAttribute('aria-label', 'メニューを閉じる');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      this.menuToggle.classList.remove('active');
      this.navList.classList.remove('active');
      this.menuToggle.setAttribute('aria-label', 'メニューを開く');
      
      // Restore body scroll
      document.body.style.overflow = '';
    }
  }

  handleOutsideClick(event) {
    if (this.isOpen && !this.nav.contains(event.target)) {
      this.closeMenu();
    }
  }

  handleEscapeKey(event) {
    if (event.key === 'Escape' && this.isOpen) {
      this.closeMenu();
    }
  }

  handleResize() {
    // Close mobile menu on desktop
    if (window.innerWidth >= 768 && this.isOpen) {
      this.closeMenu();
    }
  }
}

// Initialize mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MobileMenu();
});