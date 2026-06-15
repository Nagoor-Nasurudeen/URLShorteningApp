const API_URL = "http://localhost:5000";

document
    .getElementById("urlForm")
    .addEventListener("submit", createShortUrl);

async function createShortUrl(event) {
    event.preventDefault();

    const longurl =
        document.getElementById("longurl").value;

    try {
        const response = await fetch(
            `${API_URL}/shorturls`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    longurl,
                }),
            }
        );

        const data = await response.json();

        document.getElementById("result").innerHTML = `
            <p><strong>Short URL:</strong></p>
            <a href="${data.shorturl}"
               target="_blank">
                ${data.shorturl}
            </a>
        `;

        document.getElementById("longurl").value = "";

        loadUrls();
    } catch (error) {
        document.getElementById("result").innerHTML =
            "<p>Error creating short URL</p>";
    }
}

async function loadUrls() {
    try {
        const response = await fetch(`${API_URL}/api/urls`);

        // const text = await response.text();
        // console.log(text);
        const urls = await response.json();

        

        const tableBody =
            document.getElementById("urlTableBody");

        tableBody.innerHTML = "";

        urls.forEach((url) => {
            tableBody.innerHTML += `
                <tr>
                    <td>${url.id}</td>

                    <td>
                        <a href="${url.longurl}"
                           target="_blank">
                            ${url.longurl}
                        </a>
                    </td>

                    <td>
                        <a href="${API_URL}/${url.shorturl}"
                           target="_blank">
                            ${url.shorturl}
                        </a>
                    </td>

                    <td>${url.visits}</td>
                </tr>
            `;
        });
    } catch (error) {
        console.error(error);
    }
}

async function getStats() {
    const shortcode =
        document.getElementById("shortcode").value;

    if (!shortcode) {
        return;
    }

    try {
        const response = await fetch(
            `${API_URL}/stats/${shortcode}`
        );

        const data = await response.json();

        document.getElementById("stats").innerHTML = `
            <p><strong>ID:</strong> ${data.id}</p>
            <p><strong>Long URL:</strong> ${data.longurl}</p>
            <p><strong>Short URL:</strong> ${data.shorturl}</p>
            <p><strong>Visits:</strong> ${data.visits}</p>
        `;
    } catch (error) {
        document.getElementById("stats").innerHTML =
            "<p>URL not found</p>";
    }
}

loadUrls();