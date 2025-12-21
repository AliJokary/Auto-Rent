function createCarCard(car) {
  return `
    <div class="w-98 h-full bg-white rounded-2xl shadow-md">
      
      <!-- تصویر -->
      <div class="w-full h-48 bg-gray-200">
        <img
          src="${car.image}"
          alt="${car.title}"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- متن -->
      <div class="p-4 space-y-2">
        <h2 class="text-lg font-bold text-gray-900">${car.title}</h2>

        <p class="text-sm text-gray-600">
          ${car.car} مدل ${car.model}
        </p>

        <div class="mt-2 space-y-1 text-sm text-gray-700">
          <p><span class="font-semibold">اجاره روزانه:</span> ${car.dailyPrice.toLocaleString()} تومان</p>
          <p><span class="font-semibold">اجاره ماهانه:</span> ${car.monthlyPrice.toLocaleString()} تومان</p>
          <p><span class="font-semibold">مبلغ ضمانت:</span> ${car.deposit.toLocaleString()} تومان</p>
        </div>

        <button
          class="mt-3 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-bold transition">
          درخواست رزرو
          <img src="/img/arrow-left.png" class="w-4 h-4" />
        </button>
      </div>
    </div>
  `;
}

fetch("http://localhost:3001/cars")
  .then(res => res.json())
  .then(data => {
    document.getElementById("car-list").innerHTML = "";
    data.forEach(car => {
      document.getElementById("car-list").innerHTML += createCarCard(car);
    });
  });

fetch("http://localhost:3001/cars2")
  .then(res => res.json())
  .then(data => {
    document.getElementById("car-list-2").innerHTML = "";
    data.forEach(car => {
      document.getElementById("car-list-2").innerHTML += createCarCard(car);
    });
  });





