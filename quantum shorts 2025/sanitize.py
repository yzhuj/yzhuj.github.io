import csv
import html

def sanitize(text):
    if not isinstance(text, str):
        return text

    text = (
        text
        .replace("“", '"').replace("”", '"')
        .replace("‘", "'").replace("’", "'")
        .replace("–", "-").replace("—", "--")
        .replace("…", "...")
        .replace("\u00A0", " ")   # non-breaking space
        .replace("\uFEFF", "")    # BOM
    )

    # Escape any HTML-sensitive characters
    return html.escape(text.strip())

with open("/Users/yizhu/Documents/yzhuj.github.io/quantum\ shorts\ 2025/quantum_shorts_2025.csv", newline='', encoding='utf-8') as infile, \
     open("quantum_shorts_clean.csv", "w", newline='', encoding='utf-8') as outfile:
    
    reader = csv.reader(infile)
    writer = csv.writer(outfile)

    for row in reader:
        cleaned = [sanitize(cell) for cell in row]
        writer.writerow(cleaned)
