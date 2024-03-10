using Coffee_Tracker_Angular.Models;
using Microsoft.EntityFrameworkCore;

namespace Coffee_Tracker_Angular.Database
{
    public class CoffeeContext : DbContext
    {
        public CoffeeContext( DbContextOptions<CoffeeContext> options ) : base(options) { }

        public DbSet<CoffeeRecords> CoffeeRecords { get; set; }
    }
}
