/**
 * Backend optionnel pour sauvegarder les demandes PKM dans un Google Sheet.
 * Ce fichier n'est ni déployé ni relié au site par défaut.
 * Définir SPREADSHEET_ID dans les propriétés du script avant publication.
 */
function doPost(event) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var body = JSON.parse((event.postData && event.postData.contents) || '{}');
    var firstName = clean_(body.firstName, 80);
    var phone = clean_(body.phone, 40);
    if (!firstName || phone.replace(/\D/g, '').length < 8) {
      return json_({ ok: false, error: 'invalid_request' });
    }

    var spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    if (!spreadsheetId) throw new Error('SPREADSHEET_ID is missing');
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = spreadsheet.getSheetByName('Demandes') || spreadsheet.insertSheet('Demandes');
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['ID', 'Reçue le', 'Langue', 'Page', 'Prénom', 'Téléphone', 'Arrivée', 'Départ', 'Demande', 'Statut']);
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      clean_(body.id, 80),
      new Date(),
      clean_(body.locale, 8),
      clean_(body.pagePath, 160),
      firstName,
      phone,
      clean_(body.arrival, 16),
      clean_(body.departure, 16),
      clean_(body.interest, 160),
      'À traiter'
    ]);
    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: 'server_error' });
  } finally {
    lock.releaseLock();
  }
}

function clean_(value, maxLength) {
  var text = String(value || '').trim().slice(0, maxLength);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
