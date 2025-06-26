var subjectdetails = 0;

function Doajaxcall(ApiUrl, parameter, apifunc, datatype, data, type, callback, callasync) {

    
    var apifullurl = "https://localhost:7092/";
    $.ajax({
        "method": type,
        "url": apifullurl + "api/" + ApiUrl + "/" + apifunc + parameter,
        headers: {
            "tenant": "praisa",
            "Content-Type": "application/json",
        },
        dataType: datatype,
        data: JSON.stringify(data),
        /*"data": data,*/
        async: callasync,
        success: function (data, message, xhr) {
            
            var jsonData = data;
            if (jsonData.IsSucess) {
                eval(callback + '(jsonData.ResponseData, jsonData.Message)');
            }
            else {
            }
        },
        error: function (xhr, message, errorThrown) {
            if (xhr.readyState == '4' && xhr.status == 401 && xhr.statusText == 'error') {

            }
            else {
                
                alert("error", "Error:" + errorThrown + " and " + xhr + " and " + message, "");

            }
        }
    });
}
function getall() {
    
    var data = {
    }
    Doajaxcall("Default", "", "getall", "json", data, "POST", "getall_success", true);
}
function getall_success(data, message) {
    

    if (data.Table1[0] != undefined) {
        $('#hdid').val(data.Table1[0].ID);
        $('#txtworkingday').val(data.Table1[0].Working_days);
        $('#txtnoofsub').val(data.Table1[0].No_sub);
        $('#txttotalsub').val(data.Table1[0].Total_sub);
        $('#hdtotalsub').val(data.Table1[0].Total_sub);
        

        var amt = eval($('#txtworkingday').val()) * eval($('#txtnoofsub').val());
        $('#txttotalhours').val(amt);
        $('#btnsave').show();
    }
    else {
        $('#btnsave').hide();
    }
    if (data.Table2[0] != undefined) {
        
        var j = 0;
        var str = "";
        for (var i = 0; i < $('#txttotalsub').val(); i++) {
            j = i + 1;
            str = str + "<div class='row form-group'>";
            str = str + "<div class='col-sm-3'><label>Subject Name :</label></div>";
            str = str + "<div class='col-sm-3'><input type='text' id='txttotalsubname" + j + "' name='txttotalsubname" + j + "' class='form-control' value='" + data.Table2[i].Sub_name + "' /></div>";
            str = str + "<input type='hidden' id='hdreceiptid" + j + "'  value='" + data.Table2[i].ReceiptID + "' />";
            str = str + "<div class='col-sm-3'><label>Subject Hour :</label></div>";
            str = str + "<div class='col-sm-3'><input type='text' id='txttotalsubhour" + j + "' name='txttotalsubhour" + j + "'value='" + data.Table2[i].Total_hour + "'  class='form-control' onkeypress='return numOnlyforworkingdays(event)' onpaste='return false' onchange='checktotalhours();' /></div>";
            str = str + "</div>";
        }
        str = str + "<div class='row'><div class='col-sm-6'></div>";
        str = str + "<input type='button' id='btnsave' onclick='subjectsave();' class='btn btn-primary' value='Generate' /></div>";
        $('#subjectmodal').html(str);
        subjectdetails = 1;

        const subjects = [];
        for (var i = 1; i <= $('#txttotalsub').val(); i++) {
            subjects.push({ name: $('#txttotalsubname' + i).val(), hours: $('#txttotalsubhour' + i).val() });
        }

        const days = $('#txtworkingday').val();
        const perDay = $('#txtnoofsub').val();

        const timetable = generateTimetable(days, perDay, subjects);

        const tableBody = document.querySelector("#subjectTable tbody");

        timetable.forEach(subjectRow => {
            const row = document.createElement("tr");
            subjectRow.forEach(subject => {
                const cell = document.createElement("td");
                cell.textContent = subject;
                row.appendChild(cell);
            });
            tableBody.appendChild(row);
        });


    }
}
// this is used for save master details
function save() {
    
    if ($('#txttotalsub').val() == '') {
        alert("Please Enter Total Subject.");
        return false;
    }
    if ($('#txttotalsub').val() != $('#hdtotalsub').val()) {
        subjectdetails = 2;
    }
    var data = {
        ID: $('#hdid').val(),
        Working_days: $('#txtworkingday').val(),
        No_sub: $('#txtnoofsub').val(),
        Total_sub: $('#txttotalsub').val(),
        Subjectdetails: subjectdetails
    }
    Doajaxcall("Default", "", "Insertupdate", "json", data, "POST", "save_success", true);
}
function save_success(data, message) {
    
    alert(message);
    if (subjectdetails == '0' || subjectdetails == '2') {
        var str = "";
        for (var i = 1; i <= $('#txttotalsub').val(); i++) {
            str = str + "<div class='row form-group'>";
            str = str + "<div class='col-sm-3'><label>Subject Name :</label></div>";
            str = str + "<div class='col-sm-3'><input type='text' id='txttotalsubname" + i + "' name='txttotalsubname" + i + "' class='form-control' /></div>";
            str = str + "<div class='col-sm-3'><label>Subject Hour :</label></div>";
            str = str + "<div class='col-sm-3'><input type='text' id='txttotalsubhour" + i + "' name='txttotalsubhour" + i + "' class='form-control' onkeypress='return numOnlyforworkingdays(event)' onpaste='return false' onchange='checktotalhours();' /></div>";
            str = str + "</div>";
        }
        str = str + "<div class='row'><div class='col-sm-6'></div>";
        str = str + "<input type='button' id='btnsave' class='btn btn-primary' onclick='subjectsave();' value='Generate' /></div>";
        $('#subjectmodal').html(str);
    }
    $('#myModal').show();
}
// this is used for save subject name and hours
function subjectsave() {
    
    var Timetabledetail = [];
    var hours = 0;
    for (var i = 1; i <= $('#txttotalsub').val(); i++) {
        if ($('#txttotalsubname' + i).val() != '' && $('#txttotalsubhour' + i).val() != '') {
            var item = {
                ReceiptID: $('#hdreceiptid' + i).val() == undefined ? '0' : $('#hdreceiptid' + i).val(),
                Sub_name: $('#txttotalsubname' + i).val(),
                Total_hour: $('#txttotalsubhour' + i).val(),
            }
            hours = eval(hours) + eval($('#txttotalsubhour' + i).val());
            Timetabledetail.push(item);
        } else {
            alert("Subject Name & Subject hour can't be null !");
            return false;
        }
    }
    var totalhours = parseInt($('#txttotalhours').val());
    if (totalhours != hours) {
        alert("The total hours of subject must be equal to 'Total hours for week'.");
        return false;
    }
    var data =
    {
        ID: $('#hdid').val(),
        Timetabledetail: Timetabledetail,
    }
    Doajaxcall("Default", "", "Insertupdate_details", "json", data, "POST", "subjectsave_success", true);
}
function subjectsave_success(data, message) {
    
    $('#myModal').hide();
    $("#subjectTable tbody").empty();

    const subjects = [];
    for (var i = 1; i <= $('#txttotalsub').val(); i++) {
        subjects.push({ name: $('#txttotalsubname' + i).val(), hours: $('#txttotalsubhour' + i).val() });
    }

    const days = $('#txtworkingday').val();
    const perDay = $('#txtnoofsub').val();

    const timetable = generateTimetable(days, perDay, subjects);

    const tableBody = document.querySelector("#subjectTable tbody");

    timetable.forEach(subjectRow => {
        const row = document.createElement("tr");
        subjectRow.forEach(subject => {
            const cell = document.createElement("td");
            cell.textContent = subject;
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });

}
function generateTimetable(days, perDay, subjects) {
    
    const totalSlots = days * perDay;
    const allSubjects = [];

    // subject based on hours
    subjects.forEach(subject => {
        for (let i = 0; i < subject.hours; i++) {
            allSubjects.push(subject.name);
        }
    });

    // Initialize : timetable[perDay][days]
    const timetable = Array.from({ length: perDay }, () => Array(days).fill(""));

    // fill timetable
    for (let i = 0; i < totalSlots && allSubjects.length > 0; i++) {
        const row = i % perDay;
        const col = Math.floor(i / perDay);

        const index = Math.floor(Math.random() * allSubjects.length);
        timetable[row][col] = allSubjects[index];
        allSubjects.splice(index, 1); // remove used subject
    }

    return timetable;
}
// this is used for calculate total hours
function calculatetotalhours() {
    
    var amt = 0;
    if ($('#txtworkingday').val() != '' && $('#txtworkingday').val() != '0' && $('#txtnoofsub').val() != '' && $('#txtnoofsub').val() != '0') {
        amt = eval($('#txtworkingday').val()) * eval($('#txtnoofsub').val());
        $('#txttotalhours').val(amt);
        $('#btnsave').show();
    } else {
        $('#btnsave').hide();
    }
}

// this is used for close modal
function closemodal() {
    $('#myModal').hide();
}
// this is used for number only validation
function numOnly(evt) {

    var charCode = (evt.which) ? evt.which : key;
    if (charCode <= 13 || evt.key == "40" || evt.key == "9" || evt.key == "46" || evt.key == "37" || evt.key == "39") {
        return true;
    }
    else {
        var keyChar = String.fromCharCode(charCode);
        var re = /[0-9.]/
        return re.test(keyChar);
    }
}
function numOnlyforworkingdays(evt) {
    
    var charCode = (evt.which) ? evt.which : key;
    if (charCode <= 13 || evt.key == "40" || evt.key == "46" || evt.key == "37" || evt.key == "39") {
        return true;
    }
    else {
        var keyChar = String.fromCharCode(charCode);
        var re = /[1-7.]/
        return re.test(keyChar);
    }
}
// this is used for check total hours
function checktotalhours() {
    
    var totalhours = parseInt($('#txttotalhours').val());
    var totalsubject = parseInt($('#txttotalsub').val());
    var hours = 0;
    for (var i = 1; i <= totalsubject; i++) {
        hours = eval(hours) + eval($('#txttotalsubhour' + i).val())
        if (parseInt(hours) > totalhours) {
            $('#txttotalsubhour' + i).val('');
            alert("Subject hours can't be greater than total hours !");
            return false;
        }
    }
}