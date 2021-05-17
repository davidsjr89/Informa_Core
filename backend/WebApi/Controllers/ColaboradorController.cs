using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model.Entidades;
using Negocio.Interface;
using System;

namespace WebApi.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class ColaboradorController : Controller
    {
        private readonly IColaboradorService<Colaborador> _colaboradorService;
        public ColaboradorController(IColaboradorService<Colaborador> colaboradorService)
        {
            _colaboradorService = colaboradorService;
        }
        [HttpPost()]
        [Route("adicionar")]
        public ActionResult<dynamic> Adicionar([FromBody] Colaborador colaborador)
        {
            if (colaborador == null)
            {
                return NotFound(new { message = "Colaborador Vazio" });
            }
            try
            {
                colaborador.Ativo = true;
                _colaboradorService.Gravar(colaborador);
                return Ok(new { message = "Salvo com sucesso" });
            }
            catch (Exception)
            {

                return NotFound(new { message = "Problema em gravar" });
            }
        }

        [HttpGet()]
        [Route("carregar-todos")]
        public ActionResult<dynamic> CarregarTodasModalidade()
        {
            return Ok(_colaboradorService.CarregaTodos());
        }

        [HttpGet()]
        [Route("carregar-por-id")]
        public ActionResult<dynamic> CarregarPorId(int id)
        {

            return Ok(_colaboradorService.CarregaPor(id));
        }

        [HttpPost()]
        [Route("atualizar")]
        public ActionResult<dynamic> Atualizar([FromBody] Colaborador colaborador)
        {
            if (colaborador == null)
            {
                return NotFound(new { message = "Colaborador Vazio" });
            }
            try
            {
                _colaboradorService.Atualizar(colaborador);
                return Ok(new { message = "Salvo com sucesso" });
            }
            catch (Exception e)
            {

                return NotFound(new { message = e.Message });
            }
        }

        [HttpDelete]
        [Route("apagar")]
        public ActionResult<dynamic> Apagar([FromBody] Colaborador colaborador)
        {
            try
            {
                _colaboradorService.Apagar(colaborador);
                return Ok(new { message = "Apagado com sucesso" });
            }
            catch (Exception e)
            {
                return NotFound(new { message = e.Message });
            }
        }
    }
}