﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Interface
{
    public interface IPersistirDAO<T>
    {
        void Gravar(T entity);
        void Atualizar(T entity);
        void Apagar(T entity);
    }
}
