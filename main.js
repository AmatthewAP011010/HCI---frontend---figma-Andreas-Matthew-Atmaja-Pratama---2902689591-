// Mobile Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        
        // Animate hamburger to X
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && hamburger && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('show');
    }
});

// Registration Form Validation (5 validations, no regex)
const registrationForm = document.getElementById('registrationForm');

if (registrationForm) {
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset all error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.style.display = 'none';
            error.textContent = '';
        });
        
        let isValid = true;
        
        // Get form values
        const email = document.getElementById('email')?.value || '';
        const name = document.getElementById('name')?.value || '';
        const password = document.getElementById('password')?.value || '';
        const confirmPassword = document.getElementById('confirmPassword')?.value || '';
        const dob = document.getElementById('dob')?.value || '';
        const gender = document.querySelector('input[name="gender"]:checked');
        
        // Validation 1: Email validation (must contain @ and .)
        if (!email) {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!email.includes('@')) {
            showError('emailError', 'Email must contain "@" symbol');
            isValid = false;
        } else if (!email.includes('.')) {
            showError('emailError', 'Email must contain "." symbol');
            isValid = false;
        } else if (email.indexOf('@') === 0) {
            showError('emailError', 'Email must have text before "@"');
            isValid = false;
        } else if (email.indexOf('.') === email.length - 1) {
            showError('emailError', 'Email cannot end with "."');
            isValid = false;
        }
        
        // Validation 2: Name validation (minimum 3 characters, only letters and spaces)
        if (!name) {
            showError('nameError', 'Full name is required');
            isValid = false;
        } else if (name.length < 3) {
            showError('nameError', 'Name must be at least 3 characters long');
            isValid = false;
        } else {
            let validName = true;
            for (let i = 0; i < name.length; i++) {
                const char = name[i];
                if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || char === ' ')) {
                    validName = false;
                    break;
                }
            }
            if (!validName) {
                showError('nameError', 'Name can only contain letters and spaces');
                isValid = false;
            }
        }
        
        // Validation 3: Password validation (minimum 6 characters)
        if (!password) {
            showError('passwordError', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError('passwordError', 'Password must be at least 6 characters long');
            isValid = false;
        }
        
        // Validation 4: Confirm password validation (must match password)
        if (!confirmPassword) {
            showError('confirmPasswordError', 'Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            showError('confirmPasswordError', 'Passwords do not match');
            isValid = false;
        }
        
        // Validation 5: Date of Birth validation (must be at least 13 years old)
        if (!dob) {
            showError('dobError', 'Date of birth is required');
            isValid = false;
        } else {
            const birthDate = new Date(dob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            if (age < 13) {
                showError('dobError', 'You must be at least 13 years old to register');
                isValid = false;
            } else if (age > 120) {
                showError('dobError', 'Please enter a valid date of birth');
                isValid = false;
            }
        }
        
        // Validation 6: Gender validation (must be selected)
        if (!gender) {
            showError('genderError', 'Please select your gender');
            isValid = false;
        }
        
        // If all validations pass
        if (isValid) {
            const successMessage = document.getElementById('formSuccess');
            if (successMessage) {
                successMessage.style.display = 'block';
                registrationForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
            
            // Optional: Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
}

// Helper function to show error messages
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Real-time validation for better UX
const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const email = this.value;
        if (email && (!email.includes('@') || !email.includes('.'))) {
            showError('emailError', 'Please enter a valid email address with @ and .');
        } else {
            const errorElement = document.getElementById('emailError');
            if (errorElement) errorElement.style.display = 'none';
        }
    });
}

if (nameInput) {
    nameInput.addEventListener('blur', function() {
        const name = this.value;
        if (name && name.length < 3) {
            showError('nameError', 'Name must be at least 3 characters');
        } else {
            const errorElement = document.getElementById('nameError');
            if (errorElement) errorElement.style.display = 'none';
        }
    });
}

if (confirmPasswordInput && passwordInput) {
    confirmPasswordInput.addEventListener('input', function() {
        if (this.value && this.value !== passwordInput.value) {
            showError('confirmPasswordError', 'Passwords do not match');
        } else {
            const errorElement = document.getElementById('confirmPasswordError');
            if (errorElement) errorElement.style.display = 'none';
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Add loading animation for images
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
});

// Sticky header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(139, 69, 19, 0.98)';
            header.style.padding = '0.8rem 5%';
        } else {
            header.style.background = 'rgba(139, 69, 19, 0.95)';
            header.style.padding = '1rem 5%';
        }
    }
});

// Add to cart animation (for demo purposes)
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('click', function(e) {
        if (!e.target.closest('.btn')) {
            const productName = this.querySelector('h3')?.textContent;
            if (productName) {
                // Create temporary notification
                const notification = document.createElement('div');
                notification.textContent = `✨ ${productName} added to cart! ✨`;
                notification.style.position = 'fixed';
                notification.style.bottom = '20px';
                notification.style.right = '20px';
                notification.style.backgroundColor = '#27ae60';
                notification.style.color = 'white';
                notification.style.padding = '12px 20px';
                notification.style.borderRadius = '10px';
                notification.style.zIndex = '1000';
                notification.style.fontWeight = '500';
                notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
                notification.style.animation = 'fadeInUp 0.3s ease';
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.opacity = '0';
                    setTimeout(() => notification.remove(), 300);
                }, 2000);
            }
        }
    });
});