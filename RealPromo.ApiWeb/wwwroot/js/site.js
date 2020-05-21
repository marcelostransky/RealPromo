// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/PromoHub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

//var connection = new signalR.HubConnectionBuilder().withUrl("/PromoHub").buid();

connection.start().then(function () {
    console.info("Conectado");
}).catch(
    function (err) {
        console.error(err.toString());
    }
);
connection.on("CadastradoSucesso", () => {

    var mensagem = document.getElementById("Mensagem");
    mensagem.innerHTML = "Promoção Cadastrado Com sucesso!";
})
connection.on("ReceberPromocao", function (promocao) {

    var container = document.getElementById("container-login");
    var containerPromo = document.createElement("div");
    containerPromo.setAttribute("class", "container-promo");
    var containerChamada = document.createElement("div");
    containerChamada.setAttribute("class", "container-chamada");
    var h1Titulo = document.createElement("h1");
    h1Titulo.innerText = promocao.empresa;
    var p1 = document.createElement("p");
    var p2 = document.createElement("p");
    p1.innerText = promocao.chamada;
    p2.innerText = promocao.regras;
    var containerBotao = document.createElement("div");
    containerBotao.setAttribute("class", "container-botao");

    var link = document.createElement("a");
    link.setAttribute("href", promocao.enderecoUrl);
    link.innerHTML = "Eu quero agora";

    containerChamada.appendChild(h1Titulo);
    containerChamada.appendChild(p1);
    containerChamada.appendChild(p2);
    containerBotao.appendChild(link);

    containerPromo.appendChild(containerChamada);
    containerPromo.appendChild(containerBotao);

    container.appendChild(containerPromo);

});
var btnCadsbtnCadastrar = document.getElementById("BtnCadastrar");
if (btnCadsbtnCadastrar !== null) {
    btnCadsbtnCadastrar.addEventListener("click", function () {
        var empresa = document.getElementById("Empresa").value;
        var chamada = document.getElementById("Chamada").value;
        var regras = document.getElementById("Regras").value;
        var enderecoUrl = document.getElementById("EnderecoUrl").value;

        var promocao = { empresa, chamada, regras, enderecoUrl };

        connection.invoke("CadastrarPromocao", promocao)
            .then(function () {
                console.info("Cadastrado com sucesso");
            })
            .catch(function (err) {
                console.error(err.toString());
            }
            );

       
        //TODO - SignalR Cahamar o Cadastro de promocao
    })
}
// Write your JavaScript code.
