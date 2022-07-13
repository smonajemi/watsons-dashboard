$(document).ready( () => {
        // $('input:submit').attr('disabled',true);
        $('input:file').change(
            function(){
                if ($(this).val()){
                    $('input:submit').removeAttr('disabled'); 
                } 
                else {
                    $('input:submit').attr('disabled',false);
                }
            });
            $('input:text').change(
                function(){
                    if ($(this).val()){
                        $('input:submit').removeAttr('disabled'); 
                    }
                    else {
                        $('input:submit').attr('disabled',true);
                    }
            })
            $('#inputCurrentPassword' && '#inputNewPassword' && '#inputRepeatedPassword').change(
                function(){
                    if ($(this).val()){
                        $('#save').removeAttr('disabled'); 
                    }
                    else {
                        $('#save').attr('disabled',true);
                    }
            })
           
                $('#submit').attr('disabled',false);
                $('#cancel').attr('disabled',false);
    
    });

const handleReset = () => {
        location.reload()
    }
    function bs_input_file() {
        $(".input-file").before(
            function() {
                if ( ! $(this).prev().hasClass('input-ghost') ) {
                    var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0' accept='.pdf'>");
                    element.attr("name",$(this).attr("name"));
                    element.change(function(){
                        element.next(element).find('input').val((element.val()).split('\\').pop());
                    });
                    $(this).find("button.btn-choose").click(function(){
                        element.click();
                    });
                    $(this).find("button.btn-reset").click(function(){
                        element.val(null);
                        $(this).parents(".input-file").find('input').val('');
                    });
                    $(this).find('input').css("cursor","pointer");
                    $(this).find('input').mousedown(function() {
                        $(this).parents('.input-file').prev().click();
                        return false;
                    });
                    return element;
                }
            }
        );
    }
    $(function() {
        bs_input_file();
    });

    $(document).click(function(e) {
        if (!$(e.target).is('#collapseUtilities')) {
            $('.collapse').collapse('hide');	    
        }
    });

(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
  })()