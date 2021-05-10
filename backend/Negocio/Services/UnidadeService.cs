using Infra.Interface;
using Model.Entidades;
using Negocio.Interface;
using System.Collections.Generic;

namespace Negocio.Services
{
    public class UnidadeService : IUnidadeService<Unidade>
    {
        private readonly IUnidadeDAO<Unidade> _unidadeDAO;

        public UnidadeService(IUnidadeDAO<Unidade> unidadeDAO)
        {
            _unidadeDAO = unidadeDAO;
        }

        public void Apagar(Unidade entity)
        {
            _unidadeDAO.Apagar(entity);
        }

        public void Atualizar(Unidade entity)
        {
            _unidadeDAO.Atualizar(entity);
        }

        public Unidade CarregaPor(int id)
        {
            return _unidadeDAO.BuscarPor(id);
        }

        public IEnumerable<Unidade> CarregaTodos()
        {
            return _unidadeDAO.CarregaTodos();
        }

        public void Gravar(Unidade entity)
        {
            _unidadeDAO.Gravar(entity);
        }
    }
}
