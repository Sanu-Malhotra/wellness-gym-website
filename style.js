/* =========================================
   WELLNESS GYM
   COMPLETE JAVASCRIPT
========================================= */


/* =========================================
   1. ELEMENT SELECTION
========================================= */

const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const header = document.querySelector(".header");


/* =========================================
   2. MOBILE NAVIGATION
========================================= */

if (menuToggle && navLinks) {

    // Open and close mobile menu
    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

    });


    // Close menu after clicking navigation link
    const navigationLinks = navLinks.querySelectorAll("a");

    navigationLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

        });

    });


    // Close menu with Escape key
    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

        }

    });


    // Close menu when clicking outside
    document.addEventListener("click", (event) => {

        const clickedInsideMenu = navLinks.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedToggle &&
            navLinks.classList.contains("active")
        ) {

            navLinks.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

        }

    });

}


/* =========================================
   3. HEADER SCROLL EFFECT
========================================= */

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}


/* =========================================
   4. MEMBERSHIP PLAN SELECTION
========================================= */

const planButtons = document.querySelectorAll(".plan-button");
const planSelect = document.querySelector("#plan");

planButtons.forEach(button => {

    button.addEventListener("click", () => {

        const membershipCard = button.closest(".membership-card");

        if (!membershipCard || !planSelect) return;

        const planHeading = membershipCard.querySelector("h3");

        if (!planHeading) return;

        const selectedPlan = planHeading.textContent.trim().toUpperCase();

        const availableOption = Array.from(planSelect.options).find(
            option => option.value.toUpperCase() === selectedPlan
        );

        if (availableOption) {

            planSelect.value = availableOption.value;

        }

    });

});


/* =========================================
   5. CONTACT FORM - FORMSPREE
========================================= */

// IMPORTANT:
// Replace YOUR_FORM_ID with your actual Formspree ID.

const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        // Check form validation
        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            return;

        }

        // Check whether Formspree ID has been added
        if (FORM_ENDPOINT.includes("YOUR_FORM_ID")) {

            if (formMessage) {

                formMessage.textContent =
                    "Contact form setup is pending. Please configure Formspree.";

                formMessage.style.color = "#ff5a1f";

            }

            return;

        }


        const submitButton = contactForm.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        const originalButtonText = submitButton
            ? submitButton.textContent
            : "";


        // Disable button while sending
        if (submitButton) {

            submitButton.disabled = true;
            submitButton.textContent = "SENDING...";

        }

        if (formMessage) {

            formMessage.textContent = "Sending your enquiry...";
            formMessage.style.color = "#ffffff";

        }


        try {

            const formData = new FormData(contactForm);

            const response = await fetch(FORM_ENDPOINT, {

                method: "POST",

                body: formData,

                headers: {
                    "Accept": "application/json"
                }

            });


            if (response.ok) {

                if (formMessage) {

                    formMessage.textContent =
                        "Thank you! Your enquiry has been sent successfully.";

                    formMessage.style.color = "#28c76f";

                }

                // Clear form after successful submission
                contactForm.reset();

            } else {

                throw new Error("Form submission failed.");

            }


        } catch (error) {

            console.error("Contact Form Error:", error);

            if (formMessage) {

                formMessage.textContent =
                    "Something went wrong. Please try again later.";

                formMessage.style.color = "#ff5a1f";

            }

        } finally {

            // Enable button again
            if (submitButton) {

                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;

            }

        }

    });

}


/* =========================================
   6. CURRENT YEAR IN FOOTER
========================================= */

const currentYear = document.querySelector(".current-year");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* =========================================
   7. SMOOTH SCROLLING
========================================= */

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach(link => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {

            event.preventDefault();

            targetElement.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    });

});


/* =========================================
   8. GALLERY IMAGE CHECK
========================================= */

const galleryImages = document.querySelectorAll(".gallery-item img");

galleryImages.forEach(image => {

    image.addEventListener("error", () => {

        console.error("Gallery image not found:", image.src);

    });

});


/* =========================================
   9. HERO VIDEO CHECK
========================================= */

const heroVideo = document.querySelector(".hero-video");

if (heroVideo) {

    heroVideo.muted = true;

    const playVideo = heroVideo.play();

    if (playVideo !== undefined) {

        playVideo.catch(error => {

            console.log("Hero video autoplay was blocked:", error);

        });

    }

}


/* =========================================
   10. WEBSITE READY
========================================= */

console.log("WELLNESS GYM WEBSITE INITIALIZED");