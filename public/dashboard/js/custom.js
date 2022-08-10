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


$(".btn[data-target='#foodMenuModal']").click(function() {
  let columnHeadings = $("thead th").map(function() {
    return $(this).text() 
  }).get();
  // columnHeadings.shift();       
  columnHeadings.pop();
  let columnValues = $(this).parent().siblings().map(function() {
    return $(this).text()
  }).get();
  // columnValues.shift()
  $.each(columnHeadings, function(i, columnHeader) {
    document.getElementById(columnHeader.toLowerCase()).value += columnValues[i]
  });
});
$('.modal-footer .btn-primary').click(function() {
$('form[name="modalForm"]').submit();
});

// $(".btn[data-target='#cocktailMenuModal']").click(function() {

//   let columnHeadings = $("thead th").map(function() {
//     return $(this).text() 
//   }).get();
//   // columnHeadings.shift();       
//   columnHeadings.pop();
//   let columnValues = $(this).parent().siblings().map(function() {
//     return $(this).text()
//   }).get();
//   // columnValues.shift()
//   $.each(columnHeadings, function(i, columnHeader) {
//     document.getElementById(columnHeader.toLowerCase()).value += columnValues[i]
//   });
// });
// $('.modal-footer .btn-primary').click(function() {
// $('form[name="modalForm_cocktailMenu"]').submit();
// });

// $(".btn[data-target='#beer_wineMenuModal']").click(function() {
//   let columnHeadings = $("thead th").map(function() {
//     return $(this).text() 
//   }).get();
//   // columnHeadings.shift();       
//   columnHeadings.pop();
//   let columnValues = $(this).parent().siblings().map(function() {
//     return $(this).text()
//   }).get();
//   // columnValues.shift()
//   $.each(columnHeadings, function(i, columnHeader) {
//     document.getElementById(columnHeader.toLowerCase()).value += columnValues[i]
//   });
// });
// $('.modal-footer .btn-primary').click(function() {
// $('form[name="modalForm"]').submit();
// });

$(".add-row-foodMenu").click(function(){
  $("#addRow_foodMenu").find("tbody tr:first").length 
  ? $("#addRow_foodMenu").find("tbody tr:first").before("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center; display: flex;'><a class='btn btn-primary' data-toggle='modal' data-target='#foodMenuModal' contenteditable='false'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' onclick='onDelete('{{_id}}', '{{menuTitle}}')'><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>") 
  : $("#addRow_foodMenu").find("tbody").after("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center; display: flex;'><a class='btn btn-primary' data-toggle='modal' data-target='#foodMenuModal' contenteditable='false'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' onclick='onDelete('{{_id}}', '{{menuTitle}}')'><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>");   
  editTable();  
  setTimeout(function(){   
    $("#addRow_foodMenu").find("tbody tr:first td:last a[title='Edit']").click(); 
  }, 200); 
  
  setTimeout(function(){ 
    $("#addRow_foodMenu").find("tbody tr:first td:first input[type='text']").focus();
      }, 300); 
  
   $("#addRow_foodMenu").find("a[title='Delete']").unbind('click').click(function(e){
        $(this).closest("tr").remove();
    });
   
});


$(".add-row-cocktailMenu").click(function(){
  $("#addRow_cocktailMenu").find("tbody tr:first").length 
  ? $("#addRow_cocktailMenu").find("tbody tr:first").before("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center; display: flex;'><a class='btn btn-primary' data-toggle='modal' data-target='#foodMenuModal' contenteditable='false'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' onclick='onDelete('{{_id}}', '{{menuTitle}}')'><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>") 
  : $("#addRow_cocktailMenu").find("tbody").after("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center; display: flex;'><a class='btn btn-primary' data-toggle='modal' data-target='#foodMenuModal' contenteditable='false'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' onclick='onDelete('{{_id}}', '{{menuTitle}}')'><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>");   
  editTable();  
  setTimeout(function(){   
    $("#addRow_cocktailMenu").find("tbody tr:first td:last a[title='Edit']").click(); 
  }, 200); 
  
  setTimeout(function(){ 
    $("#addRow_cocktailMenu").find("tbody tr:first td:first input[type='text']").focus();
      }, 300); 
  
   $("#addRow_cocktailMenu").find("a[title='Delete']").unbind('click').click(function(e){
        $(this).closest("tr").remove();
    });
});

$(".add-row-beerMenu").click(function(){
  $("#addRow_beerMenu").find("tbody tr:first").length 
  ? $("#addRow_beerMenu").find("tbody tr:first").before("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center; display: flex;'><a class='btn btn-primary' data-toggle='modal' data-target='#foodMenuModal' contenteditable='false'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' onclick='onDelete('{{_id}}', '{{menuTitle}}')'><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>") 
  : $("#addRow_beerMenu").find("tbody").after("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center; display: flex;'><a class='btn btn-primary' data-toggle='modal' data-target='#foodMenuModal' contenteditable='false'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' onclick='onDelete('{{_id}}', '{{menuTitle}}')'><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>");   

  editTable();  
  setTimeout(function(){   
    $("#addRow_beerMenu").find("tbody tr:first td:last a[title='Edit']").click(); 
  }, 200); 
  
  setTimeout(function(){ 
    $("#addRow_beerMenu").find("tbody tr:first td:first input[type='text']").focus();
      }, 300); 
  
   $("#addRow_beerMenu").find("a[title='Delete']").unbind('click').click(function(e){
        $(this).closest("tr").remove();
    });
   
});

$(".add-row-qrMenu").click(function(){
  $("#addRow_qrMenu").find("tbody tr:first").length 
  ? $("#addRow_qrMenu").find("tbody tr:first").before("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center; display: flex;'><a class='btn btn-primary' data-toggle='modal' data-target='#foodMenuModal' contenteditable='false'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' onclick='onDelete('{{_id}}', '{{menuTitle}}')'><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>") 
  : $("#addRow_qrMenu").find("tbody").after("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center; display: flex;'><a class='btn btn-primary' data-toggle='modal' data-target='#foodMenuModal' contenteditable='false'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' onclick='onDelete('{{_id}}', '{{menuTitle}}')'><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>");   

  editTable();  
  setTimeout(function(){   
    $("#addRow_qrMenu").find("tbody tr:first td:last a[title='Edit']").click(); 
  }, 200); 
  
  setTimeout(function(){ 
    $("#addRow_qrMenu").find("tbody tr:first td:first input[type='text']").focus();
      }, 300); 
  
   $("#addRow_qrMenu").find("a[title='Delete']").unbind('click').click(function(e){
        $(this).closest("tr").remove();
    });
   
});



const onDelete = (id, title) => {
  if (confirm("Are you sure you want to delete entire row?") == true) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/menu/item", true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
    xhr.send(`id=${id}&title=${title}`);
    location.reload();
  }
}

// $("#addRow_qrMenu").find("a[title='Delete']").click(function(e){  
//     if (onDelete() === true) {
//       $(this).closest("tr").remove();
//     }  
// });


const handleMenuTabs = (tab) => {
    switch (tab) {
      case 'foodMenu':
        document.getElementById('foodMenuTableBody').style.display = 'initial'
        document.getElementById('cocktailMenuTableBody').style.display = 'none'
        document.getElementById('beerMenuTableBody').style.display = 'none'
        document.getElementById('qrMenuTableBody').style.display = 'none'
        document.getElementById('menuModalForm').action = '/foodMenu'
      break;
      case 'cocktailMenu':
        document.getElementById('cocktailMenuTableBody').style.display = 'initial'
        document.getElementById('foodMenuTableBody').style.display = 'none'
        document.getElementById('beerMenuTableBody').style.display = 'none'
        document.getElementById('qrMenuTableBody').style.display = 'none'
        document.getElementById('menuModalForm').action = '/cocktailMenu'
      break;
      case 'beerMenu':
        document.getElementById('beerMenuTableBody').style.display = 'initial'
        document.getElementById('foodMenuTableBody').style.display = 'none'
        document.getElementById('cocktailMenuTableBody').style.display = 'none'
        document.getElementById('qrMenuTableBody').style.display = 'none'
        document.getElementById('menuModalForm').action = '/beer_wineMenu'
      break;
      case 'qrMenu':
        document.getElementById('qrMenuTableBody').style.display = 'initial'
        document.getElementById('foodMenuTableBody').style.display = 'none'
        document.getElementById('cocktailMenuTableBody').style.display = 'none'
        document.getElementById('beerMenuTableBody').style.display = 'none'
        document.getElementById('menuModalForm').action = '/qrMenu'
      break
      default:
        document.getElementById('foodMenuTableBody').style.display = 'initial'
        document.getElementById('cocktailMenuTableBody').style.display = 'none'
        document.getElementById('beerMenuTableBody').style.display = 'none'
        document.getElementById('qrMenuTableBody').style.display = 'none'
        document.getElementById('menuModalForm').action = '/foodMenu'
      break;
    }
}

$('.modal').on('hidden.bs.modal', function () {
  $(this).find('form').trigger('reset');
})