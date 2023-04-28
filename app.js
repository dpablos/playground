function buscarTienda() {
  var id_tienda = document.getElementById("id_tienda").value;
  var telefono_tienda = document.getElementById("telefono_tienda").value;

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
