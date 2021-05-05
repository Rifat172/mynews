$(document).ready(function(){
  $('#Jesse').on('click', function(e){
    AjaxAndPrint("Jesse");
  });

  $('#Walter').on('click', function(e){
    AjaxAndPrint("Walter");
  });

  $('#Skyler').on('click', function(e){
    AjaxAndPrint("Skyler");
  });

  function PrintButton(divInPage, countOfPages, array, newsteg)
  {
    for (var i = 0; i < countOfPages; i++) {
      let button = document.createElement("button");
      button.data = i+1;
      button.innerHTML = button.data;
      button.className = "button1"
      button.onclick = function(){
        let index = button.data - 1;
        Print(index * divInPage, index * divInPage + divInPage, array, newsteg);
      }
      newsteg.appendChild(button);
    }
  }

  function Print(from, to, array, newsteg){
    newsteg.innerHTML="";
    for (var i = from; i < to; i++) {
      let div = document.createElement("div");
      div.className="content";
      // div.innerHTML = "Some text with <b>bold text</b>";
      newsteg.appendChild(div);
      let h = document.createElement("h1");
      h.className="name";
      h.innerHTML=array[i].author;
      div.appendChild(h);
      let p = document.createElement("p");
      p.className="content1";
      p.innerHTML=array[i].quote;
      div.appendChild(p);
    }
  }

  function AjaxAndPrint(id)
  {
    $.ajax({
      url: "server.php",
      datatype: "json",
      type: "POST",
      data: { // ... данные которые отправляем на сервер (например id нажатой ссылки)
         'id': id
      },
      success: function (data) {
        let array = JSON.parse(data);
        let divInPage = 6;
        let countOfPages = Math.floor(array.length / divInPage);
        let newsteg = document.getElementById("news");
        newsteg.innerHTML = "";

        if(array.length < divInPage){
          Print(0, array.length, array, newsteg);
        }
        else{
          Print(0, divInPage, array, newsteg);
          PrintButton(divInPage, countOfPages, array, newsteg)
        }
      }
    });
  }
});
