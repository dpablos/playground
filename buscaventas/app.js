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

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "tiendas.csv");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var tiendas = xhr.responseText.split("\n");
        var encontrado = false;

        for (var i = 0; i < tiendas.length; i++) {
          var tienda = tiendas[i].split(",");
          if (tienda[0] === id_tienda && tienda[1] === telefono_tienda) {
            document.getElementById("resultado").innerHTML = "Ventas de abril: " + tienda[2];
            encontrado = true;
            break;
          }
        }

        if (!encontrado) {
          document.getElementById("resultado").innerHTML = "Tienda no encontrada";
        }
      } else {
        console.error(xhr.status);
      }
    }
  };

  xhr.send();
}
