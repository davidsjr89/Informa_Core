using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Entidades
{
    public class Colaborador
    {
        [Key]
        public int Id { get; set; }
        [MinLength(2)]
        [MaxLength(60)]
        public string Nome { get; set; }
        [DataType(DataType.Date)]
        public DateTime DataNascimento { get; set; }
        [MinLength(11)]
        [MaxLength(11)]
        public string CPF { get; set; }
        [MinLength(9)]
        [MaxLength(9)]
        public string RG { get; set; }
        [MinLength(2)]
        [MaxLength(60)]
        public string Endereco { get; set; }
        [MinLength(10)]
        [MaxLength(11)]
        public string Telefone { get; set; }
        public int CargoId { get; set; }
        [MinLength(1)]
        [MaxLength(6)]
        public string Numero { get; set; }
        [MinLength(2)]
        [MaxLength(30)]
        public string Bairro { get; set; }
        [MinLength(2)]
        [MaxLength(30)]
        public string Cidade { get; set; }
        [MinLength(2)]
        [MaxLength(25)]
        public string Estado { get; set; }
        [MinLength(8)]
        [MaxLength(8)]
        public string CEP { get; set; }
        [MinLength(2)]
        [MaxLength(50)]
        public string Email { get; set; }
        [DataType(DataType.Date)]
        public DateTime DataCadastro { get; set; }
        public bool Ativo { get; set; }
        public Cargo Cargo { get; set; }
    }
}
