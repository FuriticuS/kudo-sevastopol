let isScrolling = false;
let sections;

document.addEventListener('DOMContentLoaded', function() {
    sections = document.querySelectorAll('.section');

    function scrollToSection(index) {
        if (isScrolling) return;
        isScrolling = true;

        sections[index].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        setTimeout(() => {
            isScrolling = false;
        }, 700);
    }

    document.addEventListener('wheel', function(event) {
        if (isScrolling) return;

        const currentSection = Array.from(sections).findIndex(section => {
            const rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.bottom <= window.innerHeight;
        });

        if (event.deltaY > 0 && currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
        } else if (event.deltaY < 0 && currentSection > 0) {
            scrollToSection(currentSection - 1);
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            const currentSection = Array.from(sections).findIndex(section => {
                const rect = section.getBoundingClientRect();
                return rect.top >= 0 && rect.bottom <= window.innerHeight;
            });

            if (event.key === 'ArrowDown' && currentSection < sections.length - 1) {
                scrollToSection(currentSection + 1);
            } else if (event.key === 'ArrowUp' && currentSection > 0) {
                scrollToSection(currentSection - 1);
            }
        }
    });

    let startY;

    document.addEventListener('touchstart', function(event) {
        startY = event.touches[0].clientY;
    });

    document.addEventListener('touchmove', function(event) {
        if (!startY) return;

        const currentY = event.touches[0].clientY;
        const deltaY = startY - currentY;

        if (Math.abs(deltaY) > 50) {
            const currentSection = Array.from(sections).findIndex(section => {
                const rect = section.getBoundingClientRect();
                return rect.top >= 0 && rect.bottom <= window.innerHeight;
            });

            if (deltaY > 0 && currentSection < sections.length - 1) {
                scrollToSection(currentSection + 1);
            } else if (deltaY < 0 && currentSection > 0) {
                scrollToSection(currentSection - 1);
            }

            startY = null;
        }
    });
});