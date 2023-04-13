import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeGridComponent } from './time-grid.component';

describe('TimeGridComponent', () => {
  let component: TimeGridComponent;
  let fixture: ComponentFixture<TimeGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set timeInterval to "5 minutes" when interval is 5', () => {
    component.interval = 5;
    component.setTimeInterval();
    expect(component.timeInterval).toBe('5 minutes');
  });

  it('should set timeInterval to "30 minutes" when interval is 30', () => {
    component.interval = 30;
    component.setTimeInterval();
    expect(component.timeInterval).toBe('30 minutes');
  });

  it('should set timeInterval to "1 hour" when interval is 60', () => {
    component.interval = 60;
    component.setTimeInterval();
    expect(component.timeInterval).toBe('1 hour');
  });

  it('should set timeInterval to empty string when interval is invalid', () => {
    component.interval = 0;
    component.setTimeInterval();
    expect(component.timeInterval).toBe('');

    component.interval = 20;
    component.setTimeInterval();
    expect(component.timeInterval).toBe('');

    component.interval = 70;
    component.setTimeInterval();
    expect(component.timeInterval).toBe('');
  });

  it('should generate columns based on interval', () => {
    component.interval = 30;
    const columns = component.getColumns();
    expect(columns.length).toBe(47);
    expect(columns[0].label).toBe('00:30');
    expect(columns[0].value).toBe(30);
    expect(columns[46].label).toBe('23:30');
    expect(columns[46].value).toBe(1410);
  });

  it('should generate dataRows', () => {
    component.interval = 5;
    const changes = { interval: { currentValue: 5, previousValue: undefined, isFirstChange: () => true, firstChange: true } };

    component.ngOnChanges(changes);
    const dataRows = component.getDataRows();
    expect(dataRows.length).toBe(3);
    expect(dataRows[0].length).toBe(287);
    expect(dataRows[1].length).toBe(287);
    expect(dataRows[2].length).toBe(287);
    expect(dataRows[0][0].value).toBe('Detail 1');
  });

  it('should format time correctly', () => {
    expect(component.getTime(0)).toBe('00:00');
    expect(component.getTime(1)).toBe('00:01');
    expect(component.getTime(60)).toBe('01:00');
    expect(component.getTime(1440)).toBe('24:00');
  });

});
