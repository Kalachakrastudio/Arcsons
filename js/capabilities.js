/* =========================================================
   ARCSONS — CAPABILITIES PAGE JS
   ========================================================= */

(() => {
  "use strict";


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");


  if (menuToggle && mainNav) {

    const closeMenu = () => {

      mainNav.classList.remove("is-open");

      menuToggle.classList.remove("is-active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

    };


    menuToggle.addEventListener("click", () => {

      const isOpen =
        mainNav.classList.toggle("is-open");

      menuToggle.classList.toggle(
        "is-active",
        isOpen
      );

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    });


    mainNav
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener(
          "click",
          closeMenu
        );

      });


    document.addEventListener(
      "keydown",
      (event) => {

        if (event.key === "Escape") {
          closeMenu();
        }

      }
    );


    window.addEventListener(
      "resize",
      () => {

        if (window.innerWidth > 900) {
          closeMenu();
        }

      }
    );

  }


  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  const currentYear =
    document.getElementById("currentYear");


  if (currentYear) {

    currentYear.textContent =
      new Date().getFullYear();

  }


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries, obs) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "is-visible"
              );

              obs.unobserve(entry.target);

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealElements.forEach((element) => {
      observer.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });

  }


  /* =======================================================
     SMOOTH INTERNAL LINKS
  ======================================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener("click", (event) => {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(targetId);


        if (!target) {
          return;
        }


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      });

    });

})();
