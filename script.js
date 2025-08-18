// Improved typing effect and caret handling for blue-text spans
document.addEventListener('DOMContentLoaded', () => {
    function addTypingEffect(selector, doneClass, typingClass, duration, callback) {
        const el = document.querySelector(selector);
        if (!el) return;
        el.classList.add(typingClass);
        setTimeout(() => {
            el.classList.remove(typingClass);
            el.classList.add(doneClass);
            if (callback) callback();
        }, duration);
    }

    // Start typing the name
    addTypingEffect('.animated-name .blue-text', 'done', 'typing', 2800, () => {
        // After name is done, start typing the role
        addTypingEffect('.animated-role .blue-text', 'done', 'typing', 3600);
    });

    // Section reveal on scroll
    let revealed = false;
    function revealSections() {
        if (!revealed && window.scrollY > window.innerHeight * 0.2) {
            document.body.classList.add('show-all');
            revealed = true;
        }
        if (revealed && window.scrollY <= 10) {
            document.body.classList.remove('show-all');
            revealed = false;
            // Reset typing effect
            document.querySelectorAll('.blue-text').forEach(el => {
                el.classList.remove('done');
            });
            // Restart typing sequence
            addTypingEffect('.animated-name .blue-text', 'done', 'typing', 2800, () => {
                addTypingEffect('.animated-role .blue-text', 'done', 'typing', 3600);
            });
        }
    }
    window.addEventListener('scroll', revealSections, { passive: true });
});

// Dynamic years of experience calculation
document.addEventListener("DOMContentLoaded", function () {
    const joiningDate = new Date(2017, 8, 1); // September 1, 2017 (months are 0-indexed)
    const now = new Date();
    let years = now.getFullYear() - joiningDate.getFullYear();
    const m = now.getMonth() - joiningDate.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < joiningDate.getDate())) {
        years--;
    }
    const yearsElem = document.getElementById('years-experience');
    if (yearsElem) {
        yearsElem.textContent = years;
    }

    // Scroll to top button logic
    const scrollBtn = document.getElementById('scrollToTopBtn');
    window.onscroll = function() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    };
    scrollBtn.onclick = function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
});