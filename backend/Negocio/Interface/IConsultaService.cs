using Model.Entidades;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio.Interface
{
    public interface IConsultaService<T>
    {
        T CarregaPor(int id);
        IEnumerable<T> CarregaTodos(); 
    }
}
