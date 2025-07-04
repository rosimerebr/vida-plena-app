import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TabsPage } from './tabs.page';
describe('TabsPage', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TabsPage],
            providers: [provideRouter([])]
        }).compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(TabsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=tabs.page.spec.js.map