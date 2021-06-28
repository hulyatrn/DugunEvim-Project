function uyeKaydet() {
    var kadi = $("#kadi").val();
    if (kadi != "") {
        var userKey = firebase.database().ref("users/").push().key; //Rastgele bir userkey gönderir.
        firebase.database().ref("users/" + userKey).set({
            username: kadi,
            kulid: userKey
        });
        $("#girisEkrani").hide();
        $("#chatEkrani").show();
        chatYukle();
       
    } else {
        alert("Kullanıcı adını boş bırakmayınız!");
    }
}

function mesajGonder() {
    var mesaj = $("#mesaj").val();
    var kadi = $("#kadi").val();
    if (kadi != "" && mesaj != "") {
        var tarih = new Date();
        var messageKey = firebase.database().ref("chats/").push().key; 
        firebase.database().ref("chats/" + messageKey).set({
            message: mesaj,
            from: kadi,
            tarih: tarih.getTime()
        });
        $("#mesaj").val(''); 
    } else {
        alert("Lütfen boş alan bırakmayınız!");
    }
}

function chatYukle() {
    var query = firebase.database().ref("chats");
    var kadi = $("#kadi").val();
    query.on('value', function (snapshot) {
        $("#mesajAlani").html("");
        snapshot.forEach(function (childSnapshot) {
            var data = childSnapshot.val();
            if (data.from == kadi) {
                var mesaj = `<div class="d-flex justify-content-end">
                <div class="alert alert-info" role="alert">
                    `+ data.message + ` <b>@` + data.from + `</b>
                      </div>
                 </div>`;
                $("#mesajAlani").append(mesaj);
            } else {
                var mesaj = `<div class="d-flex">
                                    <div class="alert alert-dark" role="alert">
                                      <b>@`+ data.from + `</b> ` + data.message + `
                                  </div>
                           </div>`;
                $("#mesajAlani").append(mesaj);
            }
            $(".card-body").scrollTop($('.card-body')[0].scrollHeight - $('.card-body')[0].clientHeight);
        });
        
    });
}

