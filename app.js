// https://iTunes.apple.com/search?term=<nome_artista/gruppo>&media=music&limit=20

function cerca() {
    const termineRicerca = document.getElementById("termineRicerca").value.trim().toLowerCase();

    const url = `https://iTunes.apple.com/search?term=${encodeURI(termineRicerca)}&media=music&limit=20`;

    axios.get(url)
        .then(response => {
            generaHTMLRisultati(response.data, termineRicerca)
        })
        .catch(error => {
            console.error("Errore nel recuperare i dati:", error);
            document.getElementById("messaggio").innerText = "Errore nel recuperare i dati. Riprova più tardi."
    })
}

function generaHTMLRisultati(dati, termineRicerca) {
    document.getElementById("ricerca").innerHTML = termineRicerca;
    document.getElementById("termineRicerca").value = "";
    const lista = document.getElementById("listaRisultati");

    lista.innerHTML = "";

    for (const d of dati.results) {
        let html = `
            <tr>
                <td class="text-wrap w-25" style="word-break: break-word;">${d.trackName}</td>
                <td>${d.artistName}</td>
                <td>
                    <audio controls>
                        <source src="${d.previewUrl}" alt="Copertina di ${d.trackName}"/>
                    </audio>
                </td>
                <td>
                    <img src=${d.artworkUrl60}>
                </td>
            </tr>
        `
        lista.innerHTML += html;
    }
}