import Select from "./select.js"

(function ($, garantiaCentros) {
  let jsonData = {};
  $.getJSON(garantiaCentros, function (data) {
    jsonData = data;
    for (let i = 0; i < data.length; i++) {
      const html = `<option value="${data[i].id}" data-centro="${data[i].id}" class="option">  ${data[i].datos_centro[0].nombre_centro} </option>`;
      $("#listado_centros").append(html);
    }
    document.querySelectorAll('[data-custom-select').forEach(selectElement => new Select(selectElement))
  })
  
  $(document).ready(function () {
    $("#listado_centros").on('change', function () {
      console.log($(this).val())
      var optionValue = $(this).val()
      if (optionValue) {
        $(function () {
            $("#visual_info").html("");
            $.each(jsonData, function (i, obj) {
              if (obj.id == optionValue) {
                $.each(obj.datos_centro, function (i, centro) {
                  var phoneNumbers = []
                  console.log(centro.telefonos)
                  centro.telefonos.forEach(telefono =>{
                    var phone = telefono.replace("(","").replace(")","").replace(/\s/g,"")
                    phone = (phone.length > 10) ? phone : `+57${phone}`
                    var phoneLink = (isNaN(Number(phone))) ? telefono : `<a href="tel:${phone}">${telefono}</a>`
                    phoneNumbers.push(phoneLink)
                  })
                  var centros = `<div class="animar_entrada">
                  <h2 class="tit_centro">${centro.nombre_centro}</h2>
                  <p><span class="campo_uno">  <i class="alk-icon-rounded-list"> </i>Categoría: </span><span class="campo_dos">${centro.categoria}</span></p>
                  <p><span class="campo_uno"> <i class="alk-icon-boxcheck"> </i>Centro autorizado: </span><span class="campo_dos">${centro.autorizado}</span></p>
                  <p><span class="campo_uno"> <i class="alk-icon-rounded-position"> </i>Dirección: </span><span class="campo_dos">${centro.direccion}</span></p>
                  <p><span class="campo_uno"> <i class="alk-icon-phone-contact"> </i>Teléfonos: </span><span class="campo_dos">${phoneNumbers.join(",  ")}</span></p>
                  <p class="horarios"><span class="campo_uno"> <i class="alk-icon-clock"> </i>Horarios: </span><span class="campo_dos">${centro.horarios}</span></p>
                  <hr>
                  <p class="obv">${centro.observaciones}</p>
                  </div>`
                  $("#visual_info").append(centros);
                })
              }
            })
        });
      } else {
        $(".centros_serv").hide();
      }
    });

    $(".read").click(function () {
      $(this).prev().toggle();
      if ($(this).text() == 'Mostrar +') {
        $(this).text('Ocultar -');
      } else {
        $(this).text('Mostrar +');
      }
    });

    // $(".default_option").click(function () {
    //   $(this).parent().toggleClass("active");
    // })

    // $(".select_ul").on('click', 'li', function () {
    //   var currentele = $(this).html();
    //   $(".default_option li").html(currentele);
    //   $(this).parents(".select_wrap").removeClass("active");
    // })
  });
})(window.jQuery, garantiaCentros)


