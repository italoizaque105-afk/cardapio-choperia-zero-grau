// Função para alternar entre as abas (com proteção por senha para o Gerente)
function mudarAba(aba) {
    if (aba === 'gerente') {
        const senha = prompt("Digite a senha de acesso do Gerente:");
        
        // Verificação da senha (2008)
        if (senha !== "2008") { 
            alert("Senha incorreta! Acesso negado.");
            return; // Bloqueia o acesso se a senha estiver incorreta
        }
    }

    // Esconde todos os conteúdos de abas e desativa o estado visual dos botões
    const conteudos = document.querySelectorAll('.tab-content');
    const botoes = document.querySelectorAll('.tab-button');
    
    conteudos.forEach(conteudo => conteudo.classList.remove('active'));
    botoes.forEach(botao => botao.classList.remove('active'));

    // Ativa a aba selecionada
    const abaSelecionada = document.getElementById(aba);
    if (abaSelecionada) {
        abaSelecionada.classList.add('active');
    }

    // Marca o botão correspondente como ativo
    const botaoAtivo = Array.from(botoes).find(b => b.getAttribute('onclick')?.includes(aba));
    if (botaoAtivo) {
        botaoAtivo.classList.add('active');
    }
}

// Função para gerar o QR Code da mesa com o teu link oficial
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

// Executa apenas ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    // Garante que o site SEMPRE abre na aba do Cliente por padrão
    mudarAba('cliente');

    // Se estiver na aba do gerente e o botão de gerar QR existir, gera a imagem inicial
    if (document.getElementById('imgQRCode')) {
        gerarQR();
    }
});