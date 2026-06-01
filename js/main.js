document.addEventListener("DOMContentLoaded", () => {
    // header 스크롤 시작 시 투명도
    const header = document.querySelector(".header")

    window.addEventListener("scroll",function () {
        if (scrollY != 0) {
            header.style.backgroundColor = "rgba(255,255,255,1)"
        } else {
            header.style.backgroundColor = "rgba(255,255,255,0)"
        }
    })


    gsap.registerPlugin(ScrollTrigger,ScrollToPlugin,SplitText)
    
    // 주중예약 배경 스플릿텍스트
    let Newsplit = SplitText.create(".event-bg-text span", {
        type: "chars",
        mask: "chars"

    });
    // heroTitle
    //tweens are inserted at and relative to a label's position
    let tl = gsap.timeline();
    tl.from(".hero-deco", {
        duration: 0.4,
        x: 100 ,
        opacity: 0 ,
        stagger: 0.3 ,
        ease: "power4.out"
    })
      .from(".hero-title p", {duration: 0.4, x: -1062 ,opacity:0})
      .from(".hero-tag", {duration: 0.6, x: -1062, rotation: 360}, "blueSpin");


    const tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".img-in",
        start: "top 80%",
        // markers: true,  // 디버깅 시 주석 해제
    }
    });

    // 이미지 확장
    tl2.from(".img-in", {
        height: "3px",          // ② 그 다음 세로 0 → 원래 높이로
        duration: 0.3,

    })
    // 이미지 상단 타이틀
    .from(".intro-text span", {
        duration: 0.4,
        y: 50,
        opacity: 0,
        stagger: 0.2
    })
    .from(".intro-tag", {
        duration: 0.2,
        y: 30,
        opacity: 0
    });

    // .event 섹션 핀 (고정) - 별도 ScrollTrigger
    ScrollTrigger.create({
        trigger: ".event",
        start: "top -15%",
        pin: true,
    });

    // Newsplit → event-cta 순서 보장: ScrollTrigger를 타임라인 하나에만
    const tl3 = gsap.timeline({
        scrollTrigger: {
            trigger: ".event",
            start: "top 60%",
            end: "bottom 30%",
            scrub: 1,
            // markers: true,   // 디버깅 시 주석 해제
        }
    });

    tl3
    .from(Newsplit.chars, {
        color: "rgba(255, 255, 255, 0.15)",
        duration: 0.5,
        stagger: 0.1,
    })
    .from(".event-cta", {         // Newsplit 끝난 뒤 실행
        y: -20,
        opacity: 0,
        duration: 0.5,
    });




    // 놀거리 start 
    const cards = document.querySelectorAll(".play-cell");

    cards.forEach(card => {
        const highlight = card.querySelector(".play-highlight");
        const label = card.querySelector(".play-label")
        
        card.addEventListener("mouseenter", function () {
            if (highlight) highlight.classList.add("on");
            label.classList.add("off")
        });
        
        card.addEventListener("mouseleave", function () {
            if (highlight) highlight.classList.remove("on");
            label.classList.remove("off")
        });
    });
    // 놀거리 end

    // ===== 놀거리 모달 스와이퍼 =====
    const playModalData = [
        { badge: 'ENJOY',         title: '대형운동장',        imgs: ['./source/act1.png', './source/act1.png', './source/act1.png'] },
        { badge: 'ENJOY',         title: '서바이벌, ATV',     imgs: ['./source/act2.png', './source/act2.png', './source/act2.png'] },
        { badge: 'ENJOY',         title: '갯벌체험',          imgs: ['./source/act3.png', './source/act3.png', './source/act3.png'] },
        { badge: 'ENJOY',         title: '자전거&바이크 대여', imgs: ['./source/act4.png', './source/act4.png', './source/act4.png'] },
        { badge: 'ENJOY',         title: '워터파크',           imgs: ['./source/act5.png', './source/act5.png', './source/act5.png'] },
        { badge: 'ENTERTAINMENT', title: '클럽, 노래방, 당구장', imgs: ['./source/act6.png', './source/act6.png', './source/act6.png'] },
        { badge: 'KIDS',          title: '놀이터',             imgs: ['./source/act7.png', './source/act7.png', './source/act7.png'] },
        { badge: 'ENJOY',         title: '대형강당',           imgs: ['./source/act8.png', './source/act8.png', './source/act8.png'] },
    ];

    const playModal    = document.getElementById('playModal');
    const playModalClose  = document.getElementById('playModalClose');
    const playModalWrapper = document.getElementById('playModalSwiperWrapper');
    const playModalCursor  = document.getElementById('playModalCursor');
    const pmPrev = document.getElementById('pmPrev');
    const pmNext = document.getElementById('pmNext');

    // 슬라이드 동적 생성
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

    // Swiper 초기화
    const pmSwiper = new Swiper('#playModalSwiper', {
        slidesPerView: 1,
        speed: 500,
        loop: true,
        navigation: {
            prevEl: '#pmPrev',
            nextEl: '#pmNext',
        },
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

    // play-cell 클릭 시 해당 슬라이드로 오픈
    document.querySelectorAll('.play-cell').forEach((cell, i) => {
        cell.addEventListener('click', () => openPlayModal(i));
    });

    // 닫기 버튼
    playModalClose.addEventListener('click', closePlayModal);

    // 배경(dimmed) 클릭으로 닫기
    playModal.addEventListener('click', e => {
        if (!e.target.closest('.play-modal-wrap')) closePlayModal();
    });

    // ESC 키
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && playModal.classList.contains('is-open')) closePlayModal();
    });

    // 커스텀 커서 - dimmed 배경 위에서 "닫기" 원형 커서
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


    // 부대시설 start
    const amenityItems = document.querySelectorAll(".amenity");
    const amenitiesRight = document.querySelector(".amenities-right");

    // absolute 자식들로 인해 부모 height 0 → 첫 카드 높이로 고정
    amenitiesRight.style.height = amenityItems[0].offsetHeight + "px";

    // z-index: 뒤에 쌓이는 카드일수록 위에 렌더링
    amenityItems.forEach((item, i) => {
        gsap.set(item, { zIndex: i + 1 });
    });

    // 초기 상태: 첫 카드만 보이고, 나머지는 살짝 아래에서 투명 대기
    gsap.set(amenityItems,        { opacity: 0, y: 80 });
    gsap.set(amenityItems[0],     { opacity: 1, y: 0  });

    const tl4 = gsap.timeline({
        scrollTrigger: {
            trigger : ".amenities-inner",
            start   : "top 20%",
            end     : `+=${(amenityItems.length - 1) * 600}`,
            pin     : true,
            scrub   : 1,
            // markers: true,
        }
    });

    amenityItems.forEach((item, i) => {
        if (i === 0) return;

        tl4
            // ① 새 카드: 아래서 위로 슬라이드하며 등장 (카드 올려 쌓기)
            .to(item, {
                y: 0,
                opacity: 1,
            })
            // ② 이전 카드: 새 카드가 거의 도착할 때 뒤에서 fade out
            .to(amenityItems[i - 1], {
                opacity: 0,
            }, ">-0.4"); // 새 카드 슬라이드 완료 0.4 전부터 시작
    });
    // 부대시설 end

    // 대형주차장 start
    gsap.from(".parking-img",{
            scrollTrigger: {
            trigger : ".parking",
            start  : "top 50%",
            end  : "bottom 100%",
            scrub   : 1,
            // markers: true,
        },
        y: -50,
        opacity: 0,
        stagger: 1    

    })
    // 대형주차장 end
    
    // 객실 안내 start
    
    // 스와이퍼
    const swiper = new Swiper('.rooms .swiper', {
        slidesPerView: 'auto',
        observer: true,
        observeParents: true,
        direction: 'horizontal',
        spaceBetween: 30,

        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });

    gsap.from(".rooms .swiper",{
            scrollTrigger: {
            trigger : ".rooms",
            start  : "top 50%",
            end  : "bottom 100%",
            scrub   : 1,
            // markers: true,
        },
        x: 100,
        opacity: 0,
        stagger: 1   

    })

    // 객실 안내 end

    // scroll to
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
    const topBtn = document.querySelector(".top-btn")
    topBtn.addEventListener("click", function () {
        gsap.to(window, {
            duration: 1,
            scrollTo: 0,
            ease: "power2.inOut",
        });
    })
})