using RealPromoMobile.Model;
using RealPromoMobile.Services;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace RealPromoMobile
{
    // Learn more about making custom code visible in the Xamarin.Forms previewer
    // by visiting https://aka.ms/xamarinforms-previewer
    [DesignTimeVisible(false)]
    public partial class MainPage : ContentPage
    {
        ObservableCollection<Promocao> lista = new ObservableCollection<Promocao>();
        public MainPage()
        {
            InitializeComponent();

            new RealPromoSignalR(lista);
            ListViewPromocao.ItemsSource = lista;

            //Device.StartTimer(TimeSpan.FromSeconds(10), () =>
            // {
            //     lista.Add(new Promocao { Empresa = "Fiat", Chamada = "Palio 5555", EnderecoUrl = "https://fiat.com.br", Regras = "30% desconto" + DateTime.Now.ToString() });

            //     return true;
            // });
        }

        private void GetPromocoes()
        {

            lista.Add(new Promocao { Empresa = "Fiat", Chamada = "Palio 5555", EnderecoUrl = "https://fiat.com.br", Regras = "30% desconto" });
            lista.Add(new Promocao { Empresa = "Padaria seu Manoel", Chamada = "Pao", EnderecoUrl = "https://pao.com.br", Regras = "30% desconto" });

        }
    }
}
