import { TestBed, waitForAsync } from '@angular/core/testing';
import { BarChartComponent } from './bar-chart.component';
describe('BarChartComponent', () => {
    let component;
    let fixture;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [BarChartComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(BarChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=bar-chart.component.spec.js.map