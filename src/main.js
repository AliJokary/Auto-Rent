function createCarCard(car, endpoint) {
  return `
    <div class="car-card w-98 h-full bg-[#ffffff] rounded-2xl shadow-md"
         data-id="${car.id}"
         data-endpoint="${endpoint}">
      <div class="w-87.5 h-56.25 bg-amber-400 m-auto rounded-lg relative">
        <img 
          src="${car.image}" 
          alt="${car.title}" 
          class="w-87.5 h-56.25 m-auto object-cover rounded-lg mt-2 relative border border-[#f1f1f1]"/>
        ${
          car.offer
            ? `<p class="text-sm text-white font-black absolute top-0.5 left-1 w-8 h-7.25 bg-[#08237D] flex justify-center items-center rounded-lg">
                ${car.offer}
               </p>`
            : ""
        }
      </div>
      <div class="p-4 space-y-2">
        <div class="w-90 h-13 flex justify-between flex-col">
          <h2 class="text-[16px] w-full h-5.5 font-bold text-[#0C0C0C] flex items-center">
            ${car.title}
          </h2>
          <p class="text-[12px] w-full h-5.5 font-extralight text-[#494949] flex items-center">
            مدل ${car.model}
          </p>
        </div>
        <div class="mt-2 space-y-1 text-sm text-gray-700">
          <!-- Daily Price -->
          <div class="w-90 h-11 bg-[#F3F3F3] flex justify-between items-center rounded-lg p-2 mb-2">
            <p class="text-[12px] font-bold text-[#212121] mr-1">از ۱ تا ۳۰ روز:</p>
            <div>
              <input 
                class="daily-input w-62 h-7 p-2 rounded focus:outline-none focus:ring-0 focus:border-transparent border-transparent" 
                placeholder="قیمت را وارد کنید" />
            </div>
            <p class="text-[12px] font-bold text-[#212121]">روزانه</p>
          </div>
          <!-- Monthly Price -->
          <div class="w-90 h-11 bg-[#F3F3F3] flex justify-between items-center rounded-lg p-2 mb-2">
            <p class="text-[12px] font-bold text-[#212121] mr-1">از ۱ تا ۳۰ روز:</p>
            <div>
              <input 
                class="monthly-input w-62 h-7 p-2 rounded focus:outline-none focus:ring-0 focus:border-transparent border-transparent" 
                placeholder="قیمت را وارد کنید" />
            </div>
            <p class="text-[12px] font-bold text-[#212121]">ماهانه</p>
          </div>
          <hr style="color: #D7D7D7;">
          <div class="w-89.5 h-5.25 flex justify-between mt-2">
            <p class="text-[12px] font-bold text-[#212121]">مبلغ ضمانت:</p>
            <p class="text-[12px] font-bold text-[#212121]">۸۰ میلیون تومان</p>
          </div>
        </div>
        <button
          class="reserve-btn w-90 h-10 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-bold transition cursor-pointer"
          data-id="${car.id}"
          data-endpoint="${endpoint}">
          درخواست رزرو
        </button>
      </div>
    </div>
  `;
}

fetch("http://localhost:3001/cars")
  .then((res) => res.json())
  .then((data) => {
    const list = document.getElementById("car-list");
    list.innerHTML = "";
    data.forEach((car) => {
      list.innerHTML += createCarCard(car, "cars");
    });
  });

fetch("http://localhost:3001/cars2")
  .then((res) => res.json())
  .then((data) => {
    const list2 = document.getElementById("car-list-2");
    list2.innerHTML = "";
    data.forEach((car) => {
      list2.innerHTML += createCarCard(car, "cars2");
    });
  });



document.addEventListener("click", (e) => {
  const btn = e.target.closest(".reserve-btn");
  if (!btn) return;

  const card = btn.closest(".car-card");
  if (!card) return;

  const id = card.dataset.id?.trim();
  const endpoint = card.dataset.endpoint?.trim();

  if (!id || !endpoint) {
    console.error("id یا endpoint پیدا نشد");
    return;
  }

  const dailyInput = card.querySelector(".daily-input");
  const monthlyInput = card.querySelector(".monthly-input");

  const daily = dailyInput.value.trim();
  const monthly = monthlyInput.value.trim();

  if (!daily || !monthly || isNaN(daily) || isNaN(monthly)) {
    alert("لطفا قیمت‌ها را به صورت عددی وارد کنید");
    return;
  }

  const url = `http://localhost:3001/${endpoint}/${id}`;
  console.log("PATCH URL:", url);

  fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      dailyPrice: Number(daily),
      monthlyPrice: Number(monthly),
    }),
  })
    .then(() => {
      alert("ثبت شد");
      dailyInput.value = "";
      monthlyInput.value = "";
    })
    .catch((err) => console.error("خطا:", err));
});
