import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnvironmentMapPage } from './environment-map.page';

describe('EnvironmentMapPage', () => {
  let component: EnvironmentMapPage;
  let fixture: ComponentFixture<EnvironmentMapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
