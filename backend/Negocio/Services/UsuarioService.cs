using Infra.Interface;
using Model.Entidades;
using Negocio.Interface;
using System;
using System.Collections.Generic;

namespace Negocio.Services
{
    public class UsuarioService : IUsuarioService<Usuario>
    {
        private readonly IUsuarioDAO<Usuario> _usuarioDAO;
        public UsuarioService(IUsuarioDAO<Usuario> usuarioDAO)
        {
            _usuarioDAO = usuarioDAO;
        }
        public void Apagar(Usuario entity)
        {
            try
            {
                var usuario = CarregaPor(entity.Id);
                if(usuario != null)
                {
                    _usuarioDAO.Apagar(usuario);
                }
            }
            catch (Exception e)
            {
            }
        }

        public void Atualizar(Usuario entity)
        {
            try
            {
                var usuario = CarregaPor(entity.Id);
                if(usuario != null)
                {
                    usuario.Ativo = entity.Ativo;
                    usuario.Roles = entity.Roles == null ? usuario.Roles : entity.Roles;
                    usuario.Senha = entity.Senha == null ? usuario.Senha : entity.Senha;
                    _usuarioDAO.Atualizar(usuario);
                    
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Usuario CarregaPor(int id)
        {
            return _usuarioDAO.BuscarPor(id);
        }

        public IEnumerable<Usuario> CarregaTodos()
        {
            return _usuarioDAO.CarregaTodos();
        }

        public void Gravar(Usuario entity)
        {
            try
            {
                var usuario = CarregaPor(entity.Id);
                if(usuario == null)
                {
                    _usuarioDAO.Gravar(entity);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Usuario Login(Usuario entity)
        {
            return _usuarioDAO.Login(entity);
        }
    }
}
