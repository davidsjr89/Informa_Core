using Infra.Interface;
using Model.Entidades;
using Negocio.Interface;
using System.Collections.Generic;

namespace Negocio.Services
{
    public class ModalidadeService : IModalidadeService<Modalidade>
    {
        private readonly IModalidadeDAO<Modalidade> _modalidadeDAO;

        public ModalidadeService(IModalidadeDAO<Modalidade> modalidadeDAO)
        {
            _modalidadeDAO = modalidadeDAO;
        }

        public void Apagar(Modalidade entity)
        {
            _modalidadeDAO.Apagar(entity);
        }

        public void Atualizar(Modalidade entity)
        {
            _modalidadeDAO.Atualizar(entity);
        }

        public Modalidade CarregaPor(int id)
        {
            return _modalidadeDAO.BuscarPor(id);
        }

        public IEnumerable<Modalidade> CarregaTodos()
        {
            return _modalidadeDAO.CarregaTodos();
        }

        public void Gravar(Modalidade entity)
        {
            _modalidadeDAO.Gravar(entity);
        }
    }
}
