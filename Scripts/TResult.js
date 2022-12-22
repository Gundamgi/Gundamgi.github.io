


$('#studentIdNo').inputmask().inputmask('AAA 999 99999');
var semester = $('#semester').val();

// button click event
$(document).ready(function () {
    $('#btnSubmit').click(function (e) {

        var studentIdno = $('#studentIdNo').val();

        if (studentIdno.length != 13 && $('#semester').val() != "") {

            // Empty the tables
            $('#tb_StudentInfo > tbody').empty();
            $('#tb_PassOutStudent > tbody').empty();
            $('#message > p').empty().append('Please enter the student id no. correctly.');

        }
        else if (studentIdno.length == 13 && $('#semester').val() == "") {

            // Empty the tables
            $('#tb_StudentInfo > tbody').empty();
            $('#tb_PassOutStudent > tbody').empty();
            $('#tb_StudentCGPA > tbody').empty();
            $('#message > p').empty().append('Please select a trimester.');
        }
        else if (studentIdno.length != 13 && $('#semester').val() == "") {

            // Empty the tables
            $('#tb_StudentInfo > tbody').empty();
            $('#tb_PassOutStudent > tbody').empty();
            $('#tb_StudentCGPA > tbody').empty();
            $('#message > p').empty().append('Please enter the student id no. correctly and select a trimester.');
        }
            //else {
            //    if ($('#semester').val() == "") {
            //        $('#tb_StudentCGPA > tbody').empty();
            //        GetStudentInfoWithCGPA(e);

            //        // it is called by GetStudentInfoWithCGPA(e) this fuction
            //        //GetStudentAllResult(e);
            //    }

        else {
            $('#tb_StudentCGPA > tbody').empty();
            GetStudentInfo(e);
            GetStudentResult(e);
        }

        $("#dvContainerPrint").removeClass("hidden").addClass("block");
    });


});


//keyup event
$(document).ready(function () {

    $('#studentIdNo').keyup(function (e) {

        if (e.keyCode == 13) {
            var studentIdno = $('#studentIdNo').val();

            if (studentIdno.length != 13 && $('#semester').val() != "") {

                // Empty the tables
                $('#tb_StudentInfo > tbody').empty();
                $('#tb_PassOutStudent > tbody').empty();
                $('#message > p').empty().append('Please enter the student id no. correctly.');

            }
            else if (studentIdno.length == 13 && $('#semester').val() == "") {

                // Empty the tables
                $('#tb_StudentInfo > tbody').empty();
                $('#tb_PassOutStudent > tbody').empty();
                $('#tb_StudentCGPA > tbody').empty();
                $('#message > p').empty().append('Please select a trimester.');
            }
            else if (studentIdno.length != 13 && $('#semester').val() == "") {

                // Empty the tables
                $('#tb_StudentInfo > tbody').empty();
                $('#tb_PassOutStudent > tbody').empty();
                $('#tb_StudentCGPA > tbody').empty();
                $('#message > p').empty().append('Please enter the student id no. correctly and select a trimester.');
            }
                //else {
                //    if ($('#semester').val() == "") {
                //        $('#tb_StudentCGPA > tbody').empty();
                //        GetStudentInfoWithCGPA(e);

                //        // it is called by GetStudentInfoWithCGPA(e) this fuction
                //        //GetStudentAllResult(e);
                //    }

            else {
                $('#tb_StudentCGPA > tbody').empty();
                GetStudentInfo(e);
                GetStudentResult(e);
            }

        }

        $("#dvContainerPrint").removeClass("hidden").addClass("block");

    })

});

//change event
$(document).ready(function () {

    $('#semester').change(function (e) {


        var studentIdno = $('#studentIdNo').val();

        if (studentIdno.length != 13 && $('#semester').val() != "") {

            // Empty the tables
            $('#tb_StudentInfo > tbody').empty();
            $('#tb_PassOutStudent > tbody').empty();
            $('#message > p').empty().append('Please enter the student id no. correctly.');

        }
        else if (studentIdno.length == 13 && $('#semester').val() == "") {

            // Empty the tables
            $('#tb_StudentInfo > tbody').empty();
            $('#tb_PassOutStudent > tbody').empty();
            $('#tb_StudentCGPA > tbody').empty();
            $('#message > p').empty().append('Please select a trimester.');
        }
        else if (studentIdno.length != 13 && $('#semester').val() == "") {

            // Empty the tables
            $('#tb_StudentInfo > tbody').empty();
            $('#tb_PassOutStudent > tbody').empty();
            $('#tb_StudentCGPA > tbody').empty();
            $('#message > p').empty().append('Please enter the student id no. correctly and select a trimester.');
        }
            //else {
            //    if ($('#semester').val() == "") {
            //        $('#tb_StudentCGPA > tbody').empty();
            //        GetStudentInfoWithCGPA(e);

            //        // it is called by GetStudentInfoWithCGPA(e) this fuction
            //        //GetStudentAllResult(e);
            //    }

        else {
            $('#tb_StudentCGPA > tbody').empty();
            GetStudentInfo(e);
            GetStudentResult(e);
        }

        $("#dvContainerPrint").removeClass("hidden").addClass("block");
    })

});




//Get student info

function GetStudentInfo(e) {

    e.preventDefault();

    var studentIdno = $('#studentIdNo').val();
    var semesterInfo = $('#semester').val();

    $.ajax({
        type: 'GET',
        url: "http://119.18.149.45/StudentAPI/api/studentinfo/get",
        data: { studentIdNo: studentIdno },
        datatype: 'json',
        success: function (data) {
            if (data.length == 0) {
                $('#tb_StudentInfo > tbody').empty();

            }
            else {
                var PassOutStudent = '';


                $.each(data, function (key, value) {

                    PassOutStudent += '<tr>';
                    PassOutStudent += '<td style="min-width:120px; font-weight: bold">' + 'Student Id. No.' + '</td>';
                    PassOutStudent += '<td style="min-width:30px">' + ':' + '</td>';
                    PassOutStudent += '<td>' + value.studentIdNo + '</td>';
                    PassOutStudent += '</tr>';
                    PassOutStudent += '<tr>';
                    PassOutStudent += '<td style="min-width:120px; font-weight: bold">' + "Student's Name" + '</td>';
                    PassOutStudent += '<td style="min-width:30px">' + ':' + '</td>';
                    PassOutStudent += '<td>' + value.StudentName + '</td>';
                    PassOutStudent += '</tr>';
                    PassOutStudent += '<tr>';
                    PassOutStudent += '<td style="min-width:120px; font-weight: bold">' + 'Program' + '</td>';
                    PassOutStudent += '<td style="min-width:30px">' + ':' + '</td>';
                    PassOutStudent += '<td>' + value.studentProgram + '</td>';
                    PassOutStudent += '</tr>';
                    PassOutStudent += '<tr>';
                    PassOutStudent += '<td style="min-width:120px; font-weight: bold">' + 'Session' + '</td>';
                    PassOutStudent += '<td style="min-width:30px">' + ':' + '</td>';
                    PassOutStudent += '<td>' + value.studentSession + '</td>';
                    PassOutStudent += '</tr>';
                });

                // empty the tbody to avoid data duplication and then append
                $('#message > p').empty();
                $('#tb_StudentInfo > tbody').empty().append(PassOutStudent);

            }
        }


    });

}



//To get student trimester wise result

function GetStudentResult(e) {

    e.preventDefault();

    var studentIdno = $('#studentIdNo').val();
    var semesterInfo = $('#semester').val();

    $.ajax({
        type: 'GET',
        url: "http://119.18.149.45/StudentAPI/api/StudentResult/get",
        data: { studentIdNo: studentIdno, Trimester: semesterInfo },
        datatype: 'json',
        success: function (data) {
            if (data.length == 0) {

                $('#tb_PassOutStudent > tbody').empty();
                $('#message > p').empty().append('Please check the student id no. or select a correct trimester.').removeClass("text-success").addClass("text-danger");
            }
            else {

                var trimesterHeader = '';
                var PassOutStudent = '';
                var JsonSemester = '';
                var GPA = '';



                $.each(data, function (key, value) {


                    if (trimesterHeader == '') {

                        if (value.GPA != null) {
                            JsonSemester = value.semester + ' ' + 'Trimester' + '<p>' + 'GPA: ' + value.GPA.toFixed(2) + '</p>';
                        }
                        else {
                            JsonSemester = value.semester + ' ' + 'Trimester' + '<p>' + 'GPA: ' + 'Not Found' + '</p>';
                        }

                        //add trimester GPA and table header
                        trimesterHeader += '<tr><th colspan="6" id="Tsemester" class="text-center">' + JsonSemester + '</th></tr>';

                        trimesterHeader += '<tr>';
                        trimesterHeader += '<th>Course Code</th>';
                        trimesterHeader += '<th>Course Title</th>';
                        trimesterHeader += '<th>Status</th>';
                        trimesterHeader += '<th>Credit Hour</th>';
                        trimesterHeader += '<th>Letter Grade</th>';
                        trimesterHeader += '<th>Grade Point</th>';
                        trimesterHeader += '</tr>';
                    }


                    //Add result info
                    PassOutStudent += '<tr>';
                    PassOutStudent += '<td>' + value.courseCode + '</td>';
                    PassOutStudent += '<td>' + value.courseTitle + '</td>';
                    PassOutStudent += '<td>' + value.status + '</td>';
                    PassOutStudent += '<td>' + parseFloat(value.creditHr).toFixed(2) + '</td>';
                    PassOutStudent += '<td>' + value.LetterGrade + '</td>';
                    PassOutStudent += '<td>' + parseFloat(value.GradePoint).toFixed(2) + '</td>';
                    PassOutStudent += '</tr>';




                });
                //$('#Tsemester').empty().append(JsonSemester);
                // empty the tbody to avoid data duplication and then append

                $('#message > p').empty();
                $('#tb_PassOutStudent > tbody').empty().append(trimesterHeader + PassOutStudent);

            }
        }


    });

}


//For printing the document
$(document).ready(function () {

    $("#btnPrint").on("click", function () {
        var divContents = $("#dvContainerPrint").html();
        var printWindow = window.open('', '', 'height=700,width=1200');
        printWindow.document.write('<html><head><title>Trimester Result</title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write('<h2 style="text-align:center;">Port City International University</h2>');
        printWindow.document.write('<h3 style="text-align:center;">Trimester Result</h3>');
        printWindow.document.write(divContents);
        printWindow.document.write('<footer><p>***Web generated report. Not for official use.***</p></footer>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    });


});



