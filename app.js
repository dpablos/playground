function buscarTienda() {
    var id_tienda = document.getElementById("id_tienda").value;
    var telefono_tienda = document.getElementById("telefono_tienda").value.replace(/\s/g, '');
  
    var patronIdTienda = /^[A-Z]{2}[0-9]{6}$/;
    if (!patronIdTienda.test(id_tienda)) {
      alert("El identificador de tienda debe tener 8 caracteres, comenzando con dos letras mayúsculas.");
      return;
    }
  
    var patronTelefono = /^[0-9]{9}$/;
    if (!patronTelefono.test(telefono_tienda)) {
      alert("El teléfono de la tienda debe ser un número de 9 dígitos sin espacios.");
      return;
    }
  
    // Realizar la búsqueda en el archivo CSV
    Papa.parse("archivo.csv", {
      download: true,
      complete: function(result) {
        var tiendaEncontrada = false;
        var ventas = null;
        for (var i = 0; i < result.data.length; i++) {
          var fila = result.data[i];
          if (fila[0] == id_tienda && fila[1].replace(/\s/g, '') == telefono_tienda) {
            tiendaEncontrada = true;
            ventas = fila[2];
            break;
          }
        }
        if (tiendaEncontrada) {
          document.getElementById("resultado").innerHTML = "Las ventas de abril de la tienda son: " + ventas;
        } else {
          document.getElementById("resultado").innerHTML = "No se encontró ninguna tienda con el identificador y teléfono especificados.";
        }
      }
    });
  }
  