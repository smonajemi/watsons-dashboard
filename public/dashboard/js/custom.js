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


$(".btn[data-target='#myModal']").click(function() {
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



// (function($, window, document, undefined) {
//   var pluginName = "editable",
//     defaults = {
//       keyboard: true,
//       dblclick: true,
//       button: true,
//       buttonSelector: ".edit",
//       maintainWidth: true,
//       dropdowns: {},
//       edit: function() {},
//       save: function() {},
//       cancel: function() {}
//     };

//   function editable(element, options) {
//     this.element = element;
//     this.options = $.extend({}, defaults, options);

//     this._defaults = defaults;
//     this._name = pluginName;

//     this.init();
//   }

//   editable.prototype = {
//     init: function() {
//       this.editing = false;

//       if (this.options.dblclick) {
//         $(this.element)
//           .css('cursor', 'pointer')
//           .bind('dblclick', this.toggle.bind(this));
//       }

//       if (this.options.button) {
//         $(this.options.buttonSelector, this.element)
//           .bind('click', this.toggle.bind(this));
//       }
//     },

//     toggle: function(e) {
//       e.preventDefault();

//       this.editing = !this.editing;

//       if (this.editing) {
//         this.edit();
//       } else {
//         this.save();
//       }
//     },

//     edit: function() {
//       var instance = this,
//         values = {};

//       $('td[data-field]', this.element).each(function() {
//         var input,
//           field = $(this).data('field'),
//           value = $(this).text(),
//           width = $(this).width();

//         values[field] = value;

//         $(this).empty();

//         if (instance.options.maintainWidth) {
//           $(this).width(width);
//         }

//         if (field in instance.options.dropdowns) {
//           input = $('<select></select>');

//           for (var i = 0; i < instance.options.dropdowns[field].length; i++) {
//             $('<option></option>')
//               .text(instance.options.dropdowns[field][i])
//               .appendTo(input);
//           };

//           input.val(value)
//             .data('old-value', value)
//             .dblclick(instance._captureEvent);
//         } else {
//           input = $('<input type="text" />')
//             .val(value)
//             .data('old-value', value)
//             .dblclick(instance._captureEvent);
//         }

//         input.appendTo(this);

//         if (instance.options.keyboard) {
//           input.keydown(instance._captureKey.bind(instance));
//         }
//       });

//       this.options.edit.bind(this.element)(values);
//     },

//     save: function() {
//       var instance = this,
//         values = {};

//       $('td[data-field]', this.element).each(function() {
//         var value = $(':input', this).val();

//         values[$(this).data('field')] = value;

//         $(this).empty()
//           .text(value);
//       });

//       this.options.save.bind(this.element)(values);
//     },

//     cancel: function() {
//       var instance = this,
//         values = {};

//       $('td[data-field]', this.element).each(function() {
//         var value = $(':input', this).data('old-value');

//         values[$(this).data('field')] = value;

//         $(this).empty()
//           .text(value);
//       });

//       this.options.cancel.bind(this.element)(values);
//     },

//     _captureEvent: function(e) {
//       e.stopPropagation();
//     },

//     _captureKey: function(e) {
//       if (e.which === 13) {
//         this.editing = false;
//         this.save();
//       } else if (e.which === 27) {
//         this.editing = false;
//         this.cancel();
//       }
//     }
//   };

//   $.fn[pluginName] = function(options) {
//     return this.each(function() {
//       if (!$.data(this, "plugin_" + pluginName)) {
//         $.data(this, "plugin_" + pluginName,
//           new editable(this, options));
//       }
//     });
//   };

// })(jQuery, window, document);

// editTable();

//custome editable starts
// function editTable(){
  
//   $(function() {
//   var pickers = {};

//   $('table tr').editable({
//     dropdowns: {
//       sex: ['Male', 'Female']
//     },
//     edit: function(values) {
//       $(".edit i", this)
//         .removeClass('fa-pencil')
//         .addClass('fa-save')
//         .attr('title', 'Save');

//       pickers[this] = new Pikaday({
//         field: $("td[data-field=birthday] input", this)[0],
//         format: 'MMM D, YYYY'
//       });
//     },
//     save: function(values) {
//       $(".edit i", this)
//         .removeClass('fa-save')
//         .addClass('fa-pencil')
//         .attr('title', 'Edit');

//       if (this in pickers) {
//         pickers[this].destroy();
//         delete pickers[this];
//       }
//     },
//     cancel: function(values) {
//       $(".edit i", this)
//         .removeClass('fa-save')
//         .addClass('fa-pencil')
//         .attr('title', 'Edit');

//       if (this in pickers) {
//         pickers[this].destroy();
//         delete pickers[this];
//       }
//     }
//   });
// });
  
// }

$(".add-row").click(function(){
  $("#editableTable").find("tbody tr:first").before("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center; display: flex;'><a class='btn btn-primary' data-toggle='modal' data-target='#myModal' contenteditable='false'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete'><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>");   
  editTable();  
  setTimeout(function(){   
    $("#editableTable").find("tbody tr:first td:last a[title='Edit']").click(); 
  }, 200); 
  
  setTimeout(function(){ 
    $("#editableTable").find("tbody tr:first td:first input[type='text']").focus();
      }, 300); 
  
   $("#editableTable").find("a[title='Delete']").unbind('click').click(function(e){
        $(this).closest("tr").remove();
    });
   
});

// function myFunction() {
    
// }

$("#editableTable").find("a[title='Delete']").click(function(e){  
  var x;
    if (confirm("Are you sure you want to delete entire row?") == true) {
        $(this).closest("tr").remove();
    } else {
        
    }     
});
