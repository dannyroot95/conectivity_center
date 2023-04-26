//localStorage.removeItem("announcements")
var cCache = localStorage.getItem("announcements")
var cache = JSON.parse(cCache)
var modalityJson
var stdFound 
var tchFound
var currentModality
var currentIDAnnouncement

if(cache == null){
  document.getElementById("loader").style = "display:block;margin-top:14px;"
  getAnnoucementsFromDatabase()
}else{

  getAnnoucementsFromCache()
  getAnnoucementsFromDatabase()

}

getRules()
getArticles()
allFetch()



function getAnnoucementsFromDatabase(){


  db.collection("announcements").where("date_register", "<", Date.now()).orderBy("date_register", "desc")
  .onSnapshot((querySnapshot) => {

        let ctx = 0
        let announcements = []
  
          values = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            console.log(values)

            if(values.length > 0){

              $('#tb-announcements').DataTable().destroy()
            
              $("#tbody").html(
                values
                  .map((data) => {

                    if(data.date_start >= Date.now() &&  Date.now() <= data.date_end){

                    ctx++
                    announcements.push(data)

                    return `<tr style="cursor: pointer" onclick="setData('${ctx}','${data.id}','${data.date_start}',
                    '${data.date_end}','${data.observe_date_start}','${data.observe_date_end}',
                    '${data.inf_date_start}','${data.inf_date_end}','${data.url_base}',
                    '${data.url_timeline}','${data.semester}','${data.modality}')">
  
                    <td style="font-size:14px;"><strong>${ctx}</strong></td>
                    <td style="font-size:14px;">${data.semester}</td>
                    <td style="font-size:14px;">${onlyDateNumber(data.date_start)}</td>
                    <td style="font-size:14px;">${onlyDateNumber(data.date_end)}</td>
                    </tr>`;

                    }
                  })

              .join("")
          );



          createScriptDatatable()
          localStorage.setItem("announcements",JSON.stringify(announcements))
          document.getElementById("loader").style = "display:none;"

        }

        }) 

}

function getAnnoucementsFromCache(){

  let ctx = 0

  $("#tbody").html(
    
    cache.map((data) => {

      if(data.date_start >= Date.now() &&  Date.now() <= data.date_end){

        ctx++
 
        return `<tr style="cursor: pointer" 
        onclick="setData('${ctx}','${data.id}','${data.date_start}','${data.date_end}','${data.observe_date_start}',
        '${data.observe_date_end}','${data.inf_date_start}','${data.inf_date_end}','${data.url_base}',
        '${data.url_timeline}','${data.semester}','${data.modality}')">
  
        <td style="font-size:14px;"><strong>${ctx}</strong></td>
                    <td style="font-size:14px;">${data.semester}</td>
                    <td style="font-size:14px;">${onlyDateNumber(data.date_start)}</td>
                    <td style="font-size:14px;">${onlyDateNumber(data.date_end)}</td>
        </tr>`;

      }

      })

  .join("")
);

$('#tb-announcements').DataTable().destroy()
createScriptDatatable()

}


function setData(ctx,id,start,end,obsStart,obsEnd,infStart,infEnd,urlBase,urlTimeline,semester,modality){

  $('#detailModal').modal('show')
  document.getElementById("footerDetail").innerHTML = ""
  document.getElementById("detail-title").innerHTML = "Convocatoria #"+ctx
  document.getElementById("startDate").value = onlyDateNumber(parseInt(start))
  document.getElementById("endDate").value = onlyDateNumber(parseInt(end))
  document.getElementById("obs-startDate").value = onlyDateNumber(parseInt(obsStart))
  document.getElementById("obs-endDate").value = onlyDateNumber(parseInt(obsEnd))
  document.getElementById("inf-startDate").value = onlyDateNumber(parseInt(infStart))
  document.getElementById("inf-endDate").value = onlyDateNumber(parseInt(infEnd))
  document.getElementById("link_base").href = urlBase
  document.getElementById("link_timeline").href = urlTimeline

  document.getElementById("btn-postulate").innerHTML = ""
  document.getElementById("btn-postulate").innerHTML = `
  <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#postulateModal" style="margin-left: 12%; 
   background-color: rgb(114, 113, 113);color:#fff;border-color: rgb(114, 113, 113);
   font-size: 14px;" onclick="postulate('${semester}','${modality}','${id}')">POSTULAR
  </button>`

}


function postulate(semester,modality,id){
  document.getElementById("ps-semester").innerHTML = semester
  document.getElementById("ps-modality").innerHTML = modalityJson[parseInt(modality)].name_modality
  document.getElementById("ps-title").value = ""
  document.getElementById("ps-resume").value = ""
  document.getElementById("btn-std-table").style = "display:block;"
  document.getElementById("btn-tch-table").style = "display:block;"
  //
  document.getElementById("codeStd").value = ""
  document.getElementById("codeStd").disabled = false
  document.getElementById("addToTableSTD").style = "display:none;"
  document.getElementById("deleteQueryStd").style = "display:none;"
  document.getElementById("tdbody-tch-std").innerHTML = ""
  //
  document.getElementById("codeTch").value = ""
  document.getElementById("codeTch").disabled = false
  document.getElementById("addToTableTCH").style = "display:none;"
  document.getElementById("deleteQueryTch").style = "display:none;"
  document.getElementById("tdbody-tch-tch").innerHTML = ""
  document.getElementById("letter-engagement").value = ""
  document.getElementById("doc-project").value = ""
  currentModality = modality
  currentIDAnnouncement = id
  stdFound = null
  tchFound = null
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





function getRules(){

var rule = localStorage.getItem("url-rules")

  if(rule == null){

    db.collection("docs_announcements").doc("rules").get().then((snapshot) =>{

      if(snapshot.exists){

        rule = snapshot.data().url_rule
        console.log(rule)
      
        localStorage.setItem("url-rules",rule)
        document.getElementById("link_rule").href = rule
       
      }else{
      }
  
    })

  }else{

    document.getElementById("link_rule").href = rule

    db.collection("docs_announcements").doc("rules").get().then((snapshot) =>{

      if(snapshot.exists){

        rule = snapshot.data().url_rule
        console.log(rule)
      
        localStorage.setItem("url-rules",rule)
        document.getElementById("link_rule").href = rule
      }
      else{
      }

    })
  }

}





function getArticles(){

  var article = localStorage.getItem("url-article")

  if(article == null){

    db.collection("docs_announcements").doc("articles").get().then((snapshot) =>{

      if(snapshot.exists){

        article = snapshot.data().url_article
        localStorage.setItem("url-article",article)
        document.getElementById("link_article").href = article
       
      }else{
      }
  
    })

  }else{

    document.getElementById("link_article").href = article

    db.collection("docs_announcements").doc("articles").get().then((snapshot) =>{

      if(snapshot.exists){

        article = snapshot.data().url_article
        localStorage.setItem("url-article",article)
        document.getElementById("link_article").href = article
       
      }
    })
  }

}

function clearInputs(){

  document.getElementById("date-start-and-end").value = ""
  document.getElementById("obs-date-start-and-end").value = ""
  document.getElementById("inf-date-start-and-end").value = ""
  document.getElementById("file").style = "display:none;"
  document.getElementById("file").value = ""

}

function hideButtons(){
  document.getElementById("btn-close-modal").disabled = true
  document.getElementById("btn-create").disabled = true
  document.getElementById("btn-close").style = "display:none;"
}

function showButtons(){
  var progress = document.getElementsByClassName('progress')[0];
  var percent = document.getElementsByClassName('percent')[0];
  progress.style.width = '0%';
  percent.innerHTML = '0%';
  document.getElementById("upload-area").style = "display:none;"
  document.getElementById("file").value = ""
  document.getElementById("file").style = "display:block;"
  document.getElementById("btn-close-modal").disabled = false
  document.getElementById("btn-close").style = "display:block;"
  document.getElementById("btn-create").disabled = false
}

function allFetch(){

  fetch('../../../../dashboard/assets/js/utils/modality.json')
    .then((response) => 
          response.json())
    .then((json) => 
            {
              modalityJson = json
            }
        );

} 

function searchStd(){

  let code = document.getElementById("codeStd").value
  let ctx = 0

  if(code != ""){
    db.collection("users").where("code", "==", code)
    .get()
    .then((querySnapshot) => {

        querySnapshot.forEach((doc) => {
          
          if(doc.data().type_user == "student"){

            ctx++
            var name = doc.data().fullName
            var id = doc.data().id
            var carrer = doc.data().carrer_name
            var dni = doc.data().dni
            var code = doc.data().code
            stdFound = {fullName : name , id : id , carrer_name : carrer,code:code,dni:dni}
            document.getElementById("codeStd").disabled = true 
            document.getElementById("codeStd").value = name
            document.getElementById("btn-std-table").style = "display:none;"
            document.getElementById("addToTableSTD").style = "display:block;"
            document.getElementById("deleteQueryStd").style = "display:block;"
            
          }

        });

        if(ctx == 0){
          modalNotFoundStd()
          document.getElementById("btn-std-table").style = "display:block;"
          document.getElementById("addToTableSTD").style = "display:none;"
          document.getElementById("deleteQueryStd").style = "display:none;"
        }

    })
    .catch((error) => {
      modalNotFoundStd()
      document.getElementById("btn-std-table").style = "display:block;"
      document.getElementById("addToTableSTD").style = "display:none;"
      document.getElementById("deleteQueryStd").style = "display:none;"
    })

  }else{

    Swal.fire(
      'Hey!',
      'Ingrese el código',
      'info'
    )

  }

}

function modalNotFoundStd(){
  Swal.fire({
    imageUrl: '../../img/no-found-std.png',
    title: 'Estudiante no encontrado!',
    imageHeight: 120,
  })
}

function modalNotFoundTch(){
  Swal.fire({
    imageUrl: '../../img/no-found-tch.png',
    title: 'Docente no encontrado!',
    imageHeight: 120,
  })
}

function searchTch(){

  let code = document.getElementById("codeTch").value
  let ctx = 0

  if(code != ""){
    db.collection("users").where("code", "==", code)
    .get()
    .then((querySnapshot) => {

        querySnapshot.forEach((doc) => {
          
          if(doc.data().type_user == "teacher"){

            ctx++
            var name = doc.data().fullName
            var id = doc.data().id
            var dni = doc.data().dni
            var code = doc.data().code
            tchFound = {fullName : name , id : id ,code:code,dni:dni}
            document.getElementById("codeTch").disabled = true 
            document.getElementById("codeTch").value = name
            document.getElementById("addToTableTCH").style = "display:block;"
            document.getElementById("deleteQueryTch").style = "display:block;"
            document.getElementById("btn-tch-table").style = "display:none;"
            
          }

        });

        if(ctx == 0){
          modalNotFoundTch()
          document.getElementById("btn-tch-table").style = "display:block;"
          document.getElementById("addToTableTCH").style = "display:none;"
          document.getElementById("deleteQueryTch").style = "display:none;"
        }

    })
    .catch((error) => {
      modalNotFoundTch()
      document.getElementById("btn-tch-table").style = "display:block;"
      document.getElementById("addToTableTCH").style = "display:none;"
      document.getElementById("deleteQueryTch").style = "display:none;"
    })

  }else{
    
    Swal.fire(
      'Hey!',
      'Ingrese el código',
      'info'
    )

  }

}


function cancelStd(){
      document.getElementById("btn-std-table").style = "display:block;"
      document.getElementById("codeStd").value = ""
      document.getElementById("codeStd").disabled = false
      document.getElementById("addToTableSTD").style = "display:none;"
      document.getElementById("deleteQueryStd").style = "display:none;"
      stdFound = null
}

function cancelTch(){
      document.getElementById("btn-tch-table").style = "display:block;"
      document.getElementById("codeTch").value = ""
      document.getElementById("codeTch").disabled = false
      document.getElementById("addToTableTCH").style = "display:none;"
      document.getElementById("deleteQueryTch").style = "display:none;"
      tchFound = null
}


function addStd(){

  var ctx = document.getElementById("tdbody-tch-std").rows.length;

 
if((ctx+1) <= modalityJson[parseInt(currentModality)].max_std){

  if(searchCode() < 1){
    
    var data = `
    
      <tr>
      <th scope="row">${ctx+1}</th>
      <td>${stdFound.fullName}</td>
      <td>${stdFound.code}</td>
      <td>${stdFound.dni}</td>
      <td><button class="btn btn-danger btnDel" onclick="deleteStd(this)" type="button">X</button></td>
      </tr>
      `
  
      $(data).appendTo('#tdbody-tch-std');
      document.getElementById("btn-std-table").style = "display:block;"
      cancelStd()

  }else{
    alert("ya existe en la tabla")
    cancelStd()
  }

}else{
  alert("Excede el limite!")
  cancelStd()
}
  
}

function addTch(){

  var ctx = document.getElementById("tdbody-tch-tch").rows.length;

 
if((ctx+1) <= modalityJson[parseInt(currentModality)].max_tch){

  if(searchCodeTch() < 1){
    
    var data = `
    
      <tr>
      <th scope="row">${ctx+1}</th>
      <td>${tchFound.fullName}</td>
      <td>${tchFound.code}</td>
      <td>${tchFound.dni}</td>
      <td><button class="btn btn-danger" onclick="deleteStd(this)" type="button">X</button></td>
      </tr>
      `
  
      $(data).appendTo('#tdbody-tch-tch');
      document.getElementById("btn-tch-table").style = "display:block;"
      cancelTch()

  }else{
    alert("ya existe en la tabla")
    cancelTch()
  }

}else{
  alert("Excede el limite!")
  cancelTch()
}
  
}



function deleteStd(btn){
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}


function countStdTable(){
  var ctx = 0
  var array = []
  var resume_table = document.getElementById("tbStd");

    for (var i = 1, row; row = resume_table.rows[i]; i++) {
         ctx++
         array.push(ctx)
        }
        
        //array.sort(function(a, b){return b - a});
        
        for (var i = 1, row; row = resume_table.rows[i]; i++) {
          resume_table.rows[i].cells[0].innerHTML = array[i-1]
        }

}

function searchCode() {
  var  filter, table, tr, td, i, txtValue;
  var existStd = 0
  filter = stdFound.code
  table = document.getElementById("tbStd");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1]
    if (td) {
      txtValue = td.textContent || td.innerText;
      if(txtValue == stdFound.code){
        //console.log("same")
        existStd++

      }else{
        //console.log("none")
      }
    }
  }

  return existStd
  
}

function searchCodeTch() {
  var  filter, table, tr, td, i, txtValue;
  var existTch = 0
  filter = tchFound.code
  table = document.getElementById("tbTch");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1]
    if (td) {
      txtValue = td.textContent || td.innerText;
      if(txtValue == tchFound.code){
        //console.log("same")
        existTch++

      }else{
        //console.log("none")
      }
    }
  }

  return existTch
  
}

function createProject(){

  var tb1 = $('#tbStd tr:has(td)').map(function(i, v) {
    var $td =  $('td', this);
        return {
                 fullName: $td.eq(0).text(),
                 code: $td.eq(1).text(),
                 dni: $td.eq(2).text()               
               }}).get();

  var tb2 = $('#tbTch tr:has(td)').map(function(i, v) {
  var $td =  $('td', this);
      return {
               fullName: $td.eq(0).text(),
               code: $td.eq(1).text(),
               dni: $td.eq(2).text()               
             }}).get();

  var title = document.getElementById("ps-title").value
  var resume = document.getElementById("ps-resume").value
  var fileLetterEngagement = document.getElementById("letter-engagement").files[0]
  var fileDocProject = document.getElementById("doc-project").files[0]  
  let user = JSON.parse(localStorage.getItem("currentUserData"))     

  if(title != ""){
      
      if(resume != ""){

        if(tb1.length != 0 && tb2.length != 0){
          
          if(fileDocProject != null && fileLetterEngagement != null){

            //GO
            var data = {

              title_project : title,
              resume : resume,
              students : tb1,
              teacher : tb2,
              url_file_letter_engagment : "",
              url_file_doc_project : "",
              date_register : Date.now(),
              modality : currentModality,
              created_by : user.fullName,
              id_user : user.id,
              id : "",
              date_modified : null,
              status : [80,79,83,84,85,76,65,84,69],
              modified_by : null,
              id_announcement : currentIDAnnouncement,
              semester : getSemester()

             
            }
           
            saveData(data,fileLetterEngagement,fileDocProject)
            
            //console.log(getStatus(data.status))
                      

          }else{
          Swal.fire(
            'Hey!',
            'Suba los archivos correspondientes!',
            'warning'
          )
        }
        

      }else{
        Swal.fire(
          'Hey!',
          'Agrege la lista de participantes!',
          'warning'
        )
      }

    }else{
      Swal.fire(
        'Hey!',
        'Digite el resumen de su proyecto!',
        'warning'
      )
    }
    
  }else{
  
    Swal.fire(
      'Hey!',
      'Ingrese el título de su proyecto!',
      'warning'
    )
  }
}

function saveData(data,file1,file2){

  /*
  
  showOnCompleUpload()
 
*/

hideElementsOnUpload()

var name1 = file1.name.split('.').shift() + Math.floor(Math.random() * 10) + 10 + '.' + file1.name.split('.').pop()
var name2 = file2.name.split('.').shift() + Math.floor(Math.random() * 10) + 10 + '.' + file2.name.split('.').pop()

var rName1 = name1.split('.')[1]
var filename1 = `carta.${rName1}`
var rName2 = name2.split('.')[1]
var filename2 = `proyecto.${rName2}`

var count = 0

//

var path1 = "projects"+ '/'+data.id_user+'/'+data.id_announcement+'/'+ filename1
var path2 = "projects"+ '/'+data.id_user+'/'+data.id_announcement+'/'+ filename2
//

db.collection("projects").where("id_user" , "==" , data.id_user).get().then((query) =>{

  query.forEach((val) => {
    
    if(val.data().id_announcement == data.id_announcement){
      count++
    }

  });

  if(count == 0){

    var storageRef1 = firebase.storage().ref(path1)
    var uploadTask1 = storageRef1.put(file1)
    var storageRef2 = firebase.storage().ref(path2)
    var uploadTask2 = storageRef2.put(file2)

uploadTask1.on('state_changed',
        (snapshot) => {
          
          console.log("Subiendo...")

        },
        (error) => {
            console.log(error)
        },
        () => {

          uploadTask1.snapshot.ref.getDownloadURL()
              .then(downloadURL1 => {

                data.url_file_letter_engagment = downloadURL1

                uploadTask2.snapshot.ref.getDownloadURL()
                .then(downloadURL2 => {
  
                  data.url_file_doc_project = downloadURL2

                  db.collection("projects").add(data).then((docRef) => {

                    db.collection("projects").doc(docRef.id).update({id:docRef.id})

                    showOnCompleUpload()
                    $('#postulateModal').modal('hide')
                    Swal.fire(
                      'Muy Bien!',
                      'Su postulacion ha sido creada!',
                      'success'
                    )
                    
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
  
                })

              })

            })

  }else{
    $('#postulateModal').modal('hide')
    showOnCompleUpload()
    Swal.fire(
      'Error!',
      'No puede postular a esta convocatoria , ya participó!',
      'warning'
    )
  }
  
})

/*


            */

}

function hideElementsOnUpload(){

  document.getElementById("ps-title").disabled = true
  document.getElementById("ps-resume").disabled = true
  document.getElementById("ps-resume").disabled = true
  document.getElementById("btn-std-table").disabled = true
  document.getElementById("btn-tch-table").disabled = true
  document.getElementById("codeStd").disabled = true
  document.getElementById("codeTch").disabled = true
  document.getElementById("letter-engagement").disabled = true
  document.getElementById("doc-project").disabled = true
  document.getElementById("labelProject").style = "display:block;"
  document.getElementById("loaderProject").style = "display:block;"
  document.getElementById("btn-footer").style = "display:none;"
  document.getElementById("btn-close-modal-project").style = "display:none;"

  document.getElementById("fieldsetSTD").disabled = true
  document.getElementById("fieldsetTCH").disabled = true


}



function showOnCompleUpload(){
  document.getElementById("ps-title").disabled = false
  document.getElementById("ps-resume").disabled = false
  document.getElementById("ps-resume").disabled = false
  document.getElementById("btn-std-table").disabled = false
  document.getElementById("btn-tch-table").disabled = false
  document.getElementById("codeStd").disabled = false
  document.getElementById("codeTch").disabled = false
  document.getElementById("letter-engagement").disabled = false
  document.getElementById("doc-project").disabled = false
  document.getElementById("labelProject").style = "display:none;"
  document.getElementById("loaderProject").style = "display:none;"
  document.getElementById("btn-footer").style = "display:block;"
  document.getElementById("btn-close-modal-project").style = "display:block;"
  document.getElementById("fieldsetSTD").disabled = false
  document.getElementById("fieldsetTCH").disabled = false
}