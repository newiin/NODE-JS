$(function() {
    setTimeout(function() { 
        $('#success').fadeOut();
    }, 2000); 
    $('#danger').click(function() {
        window.alert("Do you waknt to delete this user");
    })
  });

