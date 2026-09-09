document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const links = document.querySelectorAll("nav a");

  // 1. Animasi awal munculnya halaman (Fade In)
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity .7s ease";

  requestAnimationFrame(() => {
    document.body.style.opacity = "1";
  });

  // 2. Navbar shrink saat scroll
  window.addEventListener("scroll", () => {
    if (navbar) {
      if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });

  // 3. Hover menu navbar
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => (link.style.opacity = "0.55"));
    link.addEventListener("mouseleave", () => (link.style.opacity = "1"));
  });

  // 4. Efek tombol kontak
  document.querySelectorAll("a[href='kontak.html']").forEach((button) => {
    button.addEventListener("mouseenter", () => {
      button.style.transform = "translateY(-2px)";
      button.style.boxShadow = "0 8px 20px rgba(0,0,0,.16)";
    });
    button.addEventListener("mouseleave", () => {
      button.style.transform = "translateY(0)";
      button.style.boxShadow = "none";
    });
  });

  // 5. Memecah Teks Judul Hero Per-Huruf
  const title = document.getElementById("hero-title");

  if (title) {
    const text = title.getAttribute("data-text") || title.textContent;
    title.innerHTML = "";

    let charIndex = 0;
    const words = text.split(" ");

    words.forEach((word, wordIndex) => {
      // Container untuk 1 kata utuh
      const wordSpan = document.createElement("span");
      wordSpan.classList.add("word");
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";

      // Pecah huruf dalam kata
      word.split("").forEach((char) => {
        const letterSpan = document.createElement("span");
        letterSpan.classList.add("letter");
        letterSpan.innerHTML = char;
        letterSpan.style.animationDelay = `${0.1 + charIndex * 0.08}s`;
        wordSpan.appendChild(letterSpan);
        charIndex++;
      });

      title.appendChild(wordSpan);

      // Tambahkan spasi antar kata
      if (wordIndex < words.length - 1) {
        const spaceSpan = document.createElement("span");
        spaceSpan.classList.add("word-space");
        spaceSpan.innerHTML = "&nbsp;";
        spaceSpan.style.display = "inline-block";
        title.appendChild(spaceSpan);
        charIndex++;
      }
    });
  }

  // 7. ANIMASI POP-UP EMOJI STATISTIK
  const statEmojis = document.querySelectorAll(".stat-emoji");
  const statsContainer = document.querySelector(".stats-container");

  if (statsContainer && statEmojis.length > 0) {
    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            statEmojis.forEach((emoji, index) => {
              setTimeout(() => {
                emoji.classList.add("animate-pop");
              }, index * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    statsObserver.observe(statsContainer);
  }

  // 8. ANIMASI SCROLL REASON CARDS (MUNCUL DARI KIRI)
  const reasonCards = document.querySelectorAll(".reason-card");

  if (reasonCards.length > 0) {
    const reasonObserverOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
    };

    const reasonObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-left");
          observer.unobserve(entry.target);
        }
      });
    }, reasonObserverOptions);

    reasonCards.forEach((card) => {
      reasonObserver.observe(card);
    });
  }

  // 9. ANIMASI SCROLL PROSES KERJA (FADE IN UP)
  const processSteps = document.querySelectorAll(".process-step");

  if (processSteps.length > 0) {
    const processObserverOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const processObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-step");
          observer.unobserve(entry.target);
        }
      });
    }, processObserverOptions);

    processSteps.forEach((step) => {
      processObserver.observe(step);
    });
  }

  // 10. TOGGLE MOBILE MENU (HAMBURGER ESTETIK)
  const hamburger = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }
    });

    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // 11. FURNITURE CAROUSEL + REVEAL ANIMATION (Gabungan)
  const furnitureGrid = document.querySelector(".furniture-grid");
  const furnitureTrack = document.getElementById("furniture-track");

  if (furnitureGrid && furnitureTrack) {
    const originalChildren = Array.from(furnitureTrack.children);

    originalChildren.forEach((child) => {
      const clone = child.cloneNode(true);
      furnitureTrack.appendChild(clone);
    });

    const allCards = Array.from(furnitureTrack.querySelectorAll(".furniture-card"));

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          allCards.forEach((card, i) => {
            setTimeout(() => card.classList.add("show"), i * 60);
          });
          observer.disconnect();
        }
      });
    }, { root: null, rootMargin: "0px", threshold: 0.2 });

    revealObserver.observe(furnitureGrid);

    const pxPerSecond = 60;
    const totalWidth = furnitureTrack.scrollWidth / 2;
    const duration = totalWidth / pxPerSecond;
    furnitureTrack.style.animationDuration = `${duration}s`;

    function pause() { furnitureTrack.style.animationPlayState = "paused"; }
    function resume() { furnitureTrack.style.animationPlayState = "running"; }

    furnitureGrid.addEventListener("mouseenter", pause);
    furnitureGrid.addEventListener("mouseleave", () => {
      furnitureGrid.classList.remove("active");
      resume();
    });

    function getTranslateX(el) {
      const style = window.getComputedStyle(el);
      const matrix = new DOMMatrixReadOnly(style.transform);
      return matrix.m41;
    }

    let isDown = false;
    let startX = 0;
    let dragStartX = 0;

    function startDrag(pageX) {
      isDown = true;
      furnitureGrid.classList.add("active");
      dragStartX = getTranslateX(furnitureTrack);
      furnitureTrack.style.animation = "none";
      furnitureTrack.style.transform = `translateX(${dragStartX}px)`;
      startX = pageX;
    }

    function moveDrag(pageX) {
      if (!isDown) return;
      const walk = (pageX - startX) * 1.5;
      let newX = dragStartX + walk;
      while (newX > 0) newX -= totalWidth;
      while (newX <= -totalWidth) newX += totalWidth;
      furnitureTrack.style.transform = `translateX(${newX}px)`;
    }

    function endDrag() {
      if (!isDown) return;
      isDown = false;
      furnitureGrid.classList.remove("active");

      const current = getTranslateX(furnitureTrack);
      const percent = Math.abs(current) / totalWidth;
      furnitureTrack.style.animation = "none";
      void furnitureTrack.offsetWidth;
      furnitureTrack.style.animation = `furniture-scroll ${duration}s linear infinite`;
      furnitureTrack.style.animationDelay = `-${percent * duration}s`;
    }

    furnitureGrid.addEventListener("mousedown", (e) => startDrag(e.pageX));
    window.addEventListener("mousemove", (e) => moveDrag(e.pageX));
    window.addEventListener("mouseup", endDrag);

    furnitureGrid.addEventListener("touchstart", (e) => startDrag(e.touches[0].pageX), { passive: true });
    furnitureGrid.addEventListener("touchmove", (e) => moveDrag(e.touches[0].pageX), { passive: true });
    furnitureGrid.addEventListener("touchend", endDrag, { passive: true });
  }

  // 12. LIGHTBOX MODAL FULLSCREEN
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");
  const modalClose = document.querySelector(".modal-close");

  if (modal && modalImg) {
    document.querySelectorAll(".furniture-card").forEach((card) => {
      card.addEventListener("click", () => {
        const img = card.querySelector("img");
        const titleText = card.querySelector("h3")
          ? card.querySelector("h3").innerText
          : "";

        if (img) {
          modalImg.src = img.src;
          if (modalCaption) modalCaption.innerText = titleText;
          modal.classList.add("show");
          document.body.style.overflow = "hidden";
        }
      });
    });

    const closeModal = () => {
      modal.classList.remove("show");
      document.body.style.overflow = "auto";
    };

    if (modalClose) modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // HALAMAN TENTANG KAMI =======================================================
  // 13. Intersection Observer untuk Animasi Scroll (Smooth Reveal)
  const revealElementsAbout = document.querySelectorAll(
    ".about-reveal-up, .about-reveal-left, .about-reveal-right"
  );

  if (revealElementsAbout.length > 0) {
    const revealObserverAbout = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("about-reveal-active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElementsAbout.forEach((el) => revealObserverAbout.observe(el));
  }

  // 14. Animasi Angka Counter
  const counterNumbers = document.querySelectorAll(".about-counter-num");
  let counterStarted = false;

  const startCounters = () => {
    counterNumbers.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const duration = 2000;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target + "+";
          clearInterval(timer);
        } else {
          counter.textContent = Math.ceil(current);
        }
      }, stepTime);
    });
  };

  const counterSection = document.querySelector(".about-counter-section");
  if (counterSection) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !counterStarted) {
          counterStarted = true;
          startCounters();
        }
      },
      { threshold: 0.3 }
    );

    counterObserver.observe(counterSection);
  }

  // 15. Animasi scroll bg home
  window.addEventListener('scroll', () => {
    const heroBg = document.querySelector('.hero-bg');
    const heroSection = document.querySelector('.hero');

    if (!heroBg || !heroSection) return;

    const scrollPosition = window.scrollY;
    const heroHeight = heroSection.offsetHeight;

    if (scrollPosition <= heroHeight) {
      const scaleValue = 1 + (scrollPosition / heroHeight) * 0.3;
      heroBg.style.setProperty('--hero-scale', scaleValue);
    }
  });

  // HALAMAN LAYANAN ============================================================
  // 16. Scroll Reveal Animasi Layanan (.service-reveal-*)
  const serviceRevealElements = document.querySelectorAll(
    ".service-reveal-up, .service-reveal-left, .service-reveal-right"
  );

  if (serviceRevealElements.length > 0) {
    const serviceObserverOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const serviceObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, serviceObserverOptions);

    serviceRevealElements.forEach((el) => serviceObserver.observe(el));
  }

  // 17. Accordion Material Section
  const accordionBtns = document.querySelectorAll(".service-accordion-btn");

  accordionBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const currentItem = this.parentElement;

      document.querySelectorAll(".service-accordion-item").forEach((item) => {
        if (item !== currentItem) {
          item.classList.remove("active");
        }
      });

      currentItem.classList.toggle("active");
    });
  });

  // HALAMAN KONTAK =============================================================
  // 18. Scroll Reveal Animasi Kontak (.kontak-reveal-*)
  const kontakRevealElements = document.querySelectorAll(
    ".kontak-reveal-up, .kontak-reveal-left, .kontak-reveal-right"
  );

  if (kontakRevealElements.length > 0) {
    const kontakObserverOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const kontakObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("kontak-reveal-active");
          observer.unobserve(entry.target);
        }
      });
    }, kontakObserverOptions);

    kontakRevealElements.forEach((el) => kontakObserver.observe(el));
  }

  // 19. Interactive FAQ Accordion Kontak
  const kontakFaqItems = document.querySelectorAll(".kontak-faq-item");

  kontakFaqItems.forEach((item) => {
    const questionBtn = item.querySelector(".kontak-faq-question");
    const answer = item.querySelector(".kontak-faq-answer");

    if (questionBtn && answer) {
      questionBtn.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        kontakFaqItems.forEach((otherItem) => {
          otherItem.classList.remove("active");
          const otherAnswer = otherItem.querySelector(".kontak-faq-answer");
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add("active");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    }
  });

});
