// Mendapatkan elemen-elemen yang diperlukan  
const chatbotToggle = document.getElementById('chatbot-toggle');  
const chatbotWindow = document.getElementById('chatbot-window');  
const sendMessageButton = document.getElementById('send-message');  
const userInput = document.getElementById('user-input');  
const chatbotMessages = document.getElementById('chatbot-messages');  
const chatbotCloseButton = document.getElementById('chatbot-close');  

// Menampilkan atau menyembunyikan jendela chatbot  
chatbotToggle.addEventListener('click', () => {  
    chatbotWindow.style.display = chatbotWindow.style.display === 'none' ? 'flex' : 'none';  
    if (chatbotWindow.style.display === 'flex') {  
        showTemplateQuestions(); // Menampilkan template pertanyaan saat chatbot dibuka  
    }  
});  

// Menutup jendela chatbot  
chatbotCloseButton.addEventListener('click', () => {  
    chatbotWindow.style.display = 'none';  
});  

// Fungsi untuk menambahkan pesan ke jendela chatbot  
function addMessage(message, isUser) {  
    const messageDiv = document.createElement('div');  
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;  
    messageDiv.innerHTML = `<p>${message}</p>`;  
    chatbotMessages.appendChild(messageDiv);  
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll ke bawah  
}  

// Fungsi untuk memberikan respons chatbot  
function getBotResponse(userMessage) {  
    // Objek respons dengan pertanyaan dalam huruf kecil untuk pencocokan yang tidak sensitif huruf  
    const responses = {  
        "apa itu fti umby?": "FTI UMBY (Fakultas Teknologi Informasi Universitas Mercu Buana Yogyakarta) adalah sebuah fakultas yang fokus pada pengembangan teknologi informasi dan sistem informasi.",  
        
        "di mana lokasi fti umby?": "FTI UMBY berlokasi di Jl. Jembatan Merah, No. 84.C, Gejayan, Yogyakarta 55283. Tepatnya berada di kampus II Universitas Mercu Buana Yogyakarta.",  
        
        "apa visi dan misi fti umby?": "Visi: Menjadi fakultas unggul dalam bidang teknologi informasi yang menghasilkan lulusan kompeten dan berdaya saing global.\n\nMisi:\n1. Menyelenggarakan pendidikan berkualitas di bidang teknologi informasi\n2. Mengembangkan penelitian dan pengabdian masyarakat\n3. Menghasilkan lulusan yang profesional dan inovatif",  
        
        "program studi apa saja yang ada di fti umby?": "FTI UMBY memiliki beberapa program studi:\n1. Teknik Informatika\n2. Sistem Informasi\n3. Desain Komunikasi Visual",  
        
        "bagaimana cara mendaftar di fti umby?": "Cara mendaftar di FTI UMBY:\n1. Kunjungi website resmi UMBY\n2. Pilih menu pendaftaran\n3. Pilih program studi yang diinginkan\n4. Lengkapi formulir pendaftaran\n5. Ikuti tes masuk dan wawancara",  
        
        "apa saja fasilitas yang ada di fti umby?": "Fasilitas FTI UMBY meliputi:\n1. Laboratorium komputer modern\n2. Ruang kelas ber-AC\n3. Perpustakaan digital\n4. Akses internet cepat\n5. Ruang praktikum multimedia\n6. Area diskusi dan studi",  
        
        "siapa dosen di fti umby?": "Dosen FTI UMBY terdiri dari para ahli di bidang teknologi informasi dengan kualifikasi S2 dan S3 dari berbagai perguruan tinggi ternama. Mereka memiliki pengalaman praktis di industri teknologi informasi."  
    };  

    // Mencari respons dengan pencocokan tidak sensitif huruf  
    const lowercaseMessage = userMessage.toLowerCase();  
    for (let key in responses) {  
        if (lowercaseMessage.includes(key)) {  
            return responses[key];  
        }  
    }  

    return "Maaf, saya tidak dapat menemukan jawaban untuk pertanyaan Anda. Silakan coba pertanyaan lain atau hubungi admin untuk informasi lebih lanjut.";  
}  

// Fungsi untuk menampilkan template pertanyaan yang dapat diklik  
function showTemplateQuestions() {  
    const templateQuestions = [  
        "Apa itu FTI UMBY?",  
        "Di mana lokasi FTI UMBY?",   
        "Apa visi dan misi FTI UMBY?",  
        "Program studi apa saja yang ada di FTI UMBY?",  
        "Bagaimana cara mendaftar di FTI UMBY?",  
        "Apa saja fasilitas yang ada di FTI UMBY?",  
        "Siapa dosen di FTI UMBY?"  
    ];  

    // Tambahkan pesan pembuka  
    addMessage("Silakan pilih salah satu pertanyaan di bawah ini:", false);  

    // Buat kontainer untuk template pertanyaan  
    const templateContainer = document.createElement('div');  
    templateContainer.className = 'template-questions-container';  

    // Buat dan tambahkan setiap pertanyaan template  
    templateQuestions.forEach((question, index) => {  
        const questionElement = document.createElement('div');  
        questionElement.className = 'template-question';  
        questionElement.innerHTML = `<p style="cursor: pointer; color: blue; text-decoration: underline; margin: 5px 0;">${question}</p>`;  
        
        // Tambahkan event listener untuk setiap pertanyaan  
        questionElement.addEventListener('click', () => {  
            // Isi input dengan pertanyaan yang dipilih  
            userInput.value = question;  
            
            // Kirim pesan secara otomatis  
            sendMessageButton.click();  
        });  

        // Tambahkan pertanyaan ke kontainer  
        templateContainer.appendChild(questionElement);  
    });  

    // Tambahkan kontainer ke pesan chatbot  
    chatbotMessages.appendChild(templateContainer);  
}  

// Menangani pengiriman pesan  
sendMessageButton.addEventListener('click', () => {  
    const userMessage = userInput.value.trim();  
    if (userMessage) {  
        addMessage(userMessage, true); // Menambahkan pesan pengguna  
        const botResponse = getBotResponse(userMessage); // Mendapatkan respons dari chatbot  
        addMessage(botResponse, false); // Menambahkan respons chatbot  
        userInput.value = ''; // Mengosongkan input  
    }  
});  

// Menangani enter key untuk mengirim pesan  
userInput.addEventListener('keypress', (event) => {  
    if (event.key === 'Enter') {  
        sendMessageButton.click();  
    }  
});