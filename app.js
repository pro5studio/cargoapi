document.addEventListener("DOMContentLoaded", () => {
  const PROXY_URL = "http://localhost:3000/proxy"; // Localhost üzerinden proxy endpoint'i

  let kargoListesi = JSON.parse(localStorage.getItem("kargoListesi")) || [];

  let kargolardiv = document.querySelector(".kargolardiv");

  const add = document.getElementById("add");
  const getir = document.getElementById("getir");
  const form = document.getElementById("form");
  const input = document.getElementById("trackingIdInput");
  const netice = document.getElementById("netice");

  add.addEventListener("click", function () {
    getir.classList.toggle("acik");
    if (getir.classList.contains("acik")) {
      add.classList.add("kapali");
    } else {
      add.classList.remove("kapali");
    }
  });

  form.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${PROXY_URL}?id=${input.value}&language=tr`
      );
      let data = response.data;
      //doldur(data); // Dataları doldur fonksiyonu ile işle

      // Kargo listesine ekle
      kargoListesi.push(data);
      localStorage.setItem("kargoListesi", JSON.stringify(kargoListesi));

      // HTML'de göster
      renderKargoListesi();
    } catch (error) {
      console.error("Veri alınırken hata oluştu:", error);
      netice.innerHTML = errorMasseg;
    }
  });

  // Sayfa yüklendiğinde localStorage'tan veri al
  renderKargoListesi();

  function renderKargoListesi() {
    kargolardiv.innerHTML = ""; // Önceki listeyi temizle

    kargoListesi.forEach((kargo) => {
      kargolardiv.insertAdjacentHTML(
        "beforeend",
        `
        <div class="kargodiv">
            <div class="kargoimg">
                <img src="./img/yurtici-kargo-vector-logo.png" alt="" style="width:100px">
            </div>
          <div class="kargotitle">
            <p id="kargono">رقم الشحنة : ${kargo.Id}</p>
          </div>
          <hr>
          <div class="gonderendetay">
          <div class="alicidiv"><p>المستقبل :${kargo.Receiver}</p></div>
          <hr>
            <div class="gonderendiv"><p>المرسل : ${kargo.Sender}</p></div>
          </div>
          <hr>
          <div class="kargodetay">
            <p>اسم الشعبة : ${kargo.DeliveryUnitName}</p>
            رقم الشعبة : <a href="tel:${kargo.DeliveryUnitTel}">${kargo.DeliveryUnitTel}</a>
            <hr>
            <p>حالة الشحنة : ${kargo.ShipmentStatus}</p>
            <p>تاريخ التسليم : ${kargo.EstimatedDeliveryDate}</p>
          </div>
        </div>
        <hr class="hr">
      `
      );
    });
  }
});
