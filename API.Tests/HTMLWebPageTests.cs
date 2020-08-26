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
        private DbContextOptionsBuilder<MyWebApiContext> optionsBuilder;
        private IConfiguration configuration;
        [SetUp]
        public void SetUp()
        {
            configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            optionsBuilder = new DbContextOptionsBuilder<MyWebApiContext>();
            optionsBuilder.UseNpgsql(configuration.GetConnectionString("PostGresSQL"));
            _context = new MyWebApiContext(optionsBuilder.Options);

        }

        [Test]
        public async Task GetHTMLPageByTitle()
        {
            // Act
            using (var context = new MyWebApiContext(optionsBuilder.Options))
            {
                // Arrange
                var result = await context.HTMLPages.FirstOrDefaultAsync(x => x.Title == "AboutMe");

                // Assert
                Assert.IsTrue(result != null);
            }
        }
    }
}