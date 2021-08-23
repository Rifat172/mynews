$(document).ready(function(){
  $('#Jesse').on('click', function(e){
    console.log("кнопка нажата");
    ajaxAndPrint("Jesse");
  });

  $('#Walter').on('click', function(e){
    console.log("кнопка нажата");
    ajaxAndPrint("Walter");
  });

  $('#Skyler').on('click', function(e){
    ajaxAndPrint("Skyler");
  });

  function ajaxAndPrint(id)
  {
    $.ajax({
      url: "server.php",
      datatype: "json",
      type: "get",
      data: { // ... данные которые отправляем на сервер (например id нажатой ссылки)
         'id': id
      },
      success: function (data) {
        let array = JSON.parse(data);
        let divInPage = 3;
        let countOfPages = Math.floor(array.length / divInPage);
        let restDiv = array.length - countOfPages * divInPage;
        let newsteg = document.getElementById("news");
        newsteg.innerHTML = "";

        if(restDiv!=0){
          countOfPages++;
        }

        if(array.length <= divInPage){
          print(0, array.length, array, newsteg);
        }
        else{
          console.log(countOfPages);
          clickButton(1, divInPage, countOfPages, array, newsteg);
          // print(0, divInPage, array, newsteg);
          // printButton(btn, divInPage, countOfPages, array, newsteg);
        }
      }
    });
  }

  function clickButton(currentData, divInPage, countOfPages, array, newsteg){
    console.log(currentData);
    console.log(array.length);
    console.log(countOfPages);
    let index = currentData - 1;
    let to = index * divInPage + divInPage;
    if(currentData == countOfPages)
    {
      to = array.length;
    }
    print(index * divInPage, to, array, newsteg);
    printButton(currentData, divInPage, countOfPages, array, newsteg);

    window.scrollTo(0,0);
  }

  // function clickButton(currentData, ){
  //   let index = button.data - 1;
  //   let to = index * divInPage + divInPage;
  //   if(button.data == countOfPages)
  //   {
  //     to = array.length;
  //   }
  //   print(index * divInPage, to, array, newsteg);
  //   printButton(button.data, divInPage, countOfPages, array, newsteg);
  //   window.scrollTo(0,0);
  // }

  function createButton(i, currentData, divInPage, countOfPages, array, newsteg)
  {
    let button = document.createElement("button");
    button.data = i+1;
    button.innerHTML = button.data;
    button.className = "button1"
    button.style.backgroundColor = "rgb(255,255,255)";
    if(button.data==currentData){
      button.style.backgroundColor = "rgb(0, 0, 0)";
      button.style.color = "rgb(255,255,255)";
    }

    button.onclick = function(){
      clickButton(button.data, divInPage, countOfPages, array, newsteg);
    }
    newsteg.appendChild(button);
  }

  function printButton(currentData, divInPage, countOfPages, array, newsteg){

    let index = currentData - 1;
    let to = index + 3;

    if(countOfPages<=4){
      index = 0;
      to = countOfPages;
    }else{
      if(index>0){
        index-=1;
        to-=1;
      }
      if(to>countOfPages){
        index-=1;
        to-=1;
      }
      if(currentData != 1 && currentData - 1 > 1){
        createButton(0, currentData, divInPage, countOfPages, array, newsteg);
        // create_empty_button(newsteg);
        if(currentData>3){
          createEmptyButton(newsteg);
        }
      }
    }

    for (var i = index; i < to; i++) {
      createButton(i, currentData, divInPage, countOfPages, array, newsteg);
    }

    if(countOfPages>4){
      console.log(countOfPages + " строка 141");
      console.log(currentData);
      console.log(countOfPages);
      console.log(currentData+1);
      console.log(currentData!=countOfPages&&currentData+1<countOfPages);
      if(currentData!=countOfPages&&currentData+1<countOfPages){
        createEmptyButton(newsteg);
        createButton(countOfPages-1, currentData, divInPage, countOfPages, array, newsteg);
      }
    }
  }

  function createEmptyButton(newsteg){
    console.log("createEmptyButton");
    let button = document.createElement("button");
    button.innerHTML = "...";
    button.className = "button1"
    button.style.backgroundColor = "rgb(255,255,255)";
    newsteg.appendChild(button);
  }

  function print(from, to, array, newsteg){
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
});
