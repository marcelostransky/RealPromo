using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RealPromo.ApiWeb.Models;

namespace RealPromo.ApiWeb.Controllers
{
    public class HomeController : Controller
    {
       public IActionResult Index()
        {
            return View();
        }
        public IActionResult Promocao()
        {
            return View();
        }

        public IActionResult CadastrarPromocao()
        {
            return View();
        }
    }
}