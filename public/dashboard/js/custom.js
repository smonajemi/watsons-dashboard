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

      $('#name' && '#price').change(
        function(){
            if ($(this).val()) {
                $('#saveModal').removeAttr('disabled'); 
          
            }
            else {
                $('#saveModal').attr('disabled',true);
             
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


$("#validationCustom04").on('change',function(event){
  const val1 = document.getElementById('name').value
  const val2 = document.getElementById('price').value
  const typeArray = ['Beer', 'Red', 'White']
  if(typeArray.includes($(this).find('option:selected').text())) {
    if (val1 && val2) {
      $("#saveModal").attr('disabled',false)
    }
    else {
      event.preventDefault();
      $("#saveModal").attr('disabled',true)
    }
  }
});


$(".btn[data-target='#menuModals']").click(function() {
  let columnHeadings = $("thead th").map(function() {
    return $(this).text() 
  }).get();
  columnHeadings.pop();
  let columnValues = $(this).parent().siblings().map(function() {
    return $(this).text()
  }).get();

  $.each(columnHeadings, function(i, columnHeader) {
    document.getElementById(columnHeader.toLowerCase()).value += columnValues[i]
  });

});

$('.modal-footer .btn-primary').click(function() {
$('form[name="modalForm"]').submit();
});

// const onSaveModalItem = () => {
//   const val1 = document.getElementById('name').value
//   const val2 = document.getElementById('price').value
//   const val3 = document.getElementById('validationCustom04').value

// // const value = document.getElementById('validationCustom04').value
// // value.length <= 0 ? document.getElementById('saveModal').disabled = true
// // : document.getElementById('saveModal').disabled = false
// }

$(".add-row-userList").click(function(){
  $("#addRow_userList").find("tbody tr:first").length 
  ? $("#addRow_userList").find("tbody tr:first").before("<tr><td data-field='index'></td><td data-field='fname'></td><td data-field='lname'></td><td data-field='username'></td><td data-field='action' style='text-align:center;'>  <a class='add' title='Add' data-toggle='tooltip'><i class='fa fa-plus' aria-hidden='true'></i></a><a class='edit' title='Edit' data-toggle='modal' data-target='#userHandlePasswordModal' onclick='onChangeUserPassword('{{_id}}')'><i class='fa fa-edit'></i></a> <a class='delete' title='Delete' data-toggle='tooltip' onclick='onDeleteUser('{{_id}}')'><i class='fa fa-trash'></i></a></td></tr>") 
  : $("#addRow_userList").find("tbody").after("<tr><td data-field='index'></td><td data-field='fname'></td><td data-field='lname'></td><td data-field='username'></td><td data-field='action'>  <a class='add' title='Add' data-toggle='tooltip'><i class='fa fa-plus' aria-hidden='true'></i></a><a class='edit' title='Edit' data-toggle='modal' data-target='#userHandlePasswordModal' onclick='onChangeUserPassword('{{_id}}')'><i class='fa fa-edit'></i></a> <a class='delete' title='Delete' data-toggle='tooltip' onclick='onDeleteUser('{{_id}}')'><i class='fa fa-trash'></i></a></td></tr>");   
  editTable();  
  setTimeout(function(){   
    $("#addRow_userList").find("tbody tr:first td:last a[title='Edit']").click(); 
  }, 200); 
  
  setTimeout(function(){ 
    $("#addRow_userList").find("tbody tr:first td:first input[type='text']").focus();
      }, 300); 
  
   $("#addRow_userList").find("a[title='Delete']").unbind('click').click(function(e){
        $(this).closest("tr").remove();
    });
   
});



$(".add-row-foodMenu").click(function(){
  $("#addRow_foodMenu").find("tbody tr:first").length 
  ? $("#addRow_foodMenu").find("tbody tr:first").before("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center; display: flex;' ><a class='btn btn-primary' data-toggle='modal' data-target='#menuModals' contenteditable='false'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' onclick='onDelete('{{_id}}', '{{menuTitle}}')'><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>") 
  : $("#addRow_foodMenu").find("tbody").after("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center; display: flex;'><a class='btn btn-primary' data-toggle='modal' data-target='#menuModals' contenteditable='false'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' onclick='onDelete('{{_id}}', '{{menuTitle}}')'><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>");   
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
  ? $("#addRow_cocktailMenu").find("tbody tr:first").before("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center; display: flex;'><a class='btn btn-primary' data-toggle='modal' data-target='#menuModals' contenteditable='false'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' onclick='onDelete('{{_id}}', '{{menuTitle}}')'><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>") 
  : $("#addRow_cocktailMenu").find("tbody").after("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center; display: flex;'><a class='btn btn-primary' data-toggle='modal' data-target='#menuModals' contenteditable='false'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' onclick='onDelete('{{_id}}', '{{menuTitle}}')'><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>");   
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
  ? $("#addRow_beerMenu").find("tbody tr:first").before("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center; display: flex;'><a class='btn btn-primary' data-toggle='modal' data-target='#menuModals' contenteditable='false'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' onclick='onDelete('{{_id}}', '{{menuTitle}}')'><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>") 
  : $("#addRow_beerMenu").find("tbody").after("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center; display: flex;'><a class='btn btn-primary' data-toggle='modal' data-target='#menuModals' contenteditable='false'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' onclick='onDelete('{{_id}}', '{{menuTitle}}')'><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>");   

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
  ? $("#addRow_qrMenu").find("tbody tr:first").before("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center; display: flex;'><a class='btn btn-primary' data-toggle='modal' data-target='#menuModals' contenteditable='false'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' onclick='onDelete('{{_id}}', '{{menuTitle}}')'><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>") 
  : $("#addRow_qrMenu").find("tbody").after("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center; display: flex;'><a class='btn btn-primary' data-toggle='modal' data-target='#menuModals' contenteditable='false'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' onclick='onDelete('{{_id}}', '{{menuTitle}}')'><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>");   

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
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/menu/item", true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
    xhr.send(`id=${id}&title=${title}`);
}
const onDeleteUser = (id) => {
  let xhr = new XMLHttpRequest();
  xhr.open("DELETE", `/users/${id}`, true);
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8')
  xhr.send(`id=${id}`);
}

const onChangeUserPassword = (id) => {
  document.getElementById('userPasswordForm').action = `/users/password/${id}`
}

// const onSaveModalItem = () => {
//   const value = document.getElementById('validationCustom04').value
//   value.length <= 0 ? document.getElementById('saveModal').disabled = true
//   : document.getElementById('saveModal').disabled = false
// }

$("#addRow_userList").find("a[title='Delete']").click(function(e){  
  $(this).closest("tr").remove();
});
$("#addRow_foodMenu").find("a[title='Delete']").click(function(e){  
  $(this).closest("tr").remove();
});
$("#addRow_cocktailMenu").find("a[title='Delete']").click(function(e){  
  $(this).closest("tr").remove();
});
$("#addRow_beerMenu").find("a[title='Delete']").click(function(e){  
  $(this).closest("tr").remove();
});
$("#addRow_qrMenu").find("a[title='Delete']").click(function(e){  
    $(this).closest("tr").remove();
});


const handleMenuTabs = (tab) => {
    switch (tab) {
      case 'foodMenu':
        document.getElementById('foodMenuTableBody').style.display = 'initial'

        document.getElementById('cocktailMenuTableBody').style.display = 'none'
        document.getElementById('beerMenuTableBody').style.display = 'none'
        document.getElementById('qrMenuTableBody').style.display = 'none'
        document.getElementById('selectOptions').style.display = 'none'
        document.getElementById('validationCustom04').value = ''
        
        document.getElementById('menuModalForm').action = '/foodMenu'
      break;
      case 'cocktailMenu':
        document.getElementById('cocktailMenuTableBody').style.display = 'initial'

        document.getElementById('foodMenuTableBody').style.display = 'none'
        document.getElementById('beerMenuTableBody').style.display = 'none'
        document.getElementById('qrMenuTableBody').style.display = 'none'
        document.getElementById('selectOptions').style.display = 'none'
        document.getElementById('validationCustom04').value = ''
        
        document.getElementById('menuModalForm').action = '/cocktailMenu'
      break;
      case 'beerMenu':
        document.getElementById('beerMenuTableBody').style.display = 'initial'
        document.getElementById('selectOptions').style.display = 'initial'

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
        document.getElementById('selectOptions').style.display = 'none'
        document.getElementById('validationCustom04').value = ''

        document.getElementById('menuModalForm').action = '/qrMenu'
      break
      default:
        document.getElementById('foodMenuTableBody').style.display = 'initial'
        
        document.getElementById('cocktailMenuTableBody').style.display = 'none'
        document.getElementById('beerMenuTableBody').style.display = 'none'
        document.getElementById('qrMenuTableBody').style.display = 'none'
        document.getElementById('selectOptions').style.display = 'none'
        document.getElementById('validationCustom04').value = ''

        document.getElementById('menuModalForm').action = '/foodMenu'
      break;
    }
}

$('.modal').on('hidden.bs.modal', function () {
  $(this).find('form').trigger('reset');
})