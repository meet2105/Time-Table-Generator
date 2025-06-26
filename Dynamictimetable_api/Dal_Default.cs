using System.Data;
using System.Data.SqlClient;

namespace Dynamictimetable_api
{
    public class Dal_Default
    {
        private string _connectionstring;
        public Dal_Default(IConfiguration configuration)
        {
            _connectionstring = configuration.GetConnectionString("DefaultConnection");
        }
        public DataSet GetAll()
        {
            SqlConnection con = new SqlConnection(_connectionstring);
            SqlDataAdapter da = new SqlDataAdapter("Timetable_Getall", con);
            da.SelectCommand.CommandType = CommandType.StoredProcedure;
            DataSet list = new DataSet();
            da.Fill(list, "timetable");
            return list;
        }
        public int InsertUpdate(En_Default objen)
        {
            Int32 i = 0;
            SqlConnection con = new SqlConnection(_connectionstring);
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("Timetable_Gen_InsertUpdate", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", objen.ID);
                cmd.Parameters.AddWithValue("@Working_days", objen.Working_days);
                cmd.Parameters.AddWithValue("@No_sub", objen.No_sub);
                cmd.Parameters.AddWithValue("@Total_sub", objen.Total_sub);
                cmd.ExecuteNonQuery();

                if(objen.Subjectdetails == 2)
                {
                    Delete();
                }
                i = 1;
            }
            catch (Exception ex)
            {
                i = 0;
            }
            finally
            {
                con.Close();
            }
            return i;
        }
        public int Insertupdate_details(Timetabledetaillist objen)
        {
            Int32 i = 0;
            SqlConnection con = new SqlConnection(_connectionstring);
            try
            {
                con.Open();
                for (Int32 j = 0; j < objen.Timetabledetail.Count; j++)
                {
                    SqlCommand cmd = new SqlCommand("Timetable_details_InsertUpdate", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ReceiptID", objen.Timetabledetail[j].ReceiptID);
                    cmd.Parameters.AddWithValue("@Sub_name", objen.Timetabledetail[j].Sub_name);
                    cmd.Parameters.AddWithValue("@Total_hour", objen.Timetabledetail[j].Total_hour);
                    cmd.ExecuteNonQuery();
                }
                i = 1;
            }
            catch (Exception ex)
            {
                i = 0;
            }
            finally
            {
                con.Close();
            }
            return i;
        }
        public int Delete()
        {
            Int32 i = 0;
            SqlConnection con = new SqlConnection(_connectionstring);
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("Timetable_details_Delete", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.ExecuteNonQuery();
                i = 1;
            }
            catch (Exception ex)
            {
                return -1;
            }
            finally
            {
                con.Close();
            }
            return i;
        }
    }
}
