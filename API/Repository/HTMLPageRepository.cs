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

        public HTMLPageRepository(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public async Task<List<HTMLPage>> GetAllAsync()
        {
            var optionsBuilder = new DbContextOptionsBuilder<MyWebApiContext>();
            optionsBuilder.UseNpgsql(Configuration.GetConnectionString("PostGresSQL"));

            using (var context = new MyWebApiContext(optionsBuilder.Options))
            {
                return await context.HTMLPages.ToListAsync();
            }
        }

        public async Task<HTMLPage> GetSingleAsync(string Title)
        {
            var optionsBuilder = new DbContextOptionsBuilder<MyWebApiContext>();
            optionsBuilder.UseNpgsql(Configuration.GetConnectionString("PostGresSQL"));

            using (var context = new MyWebApiContext(optionsBuilder.Options))
            {
                return await context.HTMLPages.FirstOrDefaultAsync(x=> x.Title == Title);
            }
        }
    }
}
