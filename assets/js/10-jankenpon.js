alert("Selamat datang di permainan Jankenpon!")

let isPlayed = true;
let playAgain;
let score = 0;

while(isPlayed) {

    let playerWeapon = prompt("Pilih senjatamu: Batu, Gunting, Kertas")

    if (playerWeapon == null) { // jika tidak memilih senjata
        playAgain = confirm(`Kamu tidak memilih senjata apapun\nScore: ${score}\n\nIngin bermain lagi?`)

    } else if (playerWeapon.toLowerCase() == "batu" || playerWeapon.toLowerCase() == "gunting" || playerWeapon.toLowerCase() == "kertas") { // jika memilih senjata
        
        // random senjata komputer
        const weapon = ["batu", "gunting", "kertas"];
        let computerWeapon = weapon[Math.floor(Math.random() * weapon.length)];

        // score
        if (playerWeapon.toLowerCase() == computerWeapon) { // jika seri
            playAgain = confirm(`Player: ${playerWeapon.toUpperCase()}\nComputer: ${computerWeapon.toUpperCase()}\nTIE!\nScore: ${score}\n\nIngin bermain lagi?`)

        } else if ((playerWeapon.toLowerCase() == "batu" && computerWeapon == "gunting") || (playerWeapon.toLowerCase() == "gunting" && computerWeapon == "kertas") || (playerWeapon.toLowerCase() == "kertas" && computerWeapon == "batu")) { // jika menang
            playAgain = confirm(`Player: ${playerWeapon.toUpperCase()}\nComputer: ${computerWeapon.toUpperCase()}\nPLAYER WINS! (+1)\nScore: ${++score}\n\nIngin bermain lagi?`)

        } else { // jika kalah
            playAgain = confirm(`Player: ${playerWeapon.toUpperCase()}\nComputer: ${computerWeapon.toUpperCase()}\nCOMPUTER WINS! (-1)\nScore: ${--score}\n\nIngin bermain lagi?`)
        }


    } else { // jika senjata tidak sesuai
        playAgain = confirm(`Senjatamu tidak sesuai!\nScore: ${score}\n\nIngin bermain lagi?`)
    }
    
    // stop permainan
    if (playAgain == false) {
        isPlayed = false;
        alert(`Terima kasih sudah bermain!\n\nScore akhir: ${score}`)
    } 
    
}