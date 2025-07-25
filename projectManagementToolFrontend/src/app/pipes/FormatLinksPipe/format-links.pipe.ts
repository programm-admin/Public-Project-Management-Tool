import { Pipe, PipeTransform } from '@angular/core';
import { getDomainFromLink } from '../../shared/functions/format-links';

@Pipe({
  name: 'formatLinks',
})
export class FormatLinksPipe implements PipeTransform {
  transform(link: string): string {
    const formattedLink: string | null = getDomainFromLink(link);

    if (!formattedLink) {
      return link;
    }
    return formattedLink;
  }
}
