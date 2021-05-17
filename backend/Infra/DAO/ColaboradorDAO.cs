using Infra.BD;
using Infra.Interface;
using Microsoft.EntityFrameworkCore;
using Model.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Infra.DAO
{
    public class ColaboradorDAO : IColaboradorDAO<Colaborador>
    {
        private readonly DataContext _dataContext;

        public ColaboradorDAO(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void Apagar(Colaborador entity)
        {
            _dataContext.Colaboradores.Remove(entity);
            salvarAlteracoes();
        }

        public void Atualizar(Colaborador entity)
        {
            var colaborador = _dataContext.Colaboradores.AsNoTracking().FirstOrDefault(x => x.Nome == entity.Nome && x.Id != entity.Id);
            if (colaborador != null)
            {
                throw new Exception("Já existe item");
            }
            _dataContext.Update(entity);
            salvarAlteracoes();
        }

        public Colaborador BuscarPor(int id)
        {
            return _dataContext.Colaboradores.Include(c => c.Cargo).AsNoTracking().FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<Colaborador> CarregaTodos()
        {
            return _dataContext.Colaboradores.Include(c => c.Cargo).AsNoTracking().ToList();
        }

        public void Gravar(Colaborador entity)
        {
            var colaborador = _dataContext.Colaboradores.AsNoTracking().FirstOrDefault(x => x.Nome == entity.Nome && x.CPF == entity.CPF);
            if (colaborador != null)
            {
                throw new Exception("Já existe item");
            }
            _dataContext.Add(entity);
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
