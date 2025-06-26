using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using System.Xml;
using static System.Net.Mime.MediaTypeNames;

namespace Dynamictimetable_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DefaultController : ControllerBase
    {
        JsonResponse _response = new JsonResponse();
        private readonly Dal_Default _dal_Default;

        public DefaultController(Dal_Default dal_default)
        {
            _dal_Default = dal_default;
        }

        [HttpPost]
        [Route("getall")]
        public IActionResult getall()
        {
            try
            {

                DataSet dataSet = new DataSet();
                dataSet = _dal_Default.GetAll();
                DataTable dt = new DataTable();
                dt = dataSet.Tables[0];
                var lst1 = JsonConvert.SerializeObject(dt, Newtonsoft.Json.Formatting.Indented);
                dt = dataSet.Tables[1];
                var lst2 = JsonConvert.SerializeObject(dt, Newtonsoft.Json.Formatting.Indented);

                var table1 = ConvertDataTableToList(dataSet.Tables[0]);
                var table2 = ConvertDataTableToList(dataSet.Tables[1]);

                if (dataSet != null)
                {
                    _response.IsSucess = true;
                    _response.Message = "";
                    //_response.ResponseData = lst1+""+lst2;
                    _response.ResponseData = new
                    {
                        Table1 = table1,
                        Table2 = table2
                    };
                }
            }
            catch (Exception ex)
            {

            }
            return Ok(System.Text.Json.JsonSerializer.Serialize(_response));
        }

        [HttpPost]
        [Route("Insertupdate")]
        public IActionResult Insertupdate(En_Default objen)
        {

            try
            {

                int lst = _dal_Default.InsertUpdate(objen);

                if (lst > 0)
                {
                    _response.Message = "Record save successfully !";
                    _response.IsSucess = true;
                    _response.ResponseData = lst;
                }
                else
                {
                    _response.Message = "There was an error !";
                    _response.IsSucess = false;
                    _response.ResponseData = lst;
                }
            }
            catch (Exception ex)
            {

                _response.Message = "There was an error !";
                _response.IsSucess = false;
                _response.ResponseData = 0;
            }
            return Ok(System.Text.Json.JsonSerializer.Serialize(_response));
        }

        [HttpPost]
        [Route("Insertupdate_details")]
        public IActionResult Insertupdate_details(Timetabledetaillist objen)
        {
            try
            {
                int lst = _dal_Default.Insertupdate_details(objen);

                if (lst > 0)
                {
                    _response.Message = "Record save successfully !";
                    _response.IsSucess = true;
                    _response.ResponseData = lst;
                }
                else
                {
                    _response.Message = "There was an error !";
                    _response.IsSucess = false;
                    _response.ResponseData = lst;
                }
            }
            catch (Exception ex)
            {

                _response.Message = "There was an error !";
                _response.IsSucess = false;
                _response.ResponseData = 0;
            }
            return Ok(System.Text.Json.JsonSerializer.Serialize(_response));
        }

        private List<Dictionary<string, object>> ConvertDataTableToList(DataTable dt)
        {
            var list = new List<Dictionary<string, object>>();
            foreach (DataRow row in dt.Rows)
            {
                var dict = new Dictionary<string, object>();
                foreach (DataColumn col in dt.Columns)
                {
                    dict[col.ColumnName] = row[col];
                }
                list.Add(dict);
            }
            return list;
        }
    }
}
