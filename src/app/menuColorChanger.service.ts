export class MenuColorChangerService  {
    pageSelected: string = 'Homepage';

    changePageSelected(page: string) {
        this.pageSelected = page;
    }
}