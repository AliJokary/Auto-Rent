function createCarCard(car, endpoint) {
  return `
    <div class="car-card w-98 h-full bg-white rounded-2xl shadow-md"
         data-id="${car.id}"
         data-endpoint="${endpoint}">
      <div class="w-full h-48 bg-gray-200">
        <img src="${car.image}" alt="${car.title}" class="w-full h-full object-cover" />
      </div>

      <div class="p-4 space-y-2">
        <h2 class="text-lg font-bold text-gray-900">${car.title}</h2>
        <p class="text-sm text-gray-600">${car.car} مدل ${car.model}</p>

        <div class="mt-2 space-y-1 text-sm text-gray-700">
          <label>اجاره روزانه:</label>
          <input class="daily-input w-full border p-2 rounded" placeholder="${car.dailyPrice} تومان" />

          <label>اجاره ماهانه:</label>
          <input class="monthly-input w-full border p-2 rounded" placeholder="${car.monthlyPrice} تومان" />

          <label>ودیعه ضمانت:</label>
          <input class="deposit-input w-full border p-2 rounded" placeholder="${car.deposit} تومان" />
        </div>

        <button
          class="reserve-btn mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-bold transition"
          data-id="${car.id}"
        >
          درخواست رزرو
        </button>
      </div>
    </div>
  `;
  

}



fetch("http://localhost:3001/cars")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("car-list");
    list.innerHTML = "";
    data.forEach(car => {
      list.innerHTML += createCarCard(car, "cars");
    });
  });

fetch("http://localhost:3001/cars2")
  .then(res => res.json())
  .then(data => {
    const list2 = document.getElementById("car-list-2");
    list2.innerHTML = "";
    data.forEach(car => {
      list2.innerHTML += createCarCard(car, "cars2");
    });
  });


  

document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("reserve-btn")) return;

  const card = e.target.closest(".car-card");
  if (!card) return;

  const id = card.dataset.id;
  const endpoint = card.dataset.endpoint;

  if (!id || !endpoint) {
    console.error("❌ id یا endpoint خالیه");
    return;
  }

  const daily = card.querySelector(".daily-input").value;
  const monthly = card.querySelector(".monthly-input").value;
  const deposit = card.querySelector(".deposit-input").value;

  if (!daily || !monthly || !deposit) {
    alert("لطفاً همه قیمت‌ها را وارد کنید");
    return;
  }

  const url = `http://localhost:3001/${endpoint}/${id}`;
  console.log("🔗 PATCH URL:", url);

  fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      dailyPrice: Number(daily),
      monthlyPrice: Number(monthly),
      deposit: Number(deposit)
    })
  })
    .then(res => {
      if (!res.ok) throw new Error("ماشین پیدا نشد");
      return res.json();
    })
    .then(updated => {
      alert("✅ قیمت ثبت شد");
      console.log("Updated car:", updated);
    })
    .catch(err => {
      console.error("❌ خطا:", err);
      alert("❌ خطا در ثبت قیمت");
    });
});
console.log("CAR:", car);
console.log("HTML:", createCarCard(car, "cars"));
