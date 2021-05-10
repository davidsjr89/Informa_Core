using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model.Entidades;
using Negocio.Interface;
using System;

namespace WebApi.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class UnidadeController : Controller
    {
        private readonly IUnidadeService<Unidade> _unidadeService;
        public UnidadeController(IUnidadeService<Unidade> unidadeService)
        {
            _unidadeService = unidadeService;
        }
        
        [HttpPost()]
        [Route("adicionar")]
        public ActionResult<dynamic> Adicionar([FromBody] Unidade unidade)
        {
            if (unidade == null)
            {
                return NotFound(new { message = "Unidade Vazia" });
            }
            try
            {
                unidade.Ativo = true;
                _unidadeService.Gravar(unidade);
                return Ok(new { message = "Salvo com sucesso" });
            }
            catch (Exception)
            {

                return NotFound(new { message = "Problema em gravar" });
            }
        }
        
        [HttpGet()]
        [Route("carregar-todos")]
        public ActionResult<dynamic> CarregarTodasUnidades()
        {
            return Ok(_unidadeService.CarregaTodos());
        }
      
        [HttpGet()]
        [Route("carregar-por-id")]
        public ActionResult<dynamic> CarregarPorId(int id)
        {
            
            return Ok(_unidadeService.CarregaPor(id));
        }

        [HttpPost()]
        [Route("atualizar")]
        public ActionResult<dynamic> Atualizar([FromBody] Unidade unidade)
        {
            try
            {
                _unidadeService.Atualizar(unidade);
                return Ok(new { message = "Salvo com sucesso" });
            }
            catch (Exception e)
            {

                return NotFound(new { message = e.Message });
            }
        }
        
        [HttpDelete]
        [Route("apagar")]
        public ActionResult<dynamic> Apagar([FromBody] Unidade unidade)
        {
            try
            {
                _unidadeService.Apagar(unidade);
                return Ok(new { message = "Apagado com sucesso" });
            }
            catch (Exception e)
            {
                return NotFound(new { message = e.Message });
            }
        }
    }
}
