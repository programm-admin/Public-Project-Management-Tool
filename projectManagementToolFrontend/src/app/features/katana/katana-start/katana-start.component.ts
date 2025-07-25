import { Component, inject } from '@angular/core';

import { KatanaDialogComponent } from '../katana-dialog/katana-dialog.component';
import { CommonModule } from '@angular/common';
import { KatanaWebsiteListItem } from '../../../shared/interfaces/KatanaWebsiteDialog';

import { FormatLinksPipe } from '../../../pipes/FormatLinksPipe/format-links.pipe';

@Component({
  selector: 'app-katana-start',
  imports: [CommonModule],
  templateUrl: './katana-start.component.html',
  styleUrl: './katana-start.component.scss',
})
export class KatanaStartComponent {
  // readonly dialog = inject(MatDialog);
  WEBSITE_LIST: KatanaWebsiteListItem[] = [
    {
      title: 'Samuraischwert.kaufen',
      url: 'https://samuraischwert.kaufen/',
      description:
        'Webseite zum Kaufen von Katanas und zum Finden von Vereinen',
    },
    {
      title: 'Schwertshop',
      url: 'https://www.schwertshop.de/',
      description: 'Webseite zum Kaufen von Katanas und Zubehör',
    },
    {
      title: 'Samurai-Katana-Shop',
      url: 'https://www.samurai-katana-shop.nl/de/blog/kenjutsu-traditionelle-japanische-schwertkunst-n62',
      description: 'Webseite zur Beschreibung von Kenjutsu',
    },
  ];

  displayedColumns: string[] = ['title', 'url', 'description'];

  openDialog(): void {
    // const dialogRef = this.dialog.open(KatanaDialogComponent, {
    //   data: { katanaWebsiteList: this.WEBSITE_LIST },
    // });
  }
}
