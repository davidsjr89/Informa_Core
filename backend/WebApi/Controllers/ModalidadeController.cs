using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model.Entidades;
using Negocio.Interface;
using System;

namespace WebApi.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class ModalidadeController : Controller
    {
        private readonly IModalidadeService<Modalidade> _modalidadeService;

        public ModalidadeController(IModalidadeService<Modalidade> modalidadeService)
        {
            _modalidadeService = modalidadeService;
        }
        [HttpPost()]
        [Route("adicionar")]
        public ActionResult<dynamic> Adicionar([FromBody] Modalidade modalidade)
        {
            if (modalidade == null)
            {
                return NotFound(new { message = "Modalidade Vazia" });
            }
            try
            {
                modalidade.Ativo = true;
                _modalidadeService.Gravar(modalidade);
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
            return Ok(_modalidadeService.CarregaTodos());
        }

        [HttpGet()]
        [Route("carregar-por-id")]
        public ActionResult<dynamic> CarregarPorId(int id)
        {

            return Ok(_modalidadeService.CarregaPor(id));
        }

        [HttpPost()]
        [Route("atualizar")]
        public ActionResult<dynamic> Atualizar([FromBody] Modalidade modalidade)
        {
            try
            {
                _modalidadeService.Atualizar(modalidade);
                return Ok(new { message = "Salvo com sucesso" });
            }
            catch (Exception e)
            {

                return NotFound(new { message = e.Message });
            }
        }

        [HttpDelete]
        [Route("apagar")]
        public ActionResult<dynamic> Apagar([FromBody] Modalidade modalidade)
        {
            try
            {
                _modalidadeService.Apagar(modalidade);
                return Ok(new { message = "Apagado com sucesso" });
            }
            catch (Exception e)
            {
                return NotFound(new { message = e.Message });
            }
        }
    }
}