    document.addEventListener("DOMContentLoaded", () => {
      const modal = document.getElementById("modalEnvio");
      const fecharModal = document.getElementById("fecharModal");
      const form = document.getElementById("formEnvio");
      const modalTitulo = modal.querySelector("h3"); // seleciona o h3 dentro do modal
      const notificacao = document.getElementById("notificacao");

      function mostrarNotificacao(msg, sucesso = true) {
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.style.background = sucesso ? "#4caf50" : "#c62828";
        toast.textContent = msg;
        notificacao.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

      // Função para configurar o modal de acordo com o envio
    function abrirModal(tipo) {
        form.innerHTML = ""; // limpa formulário

        if (tipo === "n2") {
          modalTitulo.textContent = "Enviar para N2";
          form.innerHTML = `
              <input type="text" id="titulo" placeholder="Título">
              <input type="text" id="tenant" placeholder="Tenant">
              <input type="url" id="url" placeholder="Link Jira">
              <input type="text" id="ticket" placeholder="Ticket">
             <button type="submit">Copiar texto</button>
          `;
      } else if (tipo === "representante") {
          modalTitulo.textContent = "Adicionar representante";
          form.innerHTML = `
            <input type="text" id="nome_cliente" placeholder="Nome do cliente">
            <input type="text" id="razao_social" placeholder="Razão social">
            <input type="text" id="cnpj" placeholder="CNPJ">
            <button type="submit">Copiar texto</button>
          `;
      } else if (tipo == "cancelar") {
          modalTitulo.textContent = "Cancelar solicitação";
          form.innerHTML = `
            <input type="text" id="ticket" placeholder="Ticket">
            <textarea id="motivo" placeholder="Escreva o motivo do cancelamento"></textarea>
            <button type="submit">Copiar texto</button>
          `;
      }

      modal.style.display = "flex";
    }

      // Abrir modal ao clicar nos artigos
    document.querySelector("article[data-key='n2']").addEventListener("click", () => abrirModal("n2"));
    document.querySelector("article[data-key='representante']").addEventListener("click", () => abrirModal("representante"));
    document.querySelector("article[data-key='cancelar']").addEventListener("click", () => abrirModal("cancelar"));

      // Fechar modal
    fecharModal.addEventListener("click", () => {
        modal.style.display = "none";
        form.reset();
    });

    window.addEventListener("click", e => {
        if (e.target === modal) {
          modal.style.display = "none";
          form.reset();
      }
    });

      // Submeter formulário
    form.addEventListener("submit", e => {
        e.preventDefault();

        if (document.getElementById("titulo")) { // N2
          const titulo = document.getElementById("titulo").value.trim();
          const tenant = document.getElementById("tenant").value.trim();
          const url = document.getElementById("url").value.trim();
          const ticket = document.getElementById("ticket").value.trim();

          if (!titulo || !tenant || !url || !ticket) {
            mostrarNotificacao("Preencha todos os campos", false);
            return;
        }

        const texto = `Olá Ana, só para avisar que estou enviando um chamado no Jira.\n\n${titulo}\n${tenant}\n${url}\n${ticket}`;

        navigator.clipboard.writeText(texto)
        .then(() => {
          mostrarNotificacao("✔ Texto copiado!");
          modal.style.display = "none";
          form.reset();
        })
        .catch(() => mostrarNotificacao("✖ Erro ao copiar texto", false));

        } else if (document.getElementById("nome_cliente")) { // Representante
          const nome_cliente = document.getElementById("nome_cliente").value.trim();
          const razao_social = document.getElementById("razao_social").value.trim();
          const cnpj = document.getElementById("cnpj").value.trim();

          if (!nome_cliente || !razao_social || !cnpj) {
            mostrarNotificacao("Preencha todos os campos", false);
            return;
        }

        const texto = `Olá ${nome_cliente}, 

    Você recebeu um convite para atuar como representante da empresa ${razao_social} ( ${cnpj} ) no Portal EFCAZ. 

    Por meio desse acesso, será possível gerenciar informações cadastrais, enviar documentos e acompanhar solicitações da empresa diretamente na plataforma.

    Para aceitar o convite e ativar seu acesso, basta seguir as instruções enviadas no e-mail de cadastro.

    Caso tenha qualquer dificuldade, nosso atendimento funciona de segunda a sexta-feira, das 8h30 às 17h30:
    Sempre que precisar, você pode nos contatar por um dos canais abaixo:

    📧 E-mail: suporte@efcaz.com.br
    📱 WhatsApp: +55 (11) 5330-1518
    📞 Ligação: +55 (11) 5043-6383
    💬 Chat: disponível diretamente na plataforma

    Atenciosamente,
        Kethllen – Suporte Portal EFCAZ`;

        navigator.clipboard.writeText(texto)
        .then(() => {
          mostrarNotificacao("✔ Texto copiado!");
          modal.style.display = "none";
          form.reset();
      })
        .catch(() => mostrarNotificacao("✖ Erro ao copiar texto", false));
    }

    else if (document.getElementById("ticket")) { // Cancelar
          const ticket = document.getElementById("ticket").value.trim();
          const motivo = document.getElementById("motivo").value.trim();

          if (!ticket || !motivo) {
            mostrarNotificacao("Preencha todos os campos", false);
            return;
        }

        const texto = `Cancelado pelo Suporte TI: ${ticket}. Motivo: ${motivo}.`;

        navigator.clipboard.writeText(texto)
        .then(() => {
          mostrarNotificacao("✔ Texto copiado!");
          modal.style.display = "none";
          form.reset();
        })
        .catch(() => mostrarNotificacao("✖ Erro ao copiar texto", false));

        }
    });
});
