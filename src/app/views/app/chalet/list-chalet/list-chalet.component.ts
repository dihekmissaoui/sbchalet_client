import { Component, OnInit, ViewChild } from "@angular/core";
import { AddNewProductModalComponent } from "src/app/containers/pages/add-new-product-modal/add-new-product-modal.component";
import { ContextMenuComponent } from "ngx-contextmenu";
import { ChaletService } from "../services/chalet.service";
import { Router } from "@angular/router";
import { IChalet } from "src/app/model/chalet.model";
import noImgData from 'src/app/constants/no-image-bsase64';
import { AddChaletModalComponent } from "../add-chalet-modal/add-chalet-modal.component";
import { SharedObjectService } from "src/app/shared/shared-object.service";

@Component({
  selector: "app-list-chalet",
  templateUrl: "./list-chalet.component.html",
  styleUrls: ["./list-chalet.component.scss"],
})
export class ListChaletComponent implements OnInit {
  displayMode = "thumb";
  selectAllState = "";
  chaletForUpdate: IChalet;
  selected: IChalet[] = [];
  data: IChalet[];
  currentPage = 1;
  itemsPerPage = 8;
  search = "";
  orderBy = "";
  isLoading: boolean;
  endOfTheList = false;
  totalItem = 0;
  totalPage = 0;

  @ViewChild("basicMenu") public basicMenu: ContextMenuComponent;
  @ViewChild("addNewModalRef", { static: true }) addNewModalRef: AddChaletModalComponent;
  @ViewChild("updateModalRef", { static: true }) updateModalRef: AddChaletModalComponent;

  constructor(
    private sharedObjectService: SharedObjectService,
    private chaletService: ChaletService,
    private router: Router
  ) {
  }

  ngOnInit() {
      this.loadData(this.itemsPerPage, this.currentPage, this.search, this.orderBy);
  }

  loadData(
    pageSize: number = 10,
    currentPage: number = 1,
    search: string = "",
    orderBy: string = "prix"
  ) {
    this.itemsPerPage = pageSize;
    this.currentPage = currentPage;
    this.search = search;
    this.orderBy = orderBy;
    this.chaletService.getAll().subscribe(
      (res) => {
        this.isLoading = false;
        this.data = res.content;
        this.data.forEach(chalet => {
          if (!chalet.images.length) {
            chalet.images.push({ data: noImgData })
          }
        })
        this.totalItem = res.totalElements;
        this.totalPage = res.totalPages;
        this.setSelectAllState();
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  changeDisplayMode(mode) {
    this.displayMode = mode;
  }

  showAddNewModal() {
    this.addNewModalRef.show();
  }

  isSelected(p: IChalet) {
    return this.selected.findIndex((x) => x.id === p.id) > -1;
  }
  onSelect(item: IChalet) {
    if (this.isSelected(item)) {
      this.selected = this.selected.filter((x) => x.id !== item.id);
    } else {
      this.selected.push(item);
    }
    this.setSelectAllState();
  }

  setSelectAllState() {
    if (this.selected.length === this.data.length) {
      this.selectAllState = "checked";
    } else if (this.selected.length !== 0) {
      this.selectAllState = "indeterminate";
    } else {
      this.selectAllState = "";
    }
  }

  selectAllChange($event) {
    if ($event.target.checked) {
      this.selected = [...this.data];
    } else {
      this.selected = [];
    }
    this.setSelectAllState();
  }

  pageChanged(event: any): void {
    this.loadData(this.itemsPerPage, event.page, this.search, this.orderBy);
  }

  itemsPerPageChange(perPage: number) {
    this.loadData(perPage, 1, this.search, this.orderBy);
  }

  changeOrderBy(item: any) {
    this.loadData(this.itemsPerPage, 1, this.search, item.value);
  }

  searchKeyUp(event) {
    const val = event.target.value.toLowerCase().trim();
    this.loadData(this.itemsPerPage, 1, val, this.orderBy);
  }

  onContextMenuClick(action: string, item: IChalet) {
    if (action == 'modifier') {
      this.chaletForUpdate = item;
      this.updateModalRef.show();
      this.sharedObjectService.changeCurrenIsChaletInEditMode(true),
        this.sharedObjectService.changeCurrentChaletForUpdate(item);
    }
    if (action == 'supprimer') {
      this.chaletService.delete(item.id).subscribe(res => {

        this.data = [];
        this.loadData(
          this.itemsPerPage,
          this.currentPage,
          this.search,
          this.orderBy
        );
      })
    }
  }

  goToDetail(id: string): void {
    this.router.navigate([`/app/chalets/` + id]);
  }

  getSavedChalet($event): void {
    this.data = [];
    this.loadData(
      this.itemsPerPage,
      this.currentPage,
      this.search,
      this.orderBy
    );
  }
  getUpdatedChalet($event): void {
    this.data = [];
    this.loadData(
      this.itemsPerPage,
      this.currentPage,
      this.search,
      this.orderBy
    );
  }
}
