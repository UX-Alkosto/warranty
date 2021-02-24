"use strict";

var _select = _interopRequireDefault(require("./select.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(function ($, garantiaCentros) {
  var jsonData = {};
  $.getJSON(garantiaCentros, function (data) {
    jsonData = data;

    for (var i = 0; i < data.length; i++) {
      var html = "<option value=\"".concat(data[i].id, "\" data-centro=\"").concat(data[i].id, "\" class=\"option\">  ").concat(data[i].datos_centro[0].nombre_centro, " </option>");
      $("#listado_centros").append(html);
    }

    document.querySelectorAll('[data-custom-select').forEach(function (selectElement) {
      return new _select["default"](selectElement);
    });
  });
  $(document).ready(function () {
    $("#listado_centros").on('change', function () {
      console.log($(this).val());
      var optionValue = $(this).val();

      if (optionValue) {
        $(function () {
          $("#visual_info").html("");
          $.each(jsonData, function (i, obj) {
            if (obj.id == optionValue) {
              $.each(obj.datos_centro, function (i, centro) {
                var phoneNumbers = [];
                console.log(centro.telefonos);
                centro.telefonos.forEach(function (telefono) {
                  var phone = telefono.replace("(", "").replace(")", "").replace(/\s/g, "");
                  phone = phone.length > 10 ? phone : "+57".concat(phone);
                  var phoneLink = isNaN(Number(phone)) ? telefono : "<a href=\"tel:".concat(phone, "\">").concat(telefono, "</a>");
                  phoneNumbers.push(phoneLink);
                });
                var centros = "<div class=\"animar_entrada\">\n                  <h2 class=\"tit_centro\">".concat(centro.nombre_centro, "</h2>\n                  <p><span class=\"campo_uno\">  <i class=\"alk-icon-rounded-list\"> </i>Categor\xEDa: </span><span class=\"campo_dos\">").concat(centro.categoria, "</span></p>\n                  <p><span class=\"campo_uno\"> <i class=\"alk-icon-boxcheck\"> </i>Centro autorizado: </span><span class=\"campo_dos\">").concat(centro.autorizado, "</span></p>\n                  <p><span class=\"campo_uno\"> <i class=\"alk-icon-rounded-position\"> </i>Direcci\xF3n: </span><span class=\"campo_dos\">").concat(centro.direccion, "</span></p>\n                  <p><span class=\"campo_uno\"> <i class=\"alk-icon-phone-contact\"> </i>Tel\xE9fonos: </span><span class=\"campo_dos\">").concat(phoneNumbers.join(",  "), "</span></p>\n                  <p class=\"horarios\"><span class=\"campo_uno\"> <i class=\"alk-icon-clock\"> </i>Horarios: </span><span class=\"campo_dos\">").concat(centro.horarios, "</span></p>\n                  <hr>\n                  <p class=\"obv\">").concat(centro.observaciones, "</p>\n                  </div>");
                $("#visual_info").append(centros);
              });
            }
          });
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
    }); // $(".default_option").click(function () {
    //   $(this).parent().toggleClass("active");
    // })
    // $(".select_ul").on('click', 'li', function () {
    //   var currentele = $(this).html();
    //   $(".default_option li").html(currentele);
    //   $(this).parents(".select_wrap").removeClass("active");
    // })
  });
})(window.jQuery, garantiaCentros);