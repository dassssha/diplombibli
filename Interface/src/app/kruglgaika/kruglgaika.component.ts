import { Component, OnInit } from '@angular/core';
import { KruglgaikaService } from './kruglgaika.service';

type GostParamRezb = {
  Param: any;
  Rezbs: any[];
};

@Component({
  selector: 'app-kruglgaika',
  templateUrl: './kruglgaika.component.html',
  styleUrls: ['./kruglgaika.component.css']
})
export class KruglgaikaComponent implements OnInit {
  
  searchText = '';
  name:string = 'gostskrugl';
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
  flagGost2:boolean = false;
  flagGost3:boolean = false;
  GostParamRezbsBuffer: GostParamRezb[] = [];
  GostParamRezbs: GostParamRezb[] = [];
  dialog:boolean = false
  selectedRezb:any
  idGostLast:any
  b:number;


  constructor(private gostsService: KruglgaikaService) { }
  async ngOnInit(): Promise<void> {
    await this.getGosts();
  }
  view(){
    this.viewAll = true;
    this.flag = false;
    this.dialog=false
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
    async gostsOr(gost): Promise<void> {
      this.gost = gost
      console.log(this.gost)
      if (this.gost['name'] == '10657-80' ){
        this.getTypeGOSTS(gost);
      }
      if ( this.gost['name'] == '6393-73' || this.gost['name'] == '11871-88' ){
        this.getTypeGOSTS2(gost);
      }

    }
   // получаем данные о типе госта
   async getTypeGOSTS(gost): Promise<void> {
    this.viewAll= false;
    this.flag = true;
    this.gost = gost;
    console.log (this.gost['name']);
    if (this.gost['name'] == '10657-80' ){
      this.flagGost = true;
      this.flagGost1 = false;
      this.flagGost2 = false;
      this.flagGost3 = false;
    }
    if (this.gost['name'] == '6393-73'){
      this.flagGost1 = true;
      this.flagGost = false;
      this.flagGost2 = false;
      this.flagGost3 = false;
    }
    if (this.gost['name'] == '11871-88'){
      if(this.gost['ispoln']=='1'){
        this.flagGost2 = true;
        this.flagGost = false;
        this.flagGost1 = false;
        this.flagGost3 = false;
      }
      if(this.gost['ispoln']=='2'){
        this.flagGost3 = true;
        this.flagGost2 = false;
        this.flagGost = false;
        this.flagGost1 = false;
      }
      
    }
    
    const TypeGosts = this.gostsService.getGostParamsByrt(this.name,gost.name, gost.id);
    console.log (TypeGosts);
    //this.TypeGosts = await TypeGosts;
    this.GostParamRezbsBuffer = [];
    let gostParamRezbBuffer:GostParamRezb;
    let typeGostsBuffer = await TypeGosts;
    for (let typeGostBuffer of typeGostsBuffer) {
      let rezbs =await this.gostsService.getGostRezbByr(this.name,gost.name, typeGostBuffer.id);
      gostParamRezbBuffer = {Param: typeGostBuffer,Rezbs: rezbs}
      this.GostParamRezbsBuffer.push(gostParamRezbBuffer);
    }
    this.GostParamRezbs = this.GostParamRezbsBuffer;
  }

  async getTypeGOSTS2(gost): Promise<void> {
    this.viewAll= false;
    this.flag = true;
    this.gost = gost;
    if (this.gost['name'] == '6393-73'){
      this.flagGost1 = true;
      this.flagGost = false;
      this.flagGost2 = false;
      this.flagGost3 = false;
    }
    if (this.gost['name'] == '11871-88'){
      if(this.gost['ispoln']=='1'){
        this.flagGost2 = true;
        this.flagGost = false;
        this.flagGost1 = false;
        this.flagGost3 = false;
      }
      if(this.gost['ispoln']=='2'){
        this.flagGost3 = true;
        this.flagGost2 = false;
        this.flagGost = false;
        this.flagGost1 = false;
      }
    }
    console.log (this.gost['name']);
    const TypeGosts = this.gostsService.getGostParamsByrt(this.name,gost.name, gost.id);
    console.log (TypeGosts);
    this.TypeGosts = await TypeGosts;
  }


    async getRezb(TypeRezbs, GostName): Promise<void> {
      let a: any;
      console.log(TypeRezbs);
      for (a of TypeRezbs) {
        // console.log(a);
        try {
          this.gostsService.getGostRezbByr(this.name,GostName, a.id).then((res: any[]) => {
            res.forEach((item) => {
              this.Types.push(item);
            });
          });
        } catch (err) {
          console.error(err);
        }
      }
      console.log(this.Types);
    }

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

    off(){
      this.dialog=false
    }
    selectedRezdEvent(idGost):void{
      this.idGostLast = idGost;
    }
  
    insertFile(TypeGost: any,typeRezb: any): void {
      console.log(this.selectedRezb)
      if(typeRezb == undefined ||(this.idGostLast != TypeGost.id && typeRezb != undefined)){
        this.dialog = true;
        return;
      } 
      this.TypeGosts = TypeGost;
      const properties = {
        PartNumber: '',
        PartName: this.gost.name + TypeGost.id +typeRezb.type_rezb ,
        Description: ''
      };
      console.log(this.gost.url)
      window.location.href = 'fusion360://command=insert&file=' + encodeURIComponent(this.gost.url) +
        '&properties=' + encodeURIComponent(JSON.stringify(properties)) +
        '&privateInfo=' + encodeURIComponent(this.setString(TypeGost,typeRezb)) +
        '&id=' + encodeURIComponent(this.gost.name + ' ' + TypeGost.id +''+typeRezb.type_rezb + this.getRand()); 
    }

    insertFile2(TypeGost: any): void {
      this.TypeGosts = TypeGost;
      const properties = {
        PartNumber: '',
        PartName: this.gost.name + TypeGost.id +TypeGost.rezb ,
        Description: ''
      };
      console.log(this.gost.url)
      window.location.href = 'fusion360://command=insert&file=' + encodeURIComponent(this.gost.url) +
        '&properties=' + encodeURIComponent(JSON.stringify(properties)) +
        '&privateInfo=' + encodeURIComponent(this.setString2(TypeGost)) +
        '&id=' + encodeURIComponent(this.gost.name + ' ' + TypeGost.id +''+TypeGost.rezb+''+this.gost.name.ispoln); 
    }
    
      setString(TypeGost,typeRezb): string {
        if (this.gost['name'] == '10657-80'){
          let str = this.gost['name'] + '/'
          str = str + TypeGost.dk + '/'  //диаметр основной окр
          str = str + TypeGost.n  + '/'//ширина отверстия прямоуг
          str = str + TypeGost.m + '/'//выдавливан основан
          str = str + TypeGost.t+ '/'//высота отверст прямоуг
          str = str +TypeGost.da + '/' //фаска  внутренняя
          str = str +TypeGost.d + '/' //размер отверстия по резьбу
          str = str + typeRezb.type_rezb
          console.log(str)
          return str;
        }
    }

    setString2(TypeGost): string {
       
      if (this.gost['name'] == '6393-73'){
        let str = this.gost['name'] + '/'
        str = str + TypeGost.d + '/' //диаметр основной окр
        str = str + TypeGost.m + '/'//выдавливан основан
        str = str + TypeGost.da + '/' //фаска  внутренняя и диаметр окр под резьбу
        str = str + TypeGost.d1  + '/'//расстояние от центра до кругл отверстия
        str = str + TypeGost.do  + '/'//диаметр отверст кругл
        str = str + TypeGost.h + '/'//глубина маленьк отверст
        str = str + TypeGost.c1+ '/'//фаска маленьких отверстий
        str = str +TypeGost.c + '/' //фаска  внешняя
        str = str + TypeGost.rezb
        console.log(str)
        return str;
      }
      if (this.gost['name'] == '11871-88'){
        let str = this.gost['name'] + '/'
        str = str + TypeGost.d + '/' //диаметр основной окр
        str = str + TypeGost.d2 + '/'//выдавливан основан
        str = str + TypeGost.m + '/' //фаска  внутренняя и диаметр окр под резьбу
        str = str + TypeGost.c  + '/'//расстояние от центра до кругл отверстия
        str = str + TypeGost.b  + '/'//диаметр отверст кругл
        str = str + TypeGost.h + '/'//глубина маленьк отверст
        str = str + TypeGost.do + '/'//фаска маленьких отверстий
        str = str +TypeGost.da + '/' //фаска  внешняя
        str = str +TypeGost.kpror + '/' //количество отверстий
        str = str + TypeGost.rezb
        console.log(str)
        return str;
      }
  
}


}
