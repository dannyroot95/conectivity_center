
var dni = document.getElementById('dni')
var fullname = document.getElementById('fullname')

dni.addEventListener('input', updateValue);
function updateValue(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '').toLowerCase()
    var value = e.srcElement.value
    if(value.length == 8){
	
		  var myHeaders = new Headers();
		  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjEzLCJjb3JyZW8iOiJqb3N2YWxpZGtAZ21haWwuY29tIiwiaWF0IjoxNjU4NTg3NDA1fQ.hogcA2JQBiYFZhorjQQxtCvHBX0jvVcNjznsvqSffC8");
		  myHeaders.append("Content-Type", "application/json");
			doCORSRequest({
				method: 'GET',
				url: 'https://solarled.com.pe/dni.php?dni=' + value,
				data: "",
				'Content-Type': 'application/json',
			  }, function printResult(result) {
				var data = JSON.parse(result)
                fullname.value = data.nombre
			  });
       
    }else{
       fullname.value = ""
    }
}

dni.addEventListener('input', updateValue);
function updateValue(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '').toLowerCase()
    var value = e.srcElement.value
    if(value.length == 8){
	    dni.disabled = true
		  fetch('/dashboard/assets/js/utils/controllerDNI.php'+"?dni="+value)
      .then(response => {responseClone = response.clone(); // 2
      return response.json();})
      .then(data => {
      
        dni.disabled = false
        fullname.value = data.nombre

      }, function (rejectionReason) { // 3
        console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
        responseClone.text() // 5
        .then(function (bodyText) {
            if(bodyText == "Not found"){
            dni.disabled = false
            fullname.value = ""
            console.log('Received the following instead of valid JSON:', bodyText); // 6
            Swal.fire(
                      'Oops!',
                      'Sin resultados!',
                      'info'
                    )
            }else{
            dni.disabled = false
            fullname.value = ""
            console.log('Received the following instead of valid JSON:', bodyText); // 6
            Swal.fire(
                      'Oops!',
                      'Intentelo nuevamente!',
                      'info'
                    )
            }
        });
    });
       
    }else{
       fullname.value = ""
    }
}


var cors_api_url = "https://api.codetabs.com/v1/proxy/?quest=";

function doCORSRequest(options, printResult) {
  var x = new XMLHttpRequest();
  x.open(options.method, cors_api_url + options.url);
  x.onload = x.onerror = function () {
    const result = printResult(x.responseText || "");
 
    return result;
  };
  if (/^POST/i.test(options.method)) {
    x.setRequestHeader("Content-Type", "application/json");
  }
  x.send(options.data);
}


