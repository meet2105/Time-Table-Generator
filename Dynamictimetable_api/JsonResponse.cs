namespace Dynamictimetable_api
{
    public class JsonResponse
    {
        private bool _IsSuccess = false;
        public bool IsSucess
        {
            get { return _IsSuccess; }
            set { _IsSuccess = value; }
        }

        private string _Message = string.Empty;
        public string Message
        {
            get { return _Message; }
            set { _Message = value; }
        }

        private string _CallBack = string.Empty;
        public string CallBack
        {
            get { return _CallBack; }
            set { _CallBack = value; }
        }
        private object _ResponseData = null;
        public object ResponseData
        {
            get { return _ResponseData; }
            set { _ResponseData = value; }
        }
    }
}
