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
    public class HTMLPageController : BaseController
    {
        private HTMLPageRepository _repository { get; }

        public HTMLPageController(IConfiguration configuration, ILogger<HTMLPage> logger) : base(configuration, logger)
        {
            _repository = new HTMLPageRepository(Configuration);
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
