using API.Classes;
using API.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repository
{
    public class HTMLPageRepository
    {
        private readonly IConfiguration Configuration;
        private readonly DbContextOptionsBuilder<MyWebApiContext> optionsBuilder;

        public HTMLPageRepository(IConfiguration configuration)
        {
            Configuration = configuration;
            optionsBuilder = new DbContextOptionsBuilder<MyWebApiContext>();
            optionsBuilder.UseNpgsql(Configuration.GetConnectionString("PostGresSQL"));
        }

        public async Task<List<HTMLPage>> GetAllAsync()
        {
            using (var context = new MyWebApiContext(optionsBuilder.Options))
            {
                return await context.HTMLPages.ToListAsync();
            }
        }

        public async Task<HTMLPage> GetSingleAsync(string Title)
        {
            using (var context = new MyWebApiContext(optionsBuilder.Options))
            {
                return await context.HTMLPages.FirstOrDefaultAsync(x=> x.Title == Title);
            }
        }
    }
}
