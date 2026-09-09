document.addEventListener("DOMContentLoaded", () => {

    console.log("JavaScript carregado corretamente!");

    // =====================================================
    // MENU MOBILE
    // =====================================================

    const botaoMenu = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("#menu-principal");

    if (botaoMenu && menu) {

        botaoMenu.addEventListener("click", () => {

            const estaAberto = menu.classList.toggle("is-open");

            botaoMenu.setAttribute(
                "aria-expanded",
                estaAberto
            );

            botaoMenu.setAttribute(
                "aria-label",
                estaAberto
                    ? "Fechar menu de navegação"
                    : "Abrir menu de navegação"
            );

            botaoMenu.classList.toggle(
                "is-active",
                estaAberto
            );

        });


        // Fecha ao clicar nos links
        const linksMenu = menu.querySelectorAll("a");

        linksMenu.forEach((link) => {

            link.addEventListener("click", () => {

                menu.classList.remove("is-open");

                botaoMenu.classList.remove("is-active");

                botaoMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        // Fecha apertando ESC
        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {

                menu.classList.remove("is-open");

                botaoMenu.classList.remove("is-active");

                botaoMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    // =====================================================
    // FAQ
    // =====================================================

    const perguntas = document.querySelectorAll(".faq__pergunta");

    perguntas.forEach((pergunta) => {

        pergunta.addEventListener("click", () => {

            const respostaId =
                pergunta.getAttribute("aria-controls");

            const resposta =
                document.getElementById(respostaId);

            if (!resposta) {
                return;
            }

            const estaAberta =
                pergunta.getAttribute("aria-expanded") === "true";


            // Fecha todas as outras
            perguntas.forEach((outraPergunta) => {

                if (outraPergunta === pergunta) {
                    return;
                }

                const outraRespostaId =
                    outraPergunta.getAttribute("aria-controls");

                const outraResposta =
                    document.getElementById(outraRespostaId);

                outraPergunta.setAttribute(
                    "aria-expanded",
                    "false"
                );

                if (outraResposta) {
                    outraResposta.hidden = true;
                }

            });


            // Alterna a clicada
            if (estaAberta) {

                pergunta.setAttribute(
                    "aria-expanded",
                    "false"
                );

                resposta.hidden = true;

            } else {

                pergunta.setAttribute(
                    "aria-expanded",
                    "true"
                );

                resposta.hidden = false;

            }

        });

    });


    // =====================================================
    // FADE-IN
    // =====================================================

    const elementosAnimados = document.querySelectorAll(`
        .sobre__grid,
        .areas__cabecalho,
        .card-area,
        .processo__etapa,
        .diferencial,
        .depoimento,
        .faq__item,
        .cta-final__conteudo
    `);

    elementosAnimados.forEach((elemento) => {
        elemento.classList.add("reveal");
    });


    const observador = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal--ativo");

                    observador.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.15
        }
    );


    elementosAnimados.forEach((elemento) => {
        observador.observe(elemento);
    });


    // =====================================================
    // HEADER AO ROLAR
    // =====================================================

    const header = document.querySelector("[data-header]");

    function atualizarHeader() {

        if (!header) return;

        header.classList.toggle(
            "header--scroll",
            window.scrollY > 40
        );

    }

    window.addEventListener("scroll", atualizarHeader);

    atualizarHeader();


    // =====================================================
    // CONTADOR DAS ESTATÍSTICAS
    // =====================================================

    const numeros = document.querySelectorAll(".stats__numero");

    const stats = document.querySelector(".stats");

    let contadoresExecutados = false;


    function animarContadores() {

        if (contadoresExecutados) {
            return;
        }

        contadoresExecutados = true;


        numeros.forEach((elemento) => {

            const textoOriginal =
                elemento.textContent.trim();

            const numeroFinal =
                parseInt(textoOriginal);

            if (isNaN(numeroFinal)) {
                return;
            }

            const sufixo =
                textoOriginal.replace(
                    String(numeroFinal),
                    ""
                );

            let atual = 0;

            const duracao = 1200;

            const incremento =
                numeroFinal / (duracao / 16);


            function atualizar() {

                atual += incremento;

                if (atual >= numeroFinal) {

                    elemento.textContent =
                        numeroFinal + sufixo;

                    return;
                }

                elemento.textContent =
                    Math.floor(atual) + sufixo;

                requestAnimationFrame(atualizar);
            }

            atualizar();

        });

    }


    if (stats) {

        const observadorStats =
            new IntersectionObserver(
                (entries) => {

                    if (entries[0].isIntersecting) {

                        animarContadores();

                        observadorStats.disconnect();
                    }

                },
                {
                    threshold: 0.4
                }
            );

        observadorStats.observe(stats);

    }


    // =====================================================
    // ANO AUTOMÁTICO
    // =====================================================

    const ano = document.querySelector("[data-ano-atual]");

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }

    // =====================================================
// BARRA DE PROGRESSO NO TOPO
// =====================================================

const barraProgresso = document.createElement("div");

barraProgresso.classList.add("scroll-progress");

barraProgresso.setAttribute("aria-hidden", "true");

document.body.appendChild(barraProgresso);


function atualizarBarraProgresso() {

    const alturaTotal =
        document.documentElement.scrollHeight -
        window.innerHeight;


    if (alturaTotal <= 0) {
        barraProgresso.style.width = "0%";
        return;
    }


    const porcentagem =
        (window.scrollY / alturaTotal) * 100;


    barraProgresso.style.width =
        `${porcentagem}%`;
}


window.addEventListener(
    "scroll",
    atualizarBarraProgresso,
    { passive: true }
);


atualizarBarraProgresso();

// =====================================================
// BOTÃO VOLTAR AO TOPO
// =====================================================

const botaoVoltarTopo =
    document.createElement("button");


botaoVoltarTopo.classList.add(
    "voltar-topo"
);


botaoVoltarTopo.type = "button";


botaoVoltarTopo.setAttribute(
    "aria-label",
    "Voltar ao topo"
);


botaoVoltarTopo.innerHTML = "↑";


document.body.appendChild(
    botaoVoltarTopo
);


function controlarBotaoTopo() {

    if (window.scrollY > 500) {

        botaoVoltarTopo.classList.add(
            "is-visible"
        );

    } else {

        botaoVoltarTopo.classList.remove(
            "is-visible"
        );
    }

}


window.addEventListener(
    "scroll",
    controlarBotaoTopo,
    { passive: true }
);


botaoVoltarTopo.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


controlarBotaoTopo();

});

