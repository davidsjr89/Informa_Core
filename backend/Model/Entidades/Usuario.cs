using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Model.Entidades
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; }
        [MinLength(2)]
        [MaxLength(60)]
        public string Nome { get; set; }
        [MinLength(2)]
        [MaxLength(50)]
        [DataType(DataType.Password)]
        public string Senha { get; set; }
        [MinLength(2)]
        [MaxLength(15)]
        public string Roles { get; set; }
        public bool Ativo { get; set; }
    }
}
