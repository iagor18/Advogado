document.addEventListener("DOMContentLoaded", () => {

    console.log("JavaScript carregado corretamente!");


    // =====================================================
    // CLIENTES
    // ADICIONE NOVOS CLIENTES SOMENTE AQUI
    // =====================================================

    const clientes = {

        padrao: {
            primeiroNome: "Dr.",
            sobrenome: "Advogado ",
            nomeCompleto: "Dr. Advogado",

            oab: "OAB/MG 000.000",
            area: "Advocacia Criminal",

            telefone: "(31) 99999-9999",
            telefoneLink: "+5531999999999",

            whatsapp: "5531999999999",

            email: "contato@advogado.com.br",
            cidade: "Belo Horizonte, MG",

            imagemHero: "./assets/amostra1.webp",
            imagemSobre: "./assets/amostra2.jpeg"
        },

        castro: {
            primeiroNome: "Castro",
            sobrenome: "Advocacia",
            nomeCompleto: "Castro Advocacia",

            oab: "OAB/MG 123.456",
            area: "Advocacia Criminal",

            telefone: "(31) 98888-8888",
            telefoneLink: "+5531988888888",

            whatsapp: "5531988888888",

            email: "contato@advogado.com.br",
            cidade: "Belo Horizonte, MG",

            imagemHero: "./assets/castro1.png",
            imagemSobre: "./assets/castro2.png"
        },

        alexandre: {
            primeiroNome: "Alexandre",
            sobrenome: "Correia",
            nomeCompleto: "Alexandre Correia",

            oab: "OAB/MG 123.456",
            area: "Advocacia Criminal",

            telefone: "(31) 98888-8888",
            telefoneLink: "+5531988888888",

            whatsapp: "5531988888888",

            email: "contato@advogado.com.br",
            cidade: "Belo Horizonte, MG",

            imagemHero: "./assets/alexandre1.png",
            imagemSobre: "./assets/alexandre2.png"
        },

        joao: {
            primeiroNome: "João",
            sobrenome: "Brant",
            nomeCompleto: "João Brant",

            oab: "OAB/MG 123.456",
            area: "Advocacia Criminal",

            telefone: "(31) 98888-8888",
            telefoneLink: "+5531988888888",

            whatsapp: "5531988888888",

            email: "contato@advogado.com.br",
            cidade: "Belo Horizonte, MG",

            imagemHero: "./assets/joao.png",
            imagemSobre: ""
        },

    };

    // =====================================================
    // DESCOBRE QUAL CLIENTE FOI SELECIONADO PELA URL
    //https://iagor18.github.io/Advogado/?cliente=castro
    // http://127.0.0.1:5500/?cliente=castro
    // =====================================================

    const parametros =
        new URLSearchParams(window.location.search);


    const clienteSelecionado =
    parametros.get("cliente")?.toLowerCase();

    const cliente =
    clientes[clienteSelecionado] || clientes.padrao;


    console.log("Cliente selecionado:", clienteSelecionado);

    console.log("Dados carregados:", cliente);


    // =====================================================
    // FUNÇÃO PARA PREENCHER TEXTOS
    // =====================================================

    function preencherTexto(seletor, valor) {

        document
            .querySelectorAll(seletor)
            .forEach((elemento) => {

                elemento.textContent = valor;

            });

    }


    // =====================================================
    // PREENCHE OS DADOS DO CLIENTE NO SITE
    // =====================================================

    document.title = `Dr. ${cliente.nomeCompleto} | ${cliente.area}`;

    preencherTexto(
        "[data-cliente-primeiro-nome]",
        cliente.primeiroNome
    );


    preencherTexto(
        "[data-cliente-sobrenome]",
        cliente.sobrenome
    );


    preencherTexto(
        "[data-cliente-nome-completo]",
        cliente.nomeCompleto
    );


    preencherTexto(
        "[data-cliente-oab]",
        cliente.oab
    );


    preencherTexto(
        "[data-cliente-area]",
        cliente.area
    );


    preencherTexto(
        "[data-cliente-telefone]",
        cliente.telefone
    );


    preencherTexto(
        "[data-cliente-email]",
        cliente.email
    );


    preencherTexto(
        "[data-cliente-cidade]",
        cliente.cidade
    );


    // =====================================================
    // WHATSAPP
    // =====================================================

    document
        .querySelectorAll("[data-cliente-whatsapp-link]")
        .forEach((link) => {

            link.href =
                `https://wa.me/${cliente.whatsapp}`;

        });


    // =====================================================
    // TELEFONE
    // =====================================================

    document
        .querySelectorAll("[data-cliente-telefone-link]")
        .forEach((link) => {

            link.href =
                `tel:${cliente.telefoneLink}`;

        });


    // =====================================================
// IMAGEM DO HERO
// =====================================================

document
    .querySelectorAll("[data-cliente-imagem-hero]")
    .forEach((imagem) => {

        if (cliente.imagemHero) {

            imagem.src = cliente.imagemHero;
            imagem.style.display = "block";

        } else {

            imagem.style.display = "none";

            const placeholder = document.createElement("div");

            placeholder.classList.add("foto-placeholder");
            placeholder.textContent = "SUA FOTO AQUI";

            imagem.parentElement.appendChild(placeholder);

        }

    });


    // =====================================================
// IMAGEM DA SEÇÃO SOBRE
// =====================================================

document
    .querySelectorAll("[data-cliente-imagem-sobre]")
    .forEach((imagem) => {

        if (cliente.imagemSobre) {

            imagem.src = cliente.imagemSobre;
            imagem.style.display = "block";

        } else {

            imagem.style.display = "none";

            const placeholder = document.createElement("div");

            placeholder.classList.add("foto-placeholder");
            placeholder.textContent = "SUA FOTO AQUI";

            imagem.parentElement.appendChild(placeholder);

        }

    });
// =====================================================
// AVALIAÇÃO
// =====================================================
const avaliacoes = [
    {
        nome: "Marcos Silva",
        estrelas: 5,
        comentario: "Excelente profissional. Fui muito bem atendido durante todo o processo."
    },
    {
        nome: "Ana Paula",
        estrelas: 5,
        comentario: "Tive uma excelente experiência com este escritório. Desde o primeiro contato, fui atendido com profissionalismo, clareza e muita segurança. Demonstraram total domínio técnico e conduziram meu caso com responsabilidade e transparência, sempre me mantendo bem orientado."
    },
    {
        nome: "Ricardo Alves",
        estrelas: 5,
        comentario: "Profissional extremamente competente. Sempre explicou tudo de maneira clara."
    },
    {
        nome: "Carlos Souza",
        estrelas: 5,
        comentario: "Ótimo profissional, conseguiu tirar todas as minha dúvidas  , sempre muito prestativo e atencioso , cumpriu com o combinado e conseguiu a liberdade que a gente tanto queria , obrigado"
    },
    {
        nome: "Fernanda Lima",
        estrelas: 5,
        comentario: "Fiquei muito satisfeita com a forma que me atenderam, equipe super organizada, muito prestativa e profissional. Resolveram o meu problema com muita rapidez, conhecimento e comprometimento do início ao fim. Super recomendo"
    }
];


const track = document.querySelector(".avaliacoes-track");


// CRIAR OS CARDS
avaliacoes.forEach(function(avaliacao) {

    const card = document.createElement("article");

    card.classList.add("card-avaliacao");

    card.innerHTML = `
        <div class="avaliacao-topo">

            <div class="avatar">
                ${avaliacao.nome.charAt(0)}
            </div>

            <div>
                <h3>${avaliacao.nome}</h3>
                <span>Google</span>
            </div>

        </div>

        <div class="estrelas">
            ${"★".repeat(avaliacao.estrelas)}
        </div>

        <p>
            ${avaliacao.comentario}
        </p>
    `;

    track.appendChild(card);
});


// CARROSSEL


// Duplica todos os cards
const cardsOriginais = Array.from(track.children);

cardsOriginais.forEach((card) => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
});

let posicao = 0;
let animacao;

function moverCarrossel() {

    posicao += 0.5;

    // Largura total apenas dos cards originais
    const metadeTrack = track.scrollWidth / 2;

    // Quando chegar na cópia, volta para o início
    // sem o usuário perceber
    if (posicao >= metadeTrack) {
        posicao = 0;
    }

    track.style.transform = `translateX(-${posicao}px)`;

    animacao = requestAnimationFrame(moverCarrossel);
}

moverCarrossel();

    // =====================================================
    // MENU MOBILE
    // =====================================================

    const botaoMenu =
        document.querySelector("[data-nav-toggle]");


    const menu =
        document.querySelector("#menu-principal");


    if (botaoMenu && menu) {

        botaoMenu.addEventListener("click", () => {

            const estaAberto =
                menu.classList.toggle("is-open");


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


        // Fecha o menu ao clicar em um link

        const linksMenu =
            menu.querySelectorAll("a");


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


        // Fecha o menu ao apertar ESC

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

    const perguntas =
        document.querySelectorAll(".faq__pergunta");


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


            // Fecha todas as outras perguntas

            perguntas.forEach((outraPergunta) => {

                if (outraPergunta === pergunta) {

                    return;

                }


                const outraRespostaId =
                    outraPergunta.getAttribute(
                        "aria-controls"
                    );


                const outraResposta =
                    document.getElementById(
                        outraRespostaId
                    );


                outraPergunta.setAttribute(
                    "aria-expanded",
                    "false"
                );


                if (outraResposta) {

                    outraResposta.hidden = true;

                }

            });


            // Alterna a pergunta clicada

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

    const elementosAnimados =
        document.querySelectorAll(`
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


    const observador =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "reveal--ativo"
                        );


                        observador.unobserve(
                            entry.target
                        );

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

    const header =
        document.querySelector("[data-header]");


    function atualizarHeader() {

        if (!header) {

            return;

        }


        header.classList.toggle(
            "header--scroll",
            window.scrollY > 40
        );

    }


    window.addEventListener(
        "scroll",
        atualizarHeader
    );


    atualizarHeader();


    // =====================================================
    // CONTADOR DAS ESTATÍSTICAS
    // =====================================================

    const numeros =
        document.querySelectorAll(".stats__numero");


    const stats =
        document.querySelector(".stats");


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


                requestAnimationFrame(
                    atualizar
                );

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

    const ano =
        document.querySelector("[data-ano-atual]");


    if (ano) {

        ano.textContent =
            new Date().getFullYear();

    }


    // =====================================================
    // BARRA DE PROGRESSO NO TOPO
    // =====================================================

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
        {

            passive: true

        }
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


    botaoVoltarTopo.type =
        "button";


    botaoVoltarTopo.setAttribute(
        "aria-label",
        "Voltar ao topo"
    );


    botaoVoltarTopo.innerHTML =
        "↑";


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
        {

            passive: true

        }
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

