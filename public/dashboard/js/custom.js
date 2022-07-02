$(document).ready( () => {
        $('input:submit').attr('disabled',true);
        $('input:file').change(
            function(){
                if ($(this).val()){
                    $('input:submit').removeAttr('disabled'); 
                }
                else {
                    $('input:submit').attr('disabled',true);
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

// const handleSubmit = () => {
//     alert('submitted')
//         const customFile = document.getElementById('customFile');
//     console.log(customFile)
//     // setTimeout(() => {
//     //     form.reset();
//     // }, 500);
// };

// const form = document.getElementById('my_form');

// form.addEventListener('submit', function handleClick(event) {
//     setTimeout(() => {
//         form.reset();
//     }, 2 * 2000);
// });

// $("#my_form").on("submit", (event) => {
//     // window.location.replace("/");
//  });