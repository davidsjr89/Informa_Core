using Infra.Interface;
using Model.Entidades;
using Negocio.Interface;
using System.Collections.Generic;

namespace Negocio.Services
{
    public class ColaboradorService : IColaboradorService<Colaborador>
    {
        private readonly IColaboradorDAO<Colaborador> _colaboradorDAO;

        public ColaboradorService(IColaboradorDAO<Colaborador> colaboradorDAO)
        {
            _colaboradorDAO = colaboradorDAO;
        }

        public void Apagar(Colaborador entity)
        {
            _colaboradorDAO.Apagar(entity);
        }

        public void Atualizar(Colaborador entity)
        {
            entity.DataCadastro = System.DateTime.Now;
            _colaboradorDAO.Atualizar(entity);
        }

        public Colaborador CarregaPor(int id)
        {
            return _colaboradorDAO.BuscarPor(id);
        }

        public IEnumerable<Colaborador> CarregaTodos()
        {
            return _colaboradorDAO.CarregaTodos();
        }

        public void Gravar(Colaborador entity)
        {
            entity.DataCadastro = System.DateTime.Now;
            _colaboradorDAO.Gravar(entity);
        }
    }
}
