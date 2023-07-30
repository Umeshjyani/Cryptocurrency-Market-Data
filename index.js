const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

function renderGridView(cryptocurrencies) {
    const gridContainer = document.getElementById("cryptocurrenciesGrid");
    gridContainer.innerHTML = cryptocurrencies.map(crypto => `
    <div class="cryptocurrency-card">
      <img src="${crypto.image}" alt="${crypto.name}" width="80">
      <h3>${crypto.name}</h3>
      <p>Price: $${crypto.current_price}</p>
      <p>Market Cap: $${crypto.market_cap}</p>
      <p>24h Change: ${crypto.price_change_percentage_24h}%</p>
      <p>Total Volume: $${crypto.total_volume}</p>
    </div>
  `).join("");
}

function renderListView(cryptocurrencies) {
    const tableBody = document.querySelector("#cryptocurrenciesList tbody");
    tableBody.innerHTML = cryptocurrencies.map(crypto => `
    <tr class="cryptocurrency-list-item">
      <td><img src="${crypto.image}" alt="${crypto.name}" width="40"></td>
      <td>${crypto.name}</td>
      <td>$${crypto.current_price}</td>
      <td>$${crypto.market_cap}</td>
      <td>${crypto.price_change_percentage_24h}%</td>
      <td>$${crypto.total_volume}</td>
    </tr>
  `).join("");
}

function handleViewToggle() {
    const gridViewBtn = document.getElementById("gridViewBtn");
    const listViewBtn = document.getElementById("listViewBtn");

    gridViewBtn.addEventListener("click", () => {
        gridViewBtn.classList.add("active");
        listViewBtn.classList.remove("active");
        document.getElementById("cryptocurrenciesGrid").style.display = "grid";
        document.getElementById("cryptocurrenciesList").style.display = "none";
    });

    listViewBtn.addEventListener("click", () => {
        gridViewBtn.classList.remove("active");
        listViewBtn.classList.add("active");
        document.getElementById("cryptocurrenciesGrid").style.display = "none";
        document.getElementById("cryptocurrenciesList").style.display = "table";
    });
}

async function initializeApp() {
    const data = await fetchData();
    renderGridView(data);
    renderListView(data);
    handleViewToggle();
    document.getElementById("cryptocurrenciesGrid").style.display = "none";
        document.getElementById("cryptocurrenciesList").style.display = "table";
}

initializeApp();
