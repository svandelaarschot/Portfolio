using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Middleware
{
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;
        public RequestLoggingMiddleware(RequestDelegate next, ILoggerFactory loggerFactory)
        {
            _next = next;
            _logger = loggerFactory.CreateLogger<RequestLoggingMiddleware>();
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            finally
            {
                StringBuilder sbHeaders = new StringBuilder();
                foreach (var item in context.Response?.Headers)
                {
                    sbHeaders.AppendFormat("{{ {0}{1} }}\n", item.Key, item.Value);
                }

                StringBuilder sbQueryString = new StringBuilder();
                foreach (var item in context.Request.Query)
                {
                    sbQueryString.AppendFormat("{{ {0}={1} }}\n", item.Key, item.Value);
                }


                _logger.LogInformation(
                    "\nMethod:{method}\nURL: {url}\nStatusCode: {statusCode}\n\nQueryStringParams:\n{QueryStringParams}\n\nHeaders:\n{Headers}",
                    context.Request?.Method,
                    context.Request?.Path.Value,
                    context.Response?.StatusCode,
                    sbQueryString.ToString(),
                    sbHeaders.ToString()
                    );
            }
        }
    }
}
