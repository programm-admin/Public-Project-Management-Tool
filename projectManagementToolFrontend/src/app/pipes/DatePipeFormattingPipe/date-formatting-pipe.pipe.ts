import { inject, input, Pipe, PipeTransform } from '@angular/core';
import { TimeFormattingServiceService } from '../../services/general/time-formatting-service.service';

@Pipe({
  name: 'dateFormattingPipe',
  standalone: true,
})
export class DateFormattingPipePipe implements PipeTransform {
  timeFormattingService: TimeFormattingServiceService = inject(
    TimeFormattingServiceService
  );

  transform(inputDate: Date): string {
    const formattedDate: string =
      this.timeFormattingService.formatDateToGermanDate(new Date(inputDate));

    return formattedDate;
    // return this.timeFormattingService.formatDateForInput(inputDate);
  }
}
