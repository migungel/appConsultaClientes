import { PopOrderComponent } from './../pop-order/pop-order.component';
import { ServicesService } from './../../core/services/services.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() name: string = '';
  @Input() canton: string = '';
  @Input() direccion: string = '';
  @Input() estado: string = '';
  @Input() saldoPagar: string = '';
  @Input() ultraPuntos: string = '0';
  @Input() partner_id: string= '';
  @Input() identification: string= '';
  @Input() partner: string= '';
  @Input() agreement_id: string= '';
  @Input() type_service: string= '';
  @Input() company: string= '';
  cod: string = '';
  code_dvtelevision = '45779';
  code_transcorporacion = '65225';
  code : string = '';

  constructor(
    private service: ServicesService,
    private dialogOrder: MatDialog,
  ) { }

  ngOnInit(): void {
    this.cod = this.name.replace("OP","").replace("-","");
    if (this.company == '1') {
      this.code = this.code_dvtelevision;
    } else if (this.company == '3') {
      this.code = this.code_transcorporacion;
    }
  }

  details(){
    //console.log(this.agreement_id);
    //this.openDialog(this.agreement_id);
    this.service.getOrders(this.agreement_id).subscribe(
      res => {
        //console.log(res);
        let orderClient;
        if (res) {
          orderClient = res;
          // for (let i in res){
          //   orderClient.push({
          //     order_id: res.order_id,
          //     order: res.order,
          //     type_id: res.type_id,
          //     type: res.type,
          //     date: res.fecha,
          //     date_execute: res.fecha_ejecutar,
          //   });
          // }
        }
        this.openDialog(orderClient);
      }
    );
  }

  openDialog(values: any){
    this.dialogOrder.open(PopOrderComponent, {
      data: values,
      backdropClass: 'backdropBackground',
      panelClass: 'my-class',
      //height: '50%',
      maxHeight: '500px',
      //minHeight: '200px',
      //height: '50%'
    });

  }

}
