// Função para alternar entre as abas com trava de segurança
function mudarAba(aba) {
    if (aba === 'gerente') {
        const senha = prompt("Digite a senha de acesso do Gerente:");
        
        // Verificação da senha 2008
        if (senha !== "2008") { 
            alert("Senha incorreta! Acesso negado.");
            return; // Interrompe imediatamente se a senha estiver errada
        }
    }

    // Esconde todos os conteúdos
    const abas = document.querySelectorAll('.tab-content');
    abas.forEach(conteudo => {
        conteudo.classList.remove('active');
        conteudo.style.display = 'none';
    });

    // Desativa os botões visualmente
    const botoes = document.querySelectorAll('.tab-button');
    botoes.forEach(btn => btn.classList.remove('active'));

    // Mostra apenas a aba escolhida
    const abaAlvo = document.getElementById(aba);
    if (abaAlvo) {
        abaAlvo.classList.add('active');
        abaAlvo.style.display = 'block';
    }

    // Ativa o botão selecionado
    if (aba === 'cliente') {
        document.getElementById('btnCliente')?.classList.add('active');
    } else if (aba === 'gerente') {
        document.getElementById('btnGerente')?.classList.add('active');
        gerarQR();
    }
}

// Função para gerar o QR Code
function gerarQR() {
    const campoMesa = document.getElementById('numMesa');
    const mesa = campoMesa ? campoMesa.value || "1" : "1";
    
    // O teu link oficial do GitHub Pages
    const urlRealMesa = `https://italoizaque105-afk.github.io/cardapio-choperia-zero-grau/?mesa=${mesa}`;
    
    const imgQR = document.getElementById('imgQRCode');
    if (imgQR) {
        imgQR.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(urlRealMesa)}`;
    }
}

// Executa assim que o site abre
document.addEventListener("DOMContentLoaded", () => {
    // Garante que o cliente começa na aba do cardápio
    mudarAba('cliente');

    // Identifica se o cliente abriu pelo QR Code de uma mesa (ex: ?mesa=2)
    const urlParams = new URLSearchParams(window.location.search);
    const mesa = urlParams.get('mesa');

    if (mesa) {
        // Atualiza o subtítulo com o número da mesa do cliente
        const subtitulo = document.getElementById('subtituloMesa');
        if (subtitulo) subtitulo.innerText = `Você está na Mesa ${mesa}`;
        
        // Esconde o botão do Gerente para o cliente não tentar clicar
        const btnGerente = document.getElementById('btnGerente');
        if (btnGerente) btnGerente.style.display = 'none';
    }
});