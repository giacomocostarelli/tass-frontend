import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {SpringService} from '../spring.service';
import {Room} from '../interfaceDB/room';
import {fuseAnimations} from '../../../@fuse/animations';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {map} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {RicercaDialogComponent} from './ricerca-dialog/ricerca-dialog.component';
import {CityService} from '../city.service';
import {DateService} from '../date.service';


export interface StateGroup {
    letter: string;
    names: string[];
}


@Component({
    selector: 'ricerca_standard',
    templateUrl: './ricerca-standard.component.html',
    styleUrls: ['./ricerca-standard.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
    providers: []
})
export class RicercaStandardComponent implements OnInit {
    form: FormGroup;
    stateGroupOptions: Observable<StateGroup[]>;
    onProductChanged: BehaviorSubject<any>;
    roomList: Room[] = [];
    dataSource: FilesDataSource | null;
    displayedColumns = ['id', 'image', 'hotel_name', 'price', 'numPlaces', 'hotel_stars'];

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    todayDate = new Date();

    constructor(
        private _formBuilder: FormBuilder,
        private springService: SpringService,
        public dialog: MatDialog,
        private _cityService: CityService,
        private _dateService: DateService
    ) {
        this.onProductChanged = new BehaviorSubject({});
    }

    ngOnInit(): void {
        this.dataSource = new FilesDataSource(this, this.paginator, this.sort);
        this.form = this._formBuilder.group({
            city: ['', {validators: [Validators.required, ], updateOn: 'blur'}],
            personNumber: ['', [Validators.required, Validators.pattern('^[0-9]')]],
            arr: ['', Validators.required],
            dep: ['', Validators.required]
        });
        this.stateGroupOptions = this._cityService.getSortedCity();
    }

    onFormSubmit(): void {
        const val = {
            city: this.form.get('city').value,
            personNumber: this.form.get('personNumber').value,
            arrival: this._dateService.getFinalDate(this.form.get('arr').value),
            departure: this._dateService.getFinalDate(this.form.get('dep').value)
        };
        this.springService.normalSearch(val)
            .subscribe(
                rooms => {
                    this.roomList = rooms;
                    this.onProductChanged.next(this.roomList);
                }
            );
    }

    openDialog(roomRow: Room): void {
        const dialogRef = this.dialog.open(RicercaDialogComponent, {
            panelClass: 'form-dialog',
            data: {
                room: roomRow,
                startingDate: this._dateService.getFinalDate(this.form.get('arr').value),
                returnDate: this._dateService.getFinalDate(this.form.get('dep').value)
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result !== null && typeof result === 'number'){
                this.roomList.splice(this.roomList.findIndex(b => b.id === result));
            }
        });
    }
}

export class FilesDataSource extends DataSource<any> {
    private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     *
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _observableList: RicercaStandardComponent,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    ) {
        super();

        this.filteredData = this._observableList.roomList;
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]> {
        const displayDataChanges = [
            this._observableList.onProductChanged,
            this._matPaginator.page,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {
                        let data = this._observableList.roomList.slice();

                        // data = this.filterData(data);

                        // this.filteredData = [...data];

                        data = this.sortData(data);

                        // Grab the page's slice of data.
                        const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                        return data.splice(startIndex, this._matPaginator.pageSize);
                    }
                ));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    get filteredData(): any {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any) {
        this._filteredDataChange.next(value);
    }

    // Filter
    /*get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }*/

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    /* Filter data
     *
     * @param data
     * @returns {any}
     *
    filterData(data): any
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }*/

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[] {
        if (!this._matSort.active || this._matSort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch (this._matSort.active) {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'hotel_name':
                    [propertyA, propertyB] = [a.hotel.name, b.hotel.name];
                    break;
                case 'price':
                    [propertyA, propertyB] = [a.pricePerNight, b.pricePerNight];
                    break;
                case 'numPlaces':
                    [propertyA, propertyB] = [a.numPlaces, b.numPlaces];
                    break;
                case 'hotel_stars':
                    [propertyA, propertyB] = [a.hotel.stars, b.hotel.stars];
                    break;
            }
            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void {
    }
}
