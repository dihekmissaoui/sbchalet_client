import { Component, OnInit, ViewChild } from "@angular/core";
import { AddNewProductModalComponent } from "src/app/containers/pages/add-new-product-modal/add-new-product-modal.component";
import { HotkeysService, Hotkey } from "angular2-hotkeys";
import { ContextMenuComponent } from "ngx-contextmenu";
import { ChaletService } from "../services/chalet.service";
import { Router } from "@angular/router";
import { IChalet } from "src/app/model/chalet.model";

@Component({
  selector: "app-list-chalet",
  templateUrl: "./list-chalet.component.html",
  styleUrls: ["./list-chalet.component.scss"],
})
export class ListChaletComponent implements OnInit {
  displayMode = "image";
  selectAllState = "";
  selected: IChalet[] = [];
  data: IChalet[] = [];
  currentPage = 1;
  itemsPerPage = 8;
  search = "";
  orderBy = "";
  isLoading: boolean;
  endOfTheList = false;
  totalItem = 0;
  totalPage = 0;

  @ViewChild("basicMenu") public basicMenu: ContextMenuComponent;
  @ViewChild("addNewModalRef", { static: true })
  addNewModalRef: AddNewProductModalComponent;

  constructor(
    private hotkeysService: HotkeysService,
    private chaletService: ChaletService,
    private router: Router
  ) {
    this.hotkeysService.add(
      new Hotkey("ctrl+a", (event: KeyboardEvent): boolean => {
        this.selected = [...this.data];
        return false;
      })
    );
    this.hotkeysService.add(
      new Hotkey("ctrl+d", (event: KeyboardEvent): boolean => {
        this.selected = [];
        return false;
      })
    );
  }

  ngOnInit() {
    this.loadData(
      this.itemsPerPage,
      this.currentPage,
      this.search,
      this.orderBy
    );
  }

  loadData(
    pageSize: number = 10,
    currentPage: number = 1,
    search: string = "",
    orderBy: string = ""
  ) {
    this.itemsPerPage = pageSize;
    this.currentPage = currentPage;
    this.search = search;
    this.orderBy = orderBy;
    this.chaletService.getAll().subscribe(
      (res) => {
        console.log("res:", res);
        this.isLoading = false;
        (this.data = res.content), (this.totalItem = res.totalElements);
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

  }

  goToDetail(id: string): void {
    this.router.navigate([`/app/chalets/`+id]);
  }
}
