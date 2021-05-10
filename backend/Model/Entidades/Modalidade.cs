using System.ComponentModel.DataAnnotations;

namespace Model.Entidades
{
    public class Modalidade
    {
        [Key]
        public int Id { get; set; }
        [MinLength(2)]
        [MaxLength(60)]
        public string Nome { get; set; }
        public bool Ativo { get; set; }
    }
}
