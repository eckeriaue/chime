import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamVideoAndMicSelfMonitoringComponent } from './stream-video-and-mic-self-monitoring-component';

describe('StreamVideoAndMicSelfMonitoringComponent', () => {
  let component: StreamVideoAndMicSelfMonitoringComponent;
  let fixture: ComponentFixture<StreamVideoAndMicSelfMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreamVideoAndMicSelfMonitoringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamVideoAndMicSelfMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
