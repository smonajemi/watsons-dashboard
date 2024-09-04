$(document).ready(() => {
  
  // Disable the submit button when the page loads
  // $('input:submit').attr('disabled',true);

  $('input:file').change(
    function () {
      if ($(this).val()) {
        $('input:submit').removeAttr('disabled');
      }
      else {
        $('input:submit').attr('disabled', false);
      }
    });
  $('input:text').change(
    function () {
      if ($(this).val()) {
        $('input:submit').removeAttr('disabled');
      }
      else {
        $('input:submit').attr('disabled', true);
      }
    })

    $('#name, #price, #description, #type, #myPass_re, #myPass').on('input', function () {
      const myPass_r =  $('#myPass_re').val();
      const myPass =  $('#myPass').val();
      const name = $('#name').val();
      const price = $('#price').val();
      const description = $('#description').val();
      const type = $('#type').val();

      const isDisabled = !(type || name && price);
      $('#saveModal').attr('disabled', isDisabled);
      const isSaved = !(myPass_r && myPass)
      $('#save').attr('disabled', isSaved);
    });

  
  $('#submit').attr('disabled', false);
  $('#cancel').attr('disabled', false);

});

const handleReset = () => {
  location.reload()
}
function bs_input_file() {
  $(".input-file").before(
    function () {
      if (!$(this).prev().hasClass('input-ghost')) {
        var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0' accept='.pdf'>");
        element.attr("name", $(this).attr("name"));
        element.change(function () {
          element.next(element).find('input').val((element.val()).split('\\').pop());
        });
        $(this).find("button.btn-choose").click(function () {
          element.click();
        });
        $(this).find("button.btn-reset").click(function () {
          element.val(null);
          $(this).parents(".input-file").find('input').val('');
        });
        $(this).find('input').css("cursor", "pointer");
        $(this).find('input').mousedown(function () {
          $(this).parents('.input-file').prev().click();
          return false;
        });
        return element;
      }
    }
  );
}
$(function () {
  bs_input_file();
});

// $(document).click(function(e) {
//   if ($(e.target).is('#modal')) {
//     $('.collapse').collapse('hide');	 

//   }
// });

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



$("#validationCustom04").on('change', function (event) {
  const val1 = document.getElementById('name').value
  const val2 = document.getElementById('price').value
  const val3 = document.getElementById('description').value
  const typeArray = ['beer', 'red', 'white', 'sparkling']
  if (typeArray.includes($(this).find('option:selected').text().toLowerCase())) {
    if (val1 && val2 && val3) {
      $("#saveModal").attr('disabled', false)
    }
    else {
      event.preventDefault();
      $("#saveModal").attr('disabled', true)
    }
  }
});

$("#validationCustom05").on('change', function (event) {
  const val1 = document.getElementById('name').value
  const val2 = document.getElementById('price').value
  const val3 = document.getElementById('description').value
  const typeArray = ['Single Malt Scotch', 'Blended Scotch', 'Canadian Whiskey', 'American Whiskey', 'Japanese Whiskey', 'Tequila', 'Mezcal', 'Irish Whiskey', 'Cognac & Armagnac', 'Rum', 'Vodka', 'Gin']
  if (typeArray.includes($(this).find('option:selected').text())) {
    if (val1 || val2 || val3) {
      $("#saveModal").attr('disabled', false)
    }
    else {
      event.preventDefault();
      $("#saveModal").attr('disabled', true)
    }
  }
});



$(".btn[data-target='#menuModals']").click(function () {
  let columnHeadings = $("thead th").map(function () {
    return $(this).text()
  }).get();
  columnHeadings.pop();
  let columnValues = $(this).parent().siblings().map(function () {
    return $(this).text()
  }).get();

  $.each(columnHeadings, function (i, columnHeader) {
    document.getElementById(columnHeader.toLowerCase()).value += columnValues[i]
  });

});

$('.modal-footer .btn-primary').click(function () {
  $('form[name="modalForm"]').submit();
});


$(".add-row-userList").click(function () {
  $("#addRow_userList").find("tbody tr:first").length
    ? $("#addRow_userList").find("tbody tr:first").before("<tr><td data-field='index'></td><td data-field='fname'></td><td data-field='lname'></td><td data-field='username'></td><td data-field='action' style='text-align:center;'>  <a class='add' title='Add' data-toggle='tooltip'><i class='fa fa-plus' aria-hidden='true'></i></a><a class='edit' title='Edit' data-toggle='modal' data-target='#userHandlePasswordModal' onclick='onChangeUserPassword('{{_id}}')'><i class='fa fa-edit'></i></a> <a class='delete' title='Delete' data-toggle='tooltip' onclick='onDeleteUser('{{_id}}')'><i class='fa fa-trash'></i></a></td></tr>")
    : $("#addRow_userList").find("tbody").after("<tr><td data-field='index'></td><td data-field='fname'></td><td data-field='lname'></td><td data-field='username'></td><td data-field='action'>  <a class='add' title='Add' data-toggle='tooltip'><i class='fa fa-plus' aria-hidden='true'></i></a><a class='edit' title='Edit' data-toggle='modal' data-target='#userHandlePasswordModal' onclick='onChangeUserPassword('{{_id}}')'><i class='fa fa-edit'></i></a> <a class='delete' title='Delete' data-toggle='tooltip' onclick='onDeleteUser('{{_id}}')'><i class='fa fa-trash'></i></a></td></tr>");
  editTable();
  setTimeout(function () {
    $("#addRow_userList").find("tbody tr:first td:last a[title='Edit']").click();
  }, 200);

  setTimeout(function () {
    $("#addRow_userList").find("tbody tr:first td:first input[type='text']").focus();
  }, 300);

  $("#addRow_userList").find("a[title='Delete']").unbind('click').click(function (e) {
    $(this).closest("tr").remove();
  });

});



$(".add-row-foodMenu").click(function () {
  $("#addRow_foodMenu").find("tbody tr:first").length
    ? $("#addRow_foodMenu").find("tbody tr:first").before("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center;' ><a class='btn btn-primary' data-toggle='modal' data-target='#menuModals' contenteditable='false' style='margin-bottom: .2em;'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' ><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>")
    : $("#addRow_foodMenu").find("tbody").after("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center;'><a class='btn btn-primary' data-toggle='modal' data-target='#menuModals' contenteditable='false' style='margin-bottom: .2em;'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' ><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>");
  editTable();
  setTimeout(function () {
    $("#addRow_foodMenu").find("tbody tr:first td:last a[title='Edit']").click();
  }, 200);

  setTimeout(function () {
    $("#addRow_foodMenu").find("tbody tr:first td:first input[type='text']").focus();
  }, 300);

  $("#addRow_foodMenu").find("a[title='Delete']").unbind('click').click(function (e) {
    $(this).closest("tr").remove();
  });

});

$(".add-row-cocktailMenu").click(function () {
  $("#addRow_cocktailMenu").find("tbody tr:first").length
    ? $("#addRow_cocktailMenu").find("tbody tr:first").before("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center;'><a class='btn btn-primary' data-toggle='modal' data-target='#menuModals' contenteditable='false' style='margin-bottom: .2em;'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' ><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>")
    : $("#addRow_cocktailMenu").find("tbody").after("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center;'><a class='btn btn-primary' data-toggle='modal' data-target='#menuModals' contenteditable='false' style='margin-bottom: .2em;'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' ><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>");
  editTable();
  setTimeout(function () {
    $("#addRow_cocktailMenu").find("tbody tr:first td:last a[title='Edit']").click();
  }, 200);

  setTimeout(function () {
    $("#addRow_cocktailMenu").find("tbody tr:first td:first input[type='text']").focus();
  }, 300);

  $("#addRow_cocktailMenu").find("a[title='Delete']").unbind('click').click(function (e) {
    $(this).closest("tr").remove();
  });
});

$(".add-row-beerMenu").click(function () {
  $("#addRow_beerMenu").find("tbody tr:first").length
    ? $("#addRow_beerMenu").find("tbody tr:first").before("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center;'><a class='btn btn-primary' data-toggle='modal' data-target='#menuModals' contenteditable='false' style='margin-bottom: .2em;'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' ><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>")
    : $("#addRow_beerMenu").find("tbody").after("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center;'><a class='btn btn-primary' data-toggle='modal' data-target='#menuModals' contenteditable='false' style='margin-bottom: .2em;'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' ><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>");

  editTable();
  setTimeout(function () {
    $("#addRow_beerMenu").find("tbody tr:first td:last a[title='Edit']").click();
  }, 200);

  setTimeout(function () {
    $("#addRow_beerMenu").find("tbody tr:first td:first input[type='text']").focus();
  }, 300);

  $("#addRow_beerMenu").find("a[title='Delete']").unbind('click').click(function (e) {
    $(this).closest("tr").remove();
  });

});

$(".add-row-qrMenu").click(function () {
  $("#addRow_qrMenu").find("tbody tr:first").length
    ? $("#addRow_qrMenu").find("tbody tr:first").before("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center;'><a class='btn btn-primary' data-toggle='modal' data-target='#menuModals' contenteditable='false' style='margin-bottom: .2em;'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' ><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>")
    : $("#addRow_qrMenu").find("tbody").after("<tr><td data-field='name'></td><td data-field='price'></td><td data-field='description'></td><td data-field='id' style='text-align:center;'></td><td data-field='action' style='text-align:center;;'><a class='btn btn-primary' data-toggle='modal' data-target='#menuModals' contenteditable='false' style='margin-bottom: .2em;'> <span id='span'><i class='fa fa-pencil'></i></span></a><a class='btn btn-danger' title='Delete' ><span id='span'><i class='fa fa-trash'></i></span></a></td></tr>");

  editTable();
  setTimeout(function () {
    $("#addRow_qrMenu").find("tbody tr:first td:last a[title='Edit']").click();
  }, 200);

  setTimeout(function () {
    $("#addRow_qrMenu").find("tbody tr:first td:first input[type='text']").focus();
  }, 300);

  $("#addRow_qrMenu").find("a[title='Delete']").unbind('click').click(function (e) {
    $(this).closest("tr").remove();
  });

});


const onDeleteUser = (id) => {
  if (confirm('Would you like to delete the user?') === true) {
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", `/users/${id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    xhr.send(`id=${id}`);
    setTimeout("location.reload(true);", 100);
  }
}
const onChangeUserPassword = (id) => {
  document.getElementById('userPasswordForm').action = `/users/password/${id}`
}

$("#addRow_foodMenu").find("a[title='Delete']").click(function (e) {
  let currentRow = $(this).closest("tr");
  let id = currentRow.find("td:eq(0)").text();
  let xhr = new XMLHttpRequest();

  if (confirm('Would you like to delete the item?') === true) {
    xhr.open("DELETE", "/menu/item", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    xhr.send(`id=${id}`);
    $(this).closest("tr").remove();
  }
});

$("#addRow_cocktailMenu").find("a[title='Delete']").click(function (e) {
  let currentRow = $(this).closest("tr");
  let id = currentRow.find("td:eq(0)").text();
  let xhr = new XMLHttpRequest();

  if (confirm('Would you like to delete the item?') === true) {
    xhr.open("DELETE", "/menu/item", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    xhr.send(`id=${id}`);
    $(this).closest("tr").remove();
  }
});
$("#addRow_beerMenu").find("a[title='Delete']").click(function (e) {
  let currentRow = $(this).closest("tr");
  let id = currentRow.find("td:eq(0)").text();
  let xhr = new XMLHttpRequest();

  if (confirm('Would you like to delete the item?') === true) {
    xhr.open("DELETE", "/menu/item", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    xhr.send(`id=${id}`);
    $(this).closest("tr").remove();
  }
});
$("#addRow_qrMenu").find("a[title='Delete']").click(function (e) {
  let currentRow = $(this).closest("tr");
  let id = currentRow.find("td:eq(0)").text();
  let xhr = new XMLHttpRequest();

  if (confirm('Would you like to delete the item?') === true) {
    xhr.open("DELETE", "/menu/item", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    xhr.send(`id=${id}`);
    $(this).closest("tr").remove();
  }
});


// const handleMenuTabs = (tab) => {
//     switch (tab) {
//       case 'foodMenu':
//         document.getElementById('menuModalForm').action = '/foodMenu'
//         document.getElementById('foodMenuTableBody').style.display = 'initial'

//         document.getElementById('cocktailMenuTableBody').style.display = 'none'
//         document.getElementById('beerMenuTableBody').style.display = 'none'
//         document.getElementById('qrMenuTableBody').style.display = 'none'
//         document.getElementById('selectOptions').style.display = 'none'
//         document.getElementById('qrSelectOptions').style.display = 'none'
//       break;
//       case 'cocktailMenu':
//         document.getElementById('menuModalForm').action = '/cocktailMenu'
//         document.getElementById('cocktailMenuTableBody').style.display = 'initial'

//         document.getElementById('foodMenuTableBody').style.display = 'none'
//         document.getElementById('beerMenuTableBody').style.display = 'none'
//         document.getElementById('qrMenuTableBody').style.display = 'none'
//         document.getElementById('selectOptions').style.display = 'none'
//         document.getElementById('qrSelectOptions').style.display = 'none'
//       break;
//       case 'beerMenu':
//         document.getElementById('menuModalForm').action = '/beer_wineMenu'
//         document.getElementById('beerMenuTableBody').style.display = 'initial'
//         document.getElementById('selectOptions').style.display = 'initial'
//         document.getElementById('validationCustom04').style.display = 'flex'

//         document.getElementById('validationCustom05').style.display = 'none'
//         document.getElementById('foodMenuTableBody').style.display = 'none'
//         document.getElementById('cocktailMenuTableBody').style.display = 'none'
//         document.getElementById('qrMenuTableBody').style.display = 'none'
//         document.getElementById('qrSelectOptions').style.display = 'none'
//       break;
//       case 'qrMenu':
//         document.getElementById('menuModalForm').action = '/qrMenu'
//         document.getElementById('qrMenuTableBody').style.display = 'initial'
//         document.getElementById('selectOptions').style.display = 'initial'
//         document.getElementById('validationCustom05').style.display = 'flex'

//         document.getElementById('foodMenuTableBody').style.display = 'none'
//         document.getElementById('cocktailMenuTableBody').style.display = 'none'
//         document.getElementById('beerMenuTableBody').style.display = 'none'
//         document.getElementById('validationCustom04').style.display = 'none'
//       break
//       default:                 
//         document.getElementById('menuModalForm').action = '/foodMenu'
//         document.getElementById('foodMenuTableBody').style.display = 'initial'

//         document.getElementById('cocktailMenuTableBody').style.display = 'none'
//         document.getElementById('beerMenuTableBody').style.display = 'none'
//         document.getElementById('qrMenuTableBody').style.display = 'none'
//         document.getElementById('selectOptions').style.display = 'none'
//         document.getElementById('qrSelectOptions').style.display = 'none'
//       break;
//     }
// }

const handleMenuTabs = (tab) => {
  const url = new URL(window.location);
  switch (tab) {
    case 'foodMenu':
      url.searchParams.set('type', tab);
      window.history.pushState({}, '', url);
      document.getElementById('menuModalForm').action = '/foodMenu';
      document.getElementById('select-food-options').style.display = 'block';
      document.getElementById('select-beer-options').style.display = 'none';
      document.getElementById('selectOptions').style.display = 'none';
      break;
    case 'cocktailMenu':
      url.searchParams.set('type', tab);
      window.history.pushState({}, '', url);
      document.getElementById('menuModalForm').action = '/cocktailMenu';
      document.getElementById('selectOptions').style.display = 'none';
      document.getElementById('select-food-options').style.display = 'none';
      document.getElementById('select-beer-options').style.display = 'none';
      break;
    case 'beerMenu':
      url.searchParams.set('type', tab);
      window.history.pushState({}, '', url);
      document.getElementById('menuModalForm').action = '/beer_wineMenu';
      document.getElementById('select-beer-options').style.display = 'block';
      document.getElementById('select-food-options').style.display = 'none';
      document.getElementById('selectOptions').style.display = 'none';
      break;
    case 'qrMenu':
      url.searchParams.set('type', tab);
      window.history.pushState({}, '', url);
      document.getElementById('menuModalForm').action = '/qrMenu';
      document.getElementById('selectOptions').style.display = 'block';
      document.getElementById('select-food-options').style.display = 'none';
      document.getElementById('select-beer-options').style.display = 'none';
      break;
    default:
      url.searchParams.set('type', 'qrMenu');
      window.history.pushState({}, '', url);
      document.getElementById('menuModalForm').action = '/qrMenu';
      document.getElementById('selectOptions').style.display = 'block';
      document.getElementById('select-food-options').style.display = 'none';
      document.getElementById('select-beer-options').style.display = 'none';
      break;
  }
}


$(document).ready(function () {
  const params = new URLSearchParams(window.location.search)
  const type = params.get('type')
  // $(".tabs").on("click", function (e) {
  //   var target = $(e.target).attr("data-bs-target");
  //   if (target != null)
  //   var tab = target.split('#')[1];
  //  });

  switch (type) {
    case 'qrMenu':
      document.getElementById('menuModalForm').action = '/qrMenu'
      document.getElementById('selectOptions').style.display = 'block'
      document.getElementById('select-beer-options').style.display = 'none'
      document.getElementById('select-food-options').style.display = 'none'


      var qrMenuTab = document.getElementById(`pills-${type}-tab`);
      qrMenuTab.classList.add("active");
      var qrMenu = document.getElementById(`pills-${type}`);
      qrMenu.classList.add("show");
      qrMenu.classList.add("active");
      break;
    case 'beerMenu':
      document.getElementById('menuModalForm').action = '/beer_wineMenu'
      var beerMenuTab = document.getElementById(`pills-${type}-tab`);
      beerMenuTab.classList.add("active");
      var beerMenu = document.getElementById(`pills-${type}`);
      beerMenu.classList.add("show");
      beerMenu.classList.add("active");
      break;

    case 'foodMenu':
      document.getElementById('menuModalForm').action = '/foodMenu'
      document.getElementById('selectOptions').style.display = 'none'

      var foodMenuTab = document.getElementById(`pills-${type}-tab`);
      foodMenuTab.classList.add("active");
      var foodMenu = document.getElementById(`pills-${type}`);
      foodMenu.classList.add("show");
      foodMenu.classList.add("active");
      break;

    case 'cocktailMenu':
      document.getElementById('menuModalForm').action = '/cocktailMenu'
      document.getElementById('selectOptions').style.display = 'none'

      var cocktailMenuTab = document.getElementById(`pills-${type}-tab`);
      cocktailMenuTab.classList.add("active");
      var cocktailMenu = document.getElementById(`pills-${type}`);
      cocktailMenu.classList.add("show");
      cocktailMenu.classList.add("active");
      break;
  }
  if (type != 'qrMenu') {
    var el1 = document.getElementById('pills-qrMenu-tab');
    el1.classList.remove("active");
    var el2 = document.getElementById('pills-qrMenu');
    el2.classList.remove("show");
    el2.classList.remove("active");
  }
});

$('.modal').on('hidden.bs.modal', function () {
  $(this).find('form').trigger('reset');
  document.getElementById('saveModal').disabled = true
})

function foodMenuFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput_food");
  filter = input.value.toUpperCase()
  table = document.getElementById("addRow_foodMenu");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function cocktailMenuFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput_cocktail");
  filter = input.value.toUpperCase()
  table = document.getElementById("addRow_cocktailMenu");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function beerMenuFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput_beer");
  filter = input.value.toUpperCase()
  table = document.getElementById("addRow_beerMenu");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
function beerTypeMenuFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput_beer_type");
  filter = input.value.toUpperCase()
  table = document.getElementById("addRow_beerMenu");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[4];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function qrMenuFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput_qr");
  filter = input.value.toUpperCase()
  table = document.getElementById("addRow_qrMenu");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function qrTypeMenuFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput_qr_type");
  filter = input.value.toUpperCase()
  table = document.getElementById("addRow_qrMenu");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[4];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}


const usersFunction = () => {
  document.getElementById('usersTable').style.display = 'initial'
  document.getElementById('menuTable').style.display = 'none'
}

const homeFunction = () => {
  document.getElementById('menuTable').style.display = 'initial'
  document.getElementById('usersTable').style.display = 'none'
}

const onDisabled = () => {
  if (document.getElementById('typeCheckBox').checked == true) {
    document.getElementById('type').disabled = true
    document.getElementById('typeInput').disabled = false
  } else {
    document.getElementById('typeInput').disabled = true
    document.getElementById('type').disabled = false

  }
}


