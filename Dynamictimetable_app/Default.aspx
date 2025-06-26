<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Dynamictimetable_app.Default" %>

<!DOCTYPE html>
<script src="Javascript/Default.js"></script>
<script src="Javascript/jquery-3.7.1.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Dynamic TimeTable Generator</title>
    <script>
        $(document).ready(function () {
            getall();
        });
    </script>
    <style>
        /* Modal background */
        .modal {
            display: none; /* Hidden by default */
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0,0,0,0.5); /* Black with opacity */
        }

        /* Modal content box */
        .modal-content {
            background-color: #fff;
            margin: 15% auto;
            padding: 20px;
            border-radius: 8px;
            width: 60%;
            max-width: 1000px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        /* Close button */
        .close {
            float: right;
            font-size: 24px;
            font-weight: bold;
            color: #aaa;
            cursor: pointer;
        }

            .close:hover {
                color: #000;
            }

        table {
            width: 50%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        th, td {
            border: 1px solid #333;
            padding: 8px 12px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <form id="form1">
        <div class="container">
            <div class="row"></div>
            <div class="row" style="margin-top: 20px; margin-left: 400px;">
                <p><b>Dynamic Timetable Generator</b></p>
            </div>
            <div class="row  form-group">
                <div class="col-sm-3">
                    <label for="txtworkingday">No. of Working Days :</label>
                </div>
                <div class="col-sm-3">
                    <input type="text" id="txtworkingday" name="txtworkingday" class="form-control" maxlength="1" onkeypress="return numOnlyforworkingdays(event)" onpaste="return false" onchange="calculatetotalhours();" required />
                </div>
                <div class="col-sm-3">
                    <label>No. of Subject Per Day :</label>
                </div>
                <div class="col-sm-3">
                    <input type="text" id="txtnoofsub" name="txtnoofsub" class="form-control" maxlength="1" onkeypress="return numOnly(event)" onpaste="return false" onchange="calculatetotalhours();" />
                </div>
            </div>
            <div class="row form-group">
                <div class="col-sm-3">
                    <label>Total Subject :</label>
                </div>
                <div class="col-sm-3">
                    <input type="text" id="txttotalsub" name="txttotalsub" class="form-control" onkeypress="return numOnly(event)" onpaste="return false" />
                </div>
                <div class="col-sm-3">
                    <label>Total Hours :</label>
                </div>
                <div class="col-sm-3">
                    <input type="text" id="txttotalhours" name="txttotalhours" class="form-control" readonly="readonly" />
                </div>
            </div>
            <div class="row form-group">
                <div class="col-sm-6"></div>
                <input type="button" id="btnsave" onclick="save();" class="btn btn-success" value="save" style="display: none;" />
            </div>

            <div id="myModal" class="modal">
                <div class="modal-content">
                    <div class="row form-group">
                        <p style="margin:auto;"><b> Enter Subject Name & Hours </b></p>
                        <span class="close" id="closeModalBtn" onclick="closemodal();" style="margin-left:auto;margin-right:12px;">&times;</span>
                    </div>
                    <div id="subjectmodal">
                    </div>
                </div>
            </div>

            <div>
                <table id="subjectTable" class="mx-auto">
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </form>
</body>
</html>
<input type="hidden" id="hdid" value="0" />
<input type="hidden" id="hdtotalsub" value="0" />

