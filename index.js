let responsavel = "";
let lote = "";
let operacao = "";
let quantidade = 0;
let atual = 1;

function formatarDataHora() {
  const agora = new Date();
  const dia = String(agora.getDate()).padStart(2, "0");
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const ano = agora.getFullYear();
  const horas = String(agora.getHours()).padStart(2, "0");
  const minutos = String(agora.getMinutes()).padStart(2, "0");
  return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}

function irParaEtapa2() {
  responsavel = document.getElementById("responsavel").value.trim();
  lote = document.getElementById("lote").value.trim();
  operacao = document.getElementById("operacao").value;

  if (!responsavel || !lote || !operacao) {
    return alert("Preencha todos os campos para continuar.");
  }

  if (operacao === "Recebimento") {
    const dados = {
      responsavel,
      lote,
      operacao,
      peca: "-",
      resultado: "✔️",
      data: formatarDataHora()
    };
    enviarParaSheet(dados);
    mostrarEtapa("etapaFinal");
  } else {
    mostrarEtapa("etapa2");
  }
}

function irParaEtapa3() {
  quantidade = parseInt(document.getElementById("quantidade").value);
  if (isNaN(quantidade) || quantidade < 1) {
    return alert("Informe uma quantidade válida.");
  }

  atual = 1;
  atualizarTextoVerificacao();
  mostrarEtapa("etapa3");
}

function responder(resposta) {
  const dados = {
    responsavel,
    lote,
    operacao,
    peca: `Ioiô ${atual}`,
    resultado: resposta,
    data: formatarDataHora()
  };
  enviarParaSheet(dados);

  atual++;
  if (atual > quantidade) {
    mostrarEtapa("etapaFinal");
  } else {
    atualizarTextoVerificacao();
  }
}

function atualizarTextoVerificacao() {
  document.getElementById("textoVerificacao").textContent =
    `O ioiô ${atual} passou na operação "${operacao}"?`;
}

function mostrarEtapa(id) {
  document.querySelectorAll(".etapa").forEach(e => e.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function enviarParaSheet(dados) {
  fetch("https://api.sheetbest.com/sheets/bb524a33-3f07-473c-837b-a4a3f207bf46", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  }).catch(error => console.error("Erro ao enviar:", error));
}

function reiniciar() {
  location.reload();
}
