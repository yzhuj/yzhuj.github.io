let rows = [];

function loadExcelFile(url) {
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load Excel file: ${response.status}`);
      }
      return response.arrayBuffer();
    })
    .then(arrayBuffer => {
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0]; // use first sheet
      const sheet = workbook.Sheets[sheetName];
      rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // array of arrays
      rows = rows.filter(row => row.length > 0); // remove empty rows
    })
    .catch(error => {
      console.error("Error loading Excel file:", error);
    });
}

function showRandomRow() {
  if (rows.length === 0) {
    document.getElementById("output").textContent = "No data loaded.";
    return;
  }

  // Skip header if present
  const startIndex = isNaN(rows[0][0]) ? 1 : 0;
  const randomIndex = Math.floor(Math.random() * (rows.length - startIndex)) + startIndex;
  const row = rows[randomIndex];

  // Format the row into a readable string
  const display = row.slice(0, 4).map((val, i) => `Column ${i + 1}: ${val}`).join(" | ");
  document.getElementById("output").textContent = display;
}

window.onload = function () {
  loadExcelFile("https://yizhuj.com/quantum%20shorts%202025/database.xlsx");
};
