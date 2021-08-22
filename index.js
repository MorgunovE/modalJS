let fruits = [
  {
    id: 1,
    title: 'Apple',
    price: 20,
    img: 'https://static9.depositphotos.com/1011549/1208/i/600/depositphotos_12089121-stock-photo-green-apple-with-leaf.jpg'
  },
  {
    id: 2,
    title: 'Orange',
    price: 30,
    img: 'http://riviste.newbusinessmedia.it/wp-content/uploads/sites/27/2013/12/Fotolia_11313277_M.jpg'
  },
  {
    id: 3,
    title: 'Mango',
    price: 40,
    img: 'https://st.depositphotos.com/3260227/4344/i/600/depositphotos_43441807-stock-photo-mango-fruit.jpg'
  },
]
const toHTML = fruit => `
  <div class="col">
    <div class="card" style="width: 18rem;">
      <img class="card-img-top"
           alt="${fruit.title}"
           src="${fruit.img}"
           style="height: 300px">
      <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <a class="btn btn-primary" href="#" data-btn="price" data-id="${fruit.id}">Show the price</a>
        <a class="btn btn-danger" href="#" data-btn="remove" data-id="${fruit.id}">Delete</a>
      </div>
    </div>
  </div>
`

function render() {
  // const html = fruits.map(fruit => toHTML(fruit))
  const html = fruits.map(toHTML).join('')
  document.querySelector('#fruits').innerHTML = html
}

render()

const priceModal = $.modal({
  title: 'Price for goods',
  closable: true,
  width: '400px',
  footerButtons: [
    {
      text: 'Close', type: 'primary', handler() {
        // console.log('Primary btn clicked')
        priceModal.close()
      }
    },
    // {
    //   text: 'Cancel', type: 'danger', handler() {
    //     // console.log('Danger btn clicked')
    //     priceModal.close()
    //   }
    // },
  ],
})
// const confirmModal = $.modal({
//   title: 'Are you sure ?',
//   closable: true,
//   width: '400px',
//   footerButtons: [
//     {
//       text: 'No', type: 'secondary', handler() {
//         // console.log('Primary btn clicked')
//         confirmModal.close()
//       }
//     },
//     {
//       text: 'Delete', type: 'danger', handler() {
//         // console.log('Danger btn clicked')
//         confirmModal.close()
//       }
//     },
//   ],
// })
document.addEventListener('click', event => {
  event.preventDefault()
  const btnType = event.target.dataset.btn
  const id = +event.target.dataset.id
  const fruit = fruits.find(f => f.id === id)
  
  if (btnType === 'price') {
    priceModal.setContent(`
      <p>Price for ${fruit.title}: <strong>${fruit.price}$</strong></p>
    `)
    // console.log('Clicked btn price')
    // console.log(fruit)
    priceModal.open()
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Are you sure ?',
      content: `
        <p>You are deliting: <strong>${fruit.title}</strong></p>
      `,
    }).then(() => {
      // console.log('Remove')
      fruits = fruits.filter(f => f.id !== id)
      render()
    }).catch(() => {
      console.log('Cancel')
    })
    // confirmModal.setContent(`
    //   <p>You are deliting: <strong>${fruit.title}</strong></p>
    // `)
    // confirmModal.open()
  }
})