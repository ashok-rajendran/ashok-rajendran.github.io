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