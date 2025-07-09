## DomainServerStatus

Dieses Projekt demonstriert eine einfache Flask-Webanwendung, die Server einer Windows-Domäne auflistet und die Erreichbarkeit sowie den Status ausgewählter Dienste anzeigt. Die Liste der Server wird aus der Datei `servers.json` geladen. Für jeden Server werden ein Ping-Test und optionale Portprüfungen ausgeführt.

### Vorbereitung
1. Benötigte Abhängigkeiten installieren:
   ```bash
   pip install -r requirements.txt
   ```
2. Die Datei `servers.json` anpassen und die gewünschten Server samt zu überprüfender Dienste eintragen.

### Anwendung starten
```bash
python -m server_status.app
```
Die Webseite ist anschließend unter [http://localhost:5000](http://localhost:5000) erreichbar.
