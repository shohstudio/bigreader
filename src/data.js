export const books = [
    {
        id: 1,
        title: "O'tkan kunlar",
        author: "Abdulla Qodiriy",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/O%27tkan_kunlar.jpg/220px-O%27tkan_kunlar.jpg",
        category: "novel",
        price: 45000,
        isRead: false
    },
    {
        id: 2,
        title: "Mehrobdan chayon",
        author: "Abdulla Qodiriy",
        image: "https://assets.asaxiy.uz/product/items/desktop/5e15bc3d84347.jpg",
        category: "novel",
        price: 40000,
        isRead: false
    },
    {
        id: 3,
        title: "Shum bola",
        author: "G'afur G'ulom",
        image: "https://assets.asaxiy.uz/product/items/desktop/5e15bc9975390.jpg",
        category: "story",
        price: 35000,
        isRead: true
    },
    {
        id: 4,
        title: "Yulduzlar mangu yonadi",
        author: "Tog'ay Murod",
        image: "https://assets.asaxiy.uz/product/items/desktop/5e15bce82e6d6.jpg",
        category: "novel",
        price: 42000,
        isRead: false
    },
    {
        id: 5,
        title: "Sariq devni minib",
        author: "Xudoyberdi To'xtaboyev",
        image: "https://assets.asaxiy.uz/product/items/desktop/5e15bd1661245.jpg",
        category: "kids",
        price: 38000,
        isRead: false
    },
    {
        id: 6,
        title: "Ikki eshik orasi",
        author: "O'tkir Hoshimov",
        image: "https://assets.asaxiy.uz/product/items/desktop/5e15bd5e92150.jpg",
        category: "novel",
        price: 50000,
        isRead: false
    }
];

export const users = [
    { id: 1, name: "Ali Valiyev", email: "ali@example.com", role: "user", joinedDate: "2023-12-01" },
    { id: 2, name: "Vali Aliyev", email: "vali@example.com", role: "user", joinedDate: "2023-12-05" },
    { id: 3, name: "Guli Karimova", email: "guli@example.com", role: "user", joinedDate: "2023-12-10" },
    { id: 4, name: "Admin User", email: "admin@bigreader.uz", role: "admin", joinedDate: "2023-11-01" }
];

export const orders = [
    { id: 101, userId: 1, bookId: 1, status: "completed", date: "2023-12-20", amount: 45000 },
    { id: 102, userId: 2, bookId: 3, status: "pending", date: "2023-12-22", amount: 35000 },
    { id: 103, userId: 1, bookId: 2, status: "completed", date: "2023-12-23", amount: 40000 },
];
