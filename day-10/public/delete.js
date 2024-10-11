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
         success: function(response) {
            $('#responseMessage').html(`<p>${response.message}</p><p>Email: ${response.email}</p>`);
            $('#subsrcibeForm').addClass('hide');
         },
         error: function() {
            $('#responseMessage').html(`<p>${response.message}</p>`);
            console.log(response.err)
         }
      
      });
   });
});