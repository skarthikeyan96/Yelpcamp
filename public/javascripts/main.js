$('#password, #confirm_password').on('keyup', function () {

    if ($('#password').val() == $('#confirm_password').val()) {
        $('#password').css('border-color', 'green')
        $('#confirm_password').css('border-color', 'green')
    } else {
        $('#password').css('border-color', 'red')
        $('#confirm_password').css('border-color', 'red')
    }
});



$("#Reg").on("click", (e) => {

    e.preventDefault();
    let data = {};
    data.username = $("#un").val();
    data.email  = $("#em").val();
    data.password = $("#password").val()
    console.log(data)
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        url: '/users/register',
        contentType: 'application/json',
        success: function (data) {
            console.log(JSON.stringify(data));
            if (data.message == "failure") {
                //alert(data.error)
                swal({
                    title: "Oops!",
                    text: `${data.error} Please login to continue`,
                    icon: "error",
                    button: "OK",
                  });
                $("#un").val("");
                $("#em").val("");
                $("#password").val("");
                $('#confirm_password').val("")
            }
            if(data.message == "success"){
                location.href = '/';
            }
        },
        error: function (data) {
            console.log(data)
        }
    })
})

$("#log").on('click',(e)=>{
    e.preventDefault();
    let data = {};
    data.username = $("#username").val();
    data.password = $("#login_password").val();
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        url: '/user/login',
        contentType: 'application/json',
        success : (data)=>{
            console.log(data)
             if(data.SERVER_RESPONSE == 1){
                location.href = "/"
             }
        },
        error : (data)=>{
            console.log(data)
             swal({
                 title: "Oops!",
                 text: `${data.responseJSON.SERVER_MESSAGE}`,
                 icon: "error",
                 button: "OK",
               });
               $("#username").val("");
              $("#login_password").val("");
        }
    })
})