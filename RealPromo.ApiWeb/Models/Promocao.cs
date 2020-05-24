using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealPromo.ApiWeb.Models
{
    public class Promocao
    {
        public string Empresa { get; set; }
        public string Chamada { get; set; }
        public string Regras { get; set; }
        public string EnderecoUrl { get; set; }
    }

    public class OrderDTO
    {

        public string OrderId { get; set; }
        public string OrderUif { get; set; }
        public string CustomerPhoneNumber { get; set; }
        public string PaymentValue { get; set; }
        public string Paid { get; set; }

    }
    public class MerchantOrderDTO
    {
        public string  MerchantId { get; set; }
        public string MerchantName { get; set; }
        public List<OrderDTO> Orders { get; set; }

    }
}
