using Infra.Ajuda;
using Infra.BD;
using Infra.Interface;
using Microsoft.EntityFrameworkCore;
using Model.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Infra.DAO
{
    public class UsuarioDAO : IUsuarioDAO<Usuario>
    {
        private readonly DataContext _dataContext;
        public UsuarioDAO(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        public void Apagar(Usuario entity)
        {
                entity.Senha = Senha.RetornarMD5(entity.Senha);
                _dataContext.Usuarios.Remove(entity);
                salvarAlteracoes();
        }

        public void Atualizar(Usuario entity)
        {
            entity.Senha = Senha.RetornarMD5(entity.Senha);
            _dataContext.Usuarios.Update(entity);
            salvarAlteracoes();
        }

        public Usuario BuscarPor(int id)
        {
            return _dataContext.Usuarios.AsNoTracking().Where(x => x.Id == id).FirstOrDefault();
        }

        public IEnumerable<Usuario> CarregaTodos()
        {
            return _dataContext.Usuarios.AsNoTracking().ToList();
        }

        public void Gravar(Usuario entity)
        {
            entity.Senha = Senha.RetornarMD5(entity.Senha);
            _dataContext.Usuarios.Add(entity);
            salvarAlteracoes();
        }

        public Usuario Login(Usuario entity)
        {
            entity.Senha = Senha.RetornarMD5(entity.Senha);
            return _dataContext.Usuarios.AsNoTracking().FirstOrDefault(x => x.Nome == entity.Nome && x.Senha == entity.Senha && x.Ativo == true);
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
