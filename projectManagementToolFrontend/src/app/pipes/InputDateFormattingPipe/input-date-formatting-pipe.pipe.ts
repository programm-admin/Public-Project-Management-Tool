import { inject, Pipe, PipeTransform } from '@angular/core';
import { TimeFormattingServiceService } from '../../services/general/time-formatting-service.service';

@Pipe({
  name: 'inputDateFormattingPipe',
  standalone: true,
})
export class InputDateFormattingPipePipe implements PipeTransform {
  timeFormattingService: TimeFormattingServiceService = inject(
    TimeFormattingServiceService
  );

  transform(date: Date): string {
    const convertedDate: Date = new Date(date.toISOString());
    const formattedInputDate: string =
      this.timeFormattingService.formatDateForInput(convertedDate);

    return formattedInputDate;
  }
}
