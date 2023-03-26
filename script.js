async function cargarJornadas() {
  const response = await fetch('partidos.csv');
  const data = await response.text();
  const rows = data.split('\n').slice(1); // Elimina la primera fila (encabezado)
  const jornadas = {};

  rows.forEach(row => {
    const cols = row.split(',');

    if (!jornadas[cols[0]]) {
      jornadas[cols[0]] = {
        fecha: cols[1],
        partidos: [],
      };
    }

    jornadas[cols[0]].partidos.push({
      equipo1: cols[2],
      equipo2: cols[3],
    });
  });

  const container = document.getElementById('jornadas');
  const row = document.createElement('div');
  row.className = 'row';

  for (const numJornada in jornadas) {
    const jornada = jornadas[numJornada];
    const col = document.createElement('div');
    col.className = 'col-md-4';

    const card = document.createElement('div');
    card.className = 'card';

    const cardHeader = document.createElement('div');
    cardHeader.className = 'card-header';
    cardHeader.innerHTML = `<strong>Jornada ${numJornada}</strong> - ${jornada.fecha}`;
    card.appendChild(cardHeader);

    const listGroup = document.createElement('ul');
    listGroup.className = 'list-group list-group-flush';

    jornada.partidos.forEach(partido => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.textContent = `${partido.equipo1} vs ${partido.equipo2}`;
      listGroup.appendChild(listItem);
    });

    card.appendChild(listGroup);
    col.appendChild(card);
    row.appendChild(col);
  }

  container.appendChild(row);
}

cargarJornadas();
