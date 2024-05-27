import { Component } from '@angular/core'
import  pdfMake from  'pdfmake/build/pdfMake'
import  pdfFonts from  'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent {


  createPdf(){
    const pdfDefinition: any = {
        content: [
          {
            text: 'Hola Mundo',  
          }
        ]
    } 

    const pdf = pdfMake.createPdf(pdfDefinition)
    pdf.open();

  }




}
