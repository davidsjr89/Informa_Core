using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio.Interface
{
    public interface IUsuarioService<T>: IPersistir<T>, IConsultaService<T>
    {
        T Login(T entity);
    }
}
