(() => {
  "use strict";

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const currentYear = document.getElementById("currentYear");


  /* =====================================================
     CURRENT YEAR
  ===================================================== */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =====================================================
     MOBILE NAVIGATION
  ===================================================== */

  if (menuToggle && mainNav) {

    const closeMenu = () => {

      mainNav.classList.remove("open");

      menuToggle.classList.remove("active");

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        "Open navigation"
      );
    };


    menuToggle.addEventListener("click", () => {

      const isOpen =
        mainNav.classList.toggle("open");

      menuToggle.classList.toggle(
        "active",
        isOpen
      );

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation"
          : "Open navigation"
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


  /* =====================================================
     REVEAL ANIMATION
  ===================================================== */

  const revealItems =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12
        }
      );


    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });

  } else {

    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });

  }


  /* =====================================================
     EQUIPMENT INDEX SMOOTH SCROLL
  ===================================================== */

  document
    .querySelectorAll(".machinery-index-links a")
    .forEach((link) => {

      link.addEventListener("click", (event) => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          !targetId.startsWith("#")
        ) {
          return;
        }


        const target =
          document.querySelector(targetId);

        if (!target) {
          return;
        }


        event.preventDefault();


        const header =
          document.querySelector(".site-header");

        const headerHeight =
          header
            ? header.offsetHeight
            : 0;


        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          25;


        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });

      });

    });

})();
