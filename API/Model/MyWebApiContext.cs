using API.Classes;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Context
{
    public class MyWebApiContext : DbContext
    {
        public MyWebApiContext(DbContextOptions<MyWebApiContext> options) : base(options) { }
        public DbSet<UserInfo> Users { get; set; }
        public DbSet<HTMLPage> HTMLPages { get; set; }

    }
}
