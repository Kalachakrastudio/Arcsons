/* ============================================================
   ARCSONS — MACHINERY PAGE JS
   ============================================================ */


document.addEventListener("DOMContentLoaded", () => {


  /* ==========================================================
     MOBILE NAVIGATION
  ========================================================== */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");


  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";


      menuToggle.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );


      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Open navigation"
          : "Close navigation"
      );


      mainNav.classList.toggle(
        "nav-open",
        !isOpen
      );

    });


    /* Close menu after clicking a link */

    mainNav
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener("click", () => {

          menuToggle.setAttribute(
            "aria-expanded",
            "false"
          );

          menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
          );

          mainNav.classList.remove(
            "nav-open"
          );

        });

      });

  }



  /* ==========================================================
     CURRENT YEAR
  ========================================================== */

  const currentYear =
    document.getElementById("currentYear");


  if (currentYear) {

    currentYear.textContent =
      new Date().getFullYear();

  }



  /* ==========================================================
     SCROLL REVEAL
  ========================================================== */

  const revealElements =
    document.querySelectorAll(".reveal");


  if (
    "IntersectionObserver" in window &&
    revealElements.length
  ) {

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
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );


    revealElements.forEach((element) => {

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach((element) => {

      element.classList.add(
        "is-visible"
      );

    });

  }



  /* ==========================================================
     SMOOTH ANCHOR SCROLL
  ========================================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

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


          const header =
            document.querySelector(
              ".site-header"
            );


          const headerHeight =
            header
              ? header.offsetHeight
              : 0;


          const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            20;


          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });

        }
      );

    });



  /* ==========================================================
     IMAGE FALLBACK
  ========================================================== */

  const equipmentImages =
    document.querySelectorAll(
      ".equipment-image img"
    );


  equipmentImages.forEach((image) => {

    image.addEventListener(
      "error",
      () => {

        image.style.display = "none";

        const parent =
          image.closest(
            ".equipment-image"
          );


        if (parent) {

          parent.classList.add(
            "image-fallback"
          );

        }

      }
    );

  });


});
