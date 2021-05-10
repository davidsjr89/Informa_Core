using Infra.BD;
using Infra.Interface;
using Microsoft.EntityFrameworkCore;
using Model.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Infra.DAO
{
    public class UnidadeDAO : IUnidadeDAO<Unidade>
    {
        private readonly DataContext _dataContext;

        public UnidadeDAO(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void Apagar(Unidade entity)
        {
            _dataContext.Unidades.Remove(entity);
            salvarAlteracoes();
        }

        public void Atualizar(Unidade entity)
        {
            _dataContext.Unidades.Update(entity);
            salvarAlteracoes();
        }

        public Unidade BuscarPor(int id)
        {
            return _dataContext.Unidades.AsNoTracking().FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<Unidade> CarregaTodos()
        {
            return _dataContext.Unidades.AsNoTracking().ToList();
        }

        public void Gravar(Unidade entity)
        {
            _dataContext.Unidades.Add(entity);
            salvarAlteracoes();
        }

        private void salvarAlteracoes()
        {
            try
            {
                _dataContext.SaveChanges();
            }
            catch (Exception)
            {
                _dataContext.Database.RollbackTransaction();
            }
        }
    }
}
