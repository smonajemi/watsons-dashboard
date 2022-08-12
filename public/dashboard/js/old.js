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




//   const onEdit = () => {
//     // document.getElementById('inputField-name').disabled = false
//     // document.getElementById('inputField-price').disabled = false
//     // document.getElementById('inputField-desc').disabled = false

//     // document.getElementById('edit').style.display = 'none'
//     // document.getElementById('save').style.display = 'block'
//     const t = document.getElementById('trValue').value
//     alert(t)
//   }


//   const onSave = () => {
//     document.getElementById('inputField-name').disabled = true
//     document.getElementById('inputField-price').disabled = true
//     document.getElementById('inputField-desc').disabled = true

//     document.getElementById('edit').style.display = 'block'
//     document.getElementById('save').style.display = 'none'
//   }


// $(document).ready(function(){
// 	$('[data-toggle="tooltip"]').tooltip();
// 	var actions = $("table td:last-child").html();
// 	// Append table with add row form on add new button click
//     $(".add-new").click(function(){
// 		$(this).attr("disabled", "disabled");
// 		var index = $("table tbody tr:last-child").index();
//         var row = '<tr>' +
//             '<td><input type="text" class="form-control" name="name" id="name"></td>' +
//             '<td><input type="text" class="form-control" name="department" id="department"></td>' +
//             '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
// 			'<td>' + actions + '</td>' +
//         '</tr>';
//     	$("table").append(row);		
// 		$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
//         $('[data-toggle="tooltip"]').tooltip();
//     });
// 	// Add row on add button click
// 	$(document).on("click", ".add", function(){
// 		var empty = false;
// 		var input = $(this).parents("tr").find('input[type="text"]');
//         input.each(function(){
// 			if(!$(this).val()){
// 				$(this).addClass("error");
// 				empty = true;
// 			} else{
//                 $(this).removeClass("error");
//             }
// 		});
// 		$(this).parents("tr").find(".error").first().focus();
// 		if(!empty){
// 			input.each(function(){
// 				$(this).parent("td").html($(this).val());
// 			});			
// 			$(this).parents("tr").find(".add, .edit").toggle();
// 			$(".add-new").removeAttr("disabled");
// 		}		
//     });
// 	// Edit row on edit button click
// 	$(document).on("click", ".edit", function(){		
//         $(this).parents("tr").find("td:not(:last-child)").each(function(){
// 			$(this).html('<input type="text" class="form-control" name="menu" value="' + $(this).text() + '">');
// 		});		
// 		// $(this).parents("tr").find(".add, .edit").toggle();
// 		$(".add-new").attr("disabled", "disabled");
//     });
// 	// Delete row on delete button click
// 	$(document).on("click", ".delete", function(){
//         $(this).parents("tr").remove();
// 		$(".add-new").removeAttr("disabled");
//     });
// });



// $(".btn[data-target='#myModal']").click(function() {
//     var columnHeadings = $("thead th").map(function() {
//               return $(this).text();
//            }).get();
//     columnHeadings.pop();
//     var columnValues = $(this).parent().siblings().map(function() {
//               return $(this).text();
//     }).get();
// var modalBody = $('<div id="modalContent"></div>');
// var modalForm = $('<form role="form" name="modalForm" action="/" method="post"></form>');
// let array = []
// let nameArray = ['Name', 'Price', 'Description']
// for (var x = 1; x <= columnValues.length; x++) {
//     array.push(columnValues[x])
// }
// array = array.filter(( element ) => {
//     return element !== undefined;
//  });

// //  var send = { "name":"John", "age":30, "car":null };
// // var sendString = JSON.stringify(send);
// xhttp.send(array);

// $.each(columnHeadings, (i, columnHeader) => {

//     var formGroup = $('<div class="form-group"></div>');
//     formGroup.append('<label for="'+columnHeader+'">'+columnHeader+'</label>');
//     formGroup.append('<input class="form-control" name="'+columnHeader+i+'" id="'+columnHeader+i+'" value="'+columnValues[i]+'" />'); 
//     modalForm.append(formGroup);
// });
// // var t = $('<div class="form-group"></div>');
// // t.append('<input class="form-control" name="id" id="id" value="'+columnValues[0]+'" style="display: none;"/>'); 
// // modalForm.append(t);
// modalBody.append(modalForm);
// $('.modal-body').html(modalBody);
// });

// $('.modal-footer .btn-primary').click(function() {
// $('form[name="modalForm"]').submit();
// });


// function create_tr(table_id) {
//     let table_body = document.getElementById(table_id),
//         first_tr   = table_body.firstElementChild
//         tr_clone   = first_tr.cloneNode(true);

//     table_body.append(tr_clone);

//     clean_first_tr(table_body.firstElementChild);
// }

// function clean_first_tr(firstTr) {
//     let children = firstTr.children;

//     children = Array.isArray(children) ? children : Object.values(children);
//     children.forEach(x=>{
//         if(x !== firstTr.lastElementChild)
//         {
//             x.firstElementChild.value = '';
//         }
//     });
// }

// function remove_tr(This) {
//     if(This.closest('tbody').childElementCount == 1)
//     {
//         alert("You Don't have Permission to Delete This ?");
//     }else{
//         This.closest('tr').remove();
//     }
// }

// // const onSave = () => {

// // }
// $(".btn[data-target='#myModal']").click(function() {
//     var columnHeadings = $("thead th").map(function() {
//               return $(this).text() 
//            }).get();
//     columnHeadings.shift();       
//     columnHeadings.pop();
//     var columnValues = $(this).parent().siblings().map(function() {
//               return $(this).text()
//     }).get();
//     columnValues.shift()
// var modalBody = $('<div id="modalContent"></div>');
// var modalForm = $('<form role="form" name="modalForm" action="/" method="post"></form>');
// $.each(columnHeadings, function(i, columnHeader) {
//     var formGroup = $('<div class="form-group"></div>');
//     formGroup.append('<label for="'+columnHeader+'">'+columnHeader+'</label>');
//     columnHeader.includes('Id') ? 
//     formGroup.append('<input class="form-control"  readonly="readonly" name="'+columnHeader.toLowerCase()+'" id="'+columnHeader+'" value="'+columnValues[i]+'" />') : 
//     formGroup.append('<input class="form-control" name="'+columnHeader.toLowerCase()+'" id="'+columnHeader+'" value="'+columnValues[i]+'" />'); 
//     modalForm.append(formGroup);
// });
// modalBody.append(modalForm);
// $('.modal-body').html(modalBody);

// // columnHeadings.forEach(element => {

// // });
// });


// $('.modal-footer .btn-primary').click(function() {
// $('form[name="modalForm"]').submit();
// });


// save: function() {
      
//     var instance = this,
//       values = {};

//     $('td[data-field]', this.element).each(function() {
//       var value = $(':input', this).val();
//       values[$(this).data('field')] = value;

//       $(this).empty()
//         .text(value);

//     });
   
//     // this.options.save.bind(this.element)(values);
//   },