/**
 * DataPromptly - Main JavaScript File
 * Handles all interactive functionality for the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    setCurrentYear();
    
    // Mobile menu functionality
    setupMobileMenu();
    
    // Dropdown menu functionality
    setupDropdowns();
    
    // Tab system functionality
    setupTabs();
    
    // Contact form handling
    setupContactForm();
});

/**
 * Sets the current year in the footer copyright
 */
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Sets up mobile menu toggle functionality
 */
function setupMobileMenu() {
    const toggleButton = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('main-nav');
    
    if (toggleButton && mobileMenu) {
        toggleButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
        });
    }
}

/**
 * Sets up dropdown menus for desktop and mobile
 */
function setupDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const content = dropdown.querySelector('.dropdown-content');
        
        if (window.innerWidth >= 768) {
            // Desktop - hover functionality
            dropdown.addEventListener('mouseenter', () => {
                content.style.opacity = '1';
                content.style.visibility = 'visible';
                content.style.transform = 'translateY(0)';
            });
            
            dropdown.addEventListener('mouseleave', () => {
                content.style.opacity = '0';
                content.style.visibility = 'hidden';
                content.style.transform = 'translateY(10px)';
            });
        } else {
            // Mobile - click functionality
            link.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other open dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                        otherDropdown.classList.remove('active');
                    }
                });
            });
        }
    });
    
    // Close dropdowns when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 768) {
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
}

/**
 * Sets up tab system for prompt examples
 */
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.querySelector(`.tab-content[data-tab="${tabId}"]`).classList.add('active');
        });
    });
}

/**
 * Sets up contact form submission
 */
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-btn');

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            try {
                const formData = new FormData(contactForm);
                const data = new URLSearchParams();

                for (const pair of formData) {
                    data.append(pair[0], pair[1]);
                }

                const scriptUrl = 'https://script.google.com/macros/s/AKfycbyLJ8UhbuPPK_DpKP_PO3LVDmmQ4qOTNuIMPRnFZmbLhDCSPvMgkyblRq3uaSR6nGoTZg/exec';

                const response = await fetch(scriptUrl, {
                    method: 'POST',
                    body: data
                });

                const result = await response.json();

                if (result.status !== 'success') {
                    throw new Error(result.message || 'Server error');
                }

                document.getElementById('successModal').style.display = 'block';
                contactForm.reset();
            } catch (error) {
                console.error('Submission error:', error);
                document.getElementById('errorModal').style.display = 'block';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
    }
}

/**
 * Handles window resize events
 */
window.addEventListener('resize', function() {
    // Re-setup dropdowns when switching between mobile and desktop
    setupDropdowns();
});

// Modal close functionality
document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
    });
});

window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});
window.addEventListener('resize', function() {
    // Re-setup dropdowns when switching between mobile and desktop
    setupDropdowns();
});
// Accordion functionality for Prompt Frameworks
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;

    // Toggle active class on header
    header.classList.toggle('active');

    // Toggle active class on content
    content.classList.toggle('active');

    // Open or collapse the content
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});