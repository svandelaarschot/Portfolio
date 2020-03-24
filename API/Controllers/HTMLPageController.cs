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
    [Route("api/[controller]")]
    [ApiController]
    public class HTMLPageController : Controller
    {
        public IConfiguration Configuration { get; }
        private HTMLPageRepository _repository { get; }
        private JsonSerializerSettings _settings { get; }
        private ILogger _logger { get; }

        public HTMLPageController(IConfiguration configuration, ILogger<HTMLPage> logger)
        {
            Configuration = configuration;
            _repository = new HTMLPageRepository(Configuration);
            _settings = new JsonSerializerSettings();
            _settings.Formatting = Formatting.Indented;
            _settings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            _logger = logger;
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetAsync([FromQuery] string Name)
        {
            if(string.IsNullOrEmpty(Name))
            {
                var WebPages = await _repository.GetAllAsync();
                return Ok(WebPages);
            }
            else
            {
                var WebPage = await _repository.GetSingleAsync(Name);
                if(WebPage != null)
                {
                    return Ok(WebPage);
                } 
                else
                {
                    return NotFound("Page not found!");
                }
            }
        }
    }
}
