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
    h1Titulo.innerText = promocao.merchantName;
    var h2Titulo = document.createElement("h3");
    h2Titulo.innerText = promocao.merchantId;
    var p1 = document.createElement("p");
    var p2 = document.createElement("p");
    var p3 = document.createElement("p");
    var p4 = document.createElement("p");
    var p5 = document.createElement("p");

    p1.innerText = promocao.orders[0].orderId;
    p2.innerText = promocao.orders[0].orderUif;
    p3.innerText = promocao.orders[0].customerPhoneNumber;
    p4.innerText = promocao.orders[0].paymentValue;
    p5.innerText = promocao.orders[0].paid !== 0 ? true : false;
    var containerBotao = document.createElement("div");
    containerBotao.setAttribute("class", "container-botao");

    var link = document.createElement("a");
    link.setAttribute("href", promocao.enderecoUrl);
    link.innerHTML = "Eu quero agora";

    containerChamada.appendChild(h1Titulo);
    containerChamada.appendChild(h2Titulo);
    containerChamada.appendChild(p1);
    containerChamada.appendChild(p2);
    containerChamada.appendChild(p3);
    containerChamada.appendChild(p4);
    containerChamada.appendChild(p5);
    containerBotao.appendChild(link);

    containerPromo.appendChild(containerChamada);
    containerPromo.appendChild(containerBotao);

    container.appendChild(containerPromo);

});
var btnCadsbtnCadastrar = document.getElementById("BtnCadastrar");
if (btnCadsbtnCadastrar !== null) {
    btnCadsbtnCadastrar.addEventListener("click", function () {
        var merchantName = document.getElementById("Empresa").value;
        var merchantId = document.getElementById("EmpresaId").value;
        var orderId = document.getElementById("OrderId").value;
        var orderUif = document.getElementById("OrderUif").value;
        var customerPhoneNumber = document.getElementById("CustomerPhoneNumber").value;
        var paymentValue = document.getElementById("PaymentValue").value;
        var paid = document.getElementById("Paid").value;

        var orderPayment =
        {
            "MerchantId": merchantId,
            "MerchantName": merchantName,
            "orders": [
                {
                    "OrderId": orderId,
                    "orderUif": orderUif,
                    "customerPhoneNumber": customerPhoneNumber,
                    "paymentValue": paymentValue,
                    "paid": paid
                }]
        }

        connection.invoke("CadastrarPromocao", orderPayment)
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
