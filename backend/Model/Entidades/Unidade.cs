using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Entidades
{
    public class Unidade
    {
        [Key]
        public int Id { get; set; }
        [MinLength(2)]
        [MaxLength(60)]
        public string Nome { get; set; }
        [MinLength(10)]
        [MaxLength(11)]
        public string Telefone { get; set; }
        [MinLength(8)]
        [MaxLength(8)]
        public string Cep { get; set; }
        [MinLength(3)]
        [MaxLength(80)]
        public string Endereco { get; set; }
        [MinLength(1)]
        [MaxLength(10)]
        public string Numero { get; set; }
        [MinLength(2)]
        [MaxLength(50)]
        public string Bairro { get; set; }
        [MinLength(2)]
        [MaxLength(30)]
        public string Cidade { get; set; }
        [MinLength(2)]
        [MaxLength(15)]
        public string Estado { get; set; }
        [MinLength(0)]
        public string JurosMensal { get; set; }
        public bool Ativo { get; set; }
    }
}
