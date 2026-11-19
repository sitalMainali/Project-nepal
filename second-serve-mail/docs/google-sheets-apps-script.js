/**
 * Google Sheets lead storage for Second Serve Mail.
 *
 * Setup (5 minutes):
 *  1. Create a Google Sheet. Rename the first tab to "Leads".
 *  2. Extensions → Apps Script. Delete the sample code and paste this file.
 *  3. Change SECRET below to a long random string. Put the same value in
 *     SHEETS_WEBHOOK_SECRET on Vercel.
 *  4. Deploy → New deployment → type "Web app".
 *       Execute as: Me.   Who has access: Anyone.
 *  5. Copy the Web app URL (ends in /exec) into SHEETS_WEBHOOK_URL on Vercel.
 *  6. Submit a test form on the site and check a row appears.
 *
 * "Anyone" access is required so the website can post to it; the shared
 * secret stops anyone else from writing to your sheet.
 */
const SECRET = "CHANGE_ME_TO_A_LONG_RANDOM_STRING";
const SHEET_NAME = "Leads";
const HEADERS = ["Received", "Type", "Name", "Email", "Venue", "Details", "Lead ID", "IP"];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.secret !== SECRET) return json({ ok: false, error: "unauthorised" });
    const lead = body.lead;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    const details = Object.keys(lead.details || {})
      .filter((k) => k !== "inputs")
      .map((k) => k + ": " + (typeof lead.details[k] === "object" ? JSON.stringify(lead.details[k]) : lead.details[k]))
      .join("\n");
    sheet.appendRow([lead.receivedAt, lead.type, lead.name, lead.email, lead.venue || "", details, lead.id, lead.ip || ""]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
