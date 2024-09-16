
let imageName = document.querySelector('#imageName');
let imageLink = document.querySelector('#ImageLink');
let body = document.querySelector('body');
let container = document.querySelector('.container');
body.appendChild(container);

async function addImage() {
  let url = `https://66e80437b17821a9d9daf9ba.mockapi.io/Images`;
  let nameImage = document.createElement('p');
  let card = document.createElement('div');
  let removeButton = document.createElement('button');
  removeButton.classList.add('removeButton');
  removeButton.innerText = 'Remove';

  card.classList.add('card');

  let imagePlaceHolder = document.createElement('img');
  imagePlaceHolder.src = imageLink;
  nameImage.innerText = imageName.value;
  card.append(nameImage);
  card.append(imagePlaceHolder);
  card.append(removeButton);
  container.append(card);

  let res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      imageName: imageName.value,
      imageLink: imageLink.value,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  let data = await res.json();
  console.log(data);
  imagePlaceHolder.src = data.imageLink;
  removeButton.setAttribute('onclick', `removeImage(${data.id})`);
    imageName.value = ""
  ImageLink.value = ""
}

async function fetchImages() {
  let url = `https://66e80437b17821a9d9daf9ba.mockapi.io/Images`;

  let res = await fetch(url);
  let data = await res.json();
  console.log(data);

  data.forEach((element) => {
    let card = document.createElement('div');
    let removeButton = document.createElement('button');
    removeButton.classList.add('removeButton');
    removeButton.innerText = 'Remove';
    removeButton.setAttribute('onclick', `removeImage(${element.id})`);

    card.classList.add('card');
    let imagePlaceHolder = document.createElement('img');
    imagePlaceHolder.src = element.imageLink;
    let nameImage = document.createElement('p');
    nameImage.innerText = element.imageName;

    card.append(nameImage);
    card.append(imagePlaceHolder);
    card.append(removeButton);
    container.append(card);
  });
}

async function removeImage(item) {
  let url = `https://66e80437b17821a9d9daf9ba.mockapi.io/Images`;

  const response = await fetch(`${url}/${item}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  });

  const data = await response.json();

  console.log(data);

  window.location.reload();
}

fetchImages();
