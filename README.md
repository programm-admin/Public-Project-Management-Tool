# Project-Management-Tool

Ein Programm zur Verwaltung von Projekten und dazu gehörenden Aufgaben.

## Bilder zur Applikation

Im Folgenden sind Bilder der Anwendung ausgewählter Funktionen zu sehen, um einen ersten Eindruck vom Aussehen und der Funktion der Anwendung zu erhalten. Diese Bilder sind Bestandteil dieses Projektes und stehen damit unter derselben Lizenz wie dieses Projekt.

### Abbildung 1: Loginseite der Anwendung

![Abbildung 1: Loginseite der Anwendung (Bild)](/pictures/Project_Management_Tool-Loginseite.png)

### Abbildung 2: Startseite eines eingeloggten Nutzers

![Abbildung 2: Startseite eines eingeloggten Nutzers (Bild)](/pictures/Project_Management_Tool-Startseite.png)

### Abbildung 3: Formular für ein neues Projekt

![Abbildung 3: Formular für ein neues Projekt (Bild)](/pictures/Project_Management_Tool-Neues_Projekt_Formular.png)

### Abbildung 4: Projektübersichtsseite

![Abbildung 4: Projektübersichtsseite (Bild)](/pictures/Project_Management_Tool-Projektdetailseite.png)

### Abbildung 5: Grafik über die Aufgabenlänge

![Abbildung 5: Grafik über die Aufgabenlänge (Bild)](/pictures/Project_Management_Tool-Aufgabenfortschrittsgrafik.png)

## Allgemeines

Diese Applikation dient der Erstellung und Verwaltung von Projekten und zugehörigen Aufgaben. Die Funktionen im Überblick dabei sind:

### Projekte:

-   können keine, eine oder mehrere Aufgaben haben
-   Anlegen neuer Projekte
-   Ändern bestehender Projekte durch:
    -   Änderung der Metadaten des Projektes
    -   Änderung der Aufgaben des Projektes (mehr dazu bei den Aufgaben)
-   Metadaten: Titel/ Name des Projektes, Beschreibung des Projektes, Startdatum des Projektes, Enddatum des Projektes, Projektdauer (Berechnung durch Enddatum minus Startdatum; in Tagen), Kunde, Ticketnummer, Aufgaben, Ersteller des Projektes (Nutzer)

### Aufgaben:

-   gehören zu einem Projekt
-   jede Aufgabe hat ein Start- und Enddatum sowie weitere Attribute
-   Anlegen neuer Aufgaben
-   Ändern bestehender Aufgaben
-   Metadaten: Titel/ Name, Beschreibung, Startdatum, Enddatum, Dauer (Berechnung durch Enddatum minus Startdatum; in Tagen), letztes Änderungsdatum, Mitglieder (Stringliste), Ticketnummer
-   Datumsangaben hier sind unabhängig von den des Projektes

### Nutzer

-   zur Nutzung ist ein Nutzeraccount durch eine Registrierung erforderlich
-   Projekte und Aufgaben sind dabei einem Nutzer (Ersteller) zugeordnet

### Zukunftsfeatures

-   Zukünftig sollen Aufgaben und Projekte ebenfalls gelöscht werden können (analog für den Nutzeraccount). Zudem sollen weitere Anpassungen und Verbesserungen hinsichtlich des visuellen Layouts erfolgen.
-   Zukünftig soll es eine neue Datenbankarchitektur geben, in welcher Aufgaben vom Projekt getrennt sind und nur (lose) per interner ID verknüpft werden

## Eingesetzte Technologien:

Im Nachfolgenden werden kurz die für das Projekt genutzten Technologien vorgestellt.

### Frontend: Angular mit "Server-Side-Rendering" (SSR)

Angular ist ein Frontend-Web-Framework von Google und ist für große und komplexe Enterprise-Applikationen designt und entwickelt worden. Es nutzt erzeugt eine "Single Page Application" (SPA) und nutzt eine Komponentenhierarchie. Entwickler können damit die App in wiederverwendbare Komponenten unterteilen. Vorteile sind u. a. die Nutzung wiederverwendbarer Komponenten, "Dependency Injection", "Guards" und SSR für ein schnelleres Laden und eine Verbesserung für "Search Engine Optimization" (SEO).

#### Frontend-Komponentenbibliothek: PrimeNG

Zur Erstellung der Frontend-Komponenten innerhalb des Webinterfaces wird PrimeNG in der aktuellen Version 20 (genaue Version ist in der package.json im Frontend zu finden) verwendet. Diese werden dabei mit entsprechendem CSS angepasst. Für weitere Informationen kann die [offizielle Dokumentation](https://primeng.org/) genutzt werden.

### Backend: NodeJS mit JavaScript (Express)

Der Express-Server in NodeJS lässt Entwickler einfach einen skalierbaren Server mit selbst definierten Endpunkten aufbauen. JavaScript ist hierbei die native Skriptsprache, welche direkt (auch in Produktivumgebungen) innerhalb der NodeJS-Umgebung ausgeführt werden kann. Zukünftig sollte aber eine Nutzung von TypeScript gegenüber JavaScript in der Entwicklung abgewogen werden.

### Datenbank: MongoDB

MongoDB ist eine "NoSQL"-Datenbank und kann Objekte beliebiger Struktur speichern. Damit ist es auch für semi-strukturierte Daten geeignet. Durch die Nutzung von Indizes und anderen Funktionen können Daten damit schnell durchsucht werden. Daten werden als binäre JSON-Dokumente gespeichet, wodurch sich das JSON-Format nativ nutzen lässt. Ein weiterer Vorteil ist die hohe Skalierbarkeit und damit die Möglichkeit für z. B. Georedundanz. Für die lokale Installation wird der offizielle MongoDB Compass der offiziellen Webseite (mit integrierter GUI) empfohlen.
