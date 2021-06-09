import { Component, OnInit } from '@angular/core';
import {GostsService} from './services/gosts.service';

type GostParamRezb = {
  Param: any;
  Rezbs: any[];
};

@Component({
  selector: 'app-gosts',
  templateUrl: './gosts.component.html',
  styleUrls: ['./gosts.component.css']
})

export class GostsComponent implements OnInit {
  title = 'Interface';
  gosts: any[];
  gost: any;
  TypeGosts: any[];
  searchGosts: any[];
  rezb: any[];
  TypeRezb: any;
  Types: any[] = [];
  TypeGost: any;
  viewAll:boolean = true;
  flag: boolean = false;//отвечает за видимость параметров на вьюхе
  flagGost:boolean = false;//отвечает за отображение конкретных гаек в таблице
  flagGost1:boolean = false;//отвечает за отображение других конкретных гаек в таблице 
  dialog:boolean = false
  selectedRezb:any
  idGostLast:any
  
  GostParamRezbsBuffer: GostParamRezb[] = [];
  GostParamRezbs: GostParamRezb[] = [];
  b:number;
  
  constructor(private gostsService: GostsService) { }

 // при прогрузке страницы сразу же вызывается метод и 
 // данные подгружаются из бд сразу на страницу при ее открытии(это главнная страница)
 async ngOnInit(): Promise<void> {
  await this.getGosts();

}

view(){
  this.viewAll = true;
  this.flag = false;
  this.dialog = false;
}

    // получаем из сервиса все госты, заносим в переменную, чтобы вывести на экран
  async getGosts(): Promise<void> {
    try {
      const gosts = this.gostsService.getAllGosts(); // gosts получаем список всех гостов, которые есть на сервере
      this.gosts = await gosts;
      this.searchGosts = this.gosts;
    } catch (err) {
      console.error(err);
    }
  }
  // получаем данные о типе госта
  async getTypeGOSTS(gost): Promise<void> {
    this.viewAll = false;
    this.flag = true;
    this.gost = gost;
    console.log (this.gost['name']);
    if (this.gost['name'] == '10605-94'|| this.gost['name'] == '10607-94' || this.gost['name'] == '15521-70'  || this.gost['name'] == '15522-70' ){
      this.flagGost = true;
      this.flagGost1 = false;
    }
    if (this.gost['name'] == '10608-72' || this.gost['name'] == '10610-72'){
      this.flagGost1 = true;
      this.flagGost = false;
    }
    
    const TypeGosts = this.gostsService.getGostParams(gost.name, gost.id);
    console.log (TypeGosts);
    let b:any = TypeGosts['0'];
    console.log (b);
    //this.TypeGosts = await TypeGosts;
    this.GostParamRezbsBuffer = [];
    let gostParamRezbBuffer:GostParamRezb;
    let typeGostsBuffer = await TypeGosts;
    for (let typeGostBuffer of typeGostsBuffer) {
      let rezbs =await this.gostsService.getGostRezb(gost.name, typeGostBuffer.id);
      gostParamRezbBuffer = {Param: typeGostBuffer,Rezbs: rezbs}
      this.GostParamRezbsBuffer.push(gostParamRezbBuffer);
    }
    this.GostParamRezbs = this.GostParamRezbsBuffer;
    
  }
  getRand(){
    let a= Math.random()*(100-1)+1;
    this.b = Number(a)
    return this.b
  }

  

    async getRezb(TypeRezbs, GostName): Promise<void> {
      let a: any;
      console.log(TypeRezbs);
      for (a of TypeRezbs) {
        // console.log(a);
        try {
          this.gostsService.getGostRezb(GostName, a.id).then((res: any[]) => {
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
  
    insertFile(TypeGost: any,typeRezb: any): void {
      console.log(this.selectedRezb)
      if(typeRezb == undefined ||(this.idGostLast != TypeGost.id && typeRezb != undefined)){
        this.dialog = true;
        return;
      } 
      
      else {
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
          '&id=' + encodeURIComponent(this.gost.name + ' ' + TypeGost.id +''+typeRezb.type_rezb + this.getRand()); // id будет формироваться как номергоста_номердетали
        // это строго необходимо, т.к. при импорте детали, eсли id у деталей равны, он просто делает копию, и они связаны становятся
        
      }
      // typeRezb.type_rezb = undefined;
    }
  
       
    //   console.log(typeRezb.type_rezb);
    //   this.TypeGosts = TypeGost;
    //   const properties = {
    //     PartNumber: '',
    //     PartName: this.gost.name + TypeGost.id +typeRezb.type_rezb ,
    //     Description: ''
    //   };
    //   console.log(this.gost.url)
    //   window.location.href = 'fusion360://command=insert&file=' + encodeURIComponent(this.gost.url) +
    //     '&properties=' + encodeURIComponent(JSON.stringify(properties)) +
    //     '&privateInfo=' + encodeURIComponent(this.setString(TypeGost,typeRezb)) +
    //     '&id=' + encodeURIComponent(this.gost.name + ' ' + TypeGost.id +''+typeRezb.type_rezb); // id будет формироваться как номергоста_номердетали
    //   // это строго необходимо, т.к. при импорте детали, eсли id у деталей равны, он просто делает копию, и они связаны становятся
    // }

    setString(TypeGost,typeRezb): string {
      if (this.gost['name'] == '10605-94' || this.gost['name'] == '10607-94' || this.gost['name'] == '15521-70'  || this.gost['name'] == '15522-70'){
        let str = this.gost['name'] + '/'
        str = str + TypeGost.s + '/' + //длина многоугольника
        +TypeGost.m + '/'  //передаем высоту гайки
        str = str + TypeGost.da//это мы так меняем размер окружности, не уверена, что есть смысл его менят
        str = str + '/'
        str = str + TypeGost.dw//передаем ра змеры верзъхней внешней фаски
        str = str + '/'
        str = str + TypeGost.da//передаем размеры нижней внутренней фаски
        str = str + '/'
        str = str + typeRezb.type_rezb
        str = str + '/'
        str = str + this.gost['ispoln']
        console.log(str)
        return str;
      }
      if (this.gost['name'] == '10608-72' || this.gost['name'] == '10610-72'){
        let str = this.gost['name'] + '/'
        str = str + TypeGost.s + '/' + //длина многоугольника
        +TypeGost.m + '/'  //передаем высоту гайки
        str = str + TypeGost.d//это мы так меняем размер окружности, не уверена, что есть смысл его менят
        str = str + '/'
        str = str + TypeGost.dw//передаем ра змеры верзъхней внешней фаски
        str = str + '/'
        str = str + typeRezb.type_rezb
        console.log(str)
        return str;
        }

  }

}
