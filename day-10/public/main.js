//script for the html
$(document).ready(function() {
   //alert('ss') - > to check if properly linked 
   $('#subsrcibeForm').on('submit', function(event) {
      event.preventDefault();
      const formData = {
         name: $('#name').val(),
         email: $('#email').val(),
      };
      //below part controls the entire thing 
      $.ajax({
         type: 'POST',
         url: '/post-subscribe',
         data: formData,
         dataType: 'json',
         contentType: 'application/x-www-form-urlencoded', // This sets the correct format for the data being sent
         success: function(response) {
            console.log(response.message);
            console.log(response.email);
            $('#responseMessage').html(`<p>${response.message}</p><br><p>Email: ${response.email}</p>`);
            $('#subsrcibeForm').addClass('hide');
            $('#responseMessage').addClass('show');

         },
         error: function(xhr,status,error) {
            //access the error message sent by the server
            console.log(`Status: ${status}`);
            const errorMessage = xhr.responseJSON?.message || 'An error occured';
            $('#responseMessage').html(`<p>${errorMessage}</p>`);
            console.log(`Error: ${error}`);
            
         }
      
      });
   });
  
});