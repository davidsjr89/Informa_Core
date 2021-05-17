namespace Infra.Interface
{
    public interface IColaboradorDAO<T>: IPersistirDAO<T>, IConsultaDAO<T>
    {
    }
}
