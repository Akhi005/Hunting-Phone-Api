const loadphone = async (searchText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
  const data = await res.json();
  display((data.data), isShowAll);
}
const display = (phones, isShowAll) => {
  const con = document.getElementById('phone-container');
  con.textContent = ' ';
  const showAll = document.getElementById('show-all');
  // console.log(phones.length)
  if (phones.length > 12 && !isShowAll) {
    showAll.classList.remove('hidden');
  }
  else showAll.classList.add('hidden');
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach(phone => {
    const card = document.createElement('div');
    card.classList = `card w-96 bg-base-100 shadow-xl`;
    card.innerHTML = `
             <figure><img src="${phone.image}" /></figure>
             <div class="card-body">
               <h2 class="card-title">${phone.phone_name}</h2>
               <p>${phone.brand}</p>
               <div class="card-actions justify-center">
                 <button class="btn btn-primary" 
                 onclick="handleDetails('${phone.slug}');my_modal_1.showModal()">Show details</button>
               </div>
             </div>
             `;
    con.appendChild(card);
  });
  toggleSpinner(false);
}
const handleDetails = async (id) => {
  const r = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const d = await r.json();
  const phone = d.data;
 console.log(phone);
  const phoneName = document.getElementById('show-phone-name');
  phoneName.innerText=phone.name;
  const showDetailsContainer = document.getElementById('show-details-container');
  showDetailsContainer.innerHTML=` <img src="${phone.image}"> 
   <div>
      <h3><span>Name : </span>${phone.name}</h3>
      <h3><span>Brand : </span>${phone.brand}</h3>
      <h3><span>displaySize : </span>${phone?.mainFeatures?.displaySize}</h3>
    </div>
  `;
  phoneName.appendChild(showDetailsContainer);
}
const toggleSpinner = (isloading) => {
  const s = document.getElementById('toggleSpinner');
  if (isloading)
    s.classList.remove('hidden');
  else s.classList.add('hidden');
}
const input = (isShowAll) => {
  toggleSpinner(true);
  const yy = document.getElementById('search-field');
  const search = yy.value;
  loadphone(search, isShowAll);
}
const clickedShow = () => {
  input(true);
}
// loadphone();