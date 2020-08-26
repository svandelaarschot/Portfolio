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
    public class HTMLWebPageTests
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
        public async Task GetHTMLPageByTitle()
        {
            // Act
            var title = "AboutMe";
            var result = await _context.HTMLPages.FirstOrDefaultAsync(x => x.Title == title);

           // Arrange

            // Assert
            Assert.AreEqual(result.Title, title);
        }
    }
}