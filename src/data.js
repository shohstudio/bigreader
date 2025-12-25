export const books = [
    {
        id: 1,
        title: "O'tkan kunlar",
        author: "Abdulla Qodiriy",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/O%27tkan_kunlar.jpg/220px-O%27tkan_kunlar.jpg",
        category: "novel",
        pdfUrl: "https://ferlibrary.uz/f/o_tkan_kunlar_roman.pdf",
        isRead: false
    },
    {
        id: 2,
        title: "Mehrobdan chayon",
        author: "Abdulla Qodiriy",
        image: "https://kitobxon.com/img_knigi/1684.jpg",
        category: "novel",
        pdfUrl: "https://ferlibrary.uz/f/mehrobdan_chayon_roman.pdf",
        isRead: false
    },
    {
        id: 3,
        title: "Shum bola",
        author: "G'afur G'ulom",
        image: "https://kitobxon.com/img_knigi/793.jpg",
        category: "story",
        pdfUrl: "https://ferlibrary.uz/f/shum_bola_qissa.pdf",
        isRead: true
    },
    {
        id: 4,
        title: "Yulduzlar mangu yonadi",
        author: "Tog'ay Murod",
        image: "https://kitobxon.com/img_knigi/3342.jpg",
        category: "novel",
        pdfUrl: "#",
        isRead: false
    },
    {
        id: 5,
        title: "Sariq devni minib",
        author: "Xudoyberdi To'xtaboyev",
        image: "https://kitobxon.com/img_knigi/868.jpg",
        category: "kids",
        pdfUrl: "https://ferlibrary.uz/f/sariq_devni_minib_roman.pdf",
        isRead: false
    },
    {
        id: 6,
        title: "Ikki eshik orasi",
        author: "O'tkir Hoshimov",
        image: "https://kitobxon.com/img_knigi/3553.jpg",
        category: "novel",
        pdfUrl: "#",
        isRead: false
    },
    // International Literature
    {
        id: 7,
        title: "Jinoyat va jazo",
        author: "Fyodor Dostoyevskiy",
        image: "https://upload.wikimedia.org/wikipedia/en/4/4b/Crimeandpunishmentcover.png",
        category: "russian_lit",
        pdfUrl: "https://www.planetebook.com/free-ebooks/crime-and-punishment.pdf",
        isRead: false
    },
    {
        id: 8,
        title: "Kurk mantoli Madonna",
        author: "Sabahattin Ali",
        image: "https://upload.wikimedia.org/wikipedia/en/0/0y/MadonnalnaFurCoat.jpg",
        category: "turkish_lit",
        pdfUrl: "#",
        isRead: false
    },
    {
        id: 9,
        title: "Andisha va g'urur",
        author: "Jane Austen",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/17/PrideAndPrejudiceTitlePage.jpg",
        category: "english_lit",
        pdfUrl: "https://www.planetebook.com/free-ebooks/pride-and-prejudice.pdf",
        isRead: false
    },
    {
        id: 10,
        title: "G'arbiy frontda o'zgarish yo'q",
        author: "Erich Maria Remarque",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/aec/All_Quiet_on_the_Western_Front_%281929_1st_ed_dust_jacket%29.jpg",
        category: "german_lit",
        pdfUrl: "https://www.google.com/books/edition/All_Quiet_on_the_Western_Front/ylNcEAAAQBAJ?hl=en&gbpv=1", // Preview link as copyright status varies
        isRead: false
    },
    {
        id: 11,
        title: "Norvegiya o'rmoni",
        author: "Haruki Murakami",
        image: "https://upload.wikimedia.org/wikipedia/en/5/5e/Norwegian_Wood_kb.jpg",
        category: "japanese_lit",
        pdfUrl: "#",
        isRead: false
    }
];

export const users = [
    { id: 1, name: "Ali Valiyev", email: "ali@example.com", role: "user", joinedDate: "2023-12-01" },
    { id: 2, name: "Vali Aliyev", email: "vali@example.com", role: "user", joinedDate: "2023-12-05" },
    { id: 4, name: "Admin User", email: "admin@bigreader.uz", role: "admin", joinedDate: "2023-11-01" }
];

export const orders = [
    { id: 101, userId: 1, bookId: 1, status: "completed", date: "2023-12-20", amount: 45000 },
    { id: 102, userId: 2, bookId: 3, status: "pending", date: "2023-12-22", amount: 35000 },
    { id: 103, userId: 1, bookId: 2, status: "completed", date: "2023-12-23", amount: 40000 },
];
