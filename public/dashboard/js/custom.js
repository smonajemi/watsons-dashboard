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
    });

// const handleSubmit = () => {
//     alert('submitted')
//         const customFile = document.getElementById('customFile');
//     console.log(customFile)
//     // setTimeout(() => {
//     //     form.reset();
//     // }, 500);
// };

const form = document.getElementById('my_form');

form.addEventListener('submit', function handleClick(event) {
    // setTimeout(() => {
    //     form.reset();
    // }, 2 * 1000);
});

// $("#my_form").on("submit", (event) => {
//     // window.location.replace("/");
//  });