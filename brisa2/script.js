// =====================================================
// BRISA AFTER - JavaScript
// Eventos + Ticketmaster API
// =====================================================


// =====================================================
// MENU
// =====================================================

const menuBtn = document.querySelector('#menuBtn');
const navMenu = document.querySelector('#navMenu');

if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });
}


// =====================================================
// MODAL
// =====================================================

const modal = document.querySelector('#modal');
const closeModal = document.querySelector('#closeModal');
const modalTitle = document.querySelector('#modalTitle');
const modalText = document.querySelector('#modalText');
const modalAction = document.querySelector('#modalAction');


// =====================================================
// CONFIGURAÇÃO DA API
// =====================================================

// COLOQUE SUA API KEY AQUI
const TICKETMASTER_API_KEY = 'iwP0vmqpFLNXSj6gRq79TIrPy9HGmhAr';

const TICKETMASTER_URL =
    'https://app.ticketmaster.com/discovery/v2/events.json';


// =====================================================
// EVENTOS
// =====================================================

// Agora os eventos vêm da API.
// Não precisamos mais cadastrar manualmente:
// São Paulo, Rio de Janeiro, Minas Gerais etc.

let eventos = [];


// =====================================================
// ELEMENTOS DOS EVENTOS
// =====================================================

const eventsGrid = document.querySelector('#eventsGrid');

const eventSearch = document.querySelector('#eventSearch');
const clearSearch = document.querySelector('#clearSearch');
const searchStatus = document.querySelector('#searchStatus');

let filtroAtual = 'todos';


// =====================================================
// CIDADES DO BRASIL
// =====================================================

// Essas cidades são usadas para buscar eventos
// de diferentes regiões do Brasil.

const cidadesBrasil = [
    {
        nome: 'São Paulo',
        estado: 'SP',
        lat: -23.5505,
        lon: -46.6333
    },
    {
        nome: 'Rio de Janeiro',
        estado: 'RJ',
        lat: -22.9068,
        lon: -43.1729
    },
    {
        nome: 'Belo Horizonte',
        estado: 'MG',
        lat: -19.9167,
        lon: -43.9345
    },
    {
        nome: 'Brasília',
        estado: 'DF',
        lat: -15.7939,
        lon: -47.8828
    },
    {
        nome: 'Salvador',
        estado: 'BA',
        lat: -12.9777,
        lon: -38.5016
    },
    {
        nome: 'Curitiba',
        estado: 'PR',
        lat: -25.4284,
        lon: -49.2733
    },
    {
        nome: 'Porto Alegre',
        estado: 'RS',
        lat: -30.0346,
        lon: -51.2177
    },
    {
        nome: 'Recife',
        estado: 'PE',
        lat: -8.0476,
        lon: -34.8770
    },
    {
        nome: 'Fortaleza',
        estado: 'CE',
        lat: -3.7319,
        lon: -38.5267
    },
    {
        nome: 'Manaus',
        estado: 'AM',
        lat: -3.1190,
        lon: -60.0217
    },
    {
        nome: 'Belém',
        estado: 'PA',
        lat: -1.4558,
        lon: -48.4902
    },
    {
        nome: 'Goiânia',
        estado: 'GO',
        lat: -16.6869,
        lon: -49.2648
    }
];


// =====================================================
// BUSCAR EVENTOS DE UMA CIDADE
// =====================================================

async function buscarEventosCidade(cidade) {

    const params = new URLSearchParams({
        apikey: TICKETMASTER_API_KEY,
        countryCode: 'BR',
        locale: 'pt-br',
        size: '50',

        // Raio aproximado da cidade
        radius: '100',
        unit: 'km',

        // Coordenadas
        geoPoint: `${cidade.lat},${cidade.lon}`,

        // Ordenar por data
        sort: 'date,asc'
    });

    const url = `${TICKETMASTER_URL}?${params.toString()}`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Erro HTTP ${response.status}`
            );
        }

        const data = await response.json();

        return data._embedded?.events || [];

    } catch (erro) {

        console.error(
            `Erro ao buscar eventos de ${cidade.nome}:`,
            erro
        );

        return [];
    }
}


// =====================================================
// CONVERTER EVENTO DA API PARA O FORMATO DO SITE
// =====================================================

function converterEvento(evento) {

    const venue =
        evento._embedded?.venues?.[0];

    const cidade =
        venue?.city?.name || 'Brasil';

    const estado =
        venue?.state?.stateCode ||
        venue?.state?.name ||
        '';

    const dataAPI =
        evento.dates?.start?.localDate;

    const horaAPI =
        evento.dates?.start?.localTime;

    let dataFormatada = 'Data não informada';

    if (dataAPI) {

        const data = new Date(
            `${dataAPI}T${horaAPI || '00:00:00'}`
        );

        dataFormatada = data.toLocaleDateString(
            'pt-BR',
            {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }
        );
    }

    // Tenta identificar categoria/gênero

    const classificacao =
        evento.classifications?.[0];

    const segmento =
        classificacao?.segment?.name ||
        'Eventos';

    const genero =
        classificacao?.genre?.name ||
        segmento;

    let categoria = 'festival';

    const textoEvento =
        `${evento.name} ${genero} ${segmento}`
            .toLowerCase();

    if (
        textoEvento.includes('electronic') ||
        textoEvento.includes('dance') ||
        textoEvento.includes('techno') ||
        textoEvento.includes('house')
    ) {
        categoria = 'rave';
    }

    if (
        textoEvento.includes('club') ||
        textoEvento.includes('party')
    ) {
        categoria = 'after';
    }

    return {

        id: evento.id,

        categoria: categoria,

        tags: `
            ${segmento}
            ${genero}
            ${evento.name}
        `.toLowerCase(),

        data: dataFormatada,

        titulo:
            evento.name || 'Evento sem nome',

        local: `
            ${venue?.name || 'Local não informado'}
            • ${cidade}/${estado}
        `,

        genero:
            genero,

        fonte:
            evento.url || '#',

        cidade:
            cidade,

        estado:
            estado,

        horario:
            horaAPI || '',

        imagem:
            evento.images?.[0]?.url || '',

        descricao:
            evento.info ||
            evento.pleaseNote ||
            'Confira as informações completas no site do evento.'
    };
}


// =====================================================
// BUSCAR EVENTOS DO BRASIL
// =====================================================

async function carregarEventosBrasil() {

    if (!eventsGrid) return;

    eventsGrid.innerHTML = `
        <div class="no-results">
            <div>🎧</div>
            <h3>Carregando eventos...</h3>
            <p>
                Buscando eventos em várias cidades do Brasil.
            </p>
        </div>
    `;

    searchStatus.textContent =
        'Buscando eventos pelo Brasil...';


    // Verifica API Key

    if (
        !TICKETMASTER_API_KEY ||
        TICKETMASTER_API_KEY === 'SUA_API_KEY_AQUI'
    ) {

        eventsGrid.innerHTML = `
            <div class="no-results">
                <div>🔑</div>
                <h3>API Key não configurada</h3>
                <p>
                    Abra o script.js e coloque sua API Key
                    da Ticketmaster.
                </p>
            </div>
        `;

        searchStatus.textContent =
            'Configure a API Key para carregar os eventos.';

        return;
    }


    try {

        // Faz várias buscas ao mesmo tempo

        const resultados =
            await Promise.all(
                cidadesBrasil.map(cidade =>
                    buscarEventosCidade(cidade)
                )
            );


        // Junta todos os resultados

        const todosEventos =
            resultados.flat();


        // Converte os eventos

        eventos =
            todosEventos.map(converterEvento);


        // Remove eventos duplicados

        const mapaEventos =
            new Map();

        eventos.forEach(evento => {

            if (!mapaEventos.has(evento.id)) {
                mapaEventos.set(
                    evento.id,
                    evento
                );
            }

        });

        eventos =
            Array.from(mapaEventos.values());


        // Ordena pela data

        eventos.sort((a, b) => {

            const dataA =
                converterData(a.data);

            const dataB =
                converterData(b.data);

            return dataA - dataB;
        });


        console.log(
            `Eventos encontrados: ${eventos.length}`
        );


        renderEventos();


    } catch (erro) {

        console.error(
            'Erro geral ao carregar eventos:',
            erro
        );

        eventsGrid.innerHTML = `
            <div class="no-results">
                <div>⚠️</div>
                <h3>Não foi possível carregar os eventos</h3>
                <p>
                    Tente atualizar a página novamente.
                </p>
            </div>
        `;

        searchStatus.textContent =
            'Erro ao carregar eventos.';
    }
}


// =====================================================
// CONVERTER DATA DD/MM/YYYY
// =====================================================

function converterData(data) {

    if (!data || data === 'Data não informada') {
        return new Date('9999-12-31');
    }

    const partes =
        data.split('/');

    if (partes.length !== 3) {
        return new Date('9999-12-31');
    }

    return new Date(
        `${partes[2]}-${partes[1]}-${partes[0]}`
    );
}


// =====================================================
// RENDERIZAR EVENTOS
// =====================================================

function renderEventos(
    filtro = filtroAtual,
    termo =
        eventSearch?.value
            .trim()
            .toLowerCase() || ''
) {

    filtroAtual = filtro;

    if (!eventsGrid) return;


    const lista =
        eventos.filter(evento => {

            const passaFiltro =
                filtro === 'todos' ||
                filtro === evento.categoria ||
                evento.tags.includes(filtro);


            const texto = `
                ${evento.titulo}
                ${evento.local}
                ${evento.genero}
                ${evento.tags}
                ${evento.data}
                ${evento.cidade}
                ${evento.estado}
            `.toLowerCase();


            const passaBusca =
                !termo ||
                texto.includes(termo);


            return passaFiltro && passaBusca;
        });


    eventsGrid.innerHTML = '';


    if (!lista.length) {

        eventsGrid.innerHTML = `
            <div class="no-results">
                <div>🎧</div>
                <h3>Nenhum evento encontrado</h3>
                <p>
                    Tente pesquisar por cidade,
                    estado, evento, DJ, data ou estilo musical.
                </p>
            </div>
        `;

        searchStatus.textContent =
            'Nenhum evento encontrado.';

        return;
    }


    lista.forEach((evento, index) => {

        const article =
            document.createElement('article');

        article.className =
            'event-item';

        article.dataset.category =
            evento.categoria;


        article.innerHTML = `

            <div class="event-number">
                ${String(index + 1).padStart(2, '0')}
            </div>

            <div class="event-main">

                <span>
                    ${evento.data}
                    ${evento.horario
                        ? ` • ${evento.horario}`
                        : ''}
                </span>

                <h3>
                    ${evento.titulo}
                </h3>

                <p>
                    📍 ${evento.local}
                </p>

                <small>
                    ${evento.genero}
                </small>

            </div>

            <div class="event-actions">

                <button
                    class="details-btn"
                    data-event="${evento.id}">
                    Detalhes
                </button>

                <a
                    class="ticket-btn"
                    href="${evento.fonte}"
                    target="_blank"
                    rel="noopener noreferrer">
                    🎟️ Comprar ingresso
                </a>

            </div>
        `;


        eventsGrid.appendChild(article);
    });


    // Botões de detalhes

    document
        .querySelectorAll('.details-btn')
        .forEach(button => {

            button.addEventListener(
                'click',
                () => {

                    const evento =
                        eventos.find(
                            item =>
                                item.id ===
                                button.dataset.event
                        );

                    abrirModal(evento);
                }
            );
        });


    searchStatus.textContent =
        `${lista.length} evento${lista.length === 1 ? '' : 's'} encontrado${lista.length === 1 ? '' : 's'}.`;
}


// =====================================================
// FILTROS
// =====================================================

const filters =
    document.querySelectorAll('.filter');


filters.forEach(filter => {

    filter.addEventListener(
        'click',
        () => {

            filters.forEach(btn =>
                btn.classList.remove('active')
            );

            filter.classList.add('active');

            renderEventos(
                filter.dataset.filter
            );
        }
    );
});


// =====================================================
// PESQUISA
// =====================================================

if (eventSearch) {

    eventSearch.addEventListener(
        'input',
        () => {

            renderEventos(
                filtroAtual
            );
        }
    );
}


if (clearSearch) {

    clearSearch.addEventListener(
        'click',
        () => {

            eventSearch.value = '';

            renderEventos(
                filtroAtual
            );

            eventSearch.focus();
        }
    );
}


// =====================================================
// MODAL DE EVENTO
// =====================================================

function abrirModal(evento) {

    if (!evento || !modal) return;


    modalTitle.textContent =
        evento.titulo;


    modalText.innerHTML = `

        <strong>Data:</strong>
        ${evento.data}

        <br>

        <strong>Horário:</strong>
        ${evento.horario || 'Não informado'}

        <br>

        <strong>Local:</strong>
        ${evento.local}

        <br>

        <strong>Estilo:</strong>
        ${evento.genero}

        <br><br>

        <strong>Descrição:</strong>

        <br>

        ${evento.descricao || 'Sem descrição disponível.'}

        <br><br>

        <a
            class="modal-ticket"
            href="${evento.fonte || '#'}"
            target="_blank"
            rel="noopener noreferrer">

            🎟️ Acessar ingressos

        </a>
    `;


    if (modalAction) {

        modalAction.onclick =
            () => modal.classList.add('hidden');
    }


    modal.classList.remove('hidden');
}


// =====================================================
// BOTÃO PRINCIPAL DE INGRESSO
// =====================================================

const ticketBtn =
    document.querySelector('#ticketBtn');


if (ticketBtn) {

    ticketBtn.addEventListener(
        'click',
        () => {

            abrirModal({

                titulo:
                    'Brisa After Experience',

                data:
                    '02/10/2026',

                horario:
                    '22:00',

                local:
                    'Evento Brisa After',

                genero:
                    'Rave • Psytrance • Electronic Music',

                descricao:
                    'Confira as informações e ingressos do evento.',

                fonte:
                    '#'
            });
        }
    );
}


// =====================================================
// FECHAR MODAL
// =====================================================

if (closeModal) {

    closeModal.addEventListener(
        'click',
        () => modal.classList.add('hidden')
    );
}


if (modal) {

    modal.addEventListener(
        'click',
        event => {

            if (event.target === modal) {
                modal.classList.add('hidden');
            }
        }
    );
}


// =====================================================
// CONTADOR
// =====================================================

const dataEvento =
    new Date(
        '2026-10-02T22:00:00-03:00'
    ).getTime();


const countdown =
    document.querySelector('#countdown');


function atualizarContagem() {

    if (!countdown) return;


    const agora =
        Date.now();


    const distancia =
        dataEvento - agora;


    if (distancia <= 0) {

        countdown.textContent =
            'O evento já começou!';

        return;
    }


    const dias =
        Math.floor(
            distancia /
            (1000 * 60 * 60 * 24)
        );


    const horas =
        Math.floor(
            (distancia /
                (1000 * 60 * 60)) % 24
        );


    const minutos =
        Math.floor(
            (distancia /
                (1000 * 60)) % 60
        );


    const segundos =
        Math.floor(
            (distancia / 1000) % 60
        );


    countdown.textContent =
        `${dias}d ${horas}h ${minutos}min ${segundos}s`;
}


atualizarContagem();

setInterval(
    atualizarContagem,
    1000
);


// =====================================================
// CLIMA / LOCALIZAÇÃO
// =====================================================

const locationBtn =
    document.querySelector('#locationBtn');

const weatherTitle =
    document.querySelector('#weatherTitle');

const weatherText =
    document.querySelector('#weatherText');

const weatherValue =
    document.querySelector('#weatherValue');


// =====================================================
// ERRO DE LOCALIZAÇÃO
// =====================================================

function mostrarErroLocalizacao(error) {

    const mensagens = {

        1:
            'Permissão de localização negada. Clique no cadeado ao lado do endereço do site e permita a localização.',

        2:
            'Não foi possível descobrir sua localização. Verifique o GPS ou a conexão com a internet.',

        3:
            'A localização demorou demais para responder. Tente novamente.'
    };


    if (weatherTitle) {

        weatherTitle.textContent =
            'Não foi possível localizar';
    }


    if (weatherText) {

        weatherText.textContent =
            mensagens[error.code] ||
            'Erro ao obter sua localização. Tente novamente.';
    }


    if (weatherValue) {

        weatherValue.textContent =
            '--°C';
    }


    if (locationBtn) {

        locationBtn.disabled = false;

        locationBtn.textContent =
            'Tentar novamente';
    }
}


// =====================================================
// BUSCAR CLIMA
// =====================================================

async function buscarClima(
    latitude,
    longitude
) {

    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`;


    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            'Erro na API Open-Meteo'
        );
    }


    return response.json();
}


// =====================================================
// BUSCAR CIDADE
// =====================================================

async function buscarCidade(
    latitude,
    longitude
) {

    const url =
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`;


    const response =
        await fetch(url);


    if (!response.ok) {

        throw new Error(
            'Erro na API de localização'
        );
    }


    return response.json();
}


// =====================================================
// LOCALIZAÇÃO DO USUÁRIO
// =====================================================

if (locationBtn) {

    locationBtn.addEventListener(
        'click',
        () => {

            if (!window.isSecureContext) {

                weatherTitle.textContent =
                    'Localização bloqueada';

                weatherText.textContent =
                    'Abra o site usando HTTPS ou http://localhost. O navegador bloqueia geolocalização em páginas inseguras.';

                return;
            }


            if (!navigator.geolocation) {

                weatherTitle.textContent =
                    'Geolocalização indisponível';

                weatherText.textContent =
                    'Seu navegador não suporta geolocalização.';

                return;
            }


            locationBtn.disabled = true;

            locationBtn.textContent =
                'Localizando...';


            weatherTitle.textContent =
                'Obtendo sua localização...';


            weatherText.textContent =
                'Permita o acesso à localização quando o navegador solicitar.';


            weatherValue.textContent =
                '--°C';


            navigator.geolocation.getCurrentPosition(

                async position => {

                    const {
                        latitude,
                        longitude,
                        accuracy
                    } = position.coords;


                    try {

                        const [
                            clima,
                            cidade
                        ] = await Promise.all([

                            buscarClima(
                                latitude,
                                longitude
                            ),

                            buscarCidade(
                                latitude,
                                longitude
                            ).catch(
                                () => null
                            )
                        ]);


                        const temperatura =
                            clima.current.temperature_2m;


                        const nomeCidade =
                            cidade?.city ||
                            cidade?.locality ||
                            cidade?.principalSubdivision ||
                            'sua região';


                        const estado =
                            cidade?.principalSubdivision ||
                            '';


                        weatherTitle.textContent =
                            `📍 ${nomeCidade}${estado && estado !== nomeCidade ? ` - ${estado}` : ''}`;


                        weatherText.textContent =
                            `Localização encontrada com precisão aproximada de ${Math.round(accuracy)} metros. Coordenadas: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}.`;


                        weatherValue.textContent =
                            `${temperatura}°C`;


                    } catch (erro) {

                        weatherTitle.textContent =
                            'Localização encontrada';


                        weatherText.textContent =
                            `Latitude: ${latitude.toFixed(4)} | Longitude: ${longitude.toFixed(4)}. Não foi possível carregar o clima agora.`;


                        weatherValue.textContent =
                            '--°C';


                    } finally {

                        locationBtn.disabled =
                            false;

                        locationBtn.textContent =
                            'Atualizar localização';
                    }

                },

                mostrarErroLocalizacao,

                {

                    enableHighAccuracy:
                        true,

                    timeout:
                        15000,

                    maximumAge:
                        60000
                }
            );
        }
    );
}


// =====================================================
// INICIAR API DE EVENTOS
// =====================================================

carregarEventosBrasil();

