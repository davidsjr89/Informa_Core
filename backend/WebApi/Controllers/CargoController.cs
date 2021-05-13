using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Model.Entidades;
using Negocio.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class CargoController : Controller
    {
        private readonly ICargoService<Cargo> _cargoService;

        public CargoController(ICargoService<Cargo> cargoService)
        {
            _cargoService = cargoService;
        }
        [HttpPost()]
        [Route("adicionar")]
        public ActionResult<dynamic> Adicionar([FromBody] Cargo cargo)
        {
            if (cargo == null)
            {
                return NotFound(new { message = "Cargo Vazio" });
            }
            try
            {
                cargo.Ativo = true;
                _cargoService.Gravar(cargo);
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
            return Ok(_cargoService.CarregaTodos());
        }

        [HttpGet()]
        [Route("carregar-por-id")]
        public ActionResult<dynamic> CarregarPorId(int id)
        {

            return Ok(_cargoService.CarregaPor(id));
        }

        [HttpPost()]
        [Route("atualizar")]
        public ActionResult<dynamic> Atualizar([FromBody] Cargo cargo)
        {
            try
            {
                _cargoService.Atualizar(cargo);
                return Ok(new { message = "Salvo com sucesso" });
            }
            catch (Exception e)
            {

                return NotFound(new { message = e.Message });
            }
        }

        [HttpDelete]
        [Route("apagar")]
        public ActionResult<dynamic> Apagar([FromBody] Cargo cargo)
        {
            try
            {
                _cargoService.Apagar(cargo);
                return Ok(new { message = "Apagado com sucesso" });
            }
            catch (Exception e)
            {
                return NotFound(new { message = e.Message });
            }
        }
    }
}