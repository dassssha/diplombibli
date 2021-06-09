import { Component, OnInit } from '@angular/core';
import { GostsbyrtService } from './gostsbyrt.service';

type GostParamRezb = {
  Param: any;
  Rezbs: any[];
};

@Component({
  selector: 'app-gostsbyrt',
  templateUrl: './gostsbyrt.component.html',
  styleUrls: ['./gostsbyrt.component.css']
})
export class GostsbyrtComponent implements OnInit {
  searchText = '';
  name:string = 'gostsbyrt';
  gosts: any[];
  searchGosts: any[];
  gost: any;
  TypeGosts: any[];
  rezb: any[];
  TypeRezb: any;
  Types: any[] = [];
  TypeGost: any;
  flag: boolean = false;//отвечает за видимость параметров на вьюхе
  viewAll:boolean = true; // отвечает за отображение всех гостов
  flagGost:boolean = false;
  flagGost1:boolean = false;
  GostParamRezbsBuffer: GostParamRezb[] = [];
  GostParamRezbs: GostParamRezb[] = [];
  b:number;
  constructor(private gostsService: GostsbyrtService) { }

  async ngOnInit(): Promise<void> {
    await this.getGosts();
  }
  view(){
    this.viewAll = true;
    this.flag = false;
  }
  
      // получаем из сервиса все госты, заносим в переменную, чтобы вывести на экран
    async getGosts(): Promise<void> {
      try {
        const gosts = this.gostsService.getAllGostsByrt(this.name); // gosts получаем список всех гостов, которые есть на сервере
        this.gosts = await gosts;
        this.searchGosts = this.gosts;
      } catch (err) {
        console.error(err);
      }
    }
   // получаем данные о типе госта
   async getTypeGOSTS(gost): Promise<void> {
    this.viewAll= false;
    this.flag = true;
    this.gost = gost;
    console.log (this.gost['name']);
    const TypeGosts = this.gostsService.getGostParamsByrt(this.name,gost.name, gost.id);
    console.log (TypeGosts);
    this.TypeGosts = await TypeGosts;
    // this.GostParamRezbsBuffer = [];
    // let gostParamRezbBuffer:GostParamRezb;
    // let typeGostsBuffer = await TypeGosts;
    // for (let typeGostBuffer of typeGostsBuffer) {
    //   // let rezbs =await this.gostsService.getGostRezbByr(this.name,gost.name, typeGostBuffer.id);
    //   gostParamRezbBuffer = {Param: typeGostBuffer}
    //   this.GostParamRezbsBuffer.push(gostParamRezbBuffer);
    // }
    // this.GostParamRezbs = this.GostParamRezbsBuffer;

    //this.TypeGosts = await TypeGosts;
    //this.getRezb(this.TypeGosts, gost.name);
  }

    // async getRezb(TypeRezbs, GostName): Promise<void> {
    //   let a: any;
    //   console.log(TypeRezbs);
    //   for (a of TypeRezbs) {
    //     // console.log(a);
    //     try {
    //       this.gostsService.getGostRezbByr(this.name,GostName, a.id).then((res: any[]) => {
    //         res.forEach((item) => {
    //           this.Types.push(item);
    //         });
    //       });
    //     } catch (err) {
    //       console.error(err);
    //     }
    //   }
    //   console.log(this.Types);
    // }

    SearchGosts(value: string):void{
      let bufferGosts:any[];
      let regexp = new RegExp(value + '\.');
      bufferGosts = this.gosts;
      bufferGosts = bufferGosts.filter(x=>regexp.test(x.name));
      if(bufferGosts.length == 0){
        this.searchGosts = this.gosts;
        return;
      }
      this.searchGosts = bufferGosts;
    }
    getRand(){
      let a= Math.random()*(100-1)+1;
      this.b = Number(a)
      return this.b
    }

    insertFile(TypeGost: any): void {
      this.TypeGosts = TypeGost;
      const properties = {
        PartNumber: '',
        PartName: this.gost.name + TypeGost.id +TypeGost.rezb ,
        Description: ''
      };
      console.log(this.gost.url)
      window.location.href = 'fusion360://command=insert&file=' + encodeURIComponent(this.gost.url) +
        '&properties=' + encodeURIComponent(JSON.stringify(properties)) +
        '&privateInfo=' + encodeURIComponent(this.setString(TypeGost)) +
        '&id=' + encodeURIComponent(this.gost.name + ' ' + TypeGost.id +''+TypeGost.rezb+this.getRand()); 
    }
      setString(TypeGost): string {
       
          let str = this.gost['name'] + '/'
          str = str + TypeGost.dw + '/' + //длина верхнего цилиндра по оси х
          +TypeGost.c + '/'  //радиус дуги от этого цилиндра
          str = str + TypeGost.s//расстояние многоугольника на эскизе
          str = str + '/'
          str = str + TypeGost.m//выдавливание многоугольника
          str = str + '/'
          str = str + TypeGost.m//диаметр окружности под резьбу
          str = str + '/'
          str = str + TypeGost.r//радиус сопряжения
          str = str + '/'
          str = str + TypeGost.da//размер внутренних фасок 
          str = str + '/'
          str = str + TypeGost.dw//размер внешней фаски
          str = str + '/'
          str = str + TypeGost.rezb
          console.log(str)
          return str;
      
    }

}
