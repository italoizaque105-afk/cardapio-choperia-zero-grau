// LISTA DE CATEGORIAS (ABAS) INICIAIS
let categorias = [
    { id: "executivos", nome: "Pratos Executivos", sub: "Acompanha Arroz, Feijão e Farofa. Escolha entre: Fritas, Salada, Purê ou Legumes" },
    { id: "carnes-2p", nome: "Carnes & Pratos 2P", sub: "Servidos com acompanhamentos fartos para 2 pessoas" },
    { id: "petiscos", nome: "Petiscos & Porções", sub: "Porções perfeitas para acompanhar aquele chopp gelado" },
    { id: "pizzas-sanduiches", nome: "Pizzas & Sanduíches", sub: "Pizzas artesanais e sanduíches caprichados" },
    { id: "saladas-sopas", nome: "Saladas, Omeletes & Sopas", sub: "Opções leves, caldos quentes e omeletes recheadas" },
    { id: "guarnicoes", nome: "Guarnições & Sobremesas", sub: "Acompanhamentos extras e doces caseiros" },
    { id: "bebidas-nao-alcoolicas", nome: "Bebidas Não Alcoólicas", sub: "Refrigerantes, sucos naturais e águas" },
    { id: "bebidas-alcoolicas", nome: "Chopp, Cervejas & Destilados", sub: "Chopp na pressão, cervejas 600ml e cachaças especiais" }
];

// BANCO DE DADOS DE PRODUTOS
const produtosIniciais = [
    // PRATOS EXECUTIVOS
    { id: 1, nome: "Contra Filé", preco: 39.90, desc: "Acompanha Arroz, Feijão e Farofa", cat: "executivos" },
    { id: 2, nome: "Contra Filé à Cavalo", preco: 41.90, desc: "Acompanha Arroz, Feijão, Farofa e Ovo Frito", cat: "executivos" },
    { id: 3, nome: "Contra Filé à Milanesa", preco: 40.00, desc: "Empanado e crocante", cat: "executivos" },
    { id: 4, nome: "Contra Filé à Parmegiana", preco: 44.00, desc: "Com molho especial e queijo derretido", cat: "executivos" },
    { id: 5, nome: "Filé de Peixe ao Molho Camarão", preco: 42.00, desc: "Peixe grelhado com molho de camarão", cat: "executivos" },
    { id: 6, nome: "Frango à Parmegiana", preco: 36.00, desc: "Filé de frango empanado gratinado", cat: "executivos" },
    { id: 7, nome: "Carne Assada", preco: 28.00, desc: "Fatiada com molho da própria carne", cat: "executivos" },
    { id: 8, nome: "Risoto de Frango", preco: 30.00, desc: "Cremoso com temperos da casa", cat: "executivos" },
    { id: 9, nome: "Risoto de Camarão", preco: 40.00, desc: "Arroz cremoso regado ao camarão", cat: "executivos" },
    { id: 10, nome: "Strogonoff de Carne", preco: 29.90, desc: "Acompanha Arroz e Batata Palha", cat: "executivos" },
    { id: 11, nome: "Strogonoff de Frango", preco: 25.90, desc: "Acompanha Arroz e Batata Palha", cat: "executivos" },

    // CARNES 2P
    { id: 14, nome: "Churrasquinho Misto (2P)", preco: 130.00, desc: "Carne, frango, linguiça e acompanhamentos", cat: "carnes-2p" },
    { id: 15, nome: "Contra Filé à Campanha (2P)", preco: 85.00, desc: "Servido com molho à campanha completo", cat: "carnes-2p" },

    // PETISCOS
    { id: 24, nome: "Gurjão de Frango", preco: 42.00, desc: "Acompanha molho tártaro", cat: "petiscos" },
    { id: 25, nome: "Gurjão de Peixe", preco: 45.00, desc: "Tiras crocantes de peixe", cat: "petiscos" },
    { id: 28, nome: "Batata Frita", preco: 30.00, desc: "Porção tradicional de fritas", cat: "petiscos" },

    // BEBIDAS
    { id: 61, nome: "Refrigerante Lata", preco: 7.00, desc: "Coca, Guaraná, Fanta ou Sprite", cat: "bebidas-nao-alcoolicas" },
    { id: 69, nome: "Chopp Brahma (300ml)", preco: 8.00, desc: "Tirado na pressão trincando", cat: "bebidas-alcoolicas" },
    { id: 71, nome: "Cerveja Heineken 600ml", preco: 18.00, desc: "Garrafa 600ml", cat: "bebidas-alcoolicas" }
];

let produtos = [...produtosIniciais];
let abaAtiva = "executivos";

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    renderizarEstrutura();
    gerarQR();
});

// DESENHA AS ABAS E AS SEÇÕES DE CATEGORIAS
function renderizarEstrutura() {
    const barraAbas = document.getElementById('barraAbas');
    const containerCategorias = document.getElementById('containerCategorias');
    const selectCategoria = document.getElementById('novaCategoria');

    barraAbas.innerHTML = "";
    containerCategorias.innerHTML = "";
    selectCategoria.innerHTML = "";

    categorias.forEach((cat, index) => {
        // 1. Criar Botão da Aba
        const btnAba = document.createElement('button');
        btnAba.className = `btn-aba ${cat.id === abaAtiva ? 'active' : ''}`;
        btnAba.innerText = cat.nome;
        btnAba.onclick = () => trocarAba(cat.id);
        barraAbas.appendChild(btnAba);

        // 2. Criar Seção da Categoria no Container
        const secao = document.createElement('section');
        secao.id = cat.id;
        secao.className = `categoria-secao ${cat.id === abaAtiva ? 'active' : ''}`;
        secao.innerHTML = `
            <h2>${cat.nome}</h2>
            ${cat.sub ? `<p class="subtitulo-categoria">${cat.sub}</p>` : ''}
            <div class="lista-itens" id="lista-${cat.id}"></div>
        `;
        containerCategorias.appendChild(secao);

        // 3. Preencher Select do Modal de Novo Item
        const option = document.createElement('option');
        option.value = cat.id;
        option.innerText = cat.nome;
        selectCategoria.appendChild(option);
    });

    renderizarProdutos();
}

// DESENHA OS CARDS DOS PRODUTOS
function renderizarProdutos() {
    categorias.forEach(cat => {
        const container = document.getElementById(`lista-${cat.id}`);
        if (!container) return;
        container.innerHTML = "";

        const itensCat = produtos.filter(p => p.cat === cat.id);

        if (itensCat.length === 0) {
            container.innerHTML = `<p style="color: #666; font-size: 0.85rem; font-style: italic;">Nenhum item nesta categoria ainda.</p>`;
            return;
        }

        itensCat.forEach(p => {
            const div = document.createElement('div');
            div.className = `item-card ${p.pausado ? 'pausado' : ''}`;
            div.dataset.id = p.id;

            div.innerHTML = `
                <div class="item-info">
                    <h3>${p.nome}</h3>
                    <p>${p.desc}</p>
                    <div class="preco-box">
                        <span class="preco">R$ <span>${p.preco.toFixed(2)}</span></span>
                        <button class="btn-editar-preco" onclick="editarPreco(${p.id})">✏️ Editar</button>
                    </div>
                    <button class="btn-pedir">Pedir</button>
                    <button class="btn-pausa" onclick="togglePausa(${p.id})">${p.pausado ? 'Despausar Item' : 'Pausar Item'}</button>
                </div>
                <span class="badge-esgotado">ESGOTADO</span>
            `;
            container.appendChild(div);
        });
    });
}

// SALVAR NOVA CATEGORIA (ABA)
function salvarNovaCategoria(e) {
    e.preventDefault();
    const nome = document.getElementById('nomeNovaCategoria').value.trim();
    if (!nome) return;

    // Gerar um ID amigável sem espaços/acentos
    const id = nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "-");

    // Adiciona na lista de categorias
    categorias.push({ id, nome, sub: "Categoria criada recentemente" });
    
    abaAtiva = id; // Define a nova aba como a ativa
    renderizarEstrutura();
    fecharModal('modalNovaCategoria');
    document.getElementById('formNovaCategoria').reset();
    alert(`Aba "${nome}" criada com sucesso!`);
}

// PAUSAR / DESPAUSAR PRODUCTO
function togglePausa(id) {
    const p = produtos.find(item => item.id === id);
    if (p) {
        p.pausado = !p.pausado;
        renderizarProdutos();
    }
}

// EDITAR PREÇO NA HORA
function editarPreco(id) {
    const p = produtos.find(item => item.id === id);
    if (p) {
        const novo = prompt(`Novo preço para ${p.nome}:`, p.preco.toFixed(2));
        if (novo !== null && novo.trim() !== "") {
            p.preco = parseFloat(novo.replace(',', '.'));
            renderizarProdutos();
        }
    }
}

// ALTERNAR ABAS
function trocarAba(idAba) {
    abaAtiva = idAba;
    document.querySelectorAll('.categoria-secao').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.btn-aba').forEach(b => b.classList.remove('active'));

    const secaoAtiva = document.getElementById(idAba);
    if (secaoAtiva) secaoAtiva.classList.add('active');
    
    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// FILTRAR STATUS
function filtrarStatus(tipo) {
    document.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');

    document.querySelectorAll('.item-card').forEach(card => {
        const estaPausado = card.classList.contains('pausado');
        if (tipo === 'todos') card.style.display = 'flex';
        else if (tipo === 'disponiveis') card.style.display = estaPausado ? 'none' : 'flex';
        else if (tipo === 'esgotados') card.style.display = estaPausado ? 'flex' : 'none';
    });
}

// MODAIS
function abrirModal(id) {
    document.getElementById(id).style.display = 'flex';
}

function fecharModal(id) {
    document.getElementById(id).style.display = 'none';
}

// SALVAR NOVO ITEM
function salvarNovoItem(e) {
    e.preventDefault();
    const nome = document.getElementById('novoNome').value;
    const cat = document.getElementById('novaCategoria').value;
    const preco = parseFloat(document.getElementById('novoPreco').value);
    const desc = document.getElementById('novaDescricao').value;

    produtos.push({
        id: Date.now(),
        nome,
        preco,
        desc,
        cat,
        pausado: false
    });

    renderizarProdutos();
    fecharModal('modalNovoItem');
    document.getElementById('formNovoItem').reset();
    
    // Mudar para a aba do item criado para ver ele imediatamente
    trocarAba(cat);
}

// QR CODE
function gerarQR() {
    const mesa = document.getElementById('numMesa').value || "1";
    const urlFakeMesa = `https://choperiazerograu.com.br/cardapio?mesa=${mesa}`;
    document.getElementById('imgQRCode').src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(urlFakeMesa)}`;
}