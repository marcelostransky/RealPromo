using Microsoft.AspNetCore.SignalR;
using RealPromo.ApiWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealPromo.ApiWeb.Hubs
{
    public class PromoHub : Hub
    {
       /*
        * Client - js/c#/java
        * rpc
        * cliente(js) -> hub  (Funcionario)  (cadastrar promoção)
        * hub -> cliente      (Receber Promoção)
        */

        public async Task CadastrarPromocao(MerchantOrderDTO orderPayment)
        {
            /*
             * Banco
             * Queue/Sheduler
             * Notificar o Usuario (SignalR)
             */
            var pro = orderPayment;

            await Clients.Caller.SendAsync("CadastradoSucesso");  //Notificar caller -> cadastro realizado com sucesso
            await Clients.Others.SendAsync("ReceberPromocao", orderPayment); //Notificar que a promoção chegou
        }
    }
}
