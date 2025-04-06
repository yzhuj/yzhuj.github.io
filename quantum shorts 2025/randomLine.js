let rows = [];

function loadExcelFile(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load Excel file: " + response.status);
      }
      return response.arrayBuffer();
    })
    .then(arrayBuffer => {
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Sanitize entire dataset
      rows = rawRows
        .map(row => row.map(cell => typeof cell === "string" ? cleanString(cell) : cell))
        .filter(row => row.length > 0);

      document.getElementById("output").textContent = "Data loaded...ready to explore!";
    })
    .catch(error => {
      console.error("Error loading Excel file:", error);
      document.getElementById("output").textContent = "Failed to load data.";
    });
}

function cleanString(text) {
  const normalized = text.normalize("NFKC");
  const div = document.createElement("div");
  div.textContent = normalized;
  return div.innerHTML;
}

function formatLinksFromRow(row) {
  const links = row.slice(3).filter(cell => typeof cell === "string" && cell.trim() !== "");
  if (links.length === 0) return "N/A";

  return links
    .map((url, index) => {
      const label = `[${index + 1}] ${url}`;
      return `<a href="${url}" target="_blank" style="word-break: break-all;">${label}</a>`;
    })
    .join("<br>");
}

function showRandomRow() {
  if (rows.length === 0) {
    document.getElementById("output").textContent = "No data loaded.";
    return;
  }

  const startIndex = isNaN(rows[0][0]) ? 1 : 0;
  const randomIndex = Math.floor(Math.random() * (rows.length - startIndex)) + startIndex;
  const row = rows[randomIndex];

  const display = `
    <strong>Date:</strong> ${row[0] || "N/A"}<br>
    <strong>Location:</strong> ${row[1] || "N/A"}<br><br>
    ${row[2] || ""}<br><br>
    <strong>Links:</strong><br>${formatLinksFromRow(row)}
  `;

  document.getElementById("output").innerHTML = display;
}

window.onload = function () {
  const excelURL = "https://yizhuj.com/quantum%20shorts%202025/database.xlsx";
  loadExcelFile(excelURL);
};
