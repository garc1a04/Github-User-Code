function themeButton() {
    $(".button-toggle").click(async function (e) {
        var name = $("#text").html().trim() == "LIGHT" ? "DARK" : "LIGHT" ;
        var icon = $("#img-icon").attr("src").split("/")[2] == "icon-sun.svg" ? "icon-moon.svg" : "icon-sun.svg";

        $("#text").html(name);
        $("#img-icon").attr("src", "./images/"+icon);
        $("body").toggleClass("theme-light");

        $.post("/theme", {
            data: name 
        });
    });
}

function imgTheme() {
    if($("#text").html() == "LIGHT") {
        $("#img-icon").attr("src", "./images/icon-sun.svg");
        return;
    }
    
    $("#img-icon").attr("src", "./images/icon-moon.svg");
}

function home() {
    $(".brand").click(async function (e) {
        window.location.href = "/";
    });
}

function buttonCustom() {
    $("button").mouseenter(function () { 
        $("button").addClass("background-button");
    });

   $("button").mouseleave(function () {
        $("button").removeClass("background-button");
   });
}

function forceReload() {
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            window.location.reload();
        }
    });
}

home();
imgTheme();
themeButton();
buttonCustom();
forceReload();