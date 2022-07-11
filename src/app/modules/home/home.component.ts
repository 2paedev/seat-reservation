import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  gridInfo = {
    numRows: 2,
    numCols: 3,
    roomCells: [
      /* {
        numCellRoom: 0,
        numSeat: null,
      },
      {
        numCellRoom: 1,
        numSeat: null,
      },
      {
        numCellRoom: 2,
        numSeat: 0,
      },

      {
        numCellRoom: 3,
        numSeat: 1,
      },
      {
        numCellRoom: 4,
        numSeat: 2,
      },
      {
        numCellRoom: 5,
        numSeat: null,
      },*/
    ],
    seats: [
      {
        numSeat: 0,
        numCellRoom: 2,
        isReserved: false,
        price: 25.95,
      },
      {
        numSeat: 1,
        numCellRoom: 3,
        isReserved: false,
        price: 25.95,
      },
      {
        numSeat: 2,
        numCellRoom: 4,
        isReserved: false,
        price: 25.95,
      },
    ],
  };

  public rows: number;
  public cols: number;
  public numSeats: number;

  public isGridCreated = false;
  public isSeatsCreated = false;
  public isEditMode = false;
  public cellsSelected = [];

  public createGrid(): void {
    this.isGridCreated = false;
    this.gridInfo.numRows = this.rows;
    this.gridInfo.numCols = this.cols;
    this.gridInfo.roomCells = [];
    for (let i = 0; i < this.rows * this.cols; i++) {
      this.gridInfo.roomCells.push({
        numCellRoom: i,
        numSeat: null,
        selected: false,
      });
    }
    this.isGridCreated = true;
  }

  public cleanGrid(): void {
    this.rows = undefined;
    this.cols = undefined;
    this.gridInfo.numRows = this.rows;
    this.gridInfo.numCols = this.cols;
    this.gridInfo.roomCells = [];
    this.gridInfo.seats = [];
  }

  public toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  public selectingCell(item): void {
    if (this.isEditMode) {
      item.selected = !item.selected;
      item.selected
        ? this.cellsSelected.push(item.numCellRoom)
        : this.removeItemArray(this.cellsSelected, item.numCellRoom);
    }
  }

  private removeItemArray(array, key): void {
    const index = array.indexOf(key, 0);
    if (index > -1) {
      array.splice(index, 1);
    }
  }

  public createSeats(): void {
    if (this.cellsSelected.length) {
      for (let i = 0; i < this.gridInfo.roomCells.length; i++) {
        const exist = this.cellsSelected.find((item) => item === i);
        if (exist) {
          this.gridInfo.roomCells[i].numSeat = i;
        } else {
          this.gridInfo.roomCells[i].numSeat = null;
        }
      }
      this.isEditMode = false;
    }
  }

  public saveRoom(): void {}

  public drop(event: CdkDragDrop<any>) {
    this.gridInfo.roomCells[event.previousContainer.data.index] =
      event.container.data.item;
    this.gridInfo.roomCells[event.container.data.index] =
      event.previousContainer.data.item;
  }
}
