$('#studentIdNo').inputmask().inputmask('AAA 999 99999');


$('#btnSubmit').click(function (e) {

    e.preventDefault();

    GetPassOutStudentInfo(e)
    // Show the div
    $("#dvContainerPrint").removeClass("hidden").addClass("block");


});



$('#studentIdNo').keyup(function (e) {

    e.preventDefault();

    if (e.keyCode == 13) {
        GetPassOutStudentInfo(e)
        // Show the div
        $("#dvContainerPrint").removeClass("hidden").addClass("block");
    }


});



//To get Passed out students information

function GetPassOutStudentInfo(e) {

    e.preventDefault();

    var studentIdno = $('#studentIdNo').val();
    if (studentIdno.length != 13) {
        $('#message > p').empty().append('Please enter the reg. no.');
    }
    else {

        $.ajax({
            type: 'GET',
            url: "http://119.18.149.45/StudentAPI/api/PassOutStudents",
            data: { studentIdNo: studentIdno },
            datatype: 'json',
            success: function (data) {
                if (data.length == 0) {
                    $('#tb_PassOutStudent > tbody').empty();
                    $('#message > p').empty().append('Record verified but not found authentic. Please check reg. no. on certificate for confirmation.').removeClass("text-success").addClass("text-danger");
                }
                else {
                    var PassOutStudent = '';

                    $.each(data, function (key, value) {
                        var rpDate = new Date(value.ResultPublishedDate);
                        var isDate = new Date(value.DateOfIssue);
                        PassOutStudent += '<tr>';
                        PassOutStudent += '<td>' + 'Graduate Id. / Reg. No.:' + '</td>';
                        PassOutStudent += '<td>' + value.StudentIdNo + '</td>';
                        PassOutStudent += '</tr>';
                        PassOutStudent += '<tr>';
                        PassOutStudent += '<td>' + 'Name of Graduate:' + '</td>';
                        PassOutStudent += '<td>' + value.StudentName + '</td>';
                        PassOutStudent += '</tr>';
                        PassOutStudent += '<tr>';
                        PassOutStudent += '<td>' + 'Name of Degree:' + '</td>';
                        PassOutStudent += '<td>' + value.Program + '</td>';
                        PassOutStudent += '</tr>';
                        PassOutStudent += '<tr>';
                        PassOutStudent += '<td>' + 'CGPA:' + '</td>';
                        PassOutStudent += '<td>' + value.CGPA + '</td>';
                        PassOutStudent += '</tr>';
                        PassOutStudent += '<tr>';
                        PassOutStudent += '<td>' + 'Result Publication Date:' + '</td>';
                        PassOutStudent += '<td>' + rpDate.getDate() + '/' + (rpDate.getMonth() + 1) + '/' + rpDate.getFullYear() + '</td>';
                        PassOutStudent += '</tr>';
                        PassOutStudent += '<tr>';
                        PassOutStudent += '<td>' + 'Date of Issue:' + '</td>';
                        PassOutStudent += '<td>' + isDate.getDate() + '/' + (isDate.getMonth() + 1) + '/' + isDate.getFullYear() + '</td>';
                        PassOutStudent += '</tr>';
                        PassOutStudent += '<tr>';
                        PassOutStudent += '<td>' + 'Certificate No.:' + '</td>';
                        PassOutStudent += '<td>' + value.CertificateNo + '</td>';
                        PassOutStudent += '</tr>';
                        PassOutStudent += '<tr>';
                        PassOutStudent += '<td>' + 'Ref. No.:' + '</td>';
                        PassOutStudent += '<td>' + value.RefNo + '</td>';
                        PassOutStudent += '</tr>';
                    });
                    // empty the tbody to avoid data duplication and then append
                    $('#tb_PassOutStudent > tbody').empty().append(PassOutStudent);
                    $('#message > p').empty().append('Record verified and found authentic. Please check below for details...').removeClass("text-danger").addClass("text-success");

                }
            }

        });
    }

}

//For printing the document
$(document).ready(function () {

    $("#btnPrint").on("click", function () {
        var divContents = $("#dvContainerPrint").html();
        var printWindow = window.open('', '', 'height=700,width=1200');
        printWindow.document.write('<html><head><title>Certificate Verification Report</title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write('<h2 style="text-align:center;">Port City International University</h2>');
        printWindow.document.write('<h3 style="text-align:center;">Online Certificate Verification Report</h3>');
        printWindow.document.write(divContents);
        printWindow.document.write('<footer><p>***Web generated report.***</p></footer>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    });


});