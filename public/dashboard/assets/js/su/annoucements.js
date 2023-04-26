//localStorage.removeItem("announcements")
var cCache = localStorage.getItem("announcements")
var cache = JSON.parse(cCache)
var isFinancedValue = false
var modalityJson
var array = []


if(cache == null){
  document.getElementById("loader").style = "display:block;margin-top:14px;"
  getAnnoucementsFromDatabase()
}else{
  getAnnoucementsFromCache()
  getAnnoucementsFromDatabase()
}



function getAnnoucementsFromDatabase(){


  db.collection("assistance").where("date_register", "<", Date.now()).orderBy("date_register", "desc")
  .onSnapshot((querySnapshot) => {

        let ctx = 0
        let announcements = []
        array = []
  
          values = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            if(values.length > 0){

              $('#tb-announcements').DataTable().destroy()
            
              $("#tbody").html(
                values
                  .map((data) => {

                    ctx++
                    announcements.push(data)
                    array.push([ctx,data.code,data.fullName,data.carrer_name,
                      data.dni,onlyDateNumber(data.date_register),onlyHour(data.date_register)])

                    return `<tr>
  
                    <td style="font-size:11px;"><strong><center>${ctx}</center></strong></td>
                    <td style="font-size:11px;"><center>${data.code}</center></td>
                    <td style="font-size:11px;"><center>${data.fullName}</center></td>
                    <td style="font-size:11px;"><center>${data.carrer_name}</center></td>
                    <td style="font-size:11px;"><center>${data.dni}</center></td>
                    <td style="font-size:11px;"><center>${onlyDateNumber(data.date_register)}</center></td>
                    <td style="font-size:11px;"><center>${onlyHour(data.date_register)}</center></td>
                    </tr>`;
                  })

              .join("")
          );

          createScriptDatatable()
          localStorage.setItem("announcements",JSON.stringify(announcements))
          document.getElementById("loader").style = "display:none;"
          document.getElementById("btn-print").style = "display:inline;"
          
        }else{
          createScriptDatatable()
          document.getElementById("loader").style = "display:none;"
        }

        }) 

}

function getAnnoucementsFromCache(){

  let ctx = 0

  $("#tbody").html(
    
    cache.map((data) => {

        ctx++
 
        return `<tr>
  
        <td style="font-size:11px;"><strong><center>${ctx}</center></strong></td>
        <td style="font-size:11px;"><center>${data.code}</center></td>
        <td style="font-size:11px;"><center>${data.fullName}</center></td>
        <td style="font-size:11px;"><center>${data.carrer_name}</center></td>
        <td style="font-size:11px;"><center>${data.dni}</center></td>
        <td style="font-size:11px;"><center>${onlyDateNumber(data.date_register)}</center></td>
        <td style="font-size:11px;"><center>${onlyHour(data.date_register)}</center></td>
        </tr>`;

      })

  .join("")
);

$('#tb-announcements').DataTable().destroy()
createScriptDatatable()

}




function createScriptDatatable(){

  $('#tb-announcements').DataTable({
    language: {
          "decimal": "",
          "emptyTable": "No hay información",
          "info": "Mostrando _START_ a _END_ de _TOTAL_ datos",
          "infoEmpty": "Mostrando 0 to 0 of 0 datos",
          "infoFiltered": "(Filtrado de _MAX_ total datos)",
          "infoPostFix": "",
          "thousands": ",",
          "lengthMenu": "Mostrar _MENU_ datos",
          "loadingRecords": "Cargando...",
          "processing": "Procesando...",
          "search": "Buscar:",
          "zeroRecords": "Sin resultados encontrados",
          "paginate": {
              "first": "Primero",
              "last": "Ultimo",
              "next": "Siguiente",
              "previous": "Anterior"
          }
   },
  
  });

}


function print(){

  Swal.fire({
    title: 'En breves se descargará el archivo!',
    timer: 5000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
    },
  })


  var pdf = new jspdf.jsPDF()
          
            pdf.setFontSize(18)
            pdf.text(30, 16, "UNIVERSIDAD AMAZÓNICA DE MADRE DE DIOS")
            pdf.setFontSize(9)
            pdf.text(30, 22, "Reporte general : Centros Universitarios de Conectividad")
            pdf.text(30, 26, "Fecha : "+onlyDateNumber(Date.now()))
            pdf.setFontSize(12)
            pdf.addImage('/images/logo.png', 'PNG', 7, 2, 20, 20)
      
            pdf.autoTable({
                head: [['#','Código de estudiante','Nombres','Carrera profesional','DNI','Fecha','Hora']],
                body: array,
                theme: 'grid',
                styles : { halign : 'center'},
                headStyles :{fillColor : [0, 142, 138]}, 
                alternateRowStyles: {fillColor : [238, 255, 254]}, 
                tableLineColor: [0, 142, 138], 
                tableLineWidth: 0.1,
                margin: {top: 30},
                })

                var pageCount = pdf.internal.getNumberOfPages(); //Total Page Number
                for(i = 0; i < pageCount; i++) { 
                pdf.setPage(i); 
                let pageCurrent = pdf.internal.getCurrentPageInfo().pageNumber; //Current Page
                pdf.setFontSize(9);
                pdf.text('Página: ' + pageCurrent + ' de ' + pageCount, 170, pdf.internal.pageSize.height - 10);
                }

            pdf.save('reporte_asistencias_'+onlyDateNumber(Date.now())+'.pdf')
}