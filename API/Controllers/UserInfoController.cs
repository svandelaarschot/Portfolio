using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Classes;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class UserInfoController : BaseController
    {
        public UserInfoController(IConfiguration configuration, ILogger<UserInfo> logger) : base(configuration, logger)
        {

        }

        [HttpPost]
        public JsonResult PostUserInfo([FromBody] List<UserInfo> userInfo)
        {
            var jsonContent = JsonConvert.SerializeObject(userInfo, Formatting.Indented);
            var Result = new
            {
                Cards = jsonContent,
                Saved = true
            };

            return Json(Result);
        }
    }
}
