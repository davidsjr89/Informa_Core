﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.Interface
{
    public interface ICargoDAO<T> : IConsultaDAO<T>, IPersistirDAO<T>
    {
    }
}
