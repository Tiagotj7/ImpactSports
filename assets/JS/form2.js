function setupFormSubmission() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        // Configurar o formulário para usar FormSubmit
        contactForm.setAttribute('action', 'https://formsubmit.co/ajax/impactsportsbr@gmail.com');
        contactForm.setAttribute('method', 'POST');
        
        // Adicionar evento para capturar o envio do formulário
        contactForm.addEventListener('submit', function(e) {
            // Prevenir o comportamento padrão do formulário (recarregar a página)
            e.preventDefault();
            
            // Verificar se os campos estão preenchidos
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            
            if (!name || !email || !message) {
                showNotification('Por favor, preencha todos os campos.', 'error');
                return;
            }
            
            // Animação de carregamento no botão
            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.style.backgroundColor = '#004c8a';
            submitBtn.disabled = true;
            
            // Mostrar notificação de envio
            showNotification('Enviando mensagem para impactsportsbr@gmail.com...', 'info');
            
            // Coletar os dados do formulário
            const formData = new FormData(this);
            
            // Adicionar campos adicionais necessários para o FormSubmit
            formData.append('_subject', 'Nova mensagem do site NotaMil');
            formData.append('_captcha', 'false');
            
            // Enviar os dados via fetch API
            fetch('https://formsubmit.co/ajax/impactsportsbr@gmail.com', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao enviar o formulário');
                }
                return response.json();
            })
            .then(data => {
                // Mostrar notificação de sucesso
                showNotification('Mensagem enviada com sucesso!', 'success');
                
                // Limpar os campos do formulário
                contactForm.reset();
                
                // Restaurar o botão de envio
                submitBtn.textContent = originalBtnText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            })
            .catch(error => {
                // Mostrar notificação de erro
                showNotification('Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
                
                // Restaurar o botão de envio
                submitBtn.textContent = originalBtnText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
                
                console.error('Erro:', error);
            });
        });
    }
}
