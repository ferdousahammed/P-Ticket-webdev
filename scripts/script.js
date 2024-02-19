function getInnerTextById(id) {
  return document.getElementById(id).innerText;
}
function setInnerTextById(id, innerText) {
  document.getElementById(id).innerText = innerText;
}

const passengerPhone = document.getElementById("passenger-phone");
const seats = document.getElementsByClassName("seat-no");
let seatList = [];
for (const seat of seats) {
  seat.addEventListener("click", () => {
    const seatNo = seat.innerText;
    let bookedSeatsCount = parseInt(getInnerTextById("booked-count"));
    seatList = getBookedSeatList();
    if (!seatList.includes(seatNo)) {
      if (bookedSeatsCount < 4) {
        bookedSeatsCount += 1;
        seat.classList.remove("bg-stone-50");
        seat.classList.add("bg-green-main", "text-white", "booked");
        appendSeatsList(seatNo);
      } else {
        alert("Sorry! You can book only 4 seats at a time.");
        disableSeats(seatList, seats);
      }

      if (bookedSeatsCount === 4) {
        const applyBtn = document.getElementById("apply-btn");
        applyBtn.removeAttribute("disabled");
      }
      if (bookedSeatsCount && passengerPhone.value > 0) {
        const nextBtn = document.getElementById("next-btn");
        nextBtn.removeAttribute("disabled");
      }
    }
    setInnerTextById("booked-count", bookedSeatsCount);
    setInnerTextById("seats-left", 40 - bookedSeatsCount);
    const totalPrice = 550 * bookedSeatsCount;
    setInnerTextById("total-price", totalPrice);
    setInnerTextById("grand-total", totalPrice);
  });
}

passengerPhone.addEventListener("keyup", () => {
  let bookedSeatsCount = parseInt(getInnerTextById("booked-count"));
  if (bookedSeatsCount && passengerPhone.value.length > 0) {
    const nextBtn = document.getElementById("next-btn");
    nextBtn.removeAttribute("disabled");
  }
});

function handleCouponSubmit() {
  const submittedCode = document.getElementById("coupon-code").value;
  const applyBtn = document.getElementById("apply-btn");
  const bookedSeats = parseInt(getInnerTextById("booked-count"));
  const couponBoxElement = document.getElementById("coupon-box");
  const discountBoxElement = document.getElementById("discount-box");
  if (bookedSeats === 4) {
    let percentValue = 0;
    if (submittedCode === "NEW15") {
      percentValue = 0.15;
      applyBtn.setAttribute("disabled", "");
      couponBoxElement.classList.add("hidden");
      discountBoxElement.classList.remove("hidden");
    } else if (submittedCode === "Couple 20") {
      percentValue = 0.2;
      applyBtn.setAttribute("disabled", "");
      couponBoxElement.classList.add("hidden");
      discountBoxElement.classList.remove("hidden");
    } else {
      alert("Enter Valid Coupon");
    }
    const discount = percentValue * parseInt(getInnerTextById("total-price"));
    const totalPrice = parseInt(getInnerTextById("total-price"));
    const grandTotalPrice = totalPrice - discount;
    setInnerTextById("grand-total", grandTotalPrice);
    setInnerTextById("discount", discount);
    document.getElementById("coupon-code").value = "";
  } else {
    alert("You need to book 4 seats");
  }
}

function appendSeatsList(seatNo) {
  const seatListElement = document.getElementById("seat-lists");
  const div = document.createElement("li");
  div.classList.add("flex", "justify-between");
  div.innerHTML = `  <p
                      class="text-gray-950 text-opacity-60 w-[50%] font-inter font-medium text-base"
                    >
                      ${seatNo}
                    </p>
                    <p
                      class="text-gray-950 text-opacity-60 w-1/3 font-inter font-medium text-base"
                    >
                      Economy
                    </p>
                    <p
                      class="text-gray-950 text-opacity-60 w-1/3 font-inter text-end font-medium text-base"
                    >
                      550
                    </p>`;
  seatListElement.appendChild(div);
}

function nextClick() {
  const passengerName = document.getElementById("passenger-name");
  const passengerPhone = document.getElementById("passenger-phone");
  const passengerEmail = document.getElementById("passenger-email");
  const nextBtn = document.getElementById("next-btn");
  const couponBoxElement = document.getElementById("coupon-box");
  const discountBoxElement = document.getElementById("discount-box");
  if (
    typeof passengerName.value === "string" &&
    passengerName.value.length > 0 &&
    passengerPhone.value.length > 0
  ) {
    const bookedElement = document.querySelectorAll(".booked");
    for (const booked of bookedElement) {
      booked.classList.remove("bg-green-main", "text-white", "booked");
      booked.classList.add("bg-stone-50");
    }
    const seatListElement = document.getElementById("seat-lists");
    seatListElement.innerHTML = "";
    passengerEmail.value = "";
    passengerName.value = "";
    passengerPhone.value = "";
    setInnerTextById("total-price", 0);
    setInnerTextById("grand-total", 0);
    setInnerTextById("seats-left", 40);
    setInnerTextById("booked-count", 0);
    nextBtn.setAttribute("disabled", "");
    couponBoxElement.classList.remove("hidden");
    discountBoxElement.classList.add("hidden");
    enableSeats(getBookedSeatList(), seats);
  } else {
    alert("Enter valid information");
  }
}

function disableSeats(seatList, seats) {
  for (const seat of seats) {
    if (!seatList.includes(seat.innerText)) {
      seat.setAttribute("disabled", "");
    }
  }
}

function enableSeats(seatList, seats) {
  for (const seat of seats) {
    if (!seatList.includes(seat.innerText)) {
      seat.removeAttribute("disabled");
    }
  }
}

function getBookedSeatList() {
  const seatList = [];
  const seatListElement = document.querySelectorAll(".booked");
  seatListElement.forEach((element) => {
    seatList.push(element.innerText);
  });
  return seatList;
}
