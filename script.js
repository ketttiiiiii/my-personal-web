window.tailwind = window.tailwind || {};
window.tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "surface-bright": "#f7f9fb",
                "on-background": "#191c1e",
                "on-secondary-fixed": "#00201d",
                "on-tertiary-container": "#7073ff",
                "on-primary-fixed": "#131b2e",
                "surface-container-low": "#f2f4f6",
                "secondary-fixed": "#89f5e7",
                "secondary-container": "#86f2e4",
                "surface-dim": "#d8dadc",
                "secondary-fixed-dim": "#6bd8cb",
                "tertiary": "#000000",
                "surface-variant": "#e0e3e5",
                "on-surface": "#191c1e",
                "background": "#f7f9fb",
                "on-secondary-fixed-variant": "#005049",
                "on-secondary": "#ffffff",
                "surface-container": "#eceef0",
                "tertiary-fixed-dim": "#c0c1ff",
                "inverse-on-surface": "#eff1f3",
                "surface": "#f7f9fb",
                "outline-variant": "#c6c6cd",
                "on-secondary-container": "#006f66",
                "on-surface-variant": "#45464d",
                "on-tertiary-fixed": "#07006c",
                "outline": "#76777d",
                "on-tertiary-fixed-variant": "#2f2ebe",
                "tertiary-fixed": "#e1e0ff",
                "secondary": "#006a61",
                "primary-container": "#131b2e",
                "surface-tint": "#565e74",
                "primary": "#000000",
                "on-tertiary": "#ffffff",
                "on-primary": "#ffffff",
                "inverse-primary": "#bec6e0",
                "error": "#ba1a1a",
                "primary-fixed-dim": "#bec6e0",
                "on-primary-fixed-variant": "#3f465c",
                "surface-container-high": "#e6e8ea",
                "inverse-surface": "#2d3133",
                "on-error": "#ffffff",
                "on-error-container": "#93000a",
                "error-container": "#ffdad6",
                "surface-container-highest": "#e0e3e5",
                "on-primary-container": "#7c839b",
                "tertiary-container": "#07006c",
                "surface-container-lowest": "#ffffff",
                "primary-fixed": "#dae2fd"
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                lg: "0.5rem",
                xl: "0.75rem",
                full: "9999px"
            },
            spacing: {
                "stack-sm": "8px",
                "section-gap": "120px",
                gutter: "24px",
                "stack-md": "16px",
                "container-max": "1200px",
                "stack-lg": "32px"
            },
            fontFamily: {
                "body-lg": ["Inter"],
                "display-hero": ["Hanken Grotesk"],
                "body-md": ["Inter"],
                "headline-md": ["Hanken Grotesk"],
                "headline-lg": ["Hanken Grotesk"],
                "label-mono": ["JetBrains Mono"],
                "display-hero-mobile": ["Hanken Grotesk"]
            },
            fontSize: {
                "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
                "display-hero": ["64px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
                "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
                "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
                "headline-lg": ["32px", { lineHeight: "40px", fontWeight: "700" }],
                "label-mono": ["14px", { lineHeight: "20px", letterSpacing: "0.05em", fontWeight: "500" }],
                "display-hero-mobile": ["40px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "800" }]
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuButton || !mobileMenu) return;

    const toggleMenu = () => {
        const isOpen = mobileMenu.classList.toggle('hidden') === false;
        menuButton.setAttribute('aria-expanded', String(isOpen));
        menuButton.innerHTML = isOpen
            ? '<span class="material-symbols-outlined">close</span>'
            : '<span class="material-symbols-outlined">menu</span>';
    };

    menuButton.addEventListener('click', toggleMenu);

    mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.innerHTML = '<span class="material-symbols-outlined">menu</span>';
        });
    });
});
