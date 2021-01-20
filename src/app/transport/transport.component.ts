import { Component, OnInit,ViewChild, ViewChildren, QueryList, ChangeDetectorRef  } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TransportComponent  {

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<despatchData>>;

  //dataSource = ELEMENT_DATA;
  dataSource: MatTableDataSource<TrailerData>;
 // dataSource = new MatTableDataSource(TRAILER_DATA);
  trailer: TrailerData[]=[];
  //columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  columnHeaderToDisplay = ['Trailer Number', 'Despatch Date/Time', 'Coload at Islip and Thrapston', 'ENS Reference Number', 'Status'];
  columnsToDisplay = ['trailerNumber', 'despatchDateTime', 'coload', 'ensReferenceNumber','status'];
  innerHeaderColumns=['Warehouse Name','Despatch Date/Time','Status'];
  innerDisplayedColumns=['warehouseName','despatchDateTime','status'];
  //expandedElement: PeriodicElement | null;
  expandedElement: TrailerData | null;
 
  constructor(
    private cd: ChangeDetectorRef
  ) { }


  ngOnInit() {
    TRAILER_DATA.forEach(trailers => {
      if (trailers.despatchDetail && Array.isArray(trailers.despatchDetail) && trailers.despatchDetail.length) {
        this.trailer = [...this.trailer, {...trailers, despatchDetail: new MatTableDataSource(trailers.despatchDetail)}];
      } else {
        this.trailer = [...this.trailer, trailers];
      }
    });
    this.dataSource = new MatTableDataSource(this.trailer);
    this.dataSource.sort = this.sort;
  }

  toggleRow(element: TrailerData) {
    element.despatchDetail && (element.despatchDetail as MatTableDataSource<despatchData>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<despatchData>).sort = this.innerSort.toArray()[index]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

export interface TrailerData {
  trailerNumber: string;
  despatchDateTime: string;
  coload: string;
  ensReferenceNumber: string;
  status: string;
  despatchDetail?: despatchData[] | MatTableDataSource<despatchData>;
}

 export interface despatchData{
  warehouseID:number;
  warehouseName:string;
  despatchDateTime:string;
  status:string;
}

export interface TrailerDataSource {
  trailerNumber: string;
  despatchDateTime: string;
  coload: string;
  ensReferenceNumber: string;
  status: string;
  despatchDetail?: MatTableDataSource<despatchData>;
}

/*
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}
*/

const TRAILER_DATA: TrailerData[] = [
  {
    trailerNumber: 'TRL001',
  despatchDateTime: '25-Jan-2021 09:20:23',
  coload: 'No',
  ensReferenceNumber: 'ENS00000000001223',
  status: 'Submitted',
  despatchDetail: [{
    warehouseID:955,
    warehouseName:'Islip',
    despatchDateTime:'25-Jan-2021 09:20:23',
    status:'Submitted',
  }]
  }, {
    trailerNumber: 'TRL002',
  despatchDateTime: '25-Jan-2021 19:20:23',
  coload: 'Yes',
  ensReferenceNumber: 'ENS00000000001224',
  status: 'Submitted',
  despatchDetail: [{
    warehouseID:955,
    warehouseName:'Islip',
    despatchDateTime:'25-Jan-2021 01:10:23',
    status:'Submitted',
  },{
    warehouseID:956,
    warehouseName:'Thrapstom',
    despatchDateTime:'25-Jan-2021 19:20:23',
    status:'Submitted',
  }]
  }];
/*
const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  }, {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`
  }, {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`
  }, {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`
  }, {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`
  }, {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
  }, {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`
  }, {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`
  }, {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`
  },
];
*/