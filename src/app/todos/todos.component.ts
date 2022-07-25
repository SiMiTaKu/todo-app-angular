import { Component, OnInit } from '@angular/core';

import { Category }                              from "../category";
import { CategoryService }                       from "../category.service";
import { CategoryNgxsState, CategoryStateModel } from "../category.state";
import { Color }                                 from "../color";

import { Todo }                          from "../todo";
import { TodoState }                     from "../todoState";
import { TodoNgxsState, TodoStateModel } from "../todo.state";
import { TodoService }                   from "../todo.service";

import { Emittable, Emitter } from "@ngxs-labs/emitter";

@Component({
  selector: 'app-todos', templateUrl: './todos.component.html', styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  title = 'Todo List';

  todos:      Todo[]      = [];
  categories: Category[]  = [];
  states:     TodoState[] = [];
  colors:     Color[]     = [];

  loading = {
    "todos":      true,
    "categories": true,
    "colors":     true,
    "states":     true,
  }

  slideConfig = {
    accessibility:        true, // Default true
    adaptiveHeight:       false, // Default false
    autoplay:             true, // 自動スクロールの有無 Default false
    autoplaySpeed:        3000, // 自動スクロールのスピード numberミリ秒
    arrows:               true, //　矢印有無 Default true
    // asNavFor?:         string;
    // appendArrows:         string,
    // appendDots?:       string;
    prevArrow:            '<button class="slick-prev-arrow">＜</button>', // 自分でHTMLElementを作成してカスタマイズできる
    nextArrow:            '<button class="slick-next-arrow">＞</button>', // 自分でHTMLElementを作成してカスタマイズできる
    centerMode:           true,
    // centerPadding?:    number | string;
    // cssEase?:          string;
    dots:                 true, // ドット有無 Default false
    // dotsClass:            "slick-dots-class", // 任意のクラス名を命名
    draggable:            true, // ドラッグ可否　Default true
    // fade:                 true, // フェードの有無 トランプみたいになる Default false
    focusOnSelect:        true, // フォーカスしたスライドが１番最初にくる Default false
    // easing?:           string;
    // edgeFriction?:     number;
    infinite:             true, // 無限ループ可否 Default true
    initialSlide:         4, // スライドの開始位置
    // lazyLoad?:         string;
    // mobileFirst?:      boolean;
    // pauseOnFocus?:     boolean;
    // pauseOnDotsHover?: boolean;
    // respondTo?:        string;
    // responsive?:       ConfigResponsive[];
    //rows:                 2, // 列の数
    //slidesPerRow:         2, // 列にいくつスライドをつけるか
    slidesToShow:         5, // いくつ表示させるか
    slidesToScroll:       1, // いくつスクロールさせるか
    // speed:            10,
    swipe:                true, // スマホ版横スクロール可否 Default true
    swipeToSlide:         false, // フォーカスはそのままでスワイプでスライドさせる
                                 // swipeがtrueじゃないとだめ
    //touchMove:            false,
    mouseWheelMove:       true,
    // touchThreshold?:   number;
    useCSS:               true,
    useTransform:         true,
    variableWidth:        true, // widthを任意の値にする Default false
                                // 縦の時は使用できない
    vertical:             false, // 縦スクロール Default false
    verticalSwiping:      false, // スマホ版縦スクロール可否
    //rti:                  true,
    //waitForAnimate:       false,
    //zIndex:               1,
  };

  slickInit(e: any) {
    console.log('slick initialized');
  }
  breakpoint(e: any) {
    console.log('breakpoint');
  }
  afterChange(e: any) {
    console.log('afterChange');
  }
  beforeChange(e: any) {
    console.log('beforeChange');
  }

  constructor(
    private todoService:     TodoService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getTodoStates();
    this.getColors();
    this.getTodos();
  }

  @Emitter(TodoNgxsState.getTodos)
  private todos$!: Emittable<TodoStateModel>

  getTodos(): void {
    this.loading.todos = true;
    this.todos$.emit({ todos: [] }).subscribe(
      _     => this.todos = _.todos.todos,
      error => console.error(error),
      ()    => this.loading.todos = false
    )
  }

  @Emitter(CategoryNgxsState.getCategories)
  private categories$!: Emittable<CategoryStateModel>

  getCategories(): void {
    this.categories$.emit({ categories: [] }).subscribe(
      _     => this.categories = _.categories.categories,
      error => alert("🚨" + error),
      ()    =>  this.loading.categories = false
    );
  }

  getTodoStates(): void {
    this.loading.states = true;
    this.todoService.getState().subscribe(
      _     => this.states = _,
      error => alert("🚨" + error),
      ()    => this.loading.states = false
    );
  }

  getColors(): void {
    this.loading.colors = true;
    this.categoryService.getColors().subscribe(
      _     => this.colors = _,
      error => alert("🚨" + error),
      ()    =>  this.loading.colors = false
    );
  }

  getThisCategoryName(categoryId: number): string[] {
    return this.categories.filter(_ => _.id == categoryId).map(_ => _.name);
  }

  getThisCategoryColor(categoryId: number): string[] {
    const categoryColorId = this.categories.filter(_ => _.id == categoryId).map(_ => _.color).pop();
    return this.colors.filter(_ => _.id == categoryColorId).map(_ => _.name);
  }

  getThisState(stateCode: number): string[] {
    return this.states.filter(_ => _.id == stateCode).map(_ => _.status);
  }

  @Emitter(TodoNgxsState.removeTodo)
  private deleteTodo$!: Emittable<number>

  remove(todo: Todo): void {
    this.loading.todos = true;
    this.deleteTodo$.emit(todo.id).subscribe(
      _     => _,
      error => console.error(error),
      ()    => this.getTodos()
    )
  }

  convertDateTime(dateTime: Date): string {
    return new Intl.DateTimeFormat('ja-Jp-u-ca-japanese', {
      month: "long", day: "numeric", hour: "numeric", minute: "numeric"
    }).format(new Date(dateTime))
  }

  //id順にソート
  sortById(): void{
    this.todos.sort(
      (todoA, todoB) => todoA.id - todoB.id
    )
  }
  //新しい順にソート
  sortByDate(): void{
    this.todos.sort(
      (todoA, todoB) => new Date(todoB.updated_at).getTime() - new Date(todoA.updated_at).getTime()
    )
  }
  //終わってない順にソート
  sortByState(): void{
    this.todos.sort(
      (todoA, todoB) => todoA.state - todoB.state
    )
  }
  //カテゴリのid順にソート
  sortByCategory(): void{
    this.todos.sort(
      (todoA, todoB) => todoA.category_id - todoB.category_id
    )
  }
  //重要度順にソート
  sortByImportance():void{
    this.todos.sort(
      (todoA, todoB) => todoA.importance - todoB.importance
    )
  }
}
