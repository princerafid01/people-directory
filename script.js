import FILE from './info.json';

const infos = FILE; // Main array data
console.log(infos);
const numberPerPage = 4; // page per items
let currentPage = window.location.pathname.split('/')[1]; // Current page number
let currentInfo = []; // currently loaded information

// selecting dom elements
const row = document.querySelector('.row');
const nextFour = document.querySelector('.next_four');
const firstPage = document.querySelector('.first_page');
const reload = document.querySelector('.reload');
const lazy = document.querySelector('.lazy');
const quick = document.querySelector('.quick');

function generateHtml(info) {
  const html = `
    <div class="col-md-3 p-0 py-3">
        <div class="card">
          <div class="card-body">
            ${info.name}
            <button type="button" class="float-right btn btn-primary  more" data-toggle="modal" data-target="#modal${
              info.hash
            }">More</button>
          </div>
          <div class="card-footer">
            ${info.address ? info.address : '  </br>'}
          </div>
        </div>
      </div>


  <div class="modal fade" id="modal${
    info.hash
  }" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">ID: ${info.id} Hash: ${info.hash}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>
        ${
          info.number
            ? `
          <i class="fa fa-phone"></i>
          <span class="sudo_number">Click here to view</span>
          <span class="main_number d-none">${info.number} </span>`
            : ''
        }
        </p>
        <p>
        ${
          info.email
            ? `<i class="fa fa-envelope"></i>
          <span class="sudo_email">Click here to view</span>
          <span class="main_email d-none">${info.email} </span>`
            : ''
        }
        </p>
      </div>
    </div>
  </div>
</div>
    `;
  return html;
}

function navigateNextFourItems(e) {
  e.preventDefault();
  const url = parseInt(currentPage) + numberPerPage;
  window.location.href = currentPage
    ? `${window.location.origin}/${url}`
    : `/${numberPerPage}`;
}

function firstPageItems(e) {
  e.preventDefault();
  window.location.href = `${window.location.origin}`;
}

// rendering function
function renderPage() {
  if (currentPage === '') {
    currentInfo = infos.slice(0, numberPerPage);
  } else if (isNaN(parseInt(currentPage))) {
    currentInfo = [];
  } else {
    currentInfo = infos.slice(
      currentPage,
      parseInt(currentPage) + numberPerPage
    );
  }
  const htmlNew = currentInfo.map(generateHtml).join('');
  row.innerHTML += htmlNew;
  document.querySelector('.spin_wrapper').classList.add('invisible');
  const sudoNumber = document.querySelectorAll('.sudo_number');
  const sudoEmail = document.querySelectorAll('.sudo_email');

  sudoNumber.forEach(number => {
    number.addEventListener('click', function() {
      this.classList.add('d-none');
      this.nextElementSibling.classList.remove('d-none');
    });
  });
  sudoEmail.forEach(mail => {
    mail.addEventListener('click', function() {
      this.classList.add('d-none');
      this.nextElementSibling.classList.remove('d-none');
    });
  });
}

function loadItems(e, timeOut) {
  e.preventDefault();
  document.querySelector('.spin_wrapper').classList.remove('invisible');
  document.querySelector('.spin_wrapper').classList.add('visible');
  currentPage =
    currentPage === '' ? 4 : parseInt(currentPage) + parseInt(numberPerPage);
  console.log(currentPage);
  setTimeout(() => {
    document.querySelector('.spin_wrapper').classList.remove('visible');
    document.querySelector('.spin_wrapper').classList.add('invisible');
    row.appendChild(renderPage());
  }, timeOut);
}

// rendering page with data
renderPage();

// listening for events
nextFour.addEventListener('click', navigateNextFourItems);
firstPage.addEventListener('click', firstPageItems);
reload.addEventListener('click', () => window.location.reload());
lazy.addEventListener('click', e => loadItems(e, 2500));
quick.addEventListener('click', e => loadItems(e, 500));
