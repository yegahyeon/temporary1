document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");

    let rafId;
    window.addEventListener("scroll", () => {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            header.style.backgroundColor = scrollY !== 0
                ? "rgba(255,255,255,1)"
                : "rgba(255,255,255,0)";
            rafId = null;
        });
    });

    // 햄버거 메뉴
    const hamburger = document.getElementById('hamburger');
    const gnb = document.querySelector('.gnb');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        gnb.classList.toggle('open');
        document.body.style.overflow = gnb.classList.contains('open') ? 'hidden' : '';
    });
    document.querySelectorAll('.gnb a').forEach(a => {
        a.addEventListener('click', () => {
            hamburger.classList.remove('open');
            gnb.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    const eventBgText       = document.querySelector('.event-bg-text:not(.event-bg-text-mobile)');
    const eventBgTextMobile = document.querySelector('.event-bg-text-mobile');

    function updateEventText() {
        if (window.innerWidth <= 480) {
            eventBgText.classList.add('hidden');
            eventBgTextMobile.classList.remove('hidden');
        } else {
            eventBgText.classList.remove('hidden');
            eventBgTextMobile.classList.add('hidden');
        }
    }
    updateEventText();

    let resizeTimer;
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1200) {
            hamburger.classList.remove('open');
            gnb.classList.remove('open');
            document.body.style.overflow = '';
        }
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateEventText, 150);
    });


    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

    const Newsplit = SplitText.create(".event-bg-text span", {
        type: "chars",
        mask: "chars",
    });

    const tl = gsap.timeline();
    tl.from(".hero-deco", {
        duration: 0.4,
        x: 100,
        opacity: 0,
        stagger: 0.3,
        ease: "power4.out",
    })
      .from(".hero-title p", { duration: 0.4, x: -1062, opacity: 0 })
      .from(".hero-tag", { duration: 0.6, x: -1062, rotation: 360 }, "blueSpin");

    const tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".img-in",
            start: "top 80%",
        }
    });
    tl2.from(".img-in", { height: "3px", duration: 0.3 })
       .from(".intro-text span", { duration: 0.4, y: 50, opacity: 0, stagger: 0.2 })
       .from(".intro-tag", { duration: 0.2, y: 30, opacity: 0 });

    // .event 섹션 핀
    const mmEvent = gsap.matchMedia();
    mmEvent.add("(min-width: 1201px)", () => {
        ScrollTrigger.create({ trigger: ".event", start: "top -15%", pin: true });
    });
    mmEvent.add("(min-width: 481px) and (max-width: 1200px)", () => {
        ScrollTrigger.create({ trigger: ".event", start: "center center", pin: true });
    });
    mmEvent.add("(max-width: 480px)", () => {
        ScrollTrigger.create({ trigger: ".event", start: "top top+=68", pin: true });
    });

    const tl3 = gsap.timeline({
        scrollTrigger: {
            trigger: ".event",
            start: "top 60%",
            end: "bottom 30%",
            scrub: 1,
        }
    });
    tl3
        .from(Newsplit.chars, { color: "rgba(255, 255, 255, 0.15)", duration: 0.5, stagger: 0.1 })
        .from(".event-cta", { y: -20, opacity: 0, duration: 0.5 });


    // 놀거리
    document.querySelectorAll(".play-cell").forEach(card => {
        const highlight = card.querySelector(".play-highlight");
        const label = card.querySelector(".play-label");
        card.addEventListener("mouseenter", () => {
            if (highlight) highlight.classList.add("on");
            label.classList.add("off");
        });
        card.addEventListener("mouseleave", () => {
            if (highlight) highlight.classList.remove("on");
            label.classList.remove("off");
        });
    });

    // 놀거리 모달 스와이퍼
    const playModalData = [
        { badge: 'ENJOY',         title: '대형운동장',          imgs: ['./source/act1.png', './source/act1-2.jpg', './source/act1-3.jpg'] },
        { badge: 'ENJOY',         title: '서바이벌, ATV',       imgs: ['./source/act2.png', './source/act2-2.jpg', './source/act2-3.jpg'] },
        { badge: 'ENJOY',         title: '갯벌체험',            imgs: ['./source/act3.png', './source/act3-2.jpg', './source/act3-3.jpg'] },
        { badge: 'ENJOY',         title: '자전거&바이크 대여',   imgs: ['./source/act4.png', './source/act4-2.jpg', './source/act4-3.jpg'] },
        { badge: 'ENJOY',         title: '워터파크',            imgs: ['./source/act5.png', './source/act5-2.jpg', './source/act5-3.jpg'] },
        { badge: 'ENTERTAINMENT', title: '클럽, 노래방, 당구장', imgs: ['./source/act6.png', './source/act6-2.jpg', './source/act6-3.jpg'] },
        { badge: 'KIDS',          title: '놀이터',              imgs: ['./source/act7.png', './source/act7-2.jpg', './source/act7-3.jpg'] },
        { badge: 'ENJOY',         title: '대형강당',            imgs: ['./source/act8.png', './source/act8-2.jpg', './source/act8-3.jpg'] },
    ];

    const playModal       = document.getElementById('playModal');
    const playModalClose  = document.getElementById('playModalClose');
    const playModalWrapper = document.getElementById('playModalSwiperWrapper');
    const playModalCursor = document.getElementById('playModalCursor');

    playModalData.forEach(d => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <div class="pm-slide-header">
                <span class="pm-badge">${d.badge}</span>
                <h3 class="pm-title">${d.title}</h3>
            </div>
            <div class="pm-images">
                <div class="pm-img-main"><img src="${d.imgs[0]}" alt="${d.title}"></div>
                <div class="pm-img-side">
                    <div class="pm-img"><img src="${d.imgs[1]}" alt="${d.title}"></div>
                    <div class="pm-img"><img src="${d.imgs[2]}" alt="${d.title}"></div>
                </div>
            </div>
        `;
        playModalWrapper.appendChild(slide);
    });

    const pmSwiper = new Swiper('#playModalSwiper', {
        slidesPerView: 1,
        speed: 500,
        loop: true,
        navigation: { prevEl: '#pmPrev', nextEl: '#pmNext' },
    });

    function openPlayModal(idx) {
        playModal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        pmSwiper.slideToLoop(idx, 0);
    }
    function closePlayModal() {
        playModal.classList.remove('is-open', 'cursor-on-bg');
        document.body.style.overflow = '';
        playModalCursor.classList.remove('is-visible');
    }

    document.querySelectorAll('.play-cell').forEach((cell, i) => {
        cell.addEventListener('click', () => openPlayModal(i));
    });
    playModalClose.addEventListener('click', closePlayModal);
    playModal.addEventListener('click', e => {
        if (!e.target.closest('.play-modal-wrap')) closePlayModal();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && playModal.classList.contains('is-open')) closePlayModal();
    });
    playModal.addEventListener('mousemove', e => {
        playModalCursor.style.left = e.clientX + 'px';
        playModalCursor.style.top  = e.clientY + 'px';
        const onWrap = !!e.target.closest('.play-modal-wrap');
        playModalCursor.classList.toggle('is-visible', !onWrap);
        playModal.classList.toggle('cursor-on-bg', !onWrap);
    });
    playModal.addEventListener('mouseleave', () => {
        playModalCursor.classList.remove('is-visible');
        playModal.classList.remove('cursor-on-bg');
    });


    // 파크골프 패키지 탭
    const pgTabs    = document.querySelectorAll('.parkgolf-package .tap li');
    const pgPanels  = document.querySelectorAll('.package-detail');
    pgTabs.forEach((tab, i) => {
        tab.addEventListener('click', () => {
            pgTabs.forEach(t => t.classList.remove('active'));
            pgPanels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            pgPanels[i].classList.add('active');
        });
    });


    // 부대시설
    const amenityItems  = document.querySelectorAll(".amenity");
    const amenitiesRight = document.querySelector(".amenities-right");

    amenitiesRight.style.height = amenityItems[0].offsetHeight + "px";
    amenityItems.forEach((item, i) => gsap.set(item, { zIndex: i + 1 }));
    gsap.set(amenityItems,     { opacity: 0, y: 80 });
    gsap.set(amenityItems[0],  { opacity: 1, y: 0 });

    const buildAmenityAnim = (tl) => {
        amenityItems.forEach((item, i) => {
            if (i === 0) return;
            tl
                .to(item, { y: 0, opacity: 1 })
                .to(amenityItems[i - 1], { opacity: 0 }, ">-0.4");
        });
    };

    const mmAmenity = gsap.matchMedia();
    mmAmenity.add("(min-width: 481px)", () => {
        const tl4 = gsap.timeline({
            scrollTrigger: {
                trigger: ".amenities",
                start: "top top",
                end: `+=${(amenityItems.length - 1) * window.innerHeight}`,
                pin: true,
                scrub: 1,
            }
        });
        buildAmenityAnim(tl4);
    });
    mmAmenity.add("(max-width: 480px)", () => {
        const tl4 = gsap.timeline({
            scrollTrigger: {
                trigger: ".amenities",
                start: "center center",
                end: `+=${amenityItems.length * window.innerHeight}`,
                pin: true,
                scrub: 1,
            }
        });
        buildAmenityAnim(tl4);
    });


    // 대형주차장
    gsap.from(".parking-img", {
        scrollTrigger: {
            trigger: ".parking",
            start: "top 50%",
            end: "bottom 100%",
            scrub: 1,
        },
        y: -50,
        opacity: 0,
        stagger: 1,
    });

    // 객실 안내
    new Swiper('.rooms .swiper', {
        slidesPerView: 'auto',
        observer: true,
        observeParents: true,
        direction: 'horizontal',
        spaceBetween: 30,
        scrollbar: { el: '.swiper-scrollbar' },
    });

    gsap.from(".rooms .swiper", {
        scrollTrigger: {
            trigger: ".rooms",
            start: "top 50%",
            end: "bottom 100%",
            scrub: 1,
        },
        x: 100,
        opacity: 0,
        stagger: 1,
    });

    // 스크롤 이동
    document.querySelectorAll(".gnb a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (!target) return;
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: target, offsetY: 100 },
                ease: "power2.inOut",
            });
        });
    });

    document.querySelector(".top-btn").addEventListener("click", () => {
        gsap.to(window, { duration: 1, scrollTo: 0, ease: "power2.inOut" });
    });
});
