using Microsoft.EntityFrameworkCore;
using Model.Entidades;

namespace Infra.BD
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions options): base(options){}
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Unidade> Unidades { get; set; }
        public DbSet<Modalidade> Modalidades { get; set; }
        public DbSet<Cargo> Cargos { get; set; }
        public DbSet<Colaborador> Colaboradores { get; set; }
    }
}
