 
(function() {
  "use strict";
 
  $(".choose_section").owlCarousel({
   autoplay: false,
   autoplayHoverPause: true,
   autoplayTimeout: 5000,
   dots: false,
   autoHeight: true,
   loop: false,
   nav: true,
   fade: true,
   items: 8,
   autoplayHoverPause: true,
   responsive: {
      0: {
      items: 2,
      },
      580: {
         items: 3,
      },
      768: {
      items: 5,
      },
      1024: {
      items: 6,
      },
      1200: {
      items: 8,
      },
   },
});

$(".choose_section1").owlCarousel({
   autoplay: false,
   autoplayHoverPause: true,
   autoplayTimeout: 5000,
   dots: false,
   autoHeight: true,
   loop: false,
   nav: true,
   fade: true,
   items: 6,
   autoplayHoverPause: true,
   responsive: {
      0: {
         items: 2,
      },
      580: {
         items: 3,
      },
      768: {
         items: 4,
      },
      1024: {
         items: 4,
      },
      1200: {
         items: 6,
      },
   },
});
  
  

$(document).ready(function() {

    
   var readURL = function(input) {
       if (input.files && input.files[0]) {
           var reader = new FileReader();

           reader.onload = function (e) {
               $('.profile-pic').attr('src', e.target.result);
           }
   
           reader.readAsDataURL(input.files[0]);
       }
   }
   

   $(".file-upload").on('change', function(){
       readURL(this);
   });
   
   $(".upload-button").on('click', function() {
      $(".file-upload").click();
   });
});
 


jQuery(function(){
   var j = jQuery; //Just a variable for using jQuery without conflicts
   var addInput = '#qty'; //This is the id of the input you are changing
   var n = 1; //n is equal to 1
   
   //Set default value to n (n = 1)
   j(addInput).val(n);
 
   //On click add 1 to n
   j('.plus').on('click', function(){
     j(addInput).val(++n);
   })
 
   j('.min').on('click', function(){
     //If n is bigger or equal to 1 subtract 1 from n
     if (n >= 1) {
       j(addInput).val(--n);
     } else {
       //Otherwise do nothing
     }
   });
 });
 

})();