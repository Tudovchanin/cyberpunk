
document.addEventListener("DOMContentLoaded", function() {
  const $containerFile = document.getElementById('container-file');
const $formScreenshot = document.getElementById('form-screenshot');
const $file = document.getElementById('file');
const $labelFile = document.getElementById('label-file');
const $formatsFile = document.getElementById('file-formats');
const $btnFormScreenshot = document.getElementById('btn-form-screenshot');

const success = document.createElement('div');
const cancel = document.createElement('div');
const containerScreenshot = document.createElement('div');
const screenshot = document.createElement('img');

const validationScreenshot = (file) => {
  const validationExtension = ['png', 'pdf', 'jpg'];
  const extension = file.split('.').at(-1);

  if (!validationExtension.includes(extension)) {
    console.error('Не поддерживаемый формат');
    return false;
  }
  return true;
};

const colorError = (...elements) => {
  elements.forEach(element => {
    element.classList.add('error')
  });
};

const destroyColorError = (...elements) => {
  elements.forEach(element => {
    element.classList.remove('error')
  });
};




$btnFormScreenshot.addEventListener('click', () => {
  if (!$file.value) {
    colorError($labelFile);
  } else {
    destroyColorError($labelFile);
  }
});

$file.addEventListener('change', (e) => {

  const file = e.target.files[0]; // Получаем загруженный файл
  destroyColorError($labelFile);

  if (!file || !validationScreenshot(e.target.value)) {
    colorError($formatsFile);
    return;
  }
  
  destroyColorError($formatsFile);
  $labelFile.classList.add('hidden');
  $formatsFile.classList.add('hidden');

  const reader = new FileReader();
  reader.readAsDataURL(file); // Читаем файл как Data URL

  reader.onload = function(event) {
    // Устанавливаем источник для элемента img
    screenshot.src = event.target.result;
    containerScreenshot.append(screenshot);
    containerScreenshot.classList.add('container-screenshot');
    $containerFile.append(containerScreenshot);

    success.textContent = 'Скриншот загружен';
    success.classList.add('success');
    $containerFile.append(success);

    cancel.textContent = 'Отмена';
    cancel.classList.add('cancel');
    $containerFile.append(cancel);
  };
});

cancel.addEventListener('click', (e) => {

  $file.value = '';

  const success = document.querySelector('.success');
  const cancel = document.querySelector('.cancel');

  success.remove();
  cancel.remove();
  containerScreenshot.remove();

  $labelFile.classList.remove('hidden');
  $formatsFile.classList.remove('hidden');
});

});