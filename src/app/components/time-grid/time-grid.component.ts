import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TimeData} from "../../interfaces/time-data";
import {Column} from "../../interfaces/column";

@Component({
  selector: 'app-time-grid',
  templateUrl: './time-grid.component.html',
  styleUrls: ['./time-grid.component.scss']
})
export class TimeGridComponent implements OnInit, OnChanges {

  @Input() interval!: number;
  dataRows: any;
  timeInterval!: string;
  columns!: Column[];

  constructor() { }

  ngOnInit(): void {
    this.setTimeInterval();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['interval']?.currentValue) {
      this.columns = this.getColumns();
      this.dataRows = this.getDataRows();
    }
  }

  getColumns(): Column[] {
    const interval = Number(this.interval);
    let columns = [];
    let current = 0;
    while (current < 1440) {
      current += interval;
      if (current === 1440) break;
      columns.push({
        label: this.getTime(current),
        value: current
      });
    }
    return columns;
  }

  getTime(totalMinutes: number): string {
    let hours = String(Math.floor(totalMinutes / 60)); // get the hours
    hours = hours.length < 2 ? 0 + hours : hours;
    const minutes = totalMinutes % 60; // get the remaining minutes
    return hours + ':' + (minutes < 10 ? '0' : '') + minutes;
  }

  getDataRows() {
    const rows = ['Detail 1', 'Detail 2', 'Detail 3'];
    const data: any = [];
    rows.forEach(row => {
      let cells: TimeData[] = [];
      this.columns.forEach(col => {
        cells.push({
          time: Math.floor(new Date().getTime() / 1000), // unixTimestamp
          value: row,
        });
      });
      data.push(cells);
    });
    return data;
  }

  setTimeInterval(): void {
    switch (Number(this.interval)) {
      case 5:
        this.timeInterval = '5 minutes';
        break;
      case 30:
        this.timeInterval = '30 minutes';
        break;
      case 60:
        this.timeInterval = '1 hour';
        break;
      default:
        this.timeInterval = '';
        break;
    }
  }

}
