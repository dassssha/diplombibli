import { Component, OnInit } from '@angular/core';
import { ProrezngaikaService } from './prorezngaika.service';

type GostParamRezb = {
  Param: any;
  Rezbs: any[];
};

@Component({
  selector: 'app-prorezngaika',
  templateUrl: './prorezngaika.component.html',
  styleUrls: ['./prorezngaika.component.css']
})
export class ProrezngaikaComponent implements OnInit {

   
  searchText = '';
  name:string = 'gostsprorezn';
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
  dialog:boolean = false
  idGostLast:any
  b:number;


  constructor(private gostsService: ProrezngaikaService) { }
  async ngOnInit(): Promise<void> {
    await this.getGosts();
  }
  view(){
    this.viewAll = true;
    this.flag = false;
    this.dialog = false
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
    // if (this.gost['name'] == '10605-94'|| this.gost['name'] == '10607-94' || this.gost['name'] == '15521-70'  || this.gost['name'] == '15522-70' ){
    //   this.flagGost = true;
    //   this.flagGost1 = false;
    // }
    // if (this.gost['name'] == '10608-72' || this.gost['name'] == '10610-72'){
    //   this.flagGost1 = true;
    //   this.flagGost = false;
    // }
    
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

    //this.TypeGosts = await TypeGosts;
    //this.getRezb(this.TypeGosts, gost.name);
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
    off(){
      this.dialog=false
    }
    selectedRezdEvent(idGost):void{
      this.idGostLast = idGost;
    }
    getRand(){
      let a= Math.random()*(100-1)+1;
      this.b = Number(a)
      return this.b
    }
  
    insertFile(TypeGost: any,typeRezb: any): void {
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
      setString(TypeGost,typeRezb): string {
       
          let str = this.gost['name'] + '/'
          str = str + TypeGost.s//расстояние многоугольника на эскизе
          str = str + '/'
          str = str + TypeGost.h//выдавливание многоугольника
          str = str + '/'
          str = str + TypeGost.dw//диаметр окружности под резьбу
          str = str + '/'
          str = str + TypeGost.f//радиус сопряжения
          str = str + '/'
          str = str + TypeGost.n//размер внутренних фасок 
          str = str + '/'
          str = str + TypeGost.da//размер внешней фаски
          str = str + '/'
          str = str + TypeGost.d//размер отверстия под резьбу
          str = str + '/'
          str = str + TypeGost.kpror + '/'
          str = str + typeRezb.type_rezb
          console.log(str)
          return str;
        
        // if (this.gost['name'] == '10608-72' || this.gost['name'] == '10610-72'){
        //   let str = this.gost['name'] + '/'
        //   str = str + TypeGost.s + '/' + //длина многоугольника
        //   +TypeGost.m + '/'  //передаем высоту гайки
        //   str = str + TypeGost.d//это мы так меняем размер окружности, не уверена, что есть смысл его менят
        //   str = str + '/'
        //   str = str + TypeGost.dw//передаем ра змеры верзъхней внешней фаски
        //   str = str + '/'
        //   // str = str + this.gost.url//передаем размеры нижней внутренней фаски
        //   // str = str + '/'
        //   str = str + typeRezb.type_rezb
        //   console.log(str)
        //   return str;
        //   }
    }


}
