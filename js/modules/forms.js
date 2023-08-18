import site from './site';
export default function forms() {

  // modal
  
  const modal = document.querySelector('.modal');

  function openModal() {
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
  }
  
    const modalTrigger = document.querySelectorAll('[data-modal]');
  
    modalTrigger.forEach((btn) => {
      btn.addEventListener('click', () => {
        openModal();
      });
    });
  
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') === '') {
        closeModal();
      }
    });
  
    document.addEventListener('keydown', (e) => {
      if (e.code == 'Escape' && modal.classList.contains('show')) {
        closeModal();
      }
    });
  
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal();
  
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
  <div class='modal__content'>
    <div class="modal__close" data-close>&times;</div>
    <div class="modal__title">${message}</div>
  </div>
  `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }
  
// forms

  const forms = document.querySelectorAll('form');
  const message = {
    success: 'Спасибо! Данные отправлены успешно.',
    failure: 'Что-то пошло не так (',
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const postData = async (url, data) => {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        });
        if (!res.ok) {
          throw new Error(`ERROR POST fetch ${url} status ${res.status}`);
        }
        return await res.json();
      };

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData(site() + 'requests', json) //!!!
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          // statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
    });
  } // bindPostData
}
