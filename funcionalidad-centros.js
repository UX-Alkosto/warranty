(function($,garantiaCentros){
    $.getJSON(garantiaCentros, function(data) {
        for (let i = 0; i < data.length; i++) {
          html = `<li data-centro="${data[i].id}" class="option"> <p> ${data[i].datos_centro[0].nombre_centro} </p> </li>`;
          $("#listado_centros").append(html);
        }
      })
      
      $(document).ready(function() {
        $("ul.select_ul").on('click','li', function() {
          var optionValue = (this).getAttribute("data-centro");
          if (optionValue) {
            $(function() {
              $.getJSON(garantiaCentros, function(data) {
                $("#visual_info").html("");
                $.each(data, function(i, obj) {
                  if (obj.id == optionValue) {
                    $.each(obj.datos_centro, function(i, centro) {
                      var centros = '<div class="animar_entrada">';
                      centros += '<h2 class="tit_centro">' + centro.nombre_centro + '</h2>';
                      centros += '<p>' + '<span class="campo_uno">' + "Línea: " + '</span>' + '<span class="campo_dos">' + centro.linea + '</span>' + '</p>';
                      centros += '<p>' + '<span class="campo_uno">' + "Centro autorizado: " + '</span>' + '<span class="campo_dos">' + centro.autorizado + '</span>' + '</p>';
                      centros += '<p>' + '<span class="campo_uno">' + "Dirección: " + '</span>' + '<span class="campo_dos">' + centro.direccion + '</span>' + '</p>';
                      centros += '<p>' + '<span class="campo_uno">' + "Teléfonos: " + '</span>' + '<span class="campo_dos">' + centro.telefonos + '</span>' + '</p>';
                      centros += '<p class="horarios">' + '<span class="campo_uno">' + "Horarios: " + '</span>' + '<span class="campo_dos">' + centro.horarios + '</span>' + '</p>';
                      centros += '<hr>';
                      centros += '<p class="obv">' + centro.observaciones + '</p>';
                      centros += '</div>';
                      $("#visual_info").append(centros);
                    })
                  }
                })
              })
            });
          } else {
            $(".centros_serv").hide();
          }
        });

        $(".read").click(function() {
            $(this).prev().toggle();
            if ($(this).text() == 'Mostrar +') {
                $(this).text('Ocultar -');
            } else {
                $(this).text('Mostrar +');
            }
        });

        $(".default_option").click(function() {
            $(this).parent().toggleClass("active");
        })
      
        $(".select_ul").on('click', 'li', function() {
            var currentele = $(this).html();
            $(".default_option li").html(currentele);
            $(this).parents(".select_wrap").removeClass("active");
        })
      });
})(window.jQuery, garantiaCentros)


