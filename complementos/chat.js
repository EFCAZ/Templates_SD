// Inicializa o nome do usuário
let nomeUsuario = localStorage.getItem("nomeUsuario") || "";

// Atualiza mensagens que usam o nome do usuário
function atualizarMensagens() {
    mensagens.saudacao_efcaz = `Seja bem-vindo à Central de Suporte EFCAZ. Eu sou ${nomeUsuario} e irei realizar seu atendimento.\nComo posso te ajudar hoje? 😊`;
    mensagens.saudacao_besign = `Seja bem-vindo à Central de Suporte BESIGN. Eu sou ${nomeUsuario} e irei realizar seu atendimento.\nComo posso te ajudar hoje? 😊`;
}

function atualizarNomeSpan() {
    const span = document.getElementById("nome_usuario");
    if (span) {
        span.textContent = nomeUsuario;
    }
}

function atualizarNomeLigacao() {
    const span = document.getElementById("nome_usuario_ligacao");
    if (span) {
        span.textContent = nomeUsuario;
    }
}

// Função para trocar o nome
function trocarNome() {
    const novoNome = prompt("Digite seu nome:", nomeUsuario);
    if (novoNome && novoNome.trim() !== "") {
        nomeUsuario = novoNome.trim();
        localStorage.setItem("nomeUsuario", nomeUsuario);
        atualizarMensagens();    // atualiza mensagens dinâmicas
        atualizarNomeSpan();     // atualiza o span imediatamente
        atualizarNomeLigacao();
        mostrarNotificacao(`✔ Nome atualizado para ${nomeUsuario}`);
    }
}

// Notificação
function mostrarNotificacao(mensagem, sucesso = true) {
    const container = document.getElementById("notificacao");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.style.background = sucesso ? "#4caf50" : "#c62828";
    toast.textContent = mensagem;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Mensagens iniciais
const mensagens = {
    saudacao_efcaz: "",
    saudacao_besign: "",
    solicitacao_info: `Para que eu possa te ajudar, preciso que você me passe algumas informações:\n\n• Qual link de site você está usando?\n• CNPJ:\n• Seu nome:\n• Seu e-mail`,
    pedido_espera: "Obrigada pelas informações, aguarde só um instante enquanto eu ",
    indicar_kb: "Nós temos na nossa base de conhecimento um passo a passo de como fazer esse processo:\nXXXXXXX\n\nPor favor, faça conforme descrito nesse guia e conseguirá XXXXXXX corretamente.\nE se precisar, me chama que eu te ajudo tá bom?",
    envio_n2: "Vi que essa solicitação vai precisar passar pela análise do time de segundo nível.\nEncaminhei o chamado para eles e assim que tivermos uma resposta, iremos notificar por e-mail e ligação telefônica.",
    finalizar: "Se você tiver mais dúvidas, por favor nos retorne. Seu chamado será encaminhado via e-mail. Ajudo em algo mais?",
    pesquisa: "Além disso, você irá receber uma pesquisa de satisfação do meu atendimento em seu e-mail, agradeço se puder nos deixar sua avaliação. Sua opinião faz toda a diferença para nós. 💙 💜\n\nQuando tiver um tempinho nos avalie no Google 😉\nEsse é o link: https://g.page/r/CenXqb9lW9MGEAE/review",
    contato: "Nosso atendimento funciona de segunda a sexta-feira, das 8h30 às 17h30.\n\nSempre que precisar, você pode nos contatar por um dos canais abaixo:\n\n📧 E-mail: suporte@efcaz.com.br\n📱 WhatsApp: +55 (11) 5330-1518\n📞 Ligação: +55 (11) 5043-6383\n💬 Chat: disponível diretamente na plataforma"
};

// Inicializa mensagens e span
atualizarMensagens();
document.addEventListener("DOMContentLoaded", () => {
    atualizarNomeSpan();
    atualizarNomeLigacao();

    // Copiar textos dos artigos (Chat e Ligação)
    const articles = document.querySelectorAll("#chat_container article[data-key], #ligacao_container article[data-key]");
    articles.forEach(article => {
        article.addEventListener("click", () => {
            const key = article.getAttribute("data-key");
            const texto = mensagens[key];
            if (!texto) {
                mostrarNotificacao("✖ Nenhum texto configurado", false);
                return;
            }
            navigator.clipboard.writeText(texto)
                .then(() => mostrarNotificacao("✔ Texto copiado"))
                .catch(() => mostrarNotificacao("✖ Erro ao copiar texto", false));
        });
    });
});
