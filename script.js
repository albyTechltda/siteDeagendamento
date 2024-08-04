async function obterDadosFormulario() {
    const servico = document.getElementById('servico').value;
    return {
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        horario: document.getElementById('horario').value,
        servico: servico,
        barbeiro: document.getElementById('barbeiro').value,
        valor: obterValorServico(servico) // Adiciona o valor do serviço
    };
}

function obterValorServico(servico) {
    // Mapeia os valores dos serviços
    const valores = {
        'corte-simples': 30.00,
        'corte-navalha': 50.00,
        'barba-simples': 20.00,
        'pacote-completo': 80.00
    };
    return valores[servico] || 0.00; // Retorna o valor correspondente ou 0.00 se não encontrado
}

async function enviarDadosParaApi(dados) {
    try {
        const resposta = await fetch('http://localhost:3000/api/agendamento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (!resposta.ok) {
            throw new Error('Erro ao enviar os dados para a API');
        }

        return await resposta.json();
    } catch (erro) {
        console.error(erro);
        alert('Erro ao enviar os dados para a API');
    }
}

async function enviarAgendamento() {
    // Obtendo os dados do formulário
    const dados = await obterDadosFormulario();
    
    // Enviando os dados para a API
    await enviarDadosParaApi(dados);

    // Substituindo pelo número correto
    const numeroWhatsApp = '985959231'; // Número de WhatsApp fornecido

    // Criando a mensagem codificada para o WhatsApp
    const mensagem = `Olá, desejo confirmar meu agendamento. Caso sim, só enviar essa mensagem para nós.\n\nNome: ${dados.nome}\nTelefone: ${dados.telefone}\nHorário: ${dados.horario}\nServiço: ${dados.servico}\nBarbeiro: ${dados.barbeiro}\nValor: R$ ${dados.valor.toFixed(2)}`;
    const mensagemCodificada = encodeURIComponent(mensagem);

    // Criando o link do WhatsApp
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

    // Abre o link do WhatsApp em uma nova aba
    window.open(linkWhatsApp, );
}
