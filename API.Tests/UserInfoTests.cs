using API.Classes;
using API.Context;
using HtmlAgilityPack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using System.Linq;
using System.Threading.Tasks;

namespace API.Tests
{

    [TestFixture]
    public class UserInfoTests
    {
        private MyWebApiContext _context;
        private DbContextOptionsBuilder<MyWebApiContext> _optionsBuilder;
        private IConfiguration _configuration;
        
        [SetUp]
        public void SetUp()
        {
            _configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            _optionsBuilder = new DbContextOptionsBuilder<MyWebApiContext>();
            _optionsBuilder.UseNpgsql(_configuration.GetConnectionString("PostGresSQL"));
            _context = new MyWebApiContext(_optionsBuilder.Options);
        }

        [Test]
        public async Task GetUserInfo()
        {
            // Act
            var results = await _context.Users.ToListAsync();

           // Arrange

            // Assert
            Assert.IsNotNull(results);
        }
    }
}