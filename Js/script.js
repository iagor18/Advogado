document.addEventListener("DOMContentLoaded", () => {

    // =========================================================
    // 1. ELEMENTOS PRINCIPAIS
    // =========================================================

    const header = document.querySelector("[data-header]");
    const navToggle = document.querySelector("[data-nav-toggle]");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".navbar__link");
    const anoAtual = document.querySelector("[data-ano-atual]");


    // =========================================================
    // 2. ESTILOS NECESSÁRIOS PARA AS ANIMAÇÕES
    // =========================================================
    // Dessa forma você não precisa alterar o CSS agora.

    const style = document.createElement("style");

    style.textContent = `

        /* =========================
           HEADER AO ROLAR
        ========================== */

        .site-header {
            transition:
                background-color 0.3s ease,
                box-shadow 0.3s ease,
                transform 0.3s ease;
        }

        .site-header.header--scroll {
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }


        /* =========================
           MENU MOBILE
        ========================== */

        .nav-toggle__barra {
            transition:
                transform 0.3s ease,
                opacity 0.3s ease;
        }

        .nav-toggle.is-active .nav-toggle__barra:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
        }

        .nav-toggle.is-active .nav-toggle__barra:nth-child(2) {
            opacity: 0;
        }

        .nav-toggle.is-active .nav-toggle__barra:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
        }


        @media (max-width: 900px) {

            .navbar.menu-aberto {
                display: flex !important;
                opacity: 1 !important;
                visibility: visible !important;
                pointer-events: auto !important;
                transform: translateY(0) !important;
            }

            body.menu-open {
                overflow: hidden;
            }
        }


        /* =========================
           FADE-IN
        ========================== */

        .reveal {
            opacity: 0;
            transform: translateY(35px);

            transition:
                opacity 0.7s ease,
                transform 0.7s ease;
        }

        .reveal.reveal--visible {
            opacity: 1;
            transform: translateY(0);
        }


        /* =========================
           FAQ
        ========================== */

        .faq__resposta {
            overflow: hidden;

            transition:
                max-height 0.35s ease,
                opacity 0.3s ease;
        }

        .faq__pergunta {
            position: relative;
        }

        .faq__pergunta::after {
            content: "+";

            display: inline-block;

            margin-left: 12px;

            font-size: 1.4rem;
            font-weight: 400;

            transition: transform 0.3s ease;
        }

        .faq__pergunta[aria-expanded="true"]::after {
            transform: rotate(45deg);
        }


        /* =========================
           LINK ATIVO
        ========================== */

        .navbar__link.navbar__link--ativo {
            opacity: 1;
        }


        /* =========================
           BARRA DE PROGRESSO
        ========================== */

        .scroll-progress {
            position: fixed;

            top: 0;
            left: 0;

            width: 0;
            height: 3px;

            background: currentColor;

            z-index: 99999;

            pointer-events: none;

            transition: width 0.08s linear;
        }


        /* =========================
           VOLTAR AO TOPO
        ========================== */

        .voltar-topo {
            position: fixed;

            right: 25px;
            bottom: 25px;

            width: 48px;
            height: 48px;

            display: flex;
            align-items: center;
            justify-content: center;

            border: none;
            border-radius: 50%;

            background: #111;
            color: #fff;

            font-size: 22px;

            cursor: pointer;

            opacity: 0;
            visibility: hidden;

            transform: translateY(15px);

            transition:
                opacity 0.3s ease,
                transform 0.3s ease,
                visibility 0.3s ease;

            z-index: 999;
        }

        .voltar-topo:hover {
            transform: translateY(-3px);
        }

        .voltar-topo.voltar-topo--visivel {
            opacity: 1;
            visibility: visible;

            transform: translateY(0);
        }


        @media (prefers-reduced-motion: reduce) {

            *,
            *::before,
            *::after {
                scroll-behavior: auto !important;
                transition-duration: 0.01ms !important;
                animation-duration: 0.01ms !important;
            }

            .reveal {
                opacity: 1;
                transform: none;
            }
        }
    `;

    document.head.appendChild(style);


    // =========================================================
    // 3. MENU MOBILE
    // =========================================================

    function abrirMenu() {

        if (!navToggle || !navbar) return;

        navbar.classList.add("menu-aberto");

        navToggle.classList.add("is-active");

        navToggle.setAttribute("aria-expanded", "true");

        navToggle.setAttribute(
            "aria-label",
            "Fechar menu de navegação"
        );

        document.body.classList.add("menu-open");
    }


    function fecharMenu() {

        if (!navToggle || !navbar) return;

        navbar.classList.remove("menu-aberto");

        navToggle.classList.remove("is-active");

        navToggle.setAttribute("aria-expanded", "false");

        navToggle.setAttribute(
            "aria-label",
            "Abrir menu de navegação"
        );

        document.body.classList.remove("menu-open");
    }


    function alternarMenu() {

        const estaAberto =
            navbar.classList.contains("menu-aberto");

        if (estaAberto) {
            fecharMenu();
        } else {
            abrirMenu();
        }
    }


    if (navToggle && navbar) {

        navToggle.addEventListener("click", (event) => {

            event.stopPropagation();

            alternarMenu();
        });
    }


    // =========================================================
    // 4. FECHAR MENU AO CLICAR EM UM LINK
    // =========================================================

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            fecharMenu();
        });
    });


    const navbarCTA = document.querySelector(".navbar__cta");

    if (navbarCTA) {

        navbarCTA.addEventListener("click", () => {

            fecharMenu();
        });
    }


    // =========================================================
    // 5. FECHAR MENU AO CLICAR FORA
    // =========================================================

    document.addEventListener("click", (event) => {

        if (!navbar || !navToggle) return;

        const clicouNavbar =
            navbar.contains(event.target);

        const clicouBotao =
            navToggle.contains(event.target);

        if (
            !clicouNavbar &&
            !clicouBotao &&
            navbar.classList.contains("menu-aberto")
        ) {

            fecharMenu();
        }
    });


    // =========================================================
    // 6. FECHAR MENU COM ESC
    // =========================================================

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            navbar?.classList.contains("menu-aberto")
        ) {

            fecharMenu();

            navToggle.focus();
        }
    });


    // =========================================================
    // 7. CORRIGE MENU QUANDO A TELA AUMENTAR
    // =========================================================

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            fecharMenu();
        }
    });


    // =========================================================
    // 8. SCROLL SUAVE
    // =========================================================

    const linksInternos =
        document.querySelectorAll('a[href^="#"]');


    linksInternos.forEach((link) => {

        link.addEventListener("click", (event) => {

            const href =
                link.getAttribute("href");

            if (!href || href === "#") return;


            const destino =
                document.querySelector(href);


            if (!destino) return;


            event.preventDefault();


            const alturaHeader =
                header?.offsetHeight || 0;


            const posicao =
                destino.getBoundingClientRect().top +
                window.scrollY -
                alturaHeader;


            window.scrollTo({
                top: posicao,
                behavior: "smooth"
            });
        });
    });


    // =========================================================
    // 9. HEADER COM SOMBRA AO ROLAR
    // =========================================================

    function atualizarHeader() {

        if (!header) return;


        if (window.scrollY > 30) {

            header.classList.add(
                "header--scroll"
            );

        } else {

            header.classList.remove(
                "header--scroll"
            );
        }
    }


    atualizarHeader();


    window.addEventListener(
        "scroll",
        atualizarHeader,
        { passive: true }
    );


    // =========================================================
    // 10. FADE-IN AO ROLAR
    // =========================================================

    const elementosReveal =
        document.querySelectorAll(`
            section:not(.hero),
            .stats__item,
            .card-area,
            .processo__etapa,
            .diferencial,
            .depoimento
        `);


    elementosReveal.forEach((elemento) => {

        elemento.classList.add("reveal");
    });


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "reveal--visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        elementosReveal.forEach((elemento) => {

            revealObserver.observe(elemento);
        });

    } else {

        elementosReveal.forEach((elemento) => {

            elemento.classList.add(
                "reveal--visible"
            );
        });
    }


    // =========================================================
    // 11. ANIMAÇÃO EM CASCATA DOS CARDS
    // =========================================================

    const gruposCards = [
        ".areas__grade .card-area",
        ".processo__lista .processo__etapa",
        ".diferenciais__lista .diferencial",
        ".depoimentos__lista .depoimento",
        ".stats .stats__item"
    ];


    gruposCards.forEach((seletor) => {

        const elementos =
            document.querySelectorAll(seletor);


        elementos.forEach(
            (elemento, index) => {

                elemento.style.transitionDelay =
                    `${index * 90}ms`;
            }
        );
    });


    // =========================================================
    // 12. FAQ ACCORDION
    // =========================================================

    const perguntas =
        document.querySelectorAll(
            ".faq__pergunta"
        );


    function fecharPergunta(pergunta) {

        const idResposta =
            pergunta.getAttribute(
                "aria-controls"
            );


        const resposta =
            document.getElementById(
                idResposta
            );


        if (!resposta) return;


        pergunta.setAttribute(
            "aria-expanded",
            "false"
        );


        resposta.style.maxHeight =
            `${resposta.scrollHeight}px`;


        requestAnimationFrame(() => {

            resposta.style.maxHeight = "0px";

            resposta.style.opacity = "0";
        });


        setTimeout(() => {

            if (
                pergunta.getAttribute(
                    "aria-expanded"
                ) === "false"
            ) {

                resposta.hidden = true;
            }

        }, 350);
    }


    function abrirPergunta(pergunta) {

        const idResposta =
            pergunta.getAttribute(
                "aria-controls"
            );


        const resposta =
            document.getElementById(
                idResposta
            );


        if (!resposta) return;


        resposta.hidden = false;

        resposta.style.maxHeight = "0px";

        resposta.style.opacity = "0";


        pergunta.setAttribute(
            "aria-expanded",
            "true"
        );


        requestAnimationFrame(() => {

            resposta.style.maxHeight =
                `${resposta.scrollHeight}px`;

            resposta.style.opacity = "1";
        });
    }


    perguntas.forEach((pergunta) => {

        const idResposta =
            pergunta.getAttribute(
                "aria-controls"
            );

        const resposta =
            document.getElementById(
                idResposta
            );


        if (resposta) {

            resposta.style.maxHeight = "0px";

            resposta.style.opacity = "0";
        }


        pergunta.addEventListener(
            "click",
            () => {

                const aberta =
                    pergunta.getAttribute(
                        "aria-expanded"
                    ) === "true";


                // Fecha as outras perguntas
                perguntas.forEach(
                    (outraPergunta) => {

                        if (
                            outraPergunta !== pergunta &&
                            outraPergunta.getAttribute(
                                "aria-expanded"
                            ) === "true"
                        ) {

                            fecharPergunta(
                                outraPergunta
                            );
                        }
                    }
                );


                if (aberta) {

                    fecharPergunta(
                        pergunta
                    );

                } else {

                    abrirPergunta(
                        pergunta
                    );
                }
            }
        );
    });


    // =========================================================
    // 13. CONTADOR ANIMADO NAS ESTATÍSTICAS
    // =========================================================

    const numeros =
        document.querySelectorAll(
            ".stats__numero"
        );


    function animarNumero(elemento) {

        if (
            elemento.dataset.animado ===
            "true"
        ) {
            return;
        }


        elemento.dataset.animado =
            "true";


        const textoOriginal =
            elemento.textContent.trim();


        const numeroFinal =
            parseInt(
                textoOriginal.replace(
                    /\D/g,
                    ""
                )
            );


        const sufixo =
            textoOriginal.replace(
                /[\d.,]/g,
                ""
            );


        if (isNaN(numeroFinal)) return;


        const duracao = 1300;

        const inicio =
            performance.now();


        function atualizar(tempoAtual) {

            const progresso =
                Math.min(
                    (tempoAtual - inicio) /
                    duracao,
                    1
                );


            // easing
            const suavizado =
                1 -
                Math.pow(
                    1 - progresso,
                    3
                );


            const valorAtual =
                Math.floor(
                    suavizado *
                    numeroFinal
                );


            elemento.textContent =
                `${valorAtual}${sufixo}`;


            if (progresso < 1) {

                requestAnimationFrame(
                    atualizar
                );

            } else {

                elemento.textContent =
                    textoOriginal;
            }
        }


        requestAnimationFrame(
            atualizar
        );
    }


    const stats =
        document.querySelector(".stats");


    if (
        stats &&
        "IntersectionObserver" in window
    ) {

        const contadorObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                numeros.forEach(
                                    animarNumero
                                );

                                observer.disconnect();
                            }
                        }
                    );
                },
                {
                    threshold: 0.4
                }
            );


        contadorObserver.observe(stats);
    }


    // =========================================================
    // 14. LINK DO MENU ATIVO CONFORME A SEÇÃO
    // =========================================================

    const secoes =
        document.querySelectorAll(
            "main section[id]"
        );


    if ("IntersectionObserver" in window) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const id =
                                entry.target.id;


                            navLinks.forEach(
                                (link) => {

                                    link.classList.remove(
                                        "navbar__link--ativo"
                                    );


                                    if (
                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        `#${id}`
                                    ) {

                                        link.classList.add(
                                            "navbar__link--ativo"
                                        );
                                    }
                                }
                            );
                        }
                    );
                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px",

                    threshold: 0
                }
            );


        secoes.forEach((secao) => {

            sectionObserver.observe(
                secao
            );
        });
    }


    // =========================================================
    // 15. BARRA DE PROGRESSO DE LEITURA
    // =========================================================

    const barraProgresso =
        document.createElement("div");


    barraProgresso.classList.add(
        "scroll-progress"
    );


    barraProgresso.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.appendChild(
        barraProgresso
    );


    function atualizarProgresso() {

        const alturaPagina =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        if (alturaPagina <= 0) {

            barraProgresso.style.width =
                "0%";

            return;
        }


        const progresso =
            (
                window.scrollY /
                alturaPagina
            ) * 100;


        barraProgresso.style.width =
            `${progresso}%`;
    }


    window.addEventListener(
        "scroll",
        atualizarProgresso,
        { passive: true }
    );


    atualizarProgresso();


    // =========================================================
    // 16. BOTÃO VOLTAR AO TOPO
    // =========================================================

    const botaoTopo =
        document.createElement("button");


    botaoTopo.classList.add(
        "voltar-topo"
    );


    botaoTopo.type = "button";


    botaoTopo.setAttribute(
        "aria-label",
        "Voltar ao início da página"
    );


    botaoTopo.innerHTML = "↑";


    document.body.appendChild(
        botaoTopo
    );


    function atualizarBotaoTopo() {

        if (window.scrollY > 600) {

            botaoTopo.classList.add(
                "voltar-topo--visivel"
            );

        } else {

            botaoTopo.classList.remove(
                "voltar-topo--visivel"
            );
        }
    }


    window.addEventListener(
        "scroll",
        atualizarBotaoTopo,
        { passive: true }
    );


    botaoTopo.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );


    atualizarBotaoTopo();


    // =========================================================
    // 17. ANO AUTOMÁTICO NO FOOTER
    // =========================================================

    if (anoAtual) {

        anoAtual.textContent =
            new Date().getFullYear();
    }


    // =========================================================
    // 18. DESTAQUE SUAVE DOS CARDS NO MOUSE
    // =========================================================

    const cards =
        document.querySelectorAll(`
            .card-area,
            .processo__etapa,
            .diferencial,
            .depoimento
        `);


    cards.forEach((card) => {

        card.style.transition +=
            ", transform 0.25s ease";


        card.addEventListener(
            "mouseenter",
            () => {

                if (
                    window.innerWidth > 900
                ) {

                    card.style.transform =
                        "translateY(-6px)";
                }
            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";
            }
        );
    });


    // =========================================================
    // 19. PREVINE DUPLO CLIQUE EM LINKS DE WHATSAPP
    // =========================================================

    const whatsappLinks =
        document.querySelectorAll(
            'a[href*="wa.me"]'
        );


    whatsappLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                link.dataset.clicked =
                    "true";
            }
        );
    });


    // =========================================================
    // FINAL
    // =========================================================

    console.log(
        "Site carregado com sucesso."
    );

});