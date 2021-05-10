using Infra.BD;
using Infra.Interface;
using Microsoft.EntityFrameworkCore;
using Model.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra.DAO
{
    public class ModalidadeDAO : IModalidadeDAO<Modalidade>
    {
        private readonly DataContext _dataContext;

        public ModalidadeDAO(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void Apagar(Modalidade entity)
        {
            _dataContext.Modalidades.Remove(entity);
            salvarAlteracoes();
        }

        public void Atualizar(Modalidade entity)
        {
            var modalidade = _dataContext.Modalidades.AsNoTracking().FirstOrDefault(x => x.Nome == entity.Nome && x.Id != entity.Id);
            if (modalidade != null)
            {
                throw new Exception("Já existe item");
            }
            _dataContext.Update(entity);
            salvarAlteracoes();
        }

        public Modalidade BuscarPor(int id)
        {
            return _dataContext.Modalidades.AsNoTracking().FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<Modalidade> CarregaTodos()
        {
            return _dataContext.Modalidades.AsNoTracking().ToList();
        }

        public void Gravar(Modalidade entity)
        {
            var modalidade = _dataContext.Modalidades.AsNoTracking().FirstOrDefault(x => x.Nome == entity.Nome);
            if (modalidade != null)
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
