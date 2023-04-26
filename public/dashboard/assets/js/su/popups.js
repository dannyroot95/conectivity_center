
var array = []
getAsisstance()

function getAsisstance(){

    document.getElementById("loader").style = "display:block;"

    var carrers = ["ADMINISTRACIÓN Y NEGOCIOS INTERNACIONALES","CONTABILIDAD Y FINANZAS","ECOTURISMO"
    ,"INGENIERÍA FORESTAL Y MEDIO AMBIENTE","INGENIERÍA DE SISTEMAS E INFORMÁTICA","INGENIERÍA AGROINDUSTRIAL",
    "MEDICINA VETERINARIA - ZOOTECNIA","DERECHO Y CIENCIAS POLÍTICAS","EDUCACIÓN: ESPECIALIDAD INICIAL Y ESPECIAL", 
    "EDUCACIÓN: ESPECIALIDAD PRIMARIA E INFORMÁTICA","EDUCACIÓN: ESPECIALIDAD MATEMÁTICA Y COMPUTACIÓN","ENFERMERÍA"]

    var myArray = []

    db.collection("assistance").get().then((querySnapshot) => {
        
       var ctx0 = 0 , ctx1 = 0 , ctx2 = 0 , ctx3 = 0 , ctx4 = 0 , ctx5 = 0 , ctx6 = 0 , ctx7 = 0 , ctx8 = 0 , ctx9 = 0 , ctx10 = 0, ctx11 = 0

       var c = 0
          
              querySnapshot.forEach(data => {

                  if(data.data().carrer_name == carrers[0]){
                    ctx0++
                  }else if(data.data().carrer_name == carrers[1]){
                    ctx1++
                  }else if(data.data().carrer_name == carrers[2]){
                    ctx2++
                  }else if(data.data().carrer_name == carrers[3]){
                    ctx3++
                  }else if(data.data().carrer_name == carrers[4]){
                    ctx4++
                  }else if(data.data().carrer_name == carrers[5]){
                    ctx5++
                  }else if(data.data().carrer_name == carrers[6]){
                    ctx6++
                  }else if(data.data().carrer_name == carrers[7]){
                    ctx7++
                  }else if(data.data().carrer_name == carrers[8]){
                    ctx8++
                  }else if(data.data().carrer_name == carrers[9]){
                    ctx9++
                  }else if(data.data().carrer_name == carrers[10]){
                    ctx10++
                  }else{
                    ctx11++
                  }

                  c++

                  array.push([c,data.data().code,data.data().fullName,data.data().carrer_name,
                    data.data().dni,onlyDateNumber(data.data().date_register),onlyHour(data.data().date_register)])

                });
  
                myArray.push([ctx0,ctx1,ctx2,ctx3,ctx4,ctx5,ctx6,ctx7,ctx8,ctx9,ctx10,ctx11])
                getPie(myArray)
                bar(myArray)
                document.getElementById("loader").style = "display:none;"
                document.getElementById("print").style = "visibility:visible;font-size: 40px;"
               
          }) 

}

function getPie(array){

    var carrers = ["ADMINISTRACIÓN Y NEGOCIOS INTERNACIONALES","CONTABILIDAD Y FINANZAS","ECOTURISMO"
    ,"INGENIERÍA FORESTAL Y MEDIO AMBIENTE","INGENIERÍA DE SISTEMAS E INFORMÁTICA","INGENIERÍA AGROINDUSTRIAL",
    "MEDICINA VETERINARIA - ZOOTECNIA","DERECHO Y CIENCIAS POLÍTICAS","EDUCACIÓN: ESPECIALIDAD INICIAL Y ESPECIAL", 
    "EDUCACIÓN: ESPECIALIDAD PRIMARIA E INFORMÁTICA","EDUCACIÓN: ESPECIALIDAD MATEMÁTICA Y COMPUTACIÓN","ENFERMERÍA"]

    //console.log((parseFloat(+".0").toFixed(1)))

    var myConfig = {
        type: "pie",
        plot: {
          borderColor: "#2B313B",
          borderWidth: 2,
          // slice: 90,
          valueBox: {
            placement: 'out',
            text: '%t\n%npv%',
            fontSize : 12,
            fontWeigth : 'bold',
            fontFamily: "Open Sans"
          },
          tooltip: {
            fontSize: '16',
            fontFamily: "Open Sans",
            text: "%npv%"
          },
          animation: {
            effect: 2,
            method: 5,
            speed: 900,
            sequence: 1,
            delay: 3000
          }
        },
       
     title: {
          fontColor: "#8e99a9",
          text: 'Asistencias por carrera',
          align: "left",
          fontFamily: "Open Sans",
          fontSize: 20,
        },
        subtitle: {
          offsetY: 5,
          fontColor: "#8e99a9",
          fontFamily: "Open Sans",
          fontSize: "16",
          text: '2022',
          align: "left"
        },
        plotarea: {
          margin: "60 0 0 0",
          
        },
        series: [{
            values: [parseFloat(array[0][0]).toFixed(2)],
            text: carrers[0],
            backgroundColor: '#50ADF5',
          },
          {
            values: [parseFloat(array[0][1]).toFixed(2)],
            text: carrers[1],
            backgroundColor: '#FF7965',
           
          },
          {
            values: [parseFloat(array[0][2]).toFixed(2)],
            text: carrers[2],
            backgroundColor: '#FFCB45',
           
          },
          {
            values: [parseFloat(array[0][3]).toFixed(2)],
            text: carrers[3],
            backgroundColor: '#6877e5',
           
          },
          {
            values: [parseFloat(array[0][4]).toFixed(2)],
            text: carrers[4],
            backgroundColor: '#6FB07F',
            
          },
          {
            values: [parseFloat(array[0][5]).toFixed(2)],
            text: carrers[5],
            backgroundColor: '#7A0DD4',
            
          },
          {
            values: [parseFloat(array[0][6]).toFixed(2)],
            text: carrers[6],
            backgroundColor: '#0D7DD4',
            fontSize: "8",
          },
          {
            values: [parseFloat(array[0][7]).toFixed(2)],
            text: carrers[7],
            backgroundColor: '#D48C0D',
           
          },
          {
            values: [parseFloat(array[0][8]).toFixed(2)],
            text: carrers[8],
            backgroundColor: '#B6D40D',
            
          },
          {
            values: [parseFloat(array[0][9]).toFixed(2)],
            text: carrers[9],
            backgroundColor: '#0DCED4',
            
          },
          {
            values: [parseFloat(array[0][10]).toFixed(2)],
            text: carrers[10],
            backgroundColor: '#0D40D4',
         
          },
          {
            values: [parseFloat(array[0][11]).toFixed(2)],
            text: carrers[11],
            backgroundColor: '#D40D7A',
           
          }
        ]
      };
       
      zingchart.render({
        id: 'myChart',
        data: myConfig,
        height: '90%',
        width: '105%'
      });
}


function bar(array){

    console.log(array)

    var myConfig = {
        "graphset": [{
          "type": "mixed",
          title: {
            fontColor: "#8e99a9",
            text: 'Gráfico de barras de asistencia',
            align: "left",
            fontFamily: "Open Sans",
            fontSize: 20,
          },
         
          'scale-x': {
            labels: ["ADMIN","CONT","ECOT"
            ,"IFMA","ISI","IA",
            "MVZ","DCP","EEIE", 
            "EEPI","EEMC","ENF"]
          },
          "series": [{
            "type": "bar",
            "values": array[0],
            "bar-width": "50%"
          }, {
            "type": "line",
            "values": array[0],
            "aspect": "spline"
          }]
        }]
      };
       
      zingchart.render({
        id: 'myChart2',
        data: myConfig,
        height: "90%",
        width: "100%"
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

      html2canvas(document.querySelector("#myChart")).then(canvas => {
        //document.body.appendChild(canvas)

        html2canvas(document.querySelector("#myChart2")).then(canvas2 => {
            //document.body.appendChild(canvas)
            
            var pdf = new jspdf.jsPDF()
          
            pdf.setFontSize(18)
            pdf.text(30, 16, "UNIVERSIDAD AMAZÓNICA DE MADRE DE DIOS")
            pdf.setFontSize(9)
            pdf.text(30, 22, "Reporte general : Centros Universitarios de Conectividad")
            pdf.text(30, 26, "Fecha : "+onlyDateNumber(Date.now()))
            pdf.setFontSize(12)
            pdf.addImage('/images/logo.png', 'PNG', 7, 2, 20, 20)
          
            pdf.addImage(canvas, 'JPEG', 7, 32, 195, 90);
            pdf.addImage(canvas2, 'JPEG', 7, 130, 195, 90);

            pdf.addPage()
            pdf.setFontSize(16)
            pdf.text(7, 20, "ASISTENCIA DE ESTUDIANTES")
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

            pdf.save('reporte_'+onlyDateNumber(Date.now())+'.pdf')
          

          });
      
      });

}


