using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Classes;
using API.Repository;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace API.Controllers
{
    public class BaseController : Controller
    {
        public IConfiguration Configuration { get; }
        public JsonSerializerSettings _settings { get; }
        public ILogger _logger { get; }

       public BaseController(IConfiguration configuration, ILogger<object> logger)
        {
            Configuration = configuration;
            _settings = new JsonSerializerSettings();
            _settings.Formatting = Formatting.Indented;
            _settings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            _logger = logger;
        }
    }
}
