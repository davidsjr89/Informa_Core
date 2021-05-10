using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model.Entidades;
using Negocio.Interface;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class UsuarioController : Controller
    {
        private readonly IUsuarioService<Usuario> _usuarioService;

        public UsuarioController(IUsuarioService<Usuario> usuarioService)
        {
            _usuarioService = usuarioService;
        }
        [HttpPost()]
        [Route("login")]
        [AllowAnonymous]
        public ActionResult<dynamic> Login([FromBody] Usuario usuario)
        {
            var user = _usuarioService.Login(usuario);
            if ( user == null)
            {
                return NotFound(new { message = "Usuário ou senha incorretos" });
            }
            var token = TokenService.GenerateToken(user);
            user.Senha = "";
            return new 
            { 
                user = user, token = token
            };
        }

        [HttpPost()]
        [Route("cadastra-usuario")]
        public ActionResult<dynamic> CadastraUsuario([FromBody] Usuario usuario)
        {
            try
            {
                usuario.Ativo = true;
                _usuarioService.Gravar(usuario);
                usuario.Senha = "";
                return Ok(usuario);
            }
            catch (System.Exception e)
            {
                return NotFound(e.Message);
            }
        }

        [HttpPatch()]
        [Route("atualiza-usuario")]
        public ActionResult<dynamic> AtualizaUsuario([FromBody] Usuario usuario)
        {
            try
            {
                _usuarioService.Atualizar(usuario);
                return Ok(usuario);
            }
            catch (System.Exception e)
            {
                return NotFound(e.Message);
            }
        }
        [HttpDelete()]
        [Route("apaga-usuario")]
        public ActionResult<dynamic> ApagaUsuario([FromBody] Usuario usuario)
        {
            try
            {
                _usuarioService.Apagar(usuario);
                usuario.Senha = "";
                return Ok(usuario);
            }
            catch (System.Exception e)
            {
                return NotFound(e.Message);
            }
        }

        #region Testes
        [HttpGet]
        [Route("autenticada")]
        [AllowAnonymous]
        public string Autenticada() => $"Autenticado com ";
        [HttpGet]
        [Route("adm")]
        [Authorize(Roles = "adm")]
        public string Adm() => "Autenticado com ADM";
        
        [HttpGet]
        [Route("user")]
        [Authorize(Roles = "user,adm")]
        public string user() => "Qualquer pessoa pode autenticar";
        #endregion
    }
}