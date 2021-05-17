using Infra.Interface;
using Model.Entidades;
using Negocio.Interface;
using System.Collections.Generic;

namespace Negocio.Services
{
    public class CargoService : ICargoService<Cargo>
    {
        private readonly ICargoDAO<Cargo> _cargoDAO;

        public CargoService(ICargoDAO<Cargo> cargoDAO)
        {
            _cargoDAO = cargoDAO;
        }

        public void Apagar(Cargo entity)
        {
            _cargoDAO.Apagar(entity);
        }

        public void Atualizar(Cargo entity)
        {
            _cargoDAO.Atualizar(entity);
        }

        public Cargo CarregaPor(int id)
        {
            return _cargoDAO.BuscarPor(id);
        }

        public IEnumerable<Cargo> CarregaTodos()
        {
            return _cargoDAO.CarregaTodos();
        }

        public void Gravar(Cargo entity)
        {
            _cargoDAO.Gravar(entity);
        }
    }
}
