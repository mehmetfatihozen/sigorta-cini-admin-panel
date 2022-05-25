using Microsoft.AspNetCore.Mvc;
using SigortaCini.Framework.Data.DTO.Admin.Person;
using SigortaCini.UI.AdminPanel.Services.Person;

namespace SigortaCini.UI.AdminPanel.Controllers.Person
{
    public class PersonController : BaseController
    {

        IPersonService _personService;
        public PersonController(IPersonService personService)
        {
            this._personService = personService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult GetPersonTypesAsTree()
        {
            return Json(_personService.GetPersonTypesAsTree());
        }

        public JsonResult GetPersonTypeActivities()
        {
            return Json(_personService.GetPersonTypeActivities());
        }

        public JsonResult GetPersonTypes()
        {
            return Json(_personService.GetPersonTypes());
        }

        public JsonResult GetAll()
        {
            return Json(_personService.GetAll());
        }

        public JsonResult InsertUpdatePersonType(InsertUpdatePersonTypeRequest request)
        {
            return Json(_personService.InsertUpdatePersonType(request));
        }

        public JsonResult InsertUpdatePersonTypeActivity(InsertUpdatePersonTypeActivityRequest request)
        {
            return Json(_personService.InsertUpdatePersonTypeActivity(request));
        }

        public JsonResult InsertOrUpdatePerson(PersonRequestDTO request)
        {
            return Json(_personService.InsertOrUpdatePerson(request));
        }

        public JsonResult GetPersonById(uint id)
        {
            return Json(_personService.GetPersonById(id));
        }

    }
}