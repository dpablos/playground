async function cargarJornadas() {
    const response = await fetch('partidos.csv');
    const data = await response.text();
    const rows = data.split('\n').slice(1);
    const container = document.querySelector('.container');

    rows.forEach((row, index) => {
        const cols = row.split(',');

        if (cols.length > 1) {
            const jornada = cols[0];
            const fecha = cols[1];
            const partido1 = cols[2] + ' vs ' + cols[3];
            const partido2 = cols[4] + ' vs ' + cols[5];
            const partido3 = cols[6] + ' vs ' + cols[7];
            const descanso = cols[8];

            const card = `
                <div class="card mt-4">
                    <div class="card-header bg-warning">
                        <h5 class="text-center">Jornada ${jornada} - ${fecha}</h5>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <p>Partido 1: ${partido1}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <p>Partido 2: ${partido2}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <p>Partido 3: ${partido3}</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <p>Descanso: ${descanso}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            container.innerHTML += card;
        }
    });
}

cargarJornadas();
