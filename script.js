// script.js

// Array untuk menyimpan data siswa (Berlaku sebagai database sementara)
let dataSiswa = [];

// Mengambil elemen HTML menggunakan ID
const formSiswa = document.getElementById('formSiswa');
const tabelSiswa = document.getElementById('tabelSiswa');
const inputPencarian = document.getElementById('inputPencarian');

// Fungsi untuk menampilkan data ke dalam tabel
function tampilkanData(data) {
    tabelSiswa.innerHTML = ''; // Bersihkan tabel sebelum dimuat ulang

    if (data.length === 0) {
        tabelSiswa.innerHTML = `<tr><td colspan="6" class="empty-message">Tidak ada data siswa ditemukan</td></tr>`;
        return;
    }

    // Loop melalui data dan buat baris tabel
    data.forEach((siswa, index) => {
        const baris = document.createElement('tr');
        baris.innerHTML = `
            <td>${index + 1}</td>
            <td>${siswa.nis}</td>
            <td>${siswa.nama}</td>
            <td>${siswa.kelas}</td>
            <td>${siswa.jurusan}</td>
            <td>
                <button class="btn-delete" onclick="hapusSiswa(${siswa.id})">Hapus</button>
            </td>
        `;
        tabelSiswa.appendChild(baris);
    });
}

// Event Listener untuk menambahkan data saat form disubmit
formSiswa.addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah reload halaman

    // Ambil nilai dari setiap input
    const nis = document.getElementById('nis').value;
    const nama = document.getElementById('nama').value;
    const kelas = document.getElementById('kelas').value;
    const jurusan = document.getElementById('jurusan').value;
    
    // Buat ID unik berdasarkan waktu
    const id = Date.now(); 

    // Masukkan data ke array
    dataSiswa.push({ id, nis, nama, kelas, jurusan });

    // Tampilkan ulang data
    tampilkanData(dataSiswa);

    // Kosongkan form kembali
    formSiswa.reset();
    
    // Reset kolom pencarian
    inputPencarian.value = '';
});

// Fungsi untuk menghapus siswa berdasarkan ID uniknya
function hapusSiswa(idSiswa) {
    // Tampilkan konfirmasi pop-up
    const konfirmasi = confirm('Apakah Anda yakin ingin menghapus data siswa ini?');
    if (konfirmasi) {
        // Saring array dengan membuang data yang ID-nya cocok dengan idSiswa yang dihapus
        dataSiswa = dataSiswa.filter(siswa => siswa.id !== idSiswa);
        
        // Render ulang tabel
        jalankanPencarian();
    }
}

// Fungsi untuk menjalankan logika pencarian
function jalankanPencarian() {
    const kataKunci = inputPencarian.value.toLowerCase();
    
    // Saring data berdasarkan kecocokan nama atau NIS
    const hasilPencarian = dataSiswa.filter(siswa => {
        return siswa.nama.toLowerCase().includes(kataKunci) || 
               siswa.nis.toLowerCase().includes(kataKunci);
    });

    // Tampilkan data hasil saringan
    tampilkanData(hasilPencarian);
}

// Event Listener untuk mendeteksi setiap ketikan pada kotak pencarian
inputPencarian.addEventListener('input', jalankanPencarian);

// Tampilkan data kosong saat pertama kali memuat web
tampilkanData(dataSiswa);
