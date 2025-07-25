import { Injectable } from '@angular/core';
import { TooltipPosition } from 'chart.js';
import { TOOLTIP_POSITION } from '../../shared/variables/styling-variables';

export interface StylesConfiguration {
  tooltipDisplayDelay: number; // in s
  tooltipPosition: string;
}

@Injectable({
  providedIn: 'root',
})
export class StylingService {
  private stylesConfig: StylesConfiguration = {
    tooltipDisplayDelay: 1000,
    tooltipPosition: TOOLTIP_POSITION.BELOW,
  };

  constructor() {}

  getStylesConfiguration = (): StylesConfiguration => {
    return this.stylesConfig;
  };
}
