using Microsoft.AspNetCore.SignalR.Client;
using RealPromoMobile.Model;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace RealPromoMobile.Services
{
    public class RealPromoSignalR
    {
        public RealPromoSignalR(ObservableCollection<Promocao> lista)
        {

            Task.Run(async () => { await ConfigurarSignalR(lista); });

        }

        private async Task ConfigurarSignalR(ObservableCollection<Promocao> lista)
        {
            var connection = new HubConnectionBuilder()
                .WithUrl("https://realpromocaoapiweb.azurewebsites.net/PromoHub")
                .WithAutomaticReconnect(new[] { TimeSpan.Zero, TimeSpan.FromSeconds(3000), TimeSpan.FromSeconds(5000), TimeSpan.FromSeconds(10000) })
                .Build();

            connection.On<Promocao>("ReceberPromocao", (promocao) =>
              {
                  Device.InvokeOnMainThreadAsync(() =>
                  {
                      lista.Add(promocao);
                  });

              });
            await connection.StartAsync();
        }
    }
}
