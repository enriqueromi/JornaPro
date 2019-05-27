import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  titulo : string;


  constructor(private router: Router, private tittle: Title, private meta: Meta) { 

    this.getDataRoute()
    .subscribe( data =>{
      this.titulo = data.titulo;

      // Clase para cambiar los titulos de las ventanas
      this.tittle.setTitle(this.titulo)

      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      }
      this.meta.updateTag( metaTag);
    });

  }

  ngOnInit() {
  }

  getDataRoute(){
    return this.router.events.pipe(

      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento : ActivationEnd) => evento.snapshot.data)
    ) 
  };

}
