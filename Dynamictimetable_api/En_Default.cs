namespace Dynamictimetable_api
{
    public class En_Default
    {
        public Int32 ID { get; set; }
        public Int32 Working_days { get; set; }
        public Int32 No_sub { get; set; }
        public Int32 Total_sub { get; set; }
        public Int32? Subjectdetails { get; set; }
        
    }
    public class Timetabledetaillist
    {
        public Int32? ID { get; set; }
        public List<Timetabledetails> Timetabledetail { get; set; }
    }
    public class Timetabledetails()
    {
        public Int32 ReceiptID { get; set; }
        public string Sub_name { get; set; }
        public string Total_hour { get; set; }
    }
}
