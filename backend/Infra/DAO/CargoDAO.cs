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
    public class CargoDAO : ICargoDAO<Cargo>
    {
        private readonly DataContext _dataContext;

        public CargoDAO(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public void Apagar(Cargo entity)
        {
            _dataContext.Cargos.Remove(entity);
            salvarAlteracoes();
        }

        public void Atualizar(Cargo entity)
        {
            var cargo = _dataContext.Cargos.AsNoTracking().FirstOrDefault(x => x.Nome == entity.Nome && x.Id != entity.Id);
            if (cargo != null)
            {
                throw new Exception("Já existe item");
            }
            _dataContext.Update(entity);
            salvarAlteracoes();
        }

        public Cargo BuscarPor(int id)
        {
            return _dataContext.Cargos.AsNoTracking().FirstOrDefault(x => x.Id == id);
        }

        public IEnumerable<Cargo> CarregaTodos()
        {
            return _dataContext.Cargos.AsNoTracking().ToList();
        }

        public void Gravar(Cargo entity)
        {
            var cargo = _dataContext.Cargos.AsNoTracking().FirstOrDefault(x => x.Nome == entity.Nome);
            if (cargo != null)
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
