// Mock Database Management
const DB_KEY = 'lakshya_db';

function getDB() {
    let db = localStorage.getItem(DB_KEY);
    if (!db) {
        db = {
            users: {
                admin: { username: 'admin', password: 'password', role: 'admin' },
                student: { username: 'student', password: 'password', role: 'student', regNo: 'LCI001' }
            },
            students: [
                {
                    regNo: 'LCI001',
                    name: 'Dummy Student',
                    fatherName: 'Dummy Father',
                    address: '123 Dummy Street',
                    contact: '9999999999',
                    course: 'Full Stack Web Dev',
                    photo: '',
                    courseFee: 50000,
                    balanceFee: 40000,
                    fees: [
                        { date: '2026-03-01', amount: 10000, receiptNo: 'REC-0001' }
                    ],
                    attendance: {
                        '2026-03': {
                            '01': 'P', '02': 'P', '03': 'A', '04': 'P'
                        }
                    },
                    admissionDate: '2026-03-01',
                    exams: []
                }
            ],
            notes: [],
            notifications: [],
            videos: [],
            enquiries: [],
            onlineExams: [],
            receiptCounter: 2,
            expenses: [],
            enquiries: []
        };
        localStorage.setItem(DB_KEY, JSON.stringify(db));
    } else {
        db = JSON.parse(db);
    }
    return db;
}

function saveDB(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function loginUser(username, password, role) {
    const db = getDB();
    if (role === 'admin' && db.users.admin.username === username && db.users.admin.password === password) {
        localStorage.setItem('currentUser', JSON.stringify(db.users.admin));
        return true;
    }

    // Check main dummy student or dynamically created students (using regNo as username, contact as password by default)
    if (role === 'student') {
        if (db.users.student.username === username && db.users.student.password === password) {
            localStorage.setItem('currentUser', JSON.stringify(db.users.student));
            return true;
        }

        // Find if any generated student matches username=regNo, password=contact
        const student = db.students.find(s => s.regNo === username && s.contact === password);
        if (student) {
            localStorage.setItem('currentUser', JSON.stringify({
                username: student.regNo,
                password: student.contact,
                role: 'student',
                regNo: student.regNo
            }));
            return true;
        }
    }
    return false;
}

function logoutUser() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

function generateRegNo(db) {
    return 'LCI' + String(db.students.length + 1).padStart(3, '0');
}

function generateReceiptNo(db) {
    const rec = 'REC-' + String(db.receiptCounter).padStart(4, '0');
    db.receiptCounter++;
    return rec;
}
